'use strict';

const equipe = require('../models/equipe.model');

exports.findAll = function(req, res) {
    equipe.findAll(function(err, equipe) {
        console.log('controller')
        if (err)
            res.send(err);
        console.log('res', equipe);
        res.send(equipe);
    });
};


exports.create = function(req, res) {
    const new_equipe = new equipe(req.body);

    //handles null error
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        equipe.create(new_equipe, function(err, equipe) {
            if (err)
                res.send(err);
            res.json({error:false,message:"equipe added successfully!",data:equipe});
        });
    }
};


exports.findById = function(req, res) {
    equipe.findById(req.params.id, function(err, equipe) {
        if (err)
            res.send(err);
        res.json(equipe);
    });
};


exports.update = function(req, res) {
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        equipe.update(req.params.id, new equipe(req.body), function(err, equipe) {
            if (err)
                res.send(err);
            res.json({ error:false, message: 'equipe successfully updated' });
        });
    }

};


exports.delete = function(req, res) {
    equipe.delete( req.params.id, function(err, equipe) {
        if (err)
            res.send(err);
        res.json({ error:false, message: 'equipe successfully deleted' });
    });
    



};