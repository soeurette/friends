var app = angular.module("App", ["ngRoute", "app.home", "app.signup", "app.feeds","app.signin", "app.messenger","app.settings","app.images","app.search","tokenModule"]);

app.config(function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix("");
  $routeProvider.when("/", {
    redirectTo: "/signin"
  }).otherwise({
    redirectTo: "/signin"
  });
});

app.service("AuthSerivce", function($q, $location, tokenService ) {
  this.request = function(config) {
    var token = tokenService.getToken();
    if(token) {
      config.headers = config.headers || {};
      config.headers.Authorization = "Bearer " + token;
    }
    return config;
  };

  this.responseError = function(response) {
    if(response.status == 401) {
      alert("Token is no longer valid");
      $location.path("/signin")
    }
    return $q.reject(response);
  };
});

app.config(function($httpProvider) {
  $httpProvider.interceptors.push("AuthSerivce");
})
