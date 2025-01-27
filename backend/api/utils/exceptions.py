from rest_framework.views import exception_handler

def custom_exception_handler(exc, context):
    # Call REST framework's default exception handler first,
    # to get the standard error response.
    response = exception_handler(exc, context)
    # Update the structure of the response data.
    if response is not None:
        customized_response = {}
        customized_response['errors'] = []
        print('response', response)
        for key, value in response.data.items():
            if key == 'departure_id':
                value = 'Un train de départ doit être sélectionné !'
            error = {'field': key, 'message': value}

            customized_response['errors'].append(error)

        response.data = customized_response

    return response

class CapacityTrainError(Exception):
    pass

class TicketError(Exception):
    def __init___(self,dErrorArguments):
        Exception.__init__(self,"my exception was raised with arguments {0}".format(dErrArguments))
        self.dErrorArguments = dErrorArguements