'user strict';
var dbConn = require('./../../config/db.config');

//user object create
var store = function(store){
    this.nom_store     = store.nom_store;
    this.id_eq      = store.id_eq;

};
store.create = function (newUsr, result) {
    dbConn.query("INSERT INTO store set ?", newUsr, function (err, res) {
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
store.findById = function (id, result) {
    dbConn.query("Select * from store where id_store = ? ", id, function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            result(null, res);
        }
    });
};
store.findAll = function (result) {
    dbConn.query("SELECT store.nom_store,equipe.nom_eq FROM store,equipe WHERE store.id_eq=equipe.id_eq", function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            console.log('stores : ', res);
            result(null, res);
        }
    });
};
store.update = function(id, store, result){
    dbConn.query("UPDATE store SET nom_store=?,id_eq=? WHERE id_store = ?", [store.nom_store,store.id_eq, id], function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }else{
            result(null, res);
        }
    });
};
store.delete = function(id, result){
    dbConn.query("DELETE FROM store WHERE id_store = ?", [id], function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            result(null, res);
        }
    });
};

module.exports= store;