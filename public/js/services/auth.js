var app = angular.module("authModule", []);
app.service("authService", function ($http) {
    this.getProfileImage = function (username) {
        return $http.get("http://localhost:8070/auth/" + username);
    }
    this.getUsers = function () {
        return $http.get("http://localhost:8070/auth/");
    }
    this.postSignup = function (data) {
        return $http.post("http://localhost:8070/auth/signup", data);
    };
    this.postSignin = function (data) {
        return $http.post("http://localhost:8070/auth/signin", data);
    };
    this.updateInfo = function (username, data) {
        return $http.put("http://localhost:8070/auth/" + username + '/', data);
    }
    this.follow = function (username, data) {
        return $http.post("http://localhost:8070/auth/" + username + '/', data);
    }
    this.addPrivateImage = function (username, data) {
        return $http.post("http://localhost:8070/auth/addImage/" + username+'/', data);
    }
    this.getPrivateImages = function (username) {
        return $http.get("http://localhost:8070/auth/" + username);
    }
    this.removeImage = function (username,data) {
              
        return $http.put("http://localhost:8070/auth/removeImage/"+username,data);
 
    }
    
     this.addFollower = function (username, data) {
        return $http.post("http://localhost:8070/auth/addfollower/" + username+'/', data);
    }
     
    this.unfollow = function (username, data) {
        console.log(data);
        return $http.post("http://localhost:8070/auth/unfollow/" + username+'/', data);
    }
    
});