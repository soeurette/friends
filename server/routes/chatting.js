var express = require("express");
var chattingRouter = express.Router();

//import models
var data = require("../models/chatting.js");

//import middleware
var userRouter = require("../middleware/userMiddle.js");
var adminPriv = require("../middleware/adminPriv.js");

//chattingRouter.use(userRouter);






chattingRouter.get("/:sender/:reciever", function(req, res) {  
 console.log(req.params);
    data.find({
        $or: [
          {"sender": req.params.sender, "reciever": req.params.reciever },
          {"sender": req.params.reciever, "reciever": req.params.sender}
      ]
        
        
        
    }, function (err, data) { //get user's posts
        if (err) {
            res.status(500).send({
                message: 'internal server error'
            });

        } else {

            res.status(200).send({
                data: data
            });

        }





    });


});









chattingRouter.post("/", function (req, res) {
    var newData = new data(req.body);
    newData.save(function (err, nd) {
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






//apiRouter.use(adminPriv);

//apiRouter.delete("/:id", function (req, res) {
//    // console.log(req.params.id);
//    data.findOne({
//        _id: req.params.id
//    }, function (err, data) {
//        if (err) {
//            res.status(500).send({
//                message: 'internal error' + err
//            });
//
//        } else if (data == undefined) {
//
//            res.status(404).send({
//                message: 'not found'
//            });
//        } else {
//            data.remove(function (err, data) {
//                if (err) {
//                    res.status(500).send({
//                        message: 'internal error' + err
//                    });
//
//                } else {
//
//                    res.status(200).send({
//                        message: 'removed!'
//                    });
//                }
//
//
//            });
//
//        }
//
//    });
//
//
//}); //dont need to save after remove

module.exports = chattingRouter;
