"""Poster Functions.
"""
from datetime import datetime as _datetime, timedelta as _timedelta
from pytsite import content as _content, odm as _odm, lang as _lang, logger as _logger, threading as _threading, \
    reg as _reg
from . import _driver, _error

__author__ = 'Alexander Shepetko'
__email__ = 'a@shepetko.com'
__license__ = 'MIT'


__drivers = {}


def register_driver(name: str, title: str, driver_cls: type):
    """Register export driver.
    """
    if name in __drivers:
        raise KeyError("Driver with name '{}' already registered.")

    if not issubclass(driver_cls, _driver.Abstract):
        raise ValueError("Invalid driver's class.")

    __drivers[name] = (title, driver_cls)


def load_driver(name: str, **kwargs) -> _driver.Abstract:
    """Instantiate driver.
    """
    return get_driver_info(name)[1](**kwargs)


def get_driver_info(name: str) -> tuple:
    if name not in __drivers:
        raise KeyError("Driver with name '{}' is not registered.")

    return __drivers[name]


def get_drivers() -> dict:
    """Get registered drivers.
    """
    return __drivers


def get_driver_title(name) -> str:
    return _lang.t(get_driver_info(name)[0])


def cron_1min_eh():
    """'pytsite.cron.5m' event handler.
    """
    lock = _threading.get_r_lock()
    limit = _reg.get('content_export.limit', 2)
    max_errors = _reg.get('content_export.max_errors', 10)
    cnt = 0
    exporters_f = _odm.find('content_export').where('enabled', '!=', False).sort([('errors', _odm.I_ASC)])
    for exporter in exporters_f.get():
        content_f = _content.find(exporter.content_model)
        content_f.where('publish_time', '>=', _datetime.now() - _timedelta(exporter.max_age))
        content_f.where('options.content_export', 'nin', [str(exporter.id)])
        content_f.sort([('publish_time', _odm.I_ASC)])

        # Get content only with images
        if exporter.with_images_only:
            content_f.where('images', '!=', [])

        # Filter by content owner
        if not exporter.process_all_authors:
            content_f.where('author', '=', exporter.owner)

        for entity in content_f.get():
            if cnt == limit:
                return

            try:
                msg = "Entity '{}', title='{}'. Exporter '{}', title='{}'" \
                    .format(entity.model, entity.title, exporter.driver, exporter.driver_opts['title'])
                _logger.info(msg, __name__)

                # Ask driver to perform export
                driver = load_driver(exporter.driver, **exporter.driver_opts)
                driver.export(entity=entity, exporter=exporter)

                # Saving information about entity is exported
                lock.acquire()
                entity_opts = entity.options
                if 'content_export' not in entity_opts:
                    entity_opts['content_export'] = []
                entity_opts['content_export'].append(str(exporter.id))
                entity.f_set('options', entity_opts).save()

                # Reset errors count to zero after each successful export
                if exporter.errors:
                    exporter.f_set('errors', 0).save()

            except _error.ExportError as e:
                exporter.f_inc('errors')
                if exporter.errors >= max_errors:
                    exporter.f_set('enabled', False).save()

                _logger.error(str(e), __name__, False)

            finally:
                cnt += 1
                try:
                    lock.release()
                except RuntimeError:
                    pass
