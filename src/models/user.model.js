'user strict';
var dbConn = require('./../../config/db.config');


//user object create
var user = function(user){
    this.nom_user     = user.nom_user;
    this.prenom_user      = user.prenom_user;
    this.email_user         = user.email_user;
    this.password_user         = user.password_user;
    this.equipe_favorite   = user.equipe_favorite;
    this.tel_user    = user.tel_user;



};
user.create = function (newUsr, result) {
    dbConn.query("INSERT INTO user set ?", newUsr, function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            console.log(res.insertId);
            result(null, res.insertId);
        }
    });           
};
user.findById = function (id, result) {
    dbConn.query("Select * from user where id_user = ? ", id, function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            result(null, res);
        }
    });   
};
user.findAll = function (result) {
    dbConn.query("Select * from user", function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            console.log('users : ', res);  
            result(null, res);
        }
    });   
};
user.update = function(id, user, result){
  dbConn.query("UPDATE user SET nom_user=?,prenom_user=?,email_user=?,password_user=?,equipe_favorite=?,tel_user=? WHERE id_user = ?", [user.nom_user,user.prenom_user,user.email_user,user.password_user,user.equipe_favorite,user.tel_user, id], function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }else{   
            result(null, res);
        }
    }); 
};
user.delete = function(id, result){
     dbConn.query("DELETE FROM user WHERE id_user = ?", [id], function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            result(null, res);
        }
    }); 
};



module.exports= user;