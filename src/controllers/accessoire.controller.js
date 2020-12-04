'use strict';

const accessoire = require('../models/accessoire.model');

exports.findAll = function(req, res) {
    accessoire.findAll(function(err, accessoire) {
        console.log('controller')
        if (err)
            res.send(err);
        console.log('res', accessoire);
        res.send(accessoire);
    });
};


exports.create = function(req, res) {
    const new_user = new accessoire(req.body);

    //handles null error
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        accessoire.create(new_user, function(err, accessoire) {
            if (err)
                res.send(err);
            res.json({error:false,message:"accessoire added successfully!",data:accessoire});
        });
    }
};


exports.findById = function(req, res) {
    accessoire.findById(req.params.id, function(err, accessoire) {
        if (err)
            res.send(err);
        res.json(accessoire);
    });
};


exports.update = function(req, res) {
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        accessoire.update(req.params.id, new accessoire(req.body), function(err, accessoire) {
            if (err)
                res.send(err);
            res.json({ error:false, message: 'accessoire successfully updated' });
        });
    }

};


exports.delete = function(req, res) {
    accessoire.delete( req.params.id, function(err, accessoire) {
        if (err)
            res.send(err);
        res.json({ error:false, message: 'accessoire successfully deleted' });
    });
};