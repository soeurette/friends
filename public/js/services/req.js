var app = angular.module("requestsModule", []);
app.service("Service", function ($http) {
    this.connect = function () {
        return io("/");
    };
    this.getNotification = function (socket, onSuc) {
        socket.on("notification", function (data) {
            onSuc(data);
        });
    };
    this.emitNotification = function (socket, from, to, action, post) {
        socket.emit("notification", {
            from: from
            , to: to
            , action: action
            , post: post
        });
    };
    this.getUserPosts = function (username) {
        return $http.get("http://localhost:8070/posts/" + username);
    }
    this.getAllUsersPosts = function () {
        return $http.get("http://localhost:8070/posts/");
    }
    this.getComments = function (id) {
        return $http.get("http://localhost:8070/posts/comments/" + id);
    }
    this.addPost = function (data) {
        return $http.post("http://localhost:8070/posts/", data)
    }
    this.deleteData = function (id) {
        return $http.delete("http://localhost:8070/posts/" + id)
    }
    this.updatePost = function (id, data) {
        return $http.put("http://localhost:8070/posts/" + id + '/', data);
    }
    this.likeDisLike = function (id, data) {
        return $http.put("http://localhost:8070/posts/" + id + '/', data);
    }
    this.addComment = function (id, data) {
        return $http.post("http://localhost:8070/posts/" + id + '/', data);
    }
    this.addLiker = function (id, data) {

        return $http.post("http://localhost:8070/posts/addLiker/" + id + '/', data);
    }
    this.addDisLiker = function (id, data) {
        return $http.post("http://localhost:8070/posts/addDisLiker/" + id + '/', data);
    }
});