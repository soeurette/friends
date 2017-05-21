var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
    profileImage: {
    type: String,
    required: true
  },
    placeOfbirth:{
        type:String,
        required:true
        },
    
        dateOfbirth:{
        type:Date,
        required:true,
        
        
        
        },
            job:{
        type:String,
        required:true,
        
        
        
        },
    
  privilage: {
    type: String,
    default: "user",
    enum: ["admin", "user"]
  },
    
    followers:{
        type:[String]
    
},
    following:{
        type:[String]
    },
    privateImages:{
        type:[String]
    }

    
    
});

module.exports = mongoose.model("User", userSchema);
