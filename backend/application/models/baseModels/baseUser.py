from .base import Base

class BaseUser(Base):
    def __init__(self, ID, fk_user_ID, create_date, modify_date):
        super().__init__(ID, create_date, modify_date)
        self.fk_user_ID = fk_user_ID
    
    def set_fk_user_ID(self, fk_user_ID):
        self.fk_user_ID = fk_user_ID
    def get_fk_user_ID(self):
        return self.fk_user_ID