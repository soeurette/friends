var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var socket = require("socket.io");
var ejs = require("ejs");
var path = require("path");
var expressJwt = require("express-jwt");

//import config
var config = require("./config.js");

//get port number
var port = process.env.Port || 8070;

//setup mongoose connection
mongoose.connect('mongodb://localhost/posts');

//setup base express app
var app = express();

//
var server = app.listen(port);
var io = socket(server);

//setup app to handle json
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//setup static files
app.use(express.static(path.join(__dirname + "/../public")));
app.set("views", __dirname + "/../public/views");

//setup server to handle html
app.engine("html", ejs.renderFile);
app.set("view engine", "ejs");

//import routes
var apiRouter = require("./routes/api.js");
var fileRouter = require("./routes/file.js");
var authRouter = require("./routes/auth.js");
var chattingRouter = require("./routes/chatting.js");
var notificationsRouter = require("./routes/notifications.js");


app.use("/posts", expressJwt({"secret": config.secret}));

app.use("/auth", authRouter);
app.use("/posts", apiRouter);
app.use('/chatting', chattingRouter);
app.use('/notifications', notificationsRouter);
app.use("/", fileRouter);



io.on("connection", function(socket) {
//  io.emit("message", {"user": "Server", "message": "You have logged on to chat room"});
  socket.on("message", function(data) {
    console.log(data);
    console.log("I am getting a message");
    io.emit("message", {"sender": data.user, "reciever":data.reciever, "message": data.message});
  });
    
      socket.on("notification", function(data) {
    console.log(data);
io.emit("notification", {"from":data.from , "to":data.to , "action":data.action , "post":data.post});
  })
    
    
    
    
});





//app.listen(port, function() {
//  console.log("I am listening on port " + port);
//});
