"""Poster Model.
"""
from pytsite import odm_ui as _odm_ui, auth as _auth, content as _content, odm as _odm, validation as _validation, \
    router as _router, widget as _widget
from . import _widget as _content_export_widget, _functions

__author__ = 'Alexander Shepetko'
__email__ = 'a@shepetko.com'
__license__ = 'MIT'


class ContentExport(_odm.Model, _odm_ui.UIMixin):
    """oAuth Account Model.
    """
    def _setup(self):
        """Hook.
        """
        self._define_field(_odm.field.String('driver', nonempty=True))
        self._define_field(_odm.field.Dict('driver_opts'))
        self._define_field(_odm.field.String('content_model', nonempty=True))
        self._define_field(_odm.field.Bool('process_all_authors', default=True))
        self._define_field(_odm.field.Bool('with_images_only', default=True))
        self._define_field(_odm.field.Ref('owner', model='user', nonempty=True))
        self._define_field(_odm.field.Bool('enabled', default=True))
        self._define_field(_odm.field.Integer('errors'))
        self._define_field(_odm.field.Integer('max_age', default=14))

    @property
    def driver(self) -> str:
        return self.f_get('driver')

    @property
    def driver_opts(self) -> dict:
        return self.f_get('driver_opts')

    @property
    def content_model(self) -> str:
        return self.f_get('content_model')

    @property
    def owner(self) -> _auth.model.User:
        return self.f_get('owner')

    @property
    def process_all_authors(self) -> bool:
        return self.f_get('process_all_authors')

    @property
    def with_images_only(self) -> bool:
        return self.f_get('with_images_only')

    @property
    def enabled(self) -> bool:
        return self.f_get('enabled')

    @property
    def errors(self) -> int:
        return self.f_get('errors')

    @property
    def max_age(self) -> int:
        return self.f_get('max_age')

    def _pre_save(self):
        """Hook.
        """
        if not self.f_get('owner'):
            self.f_set('owner', _auth.get_current_user())

    def setup_browser(self, browser):
        """Hook.
        :type browser: pytsite.odm_ui._browser.Browser
        """
        browser.data_fields = (
            'content_model',
            'driver',
            'driver_opts',
            'process_all_authors',
            'with_images_only',
            'max_age',
            'enabled',
            'errors',
            'owner'
        )

    def get_browser_data_row(self) -> tuple:
        """Hook.
        """
        content_model = _content.get_model_title(self.content_model)
        driver = _functions.get_driver_title(self.driver)
        all_authors = '<span class="label label-success">' + self.t('word_yes') + '</span>' \
            if self.process_all_authors else ''
        w_images = '<span class="label label-success">' + self.t('word_yes') + '</span>' \
            if self.with_images_only else ''
        max_age = self.max_age
        enabled = '<span class="label label-success">' + self.t('word_yes') + '</span>' if self.enabled else ''
        errors = '<span class="label label-danger">' + str(self.errors) + '</span>' if self.errors else ''

        return content_model, driver, self.driver_opts.get('title', ''), all_authors, w_images, max_age, enabled, \
               errors, self.owner.full_name

    def setup_m_form(self, form, stage: str):
        """Hook.
        :type form: pytsite.form.Base
        """
        req_val = _router.request.values_dict

        # First step
        if not req_val.get('step'):
            form.add_widget(_widget.select.Checkbox(
                weight=10,
                uid='enabled',
                label=self.t('enabled'),
                value=self.enabled,
            ))

            form.add_widget(_widget.select.Checkbox(
                weight=20,
                uid='process_all_authors',
                label=self.t('process_all_authors'),
                value=self.process_all_authors,
            ))

            form.add_widget(_widget.select.Checkbox(
                weight=30,
                uid='with_images_only',
                label=self.t('with_images_only'),
                value=self.with_images_only,
            ))

            form.add_widget(_content.widget.ModelSelect(
                weight=40,
                uid='content_model',
                label=self.t('content_model'),
                value=self.content_model,
                h_size='col-sm-4',
                required=True,
            ))

            form.add_widget(_content_export_widget.DriverSelect(
                weight=50,
                uid='driver',
                label=self.t('driver'),
                value=self.driver,
                h_size='col-sm-4',
                required=True,
            ))

            form.add_widget(_widget.input.Integer(
                weight=60,
                uid='max_age',
                label=self.t('max_age'),
                value=self.max_age,
                h_size='col-sm-1'
            ))

            form.add_widget(_widget.input.Integer(
                weight=70,
                uid='errors',
                label=self.t('errors'),
                value=self.errors,
                h_size='col-sm-1'
            ))

            form.add_widget(_widget.input.Hidden(
                uid='step',
                value='2',
            ))

            form.method = 'GET'
            form.action = _router.current_url()
            form.remove_widget('__form_location')
            form.remove_widget('__form_redirect')
            form.remove_widget('__entity_id')
            submit_btn = form.get_widget('actions').get_child('action_submit')
            """:type: pytsite.widget._button.Submit"""
            submit_btn.set_value(self.t('next'))
            submit_btn.icon = 'fa fa-angle-double-right'

        # Second step
        else:
            driver = req_val.get('driver')

            form.add_widget(_widget.input.Hidden(
                uid='step',
                value='3'
            ))

            form.add_widget(_widget.input.Hidden(
                uid='content_model',
                value=req_val.get('content_model')
            ))

            form.add_widget(_widget.input.Hidden(
                uid='driver',
                value=driver
            ))

            form.add_widget(_widget.input.Hidden(
                uid='process_all_authors',
                value=req_val.get('process_all_authors')
            ))

            form.add_widget(_widget.input.Hidden(
                uid='with_images_only',
                value=req_val.get('with_images_only')
            ))

            form.add_widget(_widget.input.Hidden(
                uid='enabled',
                value=req_val.get('enabled')
            ))

            max_age = req_val.get('max_age')
            form.add_widget(_widget.input.Hidden(
                uid='max_age',
                value=max_age if max_age else 14
            ))

            errors = req_val.get('errors')
            form.add_widget(_widget.input.Hidden(
                uid='errors',
                value=errors if errors else 0
            ))

            form.add_widget(_functions.load_driver(driver).get_settings_widget('driver_opts', **self.driver_opts))

        form.add_rule('content_model', _validation.rule.NonEmpty())
        form.add_rule('driver', _validation.rule.NonEmpty())

    def get_d_form_description(self) -> str:
        """Hook.
        """
        return str(self.id)
