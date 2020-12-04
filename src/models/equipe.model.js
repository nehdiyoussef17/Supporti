'user strict';
var dbConn = require('./../../config/db.config');


//user object create
var equipe = function(equipe){
    this.id_eq    = equipe.id_eq;
    this.nom_eq      = equipe.nom_eq;
    this.logo_eq         = equipe.logo_eq;




};
equipe.create = function (newUsr, result) {
    dbConn.query("INSERT INTO equipe set ?", newUsr, function (err, res) {
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
equipe.findById = function (id, result) {
    dbConn.query("Select * from equipe where id_eq = ? ", id, function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            result(null, res);
        }
    });
};
equipe.findAll = function (result) {
    dbConn.query("Select * from equipe", function (err, res) {
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
equipe.update = function(id, equipe, result){
    dbConn.query("UPDATE equipe SET nom_eq=?,logo_eq=? WHERE id_eq = ?", [equipe.nom_eq,equipe.logo_eq, id], function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }else{
            result(null, res);
        }
    });
};
equipe.delete = function(id, result){
    dbConn.query("DELETE FROM equipe WHERE id_eq = ?", [id], function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            result(null, res);
        }
    });
};



module.exports= equipe;