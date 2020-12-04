'use strict';

const billet = require('../models/billet.model');

exports.findAll = function(req, res) {
    billet.findAll(function(err, billet) {
        console.log('controller')
        if (err)
            res.send(err);
        console.log('res', billet);
        res.send(billet);
    });
};


exports.create = function(req, res) {
    const new_user = new billet(req.body);

    //handles null error
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        billet.create(new_user, function(err, billet) {
            if (err)
                res.send(err);
            res.json({error:false,message:"billet added successfully!",data:billet});
        });
    }
};


exports.findById = function(req, res) {
    billet.findById(req.params.id, function(err, billet) {
        if (err)
            res.send(err);
        res.json(billet);
    });
};


exports.update = function(req, res) {
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        billet.update(req.params.id, new billet(req.body), function(err, billet) {
            if (err)
                res.send(err);
            res.json({ error:false, message: 'billet successfully updated' });
        });
    }

};


exports.delete = function(req, res) {
    billet.delete( req.params.id, function(err, billet) {
        if (err)
            res.send(err);
        res.json({ error:false, message: 'billet successfully deleted' });
    });
};