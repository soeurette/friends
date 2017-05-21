var express = require("express");
var apiRouter = express.Router();

//import models
var data = require("../models/posts.js");

//import middleware
var userRouter = require("../middleware/userMiddle.js");
var adminPriv = require("../middleware/adminPriv.js");

apiRouter.use(userRouter);

//apiRouter.get("/", function(req, res) {
//  if(req.body.privilage == "admin") {
//    Todo.find({}, function(err, data) {
//      if(err) {
//        res.status(500).send({"message": "Err", err: err});
//      } else {
//        res.status(200).send({"message": "Here is the data", data: data});
//      }
//    });
//  } else {
//    Todo.find({username: req.body.username}, function(err, data) {
//      if(err) {
//        res.status(500).send({"message": "Err", err: err});
//      } else {
//        res.status(200).send({"message": "Here is the data", data: data});
//      }
//    });
//  }
//});


apiRouter.get("/", function (req, res) {  
    
    data.find({}, function (err, data) { //get user's posts
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

apiRouter.get("/:username", function (req, res) {  
    
    data.find({username: req.params.username}, function (err, data) { //get user's posts
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




apiRouter.get("/comments/:id", function (req, res) {
    data.findOne({
        _id: req.params.id
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

apiRouter.post("/", function (req, res) {
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


apiRouter.post("/:id", function (req, res) { 
    var comment = req.body;
    data.findOne({
        _id: req.params.id
    }, function (err, d) {
        if (err) {
            res.status(500).send({
                message: 'error'
            });

        } else {
            d.comments.push(comment);
            d.save(function (err, data) {
                if (err) {
                    res.status(500).send({
                        message: 'error'
                    });


                } else {
                    res.status(200).send({
                        'data': data
                    });
                }

            });


        }


    })
});

apiRouter.post("/addLiker/:id", function (req, res) {
    
    var liker = req.body.liker;
    
    data.findOne({
        _id: req.params.id
    }, function (err, d) {
        if (err) {
            res.status(500).send({
                message: 'error'
            });

        }
        else if(d.likers.indexOf(liker)!=-1){
             res.status(500).send({
                        message: 'error cannot like twice!!'
                    });
            
        }
        
              else if(d.disLikers.indexOf(liker)!=-1){
             res.status(500).send({
                        message: 'error you cannt like a post did you dislike it before!!'
                    });
            
        }
        
        else {
            d.likers.push(liker);
            d.save(function (err, data) {
                if (err) {
                    res.status(500).send({
                        message: 'error'
                    });


                } else {
                    console.log('llllllllllllllllllllllllllllllllllllllll');
                    console.log(d);
                    res.status(200).send({
                        'data': data
                    });
                }

            });


        }


    })
});


apiRouter.post("/addDisLiker/:id", function (req, res) { 
    var disLiker = req.body.disLiker;
    data.findOne({
        _id: req.params.id
    }, function (err, d) {
        if (err) {
            res.status(500).send({
                message: 'error'
            });

        } 
        
           else if(d.disLikers.indexOf(disLiker)!=-1){
             res.status(500).send({
                        message: 'error cannot disLike twice!!'
                    });
            
        }
        
        else if(d.likers.indexOf(disLiker)!=-1){
             res.status(500).send({
                        message: 'error you cannt dislike a post did you like it before!!'
                    });
            
        }
        
        else {
            d.disLikers.push(disLiker);
            d.save(function (err, data) {
                if (err) {
                    res.status(500).send({
                        message: 'error'
                    });


                } else {
                    res.status(200).send({
                        'data': data
                    });
                }

            });


        }


    })
});

apiRouter.put("/:id", function (req, res) {
  console.log(req.body);
    data.findOne({
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
            
                data['likes'] = req.body['likes'];
            data['disLikes'] = req.body['disLikes'];
            data['post'] = req.body['post'];
                





            data.save();
            res.status(200).send({
                updatedData: data
            })


        }

    });


});



//apiRouter.use(adminPriv);

apiRouter.delete("/:id", function (req, res) {
    // console.log(req.params.id);
    data.findOne({
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


}); //dont need to save after remove

module.exports = apiRouter;
