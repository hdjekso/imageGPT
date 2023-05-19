import mysql.connector as MySQL

class DatabaseQuery:

    def createUser(self, db, users):
        query = "INSERT INTO `users`(`fname`, `lname`, `email`, `username`, `password`) VALUES (%s, %s, %s, %s, %s)"
        args = [users.get_fname(), users.get_lname(), users.get_email(), users.get_username(), users.get_password_hash()]
        db.execute(query, args)
        db.commit()