/*global QlikConnect*/

(function (QlikConnect) {
	'use strict';

	/**
	 * All new module dependencies will go in here
	 */
	angular.module('QSTemplate', ['ngAnimate', 'ui.bootstrap', 'ui.utils', 'ui.router']);

	// Manually bootstrap document when all is ready
	QlikConnect.init(qlikInit);

	function qlikInit(q) {
		angular.element(document).ready(function () {
			angular.bootstrap(document, ['QSTemplate', 'qlik-angular']);
		});
	}
})(QlikConnect);