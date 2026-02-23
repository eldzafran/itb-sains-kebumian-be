from rest_framework.renderers import JSONRenderer
from django.utils.timezone import now


class CustomJSONRenderer(JSONRenderer):

    def render(self, data, accepted_media_type=None, renderer_context=None):

        response = renderer_context.get("response", None)

        if response and 200 <= response.status_code < 300:

            wrapped_response = {
                "status": "success",
                "code": response.status_code,
                "message": "Request successful",
                "data": data,
                "metadata": {
                    "server_time": now(),
                    "version": "v1.0"
                }
            }

            return super().render(wrapped_response, accepted_media_type, renderer_context)

        return super().render(data, accepted_media_type, renderer_context)