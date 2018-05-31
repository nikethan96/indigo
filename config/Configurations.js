'use strict';

module.exports = function(app) {
	
	app.set('super_secret', 'Nikki');

    // Couch DB
    app.set('couch_db_host', 'http://127.0.0.1:5984'); // Couch db Host IP
    app.set('couch_db_name', 'indigo'); // Couch db Host IP
};
