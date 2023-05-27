from .baseModels.baseUser import BaseUser

class Messages(BaseUser):
    def __init__(self, ID, fk_user_ID, message, create_date, modify_date):
        super().__init__(ID, fk_user_ID, create_date, modify_date)
        self.message = message

    def set_message(self, message):
        self.message = message
    def get_message(self):
        return self.message
