// app.js
// create our angular app and inject ngAnimate and ui-router 
// =============================================================================
var formApp=angular.module('formApp', ['ngAnimate', 'ui.router'])

// configuring our routes 
// =============================================================================
.config(function($stateProvider, $urlRouterProvider) {  
    
    $stateProvider
    
        // route to show our basic form (/form)
        .state('form', {
            url: '/form',
            templateUrl: 'templates/form.html',
            controller: 'formController'
        })
        
        // nested states 
        // each of these sections will have their own view
        // url will be nested (/form/profile)
        .state('form.profile', {
            url: '/profile',
            templateUrl: 'templates/form-profile.html'
        })
        
        // url will be /form/interests
        .state('form.interests', {
            url: '/interests',
            templateUrl: 'templates/form-interest.html'
        })
        
        // url will be /form/payment
        .state('form.payment', {
            url: '/payment',
            templateUrl: 'templates/form-payment.html'
        })
        
        .state('searchByReference', {
            url: '/checkstatus',
            templateUrl: 'templates/searchByReference.html',
            controller: 'formController'
        });
    // catch all route
    // send users to the form page 
    $urlRouterProvider.otherwise('/form/profile');
})
