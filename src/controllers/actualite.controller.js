'use strict';

const actualite = require('../models/actualite.model');

exports.findAll = function(req, res) {
    actualite.findAll(function(err, actualite) {
        console.log('controller')
        if (err)
            res.send(err);
        console.log('res', actualite);
        res.send(actualite);
    });
};


exports.create = function(req, res) {
    const new_user = new actualite(req.body);

    //handles null error
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        actualite.create(new_user, function(err, actualite) {
            if (err)
                res.send(err);
            res.json({error:false,message:"actualite added successfully!",data:actualite});
        });
    }
};


exports.findById = function(req, res) {
    actualite.findById(req.params.id, function(err, actualite) {
        if (err)
            res.send(err);
        res.json(actualite);
    });
};


exports.update = function(req, res) {
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        actualite.update(req.params.id, new actualite(req.body), function(err, actualite) {
            if (err)
                res.send(err);
            res.json({ error:false, message: 'actualite successfully updated' });
        });
    }

};


exports.delete = function(req, res) {
    actualite.delete( req.params.id, function(err, actualite) {
        if (err)
            res.send(err);
        res.json({ error:false, message: 'actualite successfully deleted' });
    });
};