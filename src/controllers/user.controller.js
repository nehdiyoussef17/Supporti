'use strict';

const user = require('../models/user.model');

exports.findAll = function(req, res) {
  user.findAll(function(err, user) {
    console.log('controller')
    if (err)
    res.send(err);
    console.log('res', user);
    res.send(user);
  });
};


exports.create = function(req, res) {
    const new_user = new user(req.body);

    //handles null error 
   if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        user.create(new_user, function(err, user) {
            if (err)
            res.send(err);
            res.json({error:false,message:"user added successfully!",data:user});
        });
    }
};


exports.findById = function(req, res) {
    user.findById(req.params.id, function(err, user) {
        if (err)
        res.send(err);
        res.json(user);
    });
};


exports.update = function(req, res) {
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        user.update(req.params.id, new user(req.body), function(err, user) {
            if (err)
            res.send(err);
            res.json({ error:false, message: 'user successfully updated' });
        });
    }
  
};


exports.delete = function(req, res) {
  user.delete( req.params.id, function(err, user) {
    if (err)
    res.send(err);
    res.json({ error:false, message: 'user successfully deleted' });
  });
};