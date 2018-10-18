## Installation
To download the repository on your local machine:

    git clone https://github.com/bhprtk/recurring_transactions.git
Make sure you have MongoDB installed on your system. Start mongod before you start the application.

    mongod
Also make sure mongod is running on the default port 27017.
Next, from the home directory of the app, run node app.js, or:

    nodemon
After that you can view the JSON data in http://localhost:1984/
To use the sample transaction file, run:

    node read_xmlx.js
