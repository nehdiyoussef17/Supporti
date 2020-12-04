'user strict';
var dbConn = require('./../../config/db.config');

//user object create
var accessoire = function(accessoire){
    this.nom_acc     = accessoire.nom_acc;
    this.desc_acc      = accessoire.desc_acc;
    this.prix_acc         = accessoire.prix_acc;
    this.image_acc          = accessoire.image_acc;


};
accessoire.create = function (newUsr, result) {
    dbConn.query("INSERT INTO accessoire set ?", newUsr, function (err, res) {
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
accessoire.findById = function (id, result) {
    dbConn.query("Select * from accessoire where id_acc = ? ", id, function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            result(null, res);
        }
    });
};
accessoire.findAll = function (result) {
    dbConn.query("Select * from accessoire", function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            console.log('accessoires : ', res);
            result(null, res);
        }
    });
};
accessoire.update = function(id, accessoire, result){
    dbConn.query("UPDATE accessoire SET nom_acc=?,desc_acc=?,prix_acc=?,image_acc=? WHERE id_acc = ?", [accessoire.nom_acc,accessoire.desc_acc,accessoire.prix_acc,accessoire.image_acc, id], function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }else{
            result(null, res);
        }
    });
};
accessoire.delete = function(id, result){
    dbConn.query("DELETE FROM accessoire WHERE id_acc = ?", [id], function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            result(null, res);
        }
    });
};

module.exports= accessoire;