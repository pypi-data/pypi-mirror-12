"""Twitter Session.
"""
__author__ = 'Alexander Shepetko'
__email__ = 'a@shepetko.com'
__license__ = 'MIT'

from datetime import datetime as _dt
from requests_oauthlib import OAuth1Session
from pytsite import reg as _reg, router as _router


class Session:
    """Twitter oAuth Driver.
    """
    def __init__(self, **kwargs):
        """Init.
        """
        self._client_key = _reg.get('twitter.app_key')
        self._client_secret = _reg.get('twitter.app_secret')
        if not self._client_key or not self._client_secret:
            raise Exception("Both 'twitter.app_key' and 'twitter.app_secret' must be defined.")

        self._oauth_token = kwargs.get('oauth_token')
        self._oauth_token_secret = kwargs.get('oauth_token_secret')

    def _init_session(self):
        if self._get_state()['stage'] == 'new':
            # Need to fetch request token
            oauth = OAuth1Session(self._client_key, self._client_secret, callback_uri=_router.current_url())
            r_token_resp = oauth.fetch_request_token('https://api.twitter.com/oauth/request_token')
            self._set_state({
                'stage': 'request_token',
                'time': _dt.now(),
                'oauth_token': r_token_resp.get('oauth_token'),
                'oauth_token_secret': r_token_resp.get('oauth_token_secret')
            })

    def _get_state(self) -> dict:
        """Get state.
        """
        if self._oauth_token and self._oauth_token_secret:
            return {'stage': 'ready'}

        default = {
            'stage': 'new',
            'time': _dt.now(),
            'oauth_token': None,
            'oauth_token_secret': None
        }
        state = _router.session.get('oauth.twitter.session')

        if not state or (_dt.now() - state['time']).seconds > 60:
            state = default

        return state

    def _set_state(self, state: dict):
        """Set state.
        """
        _router.session['oauth.twitter.session'] = state
        return self

    def _clear_state(self):
        """Clear state.
        """
        if 'oauth.twitter.session' in _router.session:
            del _router.session['oauth.twitter.session']
        return self

    def get_authorization_url(self) -> str:
        """Get authorization URL.
        """
        self._init_session()

        state = self._get_state()
        if state['stage'] != 'request_token':
            raise Exception("Cannot generate authorization URL.")

        oauth = OAuth1Session(self._client_key, self._client_secret,
                              state['oauth_token'], state['oauth_token_secret'],
                              callback_uri=_router.current_url())

        return oauth.authorization_url('https://api.twitter.com/oauth/authorize')

    def get_access_token(self, verifier: str) -> dict:
        """Exchange request token to access token.
        """
        self._init_session()

        state = self._get_state()
        if state['stage'] != 'request_token':
            raise Exception('Session expired')
        self._clear_state()

        session = OAuth1Session(self._client_key, self._client_secret,
                                state['oauth_token'], state['oauth_token_secret'],
                                verifier=verifier)

        return session.fetch_access_token('https://api.twitter.com/oauth/access_token')
