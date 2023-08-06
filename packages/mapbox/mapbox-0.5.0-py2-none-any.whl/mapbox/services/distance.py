from uritemplate import URITemplate

from mapbox.encoding import encode_coordinates_json
from mapbox.services.base import Service


class Distance(Service):

    def __init__(self, access_token=None):
        self.baseuri = 'https://api.mapbox.com/distances/v1/mapbox'
        self.session = self.get_session(access_token)

    def _validate_profile(self, profile):
        valid_profiles = ['driving', 'cycling', 'walking']
        if profile not in valid_profiles:
            raise ValueError("{} is not a valid profile".format(profile))
        return profile

    def distances(self, features, profile='driving'):
        profile = self._validate_profile(profile)
        coords = encode_coordinates_json(features)

        uri = URITemplate('%s/{profile}' % self.baseuri).expand(
            profile=profile)

        res = self.session.post(uri, data=coords,
                                headers={'Content-Type': 'application/json'})
        self.handle_http_error(res)
        return res
