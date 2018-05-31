# indigo

Business organizations such as restaurants and department stores face difficulties when they become overloaded with customers during certain times of the year. These situations often become chaotic, and an unpleasant experience for customers. Indigo plans to solve this problem by providing these businesses with additional employees during these times. This service provides employees who would work for few hours and gets paid by the hour. Project Indigo consists of five
members; in which I performed the role the core developer.

Technologies used: Google Firebase, Android, Node.js, CouchDB, HTML5, CSS3, PHP, and JavaScript.
Special awards: Second Runners Up – AngelHack Colombo


# Author Nikethan Selvanathan 

My docker couch db CONTAINER Id - b8a2bb8428fa
	Command to stop
		docker stop b8a2bb8428fa
	Command to restart
		docker restart b8a2bb8428fa

To deploy in Pivitol 
	Change swagger URL.
	cf login -a api.run.pivotal.io -u nikethan.2014272@iit.ac.lk -s node
	cf push indigo_nikki
	swagger in https://indigo-nikki.cfapps.io/swagger

To Install the COUCH DB

	COUCH DB INSTALL

		To create Couch Database in any instance through docker
			Install docker.
			Run command - 
				docker run --name my-couchdb -p 5984:5984 -d couchdb
			Now Couch database is started and UI is accessible in  http://127.0.0.1:5984/_utils/

		OR

		To create Couch Database through EXE
			Go through MYSQL page (http://docs.couchdb.org/en/2.0.0/install/unix.html)
			Get right installer or terminal command by your OS.

To Create the Database in Couch db
	
	Use this command to create Indigo database in couch db
		curl -X PUT -H "Cache-Control: no-cache" "http://127.0.0.1:5984/indigo"

To Create the View in Couch db
	
	Use this command to create viewByCollection View in indigo db
		curl -X PUT -H "Content-Type: application/json" -H "Cache-Control: no-cache" -d '{"views": {"viewByCollection": {"map": "function(doc) { emit(doc.collection, doc) }"}}}' "http://127.0.0.1:5984/indigo/_design/views"

Docker 
	# Delete every Docker containers
	# Must be run first because images are attached to containers
		docker rm $(docker ps -a -q)

	# Delete every Docker image
		docker rmi $(docker images -a -q)


How to use
	Change Configurations.js file in cofig folder in Project root file system.
	Than add method(api/controllers/MySQLController) and swagger(api/swagger/swagger.yaml) routes to call them.


Sample data - (VIEW)

   "views": {
       "viewByCollection": {
           "map": "function(doc) { emit(doc.collection, doc) }"
       },
       "viewById": {
           "map": "function(doc) { emit(doc._id, doc) }"
       },
       "viewByTimestampOnCollectionJobs": {
           "map": "function(doc){if (doc.collection === 'Job' && doc.status === 0) {emit([doc.latitude, doc.longitude, doc.timestamp], doc)}}"
       },
       "viewBranchByOrganizationID": {
           "map": "function(doc) { if (doc.collection == 'Branch') { emit(doc.organizationID, doc); } }"
       },
       "viewByall": {
           "map": "function(doc) { if(doc.collection === 'Organization'){emit([doc._id, 0], doc)}else if (doc.collection === 'Branch') {emit([doc.organizationID, 1], doc)}else if (doc.collection === 'Job') {emit([doc.branchID, 2], doc)} }"
       },
       "viewJobsByBranchID": {
           "map": "function(doc) { if (doc.collection == 'Job') { emit(doc.branchID, doc); } }"
       }
   }
