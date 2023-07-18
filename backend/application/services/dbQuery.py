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

    def retrieveConvoId(self, db, conversations):
        query = "SELECT `ID` FROM `conversations` WHERE `conversation_token` = %s AND `fk_user_ID` = %s LIMIT 1"
        args = [conversations.get_conversation_token(), conversations.get_fk_user_ID()]
        ret = db.fetchone(query, args)
        
        if ret: return ret[0]
        return None

    def createConversation(self, db, conversations):
        query = "INSERT INTO `conversations`(`fk_user_ID`, `conversation_token`) VALUES (%s, %s)"
        args = [conversations.get_fk_user_ID(), conversations.get_conversation_token()]
        db.execute(query, args)
        db.commit()

    def authenticateSession(self, db, sessions):
        query = "SELECT EXISTS(SELECT `token` FROM `sessions` WHERE `token` = %s AND `is_active` = 1)"
        args = [sessions.get_token()]
        ret = db.fetchone(query, args)

        if ret[0] == 1: 
            return True
            
        return False

    def retrieveAllConversations(self, db, sessions):
        #query = "SELECT `conversation_token`, `ID` FROM `conversations` WHERE `fk_user_ID` = %s"
        query = "SELECT conversations.conversation_token, dialogues.usr_content, dialogues.gpt_content FROM conversations INNER JOIN dialogues ON conversations.id = dialogues.fk_conversation_ID WHERE conversations.fk_user_ID = %s AND conversations.is_active = 1 AND dialogues.is_active = 1"
        args = [sessions.get_fk_user_ID()]
        tmp = db.fetchall(query, args)
        
        ret = []

        for row in tmp:
            resp = {}
            resp["conversation_token"] = str(row[0])

            first_dialogue = [{'role': 'user', 'content': row[1]}, {'role': 'assistant', 'content': row[2]}]
            resp["first_dialogue"] = first_dialogue

            ret.append(resp)

        return ret

    def retrieveAllDials(self, db, conversations):
        query = "SELECT `usr_content`, `gpt_content` FROM `dialogues` WHERE fk_user_ID = %s AND fk_conversation_ID = %s"
        args = [conversations.get_fk_user_ID(), conversations.get_ID()]
        tmp = db.fetchall(query, args)
        
        ret = []

        ret.append({'role': 'system', 'content': 'You are a helpful assistant.'})

        for row in tmp:
            ret.append({'role': 'user', 'content': str(row[0])})
            ret.append({'role': 'assistant', 'content': str(row[1])})

        return ret

    def createDial(self, db, dialogues):
        query = "INSERT INTO `dialogues`(`fk_user_ID`, `fk_conversation_ID`, `usr_content`, `gpt_content`) VALUES (%s, %s, %s, %s)"
        args = [dialogues.get_fk_user_ID(), dialogues.get_fk_conversation_ID(), dialogues.get_usr_content(), dialogues.get_gpt_content()]
        db.execute(query, args)
        db.commit()

    def removeSession(self, db, sessions):
        query = "UPDATE `sessions` set `is_active` = 0 WHERE `token` = %s and `is_active` = 1"
        args = [sessions.get_token()]
        db.execute(query, args)
        db.commit()