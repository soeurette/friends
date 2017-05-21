var app = angular.module("app.settings", ["ngRoute", "requestsModule", "privModule", "tokenModule", "authModule"]);

app.config(function($routeProvider) {
  $routeProvider.when("/settings", {
    templateUrl: "/views/settings.tpl.html",
    controller: "settingsCtrl"
  });
});

app.controller("settingsCtrl", function($scope, Service, privService, tokenService,authService, $location) {

  $scope.userInput = {};

    $scope.getInfo  =function(){   
        //get profile image , dop ,pob and job
        $scope.username = privService.getUser();
            authService.getProfileImage(privService.getUser()).then(function(response){
                console.log(response.data.data);
                $scope.i = response.data.data.profileImage;
                $scope.job = response.data.data.job;
                $scope.POB = response.data.data.placeOfbirth;
                $scope.DOB = response.data.data.dateOfbirth;
                
                
                
                
            }, function(response){
                console.log('error in getting user data')
                
            })
            
        }
    
    
        $scope.update = function(){
        var data = {username : $scope.username, profileImage:$scope.i, job:$scope.job, placeOfbirth: $scope.POB}
                  authService.updateInfo(privService.getUser(), data).then(function(response){
                      alert('updated successfully , please signin again')
                   tokenService.removeToken();
      privService.removeUser();
      $location.path("/signin");

                
                
                
                
            }, function(error){
                      console.log('error'+error)
                      
                  });
        }
        
        
            $scope.Home = function(){
         $location.path("/feeds")
     }
        
    
    

    
    
    
    
});