var app = angular.module("app.images", ["ngRoute", "requestsModule", "privModule", "tokenModule", "authModule","notificationsModule"]);

app.config(function($routeProvider) {
  $routeProvider.when("/images", {
    templateUrl: "/views/images.tpl.html",
    controller: "imagesCtrl"
  });
});

app.controller("imagesCtrl", function($scope, Service, privService, tokenService,authService,notificationsService, $location) {
    


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
    
    
    
    
    
    
    
    
    
    
    
  $scope.getImages = function(){

        authService.getPrivateImages($scope.username).then(function(response){
            $scope.images = response.data.data.privateImages;
            console.log($scope.images);
            
            
            
        })
    }
  

$scope.addImage = function(){
    authService.addPrivateImage($scope.username , {image:$scope.image}).then(function(response){
        $scope.getImages();
        $scope.image='';
        
        
    }, function(error){
        console.log('error');
        
        
    });
    
    
    
    
    
    
}
    
    $scope.username = privService.getUser(); //get username for each post

    
    
    
    
    
      $scope.getProfileImage  =function(){       //get profile image , dop ,pob and job
            
            authService.getProfileImage($scope.username).then(function(response){
                console.log(response.data.data);
                $scope.i = response.data.data.profileImage;
                $scope.job = response.data.data.job;
                $scope.POB = response.data.data.placeOfbirth;
                var temp = new Date(response.data.data.dateOfbirth);
                $scope.DOB = temp.toLocaleDateString();
                
                
            }, function(response){
                console.log('error in getting user data')
                
            })
            
            
            
            
            
        }



    

  $scope.removeImage = function(image){
  
var data = {image:image};
        authService.removeImage($scope.username,data).then(function(response){
console.log(response);
            $scope.getImages();
            
            
        },function(error){
            console.log(error);
        });
        
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
             Service.emitNotification($scope.socket,privService.getUser(),user,'follow');
            notificationsService.postNotification({from:privService.getUser(),to:user,action:'follow'});
             
             
             
             
             
             $scope.getFollowing();
         }, function(error){
             console.log(error);
         })
     
     }
   
     
               $scope.unfollow = function(user){
  console.log(user);
         authService.unfollow($scope.username,{follower:user}).then(function(response){
             
  
             Service.emitNotification($scope.socket,privService.getUser(),user,'unfollow');
            notificationsService.postNotification({from:privService.getUser(),to:user,action:'unfollow'});
             
             
             $scope.getFollowing();
             
             
         }, function(error){
             console.log(error);
         })
     
     }
     
     
     
           $scope.getFollowing  =function(){      
            
            authService.getProfileImage($scope.username).then(function(response){


             $scope.following = response.data.data.following;
                
            }, function(response){
                console.log('error in getting user data')
                
            })
            

        }
     
           $scope.getFollower  =function(){      
            
            authService.getProfileImage($scope.username).then(function(response){


                 $scope.followers = response.data.data.followers;

                
            }, function(response){
                console.log('error in getting user data')
                
            })
            

        }
  
  
  
  
  
      

    

     


     
       $scope.signout = function() {
           
     tokenService.removeToken();
      privService.removeUser();
      $location.path("/signin");

  }


    

    
    
    
    
});