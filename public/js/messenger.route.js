var app = angular.module("app.messenger", ["ngRoute", "authModule", "tokenModule","privModule","chattingModule"]);

app.config(function($routeProvider) {
  $routeProvider.when("/messenger", {
    templateUrl: "/views/messenger.tpl.html",
    controller: "messengerCtrl"
  });
});

app.controller("messengerCtrl", function($scope, authService, $location, tokenService, privService, chattingService) {
    
    //chatting jquery
    $('.chat[data-chat=person2]').addClass('active-chat');
$('.person[data-chat=person2]').addClass('active');

$('.left .person').mousedown(function(){
    if ($(this).hasClass('.active')) {
        return false;
    } else {
        var findChat = $(this).attr('data-chat');
        var personName = $(this).find('.name').text();
        $('.right .top .name').html(personName);
        $('.chat').removeClass('active-chat');
        $('.left .person').removeClass('active');
        $(this).addClass('active');
        $('.chat[data-chat = '+findChat+']').addClass('active-chat');
    }
});
      $scope.socket = {};
    $scope.messages = [];
    $scope.username = privService.getUser();
          $scope.loadConnection = function() {
    $scope.socket = chattingService.connect();
    chattingService.getChat($scope.socket, function(data) {
        console.log('new data');
      console.log(data);
      $scope.messages.push(data);
      $scope.$apply();
    });
  };

    
    
    //chatting jquery

    $scope.getUsers = function(){
        authService.getUsers().then(function(response){
           $scope.users= response.data.data;
            console.log($scope.users);
            
        },function(response){
            
        })
        
    }

    
    
    
    
    
    var message;
    $scope.getselectedUser=function(selectedusername){
        
        $scope.selectedUser = selectedusername;
        
        message = {sender:$scope.username,reciever:selectedusername};
        
        $scope.getMessages(message);
         var element = document.getElementById("t");
    element.scrollTop = element.scrollHeight; //make scroll on bottom after sending new message 
    }
    

    
    $scope.getMessages = function(message){
        chattingService.getMessages(message).then(function(response){
            
        $scope.oldMessages = response.data.data;
      
//            if($scope.messages.sender== message.sender){
//                alert(message.sender)
//                $scope.senderMessages = response.data.data;
//            }
//            else{
//                $scope.recieverMessages = response.data.data;
//                console.log($scope.recieverMessages);
//            }
            
            
        });
        
        
    }
    
    $scope.sendMessage = function(){
        message.message = $scope.message;
        console.log(message);
        chattingService.postMessage(message).then(function(response){ chattingService.emitChat($scope.socket,message.sender,message.reciever,message.message);
 var element = document.getElementById("t");
    element.scrollTop = element.scrollHeight; //make scroll on bottom after sending new message 
                     $scope.message = "";
//            $scope.messages.push(message);
            console.log($scope.messages);
            
        })
        
    }

});
