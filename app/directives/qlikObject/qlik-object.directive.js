/**
 * @desc Directive that wraps the a div containing the qlik object
 * @example <div qlik-object="[Object]"></div>
 */
(function () {
	'use strict';

	angular.module('QSTemplate').directive('qlikObject', qlikObject);

	function qlikObject(Qlik) {
		return {
			restrict: 'A',
			templateUrl: 'directives/qlikObject/qlik-object.directive.html',
			replace: true,
			scope: {
				ref: '=qlikObject'
			},
			link: linkFunc,
			controller: QlikObjectController,
			controllerAs: 'vm',
			// Angular > 1.3 lets you bind isolated scope vars
			// to allow two-way binding in the controller
			bindToController: true
		};

		function linkFunc(scope, el, attr, vm) {
			scope.elId = 'Q' + scope.ref.name;

			Qlik.insertObject(el[0], scope.ref.name);
		}
	}
	qlikObject.$inject = ['Qlik'];

	function QlikObjectController($scope, Qlik) {
		var vm = this;

		/* Allocated for future qlik-object to qlik-object communication */
	}
	QlikObjectController.$inject = ['$scope', 'Qlik'];
})();