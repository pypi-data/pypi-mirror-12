"""Currency Plugin Forms
"""
from pytsite import form as _form, lang as _lang, validation as _validation
from . import _api, _widget

__author__ = 'Alexander Shepetko'
__email__ = 'a@shepetko.com'
__license__ = 'MIT'


class Settings(_form.Base):
    def _setup(self):
        weight = 10
        main_cur = _api.get_main()
        for cur in _api.get_all(False):
            self.add_widget(_widget.Input(
                uid='setting_exchange_rate_' + cur,
                weight=weight,
                label=_lang.t('pytsite.currency@exchange_rate', {'code': cur}),
                h_size='col-xs-12 col-sm-4 col-md-3 col-lg-2',
                value={'amount': 1.0, 'currency': main_cur},
                currency=main_cur
            ))
            self.add_rule('setting_exchange_rate_' + cur, _validation.rule.Greater())

            weight += 10
