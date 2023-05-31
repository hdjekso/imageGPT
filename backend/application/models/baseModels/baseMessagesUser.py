from .base import Base

class BaseMessageUser(Base):
    def __init__(self, ID, fk_user_ID, fk_message_ID, create_date, modify_date):
        super().__init__(ID, create_date, modify_date)
        self.fk_user_ID = fk_user_ID
        self.fk_message_ID = fk_message_ID

    def set_fk_user_ID(self, fk_user_ID):
        self.fk_user_ID = fk_user_ID
    def get_fk_user_ID(self):
        return self.fk_user_ID
    
    def set_fk_message_ID(self, fk_message_ID):
        self.fk_message_ID = fk_message_ID
    def get_fk_message_ID(self):
        return self.fk_message_ID



    