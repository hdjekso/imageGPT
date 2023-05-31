from .baseModels.baseMessagesUser import BaseMessageUser

class Inputs(BaseMessageUser):
    def __init__(self, ID, fk_user_ID, fk_message_ID, input, response, create_date, modify_date):
        super().__init__(ID, fk_user_ID, fk_message_ID, create_date, modify_date)
        self.input = input
        self.response = response

    def set_input(self, input):
        self.input = input
    def get_input(self):
        return self.input

    def set_response(self, response):
        self.response = response
    def get_response(self):
        return self.response

    
