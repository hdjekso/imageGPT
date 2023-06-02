from .baseModels.baseUser import BaseUser

class Conversations(BaseUser):
    def __init__(self, ID, conversation_token, fk_user_ID, create_date, modify_date):
        super().__init__(ID, fk_user_ID, create_date, modify_date)
        self.conversation_token = conversation_token

    def set_conversation_token(self, conversation_token):
        self.conversation_token = conversation_token
    def get_conversation_token(self):
        return self.conversation_token
