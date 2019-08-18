'use strict';

const jsforce = require('jsforce');
const logger = require('@financial-times/n-logger').default;

// async SF connector class
class SFConnection {

    // Creates an instance of a Salesforce connection, using the details passed
    constructor ({loginUrl, clientId, clientSecret, redirectUri, username, password}) {
        // this.conn = new jsforce.Connection({
        //     oauth2: {loginUrl, clientId, clientSecret, redirectUri}
        // });
        // this.username = username;
        // this.password = password;
    }

    // Returns the environment options based on the details passed
    static getEnvironmentOptions (env) {
        return {
            // loginUrl: env.SF_LOGIN_URL,
            // clientId: env.SF_CLIENT_ID,
            // clientSecret: env.SF_CLIENT_SECRET,
            // redirectUri: env.SF_CALLBACK_URL,
            // username: env.SF_USERNAME,
            // password: env.SF_PASSWORD
        };
    }

    // Opens the Salesforce connection
    login () {
        return new Promise((resolve, reject) => {
            resolve('logged in ');
        });
        // return new Promise((resolve, reject) => {
        //     this.conn.login(this.username, this.password, (error, userInfo) => {
        //         if (error) {
        //             logger.error({event: 'Error logging in to SalesForce', error: error});
        //             reject('Error logging in to SalesForce');
        //         }
        //         resolve(userInfo);
        //     }).then(r => {
        //         logger.info({event: 'Successfully logged into SalesForce', response: r});
        //     });
        // });
    }

    // Closes the Salesforce connection
    logout () {
        return new Promise((resolve, reject) => {resolve('logged out');});
    }
    //     return new Promise((resolve, reject) => {
    //         this.conn.logout((error) => {
    //             if (error) {
    //                 logger.error({event: 'Error logging out of SalesForce', error: error});
    //                 reject('Error logging out from SalesForce');
    //             }
    //             resolve();
    //         }).then(r => {
    //             logger.info({event: 'Successfully logged out of SalesForce ',response: r});
    //         });
    //     });
    // }
}

module.exports = SFConnection;
