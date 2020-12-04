'use strict';

const match = require('../models/match.model');

exports.findAll = function(req, res) {
    match.findAll(function(err, match) {
        console.log('controller')
        if (err)
            res.send(err);
        console.log('res', match);
        res.send(match);
    });
};


exports.create = function(req, res) {
    const new_user = new match(req.body);

    //handles null error
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        match.create(new_user, function(err, match) {
            if (err)
                res.send(err);
            res.json({error:false,message:"match added successfully!",data:match});
        });
    }
};


exports.findById = function(req, res) {
    match.findById(req.params.id, function(err, match) {
        if (err)
            res.send(err);
        res.json(match);
    });
};


exports.update = function(req, res) {
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        match.update(req.params.id, new match(req.body), function(err, match) {
            if (err)
                res.send(err);
            res.json({ error:false, message: 'match successfully updated' });
        });
    }

};


exports.delete = function(req, res) {
    match.delete( req.params.id, function(err, match) {
        if (err)
            res.send(err);
        res.json({ error:false, message: 'match successfully deleted' });
    });
};