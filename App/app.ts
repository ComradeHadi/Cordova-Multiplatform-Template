﻿module App {
    'use strict';

    angular
        .module('app', [
            'ionic',
            'core',
            'tabs',
            'side',
            'home',
            'actions',
            'buttons'
        ])
        .config(['$httpProvider', httpLoadingInterceptor])
        .run(['$rootScope', '$ionicLoading', httpLoadingInterceptorActions])
        .config(['$compileProvider', function ($compileProvider) {
            $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|file|mailto|ms-appx):/)
        .config(['$stateProvider', '$urlRouterProvider', '$ionicConfigProvider', statesConfiguration]);
    }]);

    window['ionic'].Platform.ready(function() {
        angular.bootstrap(document.querySelector('body'), ['app']);
    });

    // Configure routes
    function statesConfiguration(
        $urlRouterProvider: ng.ui.IUrlRouterProvider,
        $ionicConfigProvider: ionic.utility.IonicConfigProvider
        ): void {

        // force native scroll
        var configProvider: any = $ionicConfigProvider;
        configProvider.scrolling.jsScrolling(false);

        $urlRouterProvider.otherwise('/tabs/home');
    }

    // Configure interceptor
    function httpLoadingInterceptor($httpProvider: ng.IHttpProvider) {
        $httpProvider.interceptors.push(['$rootScope', function ($rootScope) {
            return {
                request: function (config) {
                    $rootScope.$broadcast('loading:show')
                    return config
                },
                response: function (response) {
                    $rootScope.$broadcast('loading:hide')
                    return response
                }
            }
        }])
    }

    // Configure interceptor actions
    function httpLoadingInterceptorActions($rootScope: ng.IRootScopeService, $ionicLoading: ionic.loading.IonicLoadingService) {
        $rootScope.$on('loading:show', function () {
            $ionicLoading.show({ templateUrl: 'modules/tabs/templates/loading.html' })
        })

        $rootScope.$on('loading:hide', function () {
            $ionicLoading.hide()
        })
    }
}