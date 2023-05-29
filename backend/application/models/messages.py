from .baseModels.baseUser import BaseUser

class Messages(BaseUser):
    def __init__(self, ID, fk_user_ID, image_txt, users_inp, create_date, modify_date):
        super().__init__(ID, fk_user_ID, create_date, modify_date)
        self.image_txt = image_txt
        self.users_inp = users_inp

    def set_image_txt(self, image_txt):
        self.image_txt = image_txt
    def get_image_txt(self):
        return self.image_txt

    def set_users_inp(self, users_inp):
        self.users_inp = users_inp
    def get_users_inp(self):
        return self.users_inp
