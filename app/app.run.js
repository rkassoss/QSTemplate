(function () {
	'use strict';
	/**
	 * Run logic for QSTemplate angular module
	 */
	angular.module('QSTemplate').run(ngRun);

	function ngRun($rootScope) {
		$rootScope.safeApply = function (fn) {
			var phase = $rootScope.$$phase;
			if (phase === '$apply' || phase === '$digest') {
				if (fn && typeof fn === 'function') {
					fn();
				}
			} else {
				this.$apply(fn);
			}
		};
	}
	ngRun.$inject = ['$rootScope'];
})();