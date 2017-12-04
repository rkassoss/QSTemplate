/*global QlikConnect*/

(function (QlikConnect) {
	'use strict';

	angular.module('QSTemplate').factory('Qlik', QlikService);

	function QlikService($q) {
		var qlik = QlikConnect.global,
			app = null;

		return new QlikApp();

		function QlikApp() {
			var self = this,
				config = QlikConnect.config;

			return {
				config: config,
				getGlobal: getGlobal,
				getApp: getApp,
				getSheet: getSheet,
				insertObject: insertObject
			};

			/**
			 * Returns global qlik object
			 * @return {Object} 
			 */
			function getGlobal() {
				return qlik;
			}

			/**
			 * Returns app object based on app id from QlikConnect.js
			 * @return {Object}
			 */
			function getApp() {
				if (app !== null) {
					return app;
				}

				app = qlik.openApp(config.app, config);

				return app;
			}

			/**
			 * Returns a sheet object or a list of all sheets in saved application
			 * @param  {string} [sheetId] if no sheet id then it returns all sheets
			 * @return {Promise}         
			 */
			function getSheet(sheetId) {
				var defer = $q.defer(),
					getAll = sheetId === undefined,
					temp = [];

				if (app === null) {
					getApp();
				}

				app.getAppObjectList('sheet', function (reply) {
					var rows = reply.qAppObjectList.qItems;

					rows.forEach(function (value, i, arr) {

						if (getAll) {
							temp.push(value);

							if (i === rows.length - 1) {
								defer.resolve(temp);
							}
						} else {
							if (value.qInfo.qId === sheetId) {
								defer.resolve(value);
							}
						}
					});
				});

				return defer.promise;
			}

			/**
			 * Attaches Qlik visualization to DOM element
			 * @param  {string|DOMElement} elId 
			 * @param  {string} objId
			 * @return {Promise}      
			 */
			function insertObject(elId, objId) {
				if (app === null) {
					getApp();
				}

				return app.getObject(elId, objId);
			}
		}
	}
	QlikService.$inject = ['$q'];
})(QlikConnect);
/**
 * Angular service providing basic Qlik functionality
 * @author Darrell Capeding <darrell.capeding@gmail.com>
 */
/**
 * Angular service for qlik that provides basic qlik functionality
 * 
 * @author Darrell Capeding <darrell.capeding@gmail.com>
 */