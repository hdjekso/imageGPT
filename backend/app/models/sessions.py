from .baseModels.baseUser import BaseUser

class Sessions(BaseUser):
    def __init__(self, ID, fk_user_ID, token, create_date, modify_date, expire_date):
        super().__init__(ID, fk_user_ID, create_date, modify_date)
        self.token = token
        self.expire_date = expire_date

    def set_token(self, token):
        self.token = token
    def get_token(self):
        return self.token

    def set_expire_date(self, expire_date):
        self.expire_date = expire_date
    def get_expire_date(self):
        return self.expire_date
