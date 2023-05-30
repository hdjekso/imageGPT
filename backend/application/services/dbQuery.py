import mysql.connector as MySQL

class DatabaseQuery:

    def createUser(self, db, users):
        query = "INSERT INTO `users`(`fname`, `lname`, `email`, `username`, `password`) VALUES (%s, %s, %s, %s, %s)"
        args = [users.get_fname(), users.get_lname(), users.get_email(), users.get_username(), users.get_password_hash()]
        db.execute(query, args)
        db.commit()

    def retrieveUserIdSession(self, db, users):
        query = "SELECT `ID` FROM `users` WHERE `username` = %s AND `password` = %s LIMIT 1"
        args = [users.get_username(), users.get_password_hash()]
        ret = db.fetchone(query, args)
        return ret[0]

    def createSession(self, db, sessions):
        query = "INSERT INTO `sessions`(`fk_user_ID`, `token`) VALUES (%s, %s)"
        args = [sessions.get_fk_user_ID(), sessions.get_token()]
        db.execute(query, args)
        db.commit()

    def retrieveUserIdToken(self, db, sessions):
        query = "SELECT `fk_user_ID` FROM `sessions` WHERE `token` = %s LIMIT 1"
        args = [sessions.get_token()]
        ret = db.fetchone(query, args)
        return ret[0]

    def createMessage(self, db, messages):
        query = "INSERT INTO `messages`(`fk_user_ID`, `image_txt`, `users_inp`) VALUES (%s, %s, %s)"
        args = [messages.get_fk_user_ID(), messages.get_image_txt(), messages.get_users_inp()]
        db.execute(query, args)
        db.commit()

    def authenticateSession(self, db, sessions):
        query = "SELECT EXISTS(SELECT `token` FROM `sessions` WHERE token = %s)"
        args = [sessions.get_token()]
        ret = db.fetchone(query, args)

        if ret[0] == 1: 
            return True
            
        return False

    def retrieveAllMessages(self, db, messages):
        query = "SELECT image_txt, users_inp FROM messages WHERE fk_user_ID = %s"
        args = [messages.get_fk_user_ID()]
        ret = db.fetchall(query, args)
        return ret