# QSTemplate

QSTemplate is a scaffold for creating mashups very easily in Qlik Sense.

Using the scaffold provides several benefits over previous Qlik Sense workbench development:
 - Platform agnostic - can use both Qlik Sense Server and Qlik Sense Desktop (Sense Server is highly suggested over Sense Desktop)
 - Uses Browser-Sync for easier multi-device and external browser testing (Sense Server whitelisting required)
 - Babel integration for developing in ES6
 - Developed closely using [Angular best practices](https://github.com/johnpapa/angular-styleguide) for easier maintenance and scalability of angular app design.
 - Compartmentalized Gulp tasks for easier task running maintentance

## Important Note
>This mashup scaffold will only work in Sense Server and Sense Desktop from version 2.0 and above. Don't ask about why it won't work with 1.x - no support will be provided to lesser versions.

### Installation
Installation of the scaffold is simple but requires npm, bower, and gulp to first be installed globally.

Installation of npm is required first before gulp and bower. In case you do not have npm installed on your machine you can grab it [here](https://nodejs.org/download/).

After which you can run the following commands.
```sh
npm i -g gulp bower
```

Once you've globally installed bower and gulp and you've cloned the project onto your machine, ``cd`` into the cloned project folder and run

```sh
npm install && bower install
```
after which you should be good to go.

### How to use
Two files - `gulpconfig.js` and `app/QlikConnect.js` - have a few lines of configuration that first need to be changed to your personal settings. 

`gulpconfig.js`:
```js
server: {
        // Used by Qlik Sense Desktop. No need to touch this.
        dev: 'http://localhost:4848', 
        
        // Replace with your Qlik Sense server host name. Your host may not 
        // even contain ".qliktech.com" so double-check your server settings
        prod: 'https://<your-machine-name>.qliktech.com' 
}
```

`app/QlikConnect.js`:
```js
    /**
     * START CONFIGURATION CHANGE TO YOUR SETTINGS HERE
     */
    // env = 'prod' for Qlik Sense server use
    // env = 'dev' for Qlik Sense desktop use
    var env = 'prod';
    
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
            host: '<your-machine-name>.qliktech.com',
            prefix: '/',
            port: '443', // Must be a string not a number according to Qlik's docs
            isSecure: true
        }
    };
    /**
     * END OF CONFIGURATION CHANGES HERE
     */
```
The `app` property is the id used by the Qlik platform to determine which app data it should use. This id differs between Sense Desktop and Sense Server. [Click here to get an app's id in Sense Server](http://bit.ly/1WgH0KM). (Sense Desktop app ids are usually human-readable being nearly identical to the title of the app in most cases).

The `host` property under `prod`, the same as in `qlikconfig.js` above, is dependent on your Qlik Sense Server settings.

### Included Bower Files

* [AngularJS] - Qlik Sense's javascript is bundled with an old version of Angular but in order to use the latest features like `controllerAs` version 1.4.3 is being included
* [Angular Animate] - Angular's animation module
* [Angular UI Router] - The de facto Angular router
* [Angular Bootstrap] - Angularized Bootstrap components
* [Bootstrap-Sass] - Imported in the app.scss to leverage with sass development
* [Font Awesome] - Easy to incorporate font icons
* [jQuery] - The JS library everyone includes whether it's used or not. 
    * NOTE: It is not used with any files included in the project but is merely there for your convenicence should you wish to use it or remove it using `bower rm --save jquery`

### Gulp

The `default` gulp task is `gulp serve` which will open your mashup in a browser pointed at your production settings. To serve files using Qlik Sense Desktop run the command with the `desktop` flag like so: 
```sh
gulp serve --desktop
```

To package source files for deployment run the `gulp build` command which will generate a zip file in the project folder. You can import this zip file into Qlik Sense Server. Click [here](http://bit.ly/1DIlMzu) for more info on import mashups into Sense server.

### Todos

- Fix Gulp build task
 - Write Tests
 - Incorporate into a CLI tool
 - Integrate use of drop-and-forget layouts and templates

License
----

MIT