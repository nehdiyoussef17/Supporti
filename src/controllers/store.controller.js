'use strict';

const store = require('../models/store.model');

exports.findAll = function(req, res) {
    store.findAll(function(err, store) {
        console.log('controller')
        if (err)
            res.send(err);
        console.log('res', store);
        res.send(store);
    });
};


exports.create = function(req, res) {
    const new_user = new store(req.body);

    //handles null error
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        store.create(new_user, function(err, store) {
            if (err)
                res.send(err);
            res.json({error:false,message:"store added successfully!",data:store});
        });
    }
};


exports.findById = function(req, res) {
    store.findById(req.params.id, function(err, store) {
        if (err)
            res.send(err);
        res.json(store);
    });
};


exports.update = function(req, res) {
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        store.update(req.params.id, new store(req.body), function(err, store) {
            if (err)
                res.send(err);
            res.json({ error:false, message: 'store successfully updated' });
        });
    }

};


exports.delete = function(req, res) {
    store.delete( req.params.id, function(err, store) {
        if (err)
            res.send(err);
        res.json({ error:false, message: 'store successfully deleted' });
    });
};