'user strict';
var dbConn = require('./../../config/db.config');

//user object create
var match = function(match){
    this.equipe1     = match.equipe1;
    this.equipe2      = match.equipe2;
    this.date_matchs     = match.date_matchs;
    this.billets_restants      = match.billets_restants;

};
match.create = function (newUsr, result) {
    dbConn.query("INSERT INTO `match` set ?", newUsr, function (err, res) {
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
match.findById = function (id, result) {
    dbConn.query("SELECT * FROM `match` WHERE id_matchs = ? ", id, function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            result(null, res);
        }
    });
};
match.findAll = function (result) {
    dbConn.query("SELECT * FROM `match`", function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            console.log('match : ', res);
            result(null, res);
        }
    });
};
match.update = function(id, match, result){
    dbConn.query("UPDATE `match` SET equipe1=?,equipe2=?,date_matchs=?,billets_restants=? WHERE id_matchs = ?", [match.equipe1,match.equipe2,match.date_matchs,match.billets_restants, id], function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }else{
            result(null, res);
        }
    });
};
match.delete = function(id, result){
    dbConn.query("DELETE FROM `match` WHERE id_matchs = ?", [id], function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            result(null, res);
        }
    });
};

module.exports= match;