/**
 * Main AngularJS Web Application
 */
var app = angular.module('responsivePagesApp', [
    'ngRoute'
]);

/**
 * Configure the Routes
 */
app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
    // Home
        .when("/", {templateUrl: "partials/home.html", controller: "PageCtrl"})
        //Pages
        .when("/showall", {templateUrl: "partials/showall.html", controller: "ShowAllCtrl"})
        .when("/create", {templateUrl: "partials/create.html", controller: "CreateCtrl"})
        .when("/edit", {templateUrl: "partials/edit.html", controller: "EditCtrl"})
        .when("/delete", {templateUrl: "partials/delete.html", controller: "DeleteCtrl"})
        // else 404
        .otherwise("/404", {templateUrl: "partials/404.html", controller: "PageCtrl"});
}]);

/**
 * Controls the ShowAll Page
 */
app.controller('ShowAllCtrl', function ( $scope, $location, $http ) {
    console.log("ShowAll Controller reporting for duty.");

    $http.get('data.json').then(function(response) {
        $scope.pages = response.data.ResponsivePages;
        //console.log($scope.pages );
    });

});

/**
 * Controls the CreateNew Page
 */
app.controller('CreateCtrl', function ( $scope, $location, $http ) {
    console.log("Create New Controller reporting for duty.");

});
/*

app.controller('CreateCtrl', ['$scope', 'Page', function($scope, Page) {
    $scope.page = new Page();
    $scope.page.load(1);
    console.log($scope.page.load(1));
}]);

*/

/**
 * Controls the Edit Page
 */
app.controller('EditCtrl', function ( $scope, $location, $http ) {
    console.log("Edit Controller reporting for duty.");
});

/**
 * Controls the Delete Page
 */
app.controller('DeleteCtrl', function ( $scope, $location, $http ) {
    console.log("Delete Controller reporting for duty.");
});


/**
 * Controls all other Pages
 */
app.controller('PageCtrl', function (/* $scope, $location, $http */) {
    console.log("Page Controller reporting for duty.");


});


/*
app.factory('Page', ['$http', function($http) {
    function Page(pageData) {
        if (pageData) {
            this.setData(pageData);
        }
    };
    Page.prototype = {
        setData: function(pageData) {
            angular.extend(this, pageData);
        },
        delete: function() {
            $http.delete('data.json');
        },
        load: function(id) {
            var scope = this;
            $http.get('data.json').success(function(pageData) {
                scope.setData(pageData);
            });
        },
    };
    return Page;
}]);*/
