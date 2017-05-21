var app = angular.module("app.search", ["ngRoute", "requestsModule", "privModule", "tokenModule", "authModule","notificationsModule"]);

app.config(function($routeProvider) {
  $routeProvider.when("/search", {
    templateUrl: "/views/search.tpl.html",
    controller: "searchCtrl"
  });
});

app.controller("searchCtrl", function($scope, Service, privService, tokenService,authService,notificationsService, $location) {
    $scope.username = privService.getUser();
  $scope.todoItems = [];
  $scope.userinput = {};
        var tags = [];
    
//  $scope.priv = privService.getPriv();
//  console.log($scope.priv);
        $scope.notifications =[];
    
    

    
$scope.loadConnection = function() {
    
  
    $scope.socket = Service.connect();
    Service.getNotification($scope.socket, function(data) {
          
        if(data.to == $scope.username && data.from!=$scope.username){
   
            
            $scope.notifications.push(data);
            
            $scope.notificationNum = $scope.notifications.length;
            
            console.log($scope.notifications);
            console.log($scope.notificationNum);
            $scope.$apply();

        }
    });
  };
    
    
    
    $scope.getOldNotifications = function(){
        notificationsService.getNotifications($scope.username).then(function(response){
            $scope.oldNotifications = response.data.data;
            console.log($scope.oldNotifications)
            $scope.oldNotificationsNum = $scope.oldNotifications.length;
        },function(err){
            console.log('error')
        })
            
            
        }

          $scope.removeNotification = function(id){
        notificationsService.removeNotification(id).then(function(response){
            $scope.oldNotifications = response.data.data;
            $scope.oldNotificationsNum = $scope.oldNotificationsNum-1;
            $scope.getOldNotifications();
        },function(err){
            console.log('error')
        })
            
            
        } 
    
    
    
    
          $scope.getUsers = function(){
              authService.getUsers().then(function(response){
                  $scope.allUsers = response.data.data;
                  
              },function(error){
                  console.log('error')
              })
          }
    
    

         
        

     
     $scope.follow = function(user){
         authService.addFollower($scope.username,{follower:user}).then(function(response){
             
         }, function(error){
             console.log(error);
         })
     
     }
     
     
     
   
     
       $scope.signout = function() {
           
     tokenService.removeToken();
      privService.removeUser();
      $location.path("/signin");

  }
     
     
     
     
//     $('#postTextArea').keypress(function (event) {
//            if (event.which == 13) {
//                $('#postTextArea').val('');
//                $scope.addPost();
//            }
//        });
  
  
  
  
    
    
});
