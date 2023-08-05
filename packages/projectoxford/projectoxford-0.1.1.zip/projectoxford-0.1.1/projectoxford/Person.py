import requests

_personUrl = 'https://api.projectoxford.ai/face/v0/persongroups'

from .Base import Base

class Person(Base):
    """Client for using the Project Oxford person APIs"""
    
    def __init__(self, key):
        """Initializes a new instance of the class.
        Args:
            key (str). the API key to use for this client.
        """
        Base.__init__(self, key)

    def addFace(self, personGroupId, personId, faceId, userData=None):
        """Adds a face to a person for identification. The maximum face count for each person is 32.
        The face ID must be added to a person before its expiration. Typically a face ID expires
        24 hours after detection.

        Args:
            personGroupId (str). The target person's person group.
            personId (str). The target person that the face is added to.
            faceId (str). The ID of the face to be added. The maximum face amount for each person is 32.
            userData (str). Optional. Attach user data to person's face. The maximum length is 1024.

        Returns:
            object. The resulting JSON
        """

        body = {} if userData is None else { 'userData': userData }
        uri = _personUrl + '/' + personGroupId + '/persons/' + personId + '/faces/' + faceId
        call = lambda: requests.put(uri, json=body, headers={'Ocp-Apim-Subscription-Key': self.key})
        return Base._invoke(self, call)

    def deleteFace(self, personGroupId, personId, faceId):
        """Deletes a face from a person.

        Args:
            personGroupId (str). The target person's person group.
            personId (str). The target person that the face is removed from.
            faceId (str). The ID of the face to be deleted.

        Returns:
            object. The resulting JSON
        """

        uri = _personUrl + '/' + personGroupId + '/persons/' + personId + '/faces/' + faceId
        call = lambda: requests.delete(uri, headers={'Ocp-Apim-Subscription-Key': self.key})
        return Base._invoke(self, call)

    def updateFace(self, personGroupId, personId, faceId, userData=None):
        """Updates a face for a person.

        Args:
            personGroupId (str). The target person's person group.
            personId (str). The target person that the face is updated on.
            faceId (str). The ID of the face to be updated.
            userData (str). Optional. Attach user data to person's face. The maximum length is 1024.

        Returns:
            object. The resulting JSON
        """

        body = {} if userData is None else { 'userData': userData }
        uri = _personUrl + '/' + personGroupId + '/persons/' + personId + '/faces/' + faceId
        call = lambda: requests.patch(uri, json=body, headers={'Ocp-Apim-Subscription-Key': self.key})
        return Base._invoke(self, call)

    def getFace(self, personGroupId, personId, faceId):
        """Get a face for a person.

        Args:
            personGroupId (str). The target person's person group.
            personId (str). The target person that the face is to get from.
            faceId (str). The ID of the face to get.

        Returns:
            object. The resulting JSON
        """

        uri = _personUrl + '/' + personGroupId + '/persons/' + personId + '/faces/' + faceId
        call = lambda: requests.get(uri, headers={'Ocp-Apim-Subscription-Key': self.key})
        return Base._invoke(self, call)

    def create(self, personGroupId, faces, name, userData=None):
        """Creates a new person in a specified person group for identification.
        The number of persons has a subscription limit. Free subscription amount is 1000 persons.
        The maximum face count for each person is 32.

        Args:
            personGroupId (str). The target person's person group.
            faces ([str]). Array of face id's for the target person
            name (str). Target person's display name. The maximum length is 128.
            userData (str). Optional fields for user-provided data attached to a person. Size limit is 16KB.

        Returns:
            object. The resulting JSON
        """

        body = {
            'faceIds': faces,
            'name': name
        }

        if userData is not None:
            body['userData'] = userData

        uri = _personUrl + '/' + personGroupId + '/persons'
        call = lambda: requests.post(uri, json=body, headers={'Ocp-Apim-Subscription-Key': self.key})
        return Base._invoke(self, call)

    def delete(self, personGroupId, personId):
        """Deletes an existing person from a person group.

        Args:
            personGroupId (str). The target person's person group.
            personId (str). The target person to delete.

        Returns:
            object. The resulting JSON
        """

        uri = _personUrl + '/' + personGroupId + '/persons/' + personId
        call = lambda: requests.delete(uri, headers={'Ocp-Apim-Subscription-Key': self.key})
        return Base._invoke(self, call)

    def get(self, personGroupId, personId):
        """Gets an existing person from a person group.

        Args:
            personGroupId (str). The target person's person group.
            personId (str). The target person to get.

        Returns:
            object. The resulting JSON
        """

        uri = _personUrl + '/' + personGroupId + '/persons/' + personId
        call = lambda: requests.get(uri, headers={'Ocp-Apim-Subscription-Key': self.key})
        return Base._invoke(self, call)

    def update(self, personGroupId, personId, faces, name, userData=None):
        """Updates a person's information.

        Args:
            personGroupId (str). The target person's person group.
            personId (str). The target persons Id.
            faces ([str]). Array of face id's for the target person.
            name (str). Target person's display name. The maximum length is 128.
            userData (str). Optional fields for user-provided data attached to a person. Size limit is 16KB.

        Returns:
            object. The resulting JSON
        """

        body = {
            'faceIds': faces,
            'name': name,
            'userData': userData
        }

        uri = _personUrl + '/' + personGroupId + '/persons/' + personId
        call = lambda: requests.patch(uri, json=body, headers={'Ocp-Apim-Subscription-Key': self.key})
        return Base._invoke(self, call)

    def list(self, personGroupId):
        """Lists all persons in a person group, with the person information.

        Args:
            personGroupId (str). The target person's person group.

        Returns:
            object. The resulting JSON
        """

        uri = _personUrl + '/' + personGroupId + '/persons'
        call = lambda: requests.get(uri, headers={'Ocp-Apim-Subscription-Key': self.key})
        return Base._invoke(self, call)
