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
        .when("/delete", {templateUrl: "partials/delete.html", controller: "DeleteCtrl"})
        .when("/edit", {templateUrl: "partials/edit.html", controller: "EditCtrl"})
        // else 404
        .otherwise("/404", {templateUrl: "partials/404.html", controller: "PageCtrl"});
}]);

/**
 * Controls the ShowAll Page
 */
app.controller('ShowAllCtrl', function ( $scope, $location, $http ) {

    $http.get('http://pagesmanagement.azurewebsites.net/api/ResponsivePages').then(function(response) {
           $scope.pages = response.data;
    });

});

/**
 * Controls the CreateNew Page
 */
app.controller('CreateCtrl', function ( $scope, $location, $http ) {


    $scope.submitForm = function() {
        var formData = $scope.page;


        if ( formData.description == null ) {
            formData.description = '';
        }
        if (  formData.isActive == null ) {
            formData.isActive = 'true';
        }
        if (  formData.publishedOn == null ) {

            var today = new Date();
            var dd = today.getDate();
            var mm = today.getMonth()+1; //January is 0!

            var yyyy = today.getFullYear();
            if(dd<10){
                dd='0'+dd;
            }
            if(mm<10){
                mm='0'+mm;
            }

            var hour = today.getHours();
            var min = today.getMinutes();
            var sec = today.getSeconds();

            var today = yyyy +'-' + mm + '-' + dd + 'T' + hour + ':' + min + ':' + sec;

            formData.publishedOn = today;
        }

        $http.post(
            'http://pagesmanagement.azurewebsites.net/api/ResponsivePages',
            JSON.stringify(formData),
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        ).then(function(formData) {
            $scope.page = formData;

            //jQuery('form')[0].reset();

            var html = '<div class="alert alert-success" role="alert"><strong>Success! </strong>New Responsive Page with ID ' + formData.data.id +' was created successfully!</div>';
            jQuery('form').prepend(html);

        }), function (error) {
            var html = '<div class="alert alert-danger" role="alert">Something went wrong. Please try again.</div>';
            jQuery('form').prepend(html);
        };

        setTimeout(function(){ jQuery('form .alert').remove() }, 4000);

    };

});



/**
 * Controls the Delete Page
 */
app.controller('DeleteCtrl', function ( $scope, $location, $http ) {
    console.log("Delete Controller reporting for duty.");

    $scope.submitForm = function() {
        var formData = $scope.page;

        console.log('http://pagesmanagement.azurewebsites.net/api/ResponsivePages/'+formData.id);
        var url = 'http://pagesmanagement.azurewebsites.net/api/ResponsivePages/'+formData.id;

        $http.delete(url).then(function (response) {
            //console.log('all is good', response.data);

            var html = '<div class="alert alert-success" role="alert"><strong>Success! </strong>Responsive Page ' + formData.id + ' was deleted successfully!</div>';
            jQuery('form').prepend(html);

        }, function (error) {
            console.log('an error occurred', error.data);

            var html = '<div class="alert alert-danger" role="alert">Something went wrong. The ID ' + formData.id + ' does not exist.</div>';
            jQuery('form').prepend(html);
        });

        setTimeout(function(){ jQuery('form .alert').remove() }, 4000);

    };
});



/**
 * Controls the Edit Page
 */
app.controller('EditCtrl', function ( $scope, $location, $http ) {

    $scope.show = false;

    $scope.submitForm = function() {
        var formData = $scope.page;

        var url = 'http://pagesmanagement.azurewebsites.net/api/ResponsivePages/' + formData.id;

        $http.get(url).then(function(response) {
            //open form to edit page with given ID
            $scope.show = true;

            var html = '<div class="alert alert-success" role="alert"><strong>Edit</strong> Responsive Page ' + formData.id + '.</div>';
            jQuery('form.submitId').prepend(html);

            $scope.pages = response.data;

        }, function (error) {
            console.log(error);
            var html = '<div class="alert alert-danger" role="alert">Something went wrong. ID '+ formData.id + ' does not exist.</div>';
            jQuery('form.submitId').prepend(html);

        });

        setTimeout(function(){ jQuery('form.submitId .alert').remove() }, 4000);
    };


    $scope.editForm = function() {
        var formData = $scope.page;

        if ( formData.description == null ) {
            formData.description = '';
        }
        if (  formData.isActive == null ) {
            formData.isActive = 'true';
        }
        if (  formData.publishedOn == null ) {

            var today = new Date();
            var dd = today.getDate();
            var mm = today.getMonth()+1; //January is 0!

            var yyyy = today.getFullYear();
            if(dd<10){
                dd='0'+dd;
            }
            if(mm<10){
                mm='0'+mm;
            }

            var hour = today.getHours();
            var min = today.getMinutes();
            var sec = today.getSeconds();

            var today = yyyy +'-' + mm + '-' + dd + 'T' + hour + ':' + min + ':' + sec;

            formData.publishedOn = today;
        }

        var url = 'http://pagesmanagement.azurewebsites.net/api/ResponsivePages/' + formData.id;

        $http.put(url, formData)
            .then(
                function(response){
                    var html = '<div class="alert alert-success" role="alert"><strong>Success! </strong> Responsive Page ' + formData.id + ' edited succcessfully!</div>';
                    jQuery('form.editId').prepend(html);
                },
                function(response){
                    var html = '<div class="alert alert-danger" role="alert">Something went wrong. Please try again.</div>';
                    jQuery('form.editId').prepend(html);
                }
            );

        setTimeout(function(){ jQuery('form.editId .alert').remove() }, 4000);
    }


});


/**
 * Controls all other Pages
 */
app.controller('PageCtrl', function (/* $scope, $location, $http */) {
    console.log("Page Controller reporting for duty.");
});



