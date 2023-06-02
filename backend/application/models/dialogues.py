from .baseModels.baseConvoUser import BaseConvoUser

class Dialogues(BaseConvoUser):
    def __init__(self, ID, fk_user_ID, fk_conversation_ID, usr_content, gpt_content, create_date, modify_date):
        super().__init__(ID, fk_user_ID, fk_conversation_ID, create_date, modify_date)
        self.usr_content = usr_content
        self.gpt_content = gpt_content

    def set_usr_content(self, usr_content):
        self.usr_content = usr_content
    def get_usr_content(self):
        return self.usr_content

    def set_gpt_content(self, gpt_content):
        self.gpt_content = gpt_content
    def get_gpt_content(self):
        return self.gpt_content

    
