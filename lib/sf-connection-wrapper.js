const SFConnection = require('./sf-connection');

/*
prepareSFConnection:
* Sets the environment options, using the options passed into the function
* Creates an instance of the Salesforce Connection
* Logs into Salesforce
* Return the connection, so that it can be used for communication with Salesforce.
*/
const prepareSFConnection = async (options) => {
    const SFoptions = SFConnection.getEnvironmentOptions(options);
    const conn = new SFConnection(SFoptions);

    await conn.login();

    return conn;
};

module.exports = prepareSFConnection;