/**
 * @desc Navigation for the application that contains a list of an app's sheets
 * @example <qlik-sheet-nav></qlik-sheet-nav> or <div qlik-sheet-nav></div>
 */
(function () {
	'use strict';

	angular.module('QSTemplate').directive('qlikSheetNav', sheetNav);

	function sheetNav() {
		return {
			restrict: 'EA',
			templateUrl: 'directives/qlikSheetNav/qlik-sheet-nav.directive.html',
			scope: {},
			replace: true,
			controller: QlikSheetController,
			controllerAs: 'vm',
			bindToController: true
		};
	}

	function QlikSheetController(Qlik) {
		var vm = this;

		var delimiter = '-';
		var groups = [];

		vm.sheets = [];

		init();

		function init() {
			Qlik.getSheet().then(function (list) {
				vm.sheets = list;
				/* 
    // Started Implementation of sub menus
       for (var i = 0, len = list.length; i < len; i++) {
       	var subs = list[i].qData.title.split(delimiter);
       		if (subs.length > 1) {
       		// Trim all strings in array
       		var tsubs = subs.map(Function.prototype.call, String.prototype.trim);
       		for (var j = 0, tlen = list.length; j < tlen; j++) {
       			if (groups.indexOf(tsubs[0]) > -1) {} else {
       				groups.push(tsubs[0]);
       			}
       		}
       	} else {
       		vm.sheets.push({
       			title: subs[0],
       			sub: null,
       			data: list[i].qInfo
       		});
       	}
       }*/
			});
		}
	}
	QlikSheetController.$inject = ['Qlik'];
})();