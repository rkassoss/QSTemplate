(function () {
	'use strict';
	/**
	 * Config for QSTemplate angular module.
	 * Handles routes with ui-router
	 */
	angular.module('QSTemplate').config(ngConfig);

	function ngConfig($stateProvider, $urlRouterProvider, $locationProvider) {
		/*$locationProvider.html5Mode({
	        enabled: true,
	        requireBase: false
	    });*/

		$stateProvider.state('home', {
			url: '/',
			templateUrl: 'partials/home/home.controller.html',
			controller: 'HomeController',
			controllerAs: 'vm'
		}).state('sheet', {
			url: '/sheet/:id',
			templateUrl: 'partials/sheet/sheet.controller.html',
			controller: 'SheetController',
			controllerAs: 'vm'
		});

		/* Add New States Above */
		$urlRouterProvider.otherwise('/');
	}
	ngConfig.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];
})();