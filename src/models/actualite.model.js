'user strict';
var dbConn = require('./../../config/db.config');

//user object create
var actualite = function(actualite){
    this.titre_act     = actualite.titre_act;
    this.contenu_act      = actualite.contenu_act;
    this.date_act = actualite.date_act;
    this.id_equipe = actualite.id_equipe;
    this.id_user = actualite.id_user;
};
actualite.create = function (newUsr, result) {
    dbConn.query("INSERT INTO actualite set ?", newUsr, function (err, res) {
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
actualite.findById = function (id, result) {
    dbConn.query("Select * from actualite where id_act = ? ", id, function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            result(null, res);
        }
    });
};
actualite.findAll = function (result) {
    dbConn.query("SELECT * FROM actualite", function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            console.log('actualites : ', res);
            result(null, res);
        }
    });
};
actualite.update = function(id, actualite, result){
    dbConn.query("UPDATE actualite SET titre_act=?,contenu_act=?,date_act=?,id_equipe=?,id_user=? WHERE id_act = ?", [actualite.titre_act,actualite.contenu_act,actualite.date_act,actualite.id_equipe,actualite.id_user, id], function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }else{
            result(null, res);
        }
    });
};
actualite.delete = function(id, result){
    dbConn.query("DELETE FROM actualite WHERE id_act = ?", [id], function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            result(null, res);
        }
    });
};

module.exports= actualite;