var app = angular.module("chattingModule", []);

app.service("chattingService", function($http) {
    
      this.connect = function() {
    return io("/");
  };
    
    
      this.getChat = function(socket, onSuc) {
    socket.on("message", function(data) {
      onSuc(data);
    });
  };
    

    
    this.getMessages = function(data){

        return $http.get("http://localhost:8070/chatting/"+data.sender+"/"+data.reciever);
    }
    
    
    
    
  this.postMessage = function(data) {
    return $http.post("http://localhost:8070/chatting/", data);
  };
    
    
     this.emitChat = function(socket,sender,reciever,message) {
         console.log('sender');
    socket.emit("message", {sender:sender,reciever:reciever,message: message});
  };

});
