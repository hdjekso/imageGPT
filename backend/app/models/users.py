from .baseModels.base import Base
import hashlib
import hmac

class Users(Base):
    def __init__(self, ID, fname, lname, email, username, password, create_date, modify_date):
        super().__init__(ID, create_date, modify_date)
        self.fname = fname
        self.lname = lname
        self.email = email
        self.username = username
        self.password = password

    def set_fname(self, fname):
        self.fname = fname
    def get_fname(self):
        return self.fname
    
    def set_lname(self, lname):
        self.lname = lname
    def get_lname(self):
        return self.lname

    def set_email(self, email):
        self.email = email
    def get_email(self):
        return self.email

    def set_username(self, username):
        self.username = username
    def get_username(self):
        return self.username
    
    def set_password(self, password):
        self.password = password
    def get_password(self):
        return self.password

    def get_password_hash(self):
        _password = self.get_password().encode()
        _username = self.get_username().encode()
        return str(hmac.new(_password, _username, hashlib.sha256).hexdigest())