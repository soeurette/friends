var mongoose = require('mongoose');
var schema = mongoose.Schema;
var notificationsSchema = new schema({
    from: String,
    to: String,
    action:String,
    post:String,

    
    
});
module.exports=mongoose.model("Notifications",notificationsSchema);