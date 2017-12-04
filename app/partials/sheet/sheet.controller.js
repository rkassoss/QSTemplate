(function () {
	'use strict';

	angular.module('QSTemplate').controller('SheetController', SheetCtrl);

	function SheetCtrl($stateParams, Qlik) {
		var vm = this;
		vm.sheetId = $stateParams.id;
		vm.sheetObjects = [];
		vm.sheetName = '';
		vm.sheetDescription = '';

		init();
		addCurrentSelections();

		function init() {
			Qlik.getSheet(vm.sheetId).then(function (res) {
				vm.sheetName = res.qMeta.title;
				vm.sheetDescription = res.qMeta.description;
				vm.sheetObjects = res.qData.cells;
			});
		}

		function addCurrentSelections() {
			Qlik.insertObject('CurrentSelections', 'CurrentSelections');
		}
	}
	SheetCtrl.$inject = ['$stateParams', 'Qlik'];
})();