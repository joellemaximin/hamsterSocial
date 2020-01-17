const connection = require('./pool');

function Post(){}


Post.prototype = {
    find: function(post = null, callback)
    {


        let sql = `SELECT * FROM posts`;
        connection.query(sql, function(err, rows, result){
            if (!err)
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
        let sql = `INSERT INTO posts(title, body) VALUES(?, ?)`;
        connection.query(sql, bbind, function(err, result){
            if(err) throw err;
            callback(result.insertId)
        
        });
    },
}

module.exports = Post;