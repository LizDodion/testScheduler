const logger = require('@financial-times/n-logger').default;
// const moment = require('moment');
// const sfConnectionHelper = require('./sf-connection-wrapper');
// const sfQueryHelper = require('./sf-queries');
// const q1Helper = require('./process_non_survey_products_q1');
require('dotenv').config();
const sleep = require('../bot').sleep;

/*
oms_methode_integration:
* Checks if the job should be ran now.
* The task runs the queries every 30 seconds until XX:55 and then restarts at XX:00. If it has crashed in between, it attempts to restart at XX:15, XX:30 and XX:55.
* If the job should be ran today
  * Connects to Salesforce using environment variables
  * Runs the queries as per diagram in
*/
const runTask = async (conn) => {
    let startTime = new Date().toISOString();
    logger.info({event: 'oms-methode', startTime: startTime, type: 'function-start'});
    // console.log(conn);
    let context = {};
    let data = [];
    if (data === []) {

    }
    await sleep(5000);
    // Connect to SF
    // Run Q1 - Query  SF for non-surveys
    // logger.info({event: 'oms-methode', startTime: startTime, type: 'start non-sur'});
    // await sf_q1_get_product_types(null, conn);
    // const non_survey_products_results = Array.from(non_survey_products);
    context.feed_run_date = startTime;

    // Run Q2 on each product_type and determine if any need syncing?
    // logger.info({event: 'oms-methode', startTime: startTime, type: 'start sur'});
    //Process Surveys
    // await sf_q1_get_product_types(null, conn);
    // conn.logout();
    await sleep(5000);
    logger.info({event: 'oms-methode', endTime: startTime, type: 'end sur'});


};

const sf_q1_get_product_types = async (startTime, conn) => {
    const assetQuery = `SELECT Id, Name, Product_Type__c 
    FROM Methode_Product_Type__c  
    Where Product_Type__c !='SUR'
    Order By Product_Type__c`;

    // Query Salesforce
    let assetQueryResponse;
    try {
        assetQueryResponse = await conn.conn.query(assetQuery);
    } catch (err) {
        logger.info({
            event: 'methodeProcess-sf-oms_methode_integration',
            startTime: startTime,
            type: 'assets-query-error',
            error: err
        });
    }

    return assetQueryResponse.records;
};
module.exports = {runTask};