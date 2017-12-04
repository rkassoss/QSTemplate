/*global require, alert*/
/*
 * 
 * @owner Enter you name here (xxx)
 */
/*
 *    Fill in host and port for Qlik engine
 */
var config = {
	host: window.location.hostname,
	prefix: "/",
	port: window.location.port,
	isSecure: window.location.protocol === "https:"
};
require.config( {
	baseUrl: ( config.isSecure ? "https://" : "http://" ) + config.host + (config.port ? ":" + config.port: "") + config.prefix + "resources"
} );

require( ["js/qlik"], function ( qlik ) {
	qlik.setOnError( function ( error ) {
		alert( error.message );
	} );

	//callbacks -- inserted here --
	//open apps -- inserted here --
	var app = qlik.openApp('Executive Dashboard.qvf', config);

	
	//get objects -- inserted here --
	app.getObject('QV04','tmaqpf');
	
	app.getObject('QV03','BHTXyNM');
	
	app.getObject('QV02','FDJPm');
	
	app.getObject('QV01','nRxXG');
	
	app.getObject('CurrentSelections','CurrentSelections');
	//create cubes and lists -- inserted here --

} );