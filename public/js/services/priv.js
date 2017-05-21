var app = angular.module("privModule", []);

app.service("privService", function() {
  this.setUser = function(user) {
    localStorage["user"] = user;
  };
  this.getUser = function() {
    return localStorage["user"];
  };
  this.removeUser = function() {
    localStorage.removeItem("user");
  };
});
