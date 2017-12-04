/*global QlikConnect*/
(function () {
	'use strict';

	angular.module('QSTemplate').controller('HomeController', HomeCtrl);

	function HomeCtrl(Qlik) {
		var vm = this;
		vm.message = 'Application for ID:' + Qlik.config.app;
	}
	HomeCtrl.$inject = ['Qlik'];
})();