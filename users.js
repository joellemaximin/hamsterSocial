const connection = require('./pool');

function User(){}


User.prototype = {
    find: function(user = null, callback)
    {
        if(user){
            var field = Number.isInteger(user) ? 'id' : 'username';
        }

        let sql = `SELECT * FROM users WHERE ${field} = ?`;
        connection.query(sql, user, function(err, result){
            if(err) throw err;
            if (result.length) {
               callback(result[0])
            }
        });
    },

    create : function(body, callback)
    {
        var bbind = [];
        for(prop in body ){
            bbind.push(body[prop]);
        }
        let sql = `INSERT INTO users(username) VALUES(?)`;
        connection.query(sql, bbind, function(err, result){
            if(err) throw err;
            callback(result.insertId)
        
        });
    },

    login : function(username, callback)
    {
        // find the user data by his username.
        this.find(username, function(user) {
            // if there is a user by this username.
            if(user) {
                
                // return his data.
                callback(user);
                return;
            
            }
            // if the username is wrong then we return null.
            callback(null);
        });
        
    }

}

module.exports = User;