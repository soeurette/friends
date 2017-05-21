var express = require("express");
var jwt = require("jsonwebtoken");
var config = require("../config.js");
var notificationsRouter = express.Router();

//import models
var notification = require("../models/notifications.js");

//signup




notificationsRouter.get("/", function (req, res) {
    notification.find({
        
    }, function (err, data) {
        if (err) {
            res.status(500).send({
                message: 'internal server error'
            });

        } else {

            res.status(200).send({
                data: data
            });

        }





    })

});




notificationsRouter.get("/:username", function (req, res) {
   
    notification.find({
        to: req.params.username
    }, function (err, data) {
        if (err) {
            res.status(500).send({
                message: 'internal server error'
            });

        } else {

            res.status(200).send({
                data: data
            });

        }





    })

});


notificationsRouter.post("/", function (req, res) {
    var newNotification = new notification(req.body);
    newNotification.save(function (err, nd) {
        if (err) {
            res.status(500).send({
                meassage: 'error'
            });

        } else {
            res.status(200).send({
                data: nd
            });

        }

    })

});


notificationsRouter.delete("/:id", function (req, res) {
    // console.log(req.params.id);
    notification.findOne({
        _id: req.params.id
    }, function (err, data) {
        if (err) {
            res.status(500).send({
                message: 'internal error' + err
            });

        } else if (data == undefined) {

            res.status(404).send({
                message: 'not found'
            });
        } else {
            data.remove(function (err, data) {
                if (err) {
                    res.status(500).send({
                        message: 'internal error' + err
                    });

                } else {

                    res.status(200).send({
                        message: 'removed!'
                    });
                }

            });

        }

    });


});




module.exports = notificationsRouter;
