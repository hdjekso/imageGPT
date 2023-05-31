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
        
        if ret: return ret[0]
        return None

    def createSession(self, db, sessions):
        query = "INSERT INTO `sessions`(`fk_user_ID`, `token`) VALUES (%s, %s)"
        args = [sessions.get_fk_user_ID(), sessions.get_token()]
        db.execute(query, args)
        db.commit()

    def retrieveUserIdToken(self, db, sessions):
        query = "SELECT `fk_user_ID` FROM `sessions` WHERE `token` = %s and `is_active` = 1 LIMIT 1"
        args = [sessions.get_token()]
        ret = db.fetchone(query, args)
        
        if ret: return ret[0]
        return None

    def createMessage(self, db, messages):
        query = "INSERT INTO `messages`(`fk_user_ID`, `image_txt`, `users_inp`) VALUES (%s, %s, %s)"
        args = [messages.get_fk_user_ID(), messages.get_image_txt(), messages.get_users_inp()]
        db.execute(query, args)
        db.commit()

    def authenticateSession(self, db, sessions):
        query = "SELECT EXISTS(SELECT `token` FROM `sessions` WHERE `token` = %s AND `is_active` = 1)"
        args = [sessions.get_token()]
        ret = db.fetchone(query, args)

        if ret[0] == 1: 
            return True
            
        return False

    def retrieveAllMessages(self, db, messages):
        query = "SELECT `image_txt`, `users_inp` FROM `messages` WHERE `fk_user_ID` = %s"
        args = [messages.get_fk_user_ID()]
        tmp = db.fetchall(query, args)
        
        ret = []

        for row in tmp:
            resp = {}
            resp["image_txt"] = str(row[0])
            resp["users_inp"] = str(row[1])
            ret.append(resp)

        return ret

    def retrieveAllInputs(self, db, messages):
        query = "SELECT `input`, `response` FROM inputs WHERE fk_user_ID = %s AND fk_message_ID = %s"
        args = [messages.get_fk_user_ID(), messages.get_ID()]
        tmp = db.fetchall(query, args)
        
        ret = []

        for row in tmp:
            ret.append({'role': 'user', 'content': str(row[0])})
            ret.append({'role': 'assistant', 'content': str(row[0])})

        return ret

    def createInput(self, db, inputs):
        query = "INSERT INTO `inputs`(`fk_user_ID`, `fk_message_ID`, `input`, `response`) VALUES (%s, %s, %s, %s)"
        args = [inputs.get_fk_user_ID(), inputs.get_fk_message_ID(), inputs.get_input(), inputs.get_response()]
        db.execute(query, args)
        db.commit()

    def removeSession(self, db, sessions):
        query = "UPDATE `sessions` set `is_active` = 0 WHERE `token` = %s and `is_active` = 1"
        args = [sessions.get_token()]
        db.execute(query, args)
        db.commit()