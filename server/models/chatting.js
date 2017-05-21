var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var chattingSchema = new Schema({
    message:{
    required:true,
    type:String,
},
    sender:{
        required:true,
        type:String,
        
    },
    reciever:{
        required:true,
        type:String
    }
    
    
    



});

module.exports = mongoose.model("chatting", chattingSchema);
