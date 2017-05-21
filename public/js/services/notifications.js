 var app = angular.module("notificationsModule", []);

app.service("notificationsService", function($http) {         
              this.getNotifications = function(username){

        return $http.get("http://localhost:8070/notifications/"+username);
    }
    
    
    
    
  this.postNotification = function(data) {

      if(data.to !=data.from)
    return $http.post("http://localhost:8070/notifications/",data);
  };
    
      this.removeNotification = function(id) {

    return $http.delete("http://localhost:8070/notifications/"+id);
  };
    
    });
