/*global require*/
/**
 * Qlik connector outside of angular to be used anywhere
 * 
 * @author  Darrell Capeding <darrell.capeding@gmail.com>
 */
var QlikConnect = (function () {
	'use strict';

	/**
	 * START CONFIGURATION CHANGE TO YOUR SETTIGS HERE
	 */
	// env = 'prod' for Qlik Sense server use
	// env = 'dev' for Qlik Sense desktop use
	var env = 'prod'; // @todo change logic so this ain't hardcoded

	var qlikConfig = {
		dev: {
			app: 'Executive Dashboard.qvf',
			host: window.location.hostname,
			prefix: '/',
			port: '4848', // Must be a string not a number according to Qlik's docs
			isSecure: window.location.protocol === 'https:'
		},
		prod: {
			app: '7ae9a5ec-c493-4df6-bb9e-be43d25b00b4',
			host: 'usnyc-dcp2.qliktech.com',
			prefix: '/',
			port: '443', // Must be a string not a number according to Qlik's docs
			isSecure: true
		}
	};
	/**
	 * END OF CONFIGURATION CHANGES HERE
	 */

	function QlikConnect() {
		var self = this;
		self.global = null;
		self.init = initConnect;
		self.config = qlikConfig[env];

		function initConnect(cb) {
			var isCb = cb !== undefined && typeof cb === 'function',
				config = qlikConfig[env];

			var qlikReq = require.config({
				baseUrl: (config.isSecure ? 'https://' : 'http://') + config.host + (config.port ? ':' + config.port : '') + config.prefix + 'resources'
			});

			qlikReq(['js/qlik'], function (q) {
				q.setOnError(function (error) {
					console.log(error.message);
				});

				self.global = q;

				if (isCb) {
					cb(q);
				}
			});
		}
	}

	return new QlikConnect();
})();