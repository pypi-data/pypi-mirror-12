"""Used to communicate with iobeam's Devices API"""
from iobeam.endpoints import service
from iobeam.http import request
from iobeam.resources import device


class DeviceService(service.EndpointService):
    """Communicates with the backend and exposes available Devices API methods."""

    def __init__(self, token, requester=None):
        service.EndpointService.__init__(self, token, requester=requester)

    def getTimestamp(self):
        """Wraps API call `GET /devices/timestamp`.

        This returns the current time in milliseconds, according to the iobeam
        backend. Useful for clients with limited on-device clock support.

        Returns:
            Current timestamp in milliseconds since epoch; -1 if error.
        """
        if not self.token:
            raise request.UnauthorizedError.noTokenSet()
        endpoint = self.makeEndpoint("devices/timestamp")

        r = self.requester().get(endpoint).token(self.token)
        r.execute()

        if r.getResponseCode() == 200:
            resp = r.getResponse()
            return resp["server_timestamp"]
        else:
            return -1

    def registerDevice(self, projectId, deviceId=None, deviceName=None):
        """Wraps API call `POST /devices`

        Registers the device in project `projectId` with the iobeam backend.
        `deviceId` and `deviceName` are optional, if provided they will used
        in registration, otherwise they will be generated by the backend.

        Params:
            projectId - Project ID to register device in
            deviceId - Desired device ID; if None, will be generated.
            deviceName - Desired device name; if None, will be generated.

        Returns:
            A Device object corresponding to the parameters (explicit and
            generated); None if there is an error/failure.
        """
        if not self.token:
            raise request.UnauthorizedError.noTokenSet()
        endpoint = self.makeEndpoint("devices")

        r = self.requester().post(endpoint).token(self.token)
        reqBody = {"project_id": projectId}
        if deviceId or deviceName:
            if deviceId:
                reqBody["device_id"] = deviceId
            if deviceName:
                reqBody["device_name"] = deviceName
        r.setBody(reqBody)
        r.execute()

        ret = None
        if r.getResponseCode() == 201:
            resp = r.getResponse()
            ret = device.Device(projectId, resp["device_id"],
                                deviceName=resp["device_name"])
        elif r.getResponseCode() == 403:
            raise request.UnauthorizedError("Invalid credentials.")
        else:
            raise request.Error("Received unexpected code: {}".format(
                r.getResponseCode()))

        return ret
