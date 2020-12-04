'user strict';
var dbConn = require('./../../config/db.config');

//user object create
var billet = function(billet){
    this.prix_billet     = billet.prix_billet;
    this.matchs      = billet.matchs;

};
billet.create = function (newUsr, result) {
    dbConn.query("INSERT INTO billet set ?", newUsr, function (err, res) {
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
billet.findById = function (id, result) {
    dbConn.query("Select * from billet where id_acc = ? ", id, function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            result(null, res);
        }
    });
};
billet.findAll = function (result) {
    dbConn.query("SELECT billet.prix_billet,equipe.nom_eq FROM billet,matchs,equipe WHERE billet.id_match=matchs.id_matchs AND equipe.id_eq=matchs.id_matchs;", function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            console.log('billets : ', res);
            result(null, res);
        }
    });
};
billet.update = function(id, billet, result){
    dbConn.query("UPDATE billet SET prix_billet=?,matchs=? WHERE id_billet = ?", [billet.prix_billet,billet.matchs, id], function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }else{
            result(null, res);
        }
    });
};
billet.delete = function(id, result){
    dbConn.query("DELETE FROM billet WHERE id_billet = ?", [id], function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            result(null, res);
        }
    });
};

module.exports= billet;