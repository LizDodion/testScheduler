const logger = require('@financial-times/n-logger').default;
// const moment = require('moment');
//const sfConnectionHelper = require('./sf-connection-wrapper');
//const sfQueryHelper = require('./sf-queries');
//const q1Helper = require('./process_non_survey_products_q1');
require(`dotenv`).config();
const find = require('find-process');


/*
oms_methode_integration:
* Checks if the job should be ran now.
* The task runs the queries every 30 seconds until XX:55 and then restarts at XX:00. If it has crashed in between, it attempts to restart at XX:15, XX:30 and XX:55.
* If the job should be ran today
  * Connects to Salesforce using environment variables
  * Runs the queries as per diagram in
*/
const run_talend_test = async () => {
    let startDate = new Date(Date.now());

    // Retrieve the ISO String of Today's date.  For example: 2019-04-17T10:11:12.876Z.
    let startTime = startDate.toISOString();
    logger.info({event: 'oms-methode', startTime: startTime, type: 'function-start'});
    // await run_job(startTime, conn);
    timerId = setInterval(async () => {
        startTime = startDate.toISOString();
        logger.info({event: 'oms-methode-integration', startTime: startTime, type: 'start-inner-loop'});
        startDate = new Date(Date.now());
        find('name', 'node')
            .then(function (list) {
                // console.log(list);
                list = list.filter(s => s.name.indexOf('www') >= 0);
                if (list.length === 1) {
                    console.log('only us runnning');
                } else {
                    console.log('already running so stop');
                }
            }, function (err) {
                console.log(err.stack || err);
            });
        if (startDate.getMinutes() >= 55 || startDate.getMinutes()%10===9) {
            clearInterval(timerId);
            // conn.conn.logout
            // conn.logout();
            logger.info({
                event: 'oms-methode-integration',
                startTime: startTime,
                type: 'Stopped at 55 minutes past the hour'
            });
        }
        // console.logging
        // await run_job(startTime, conn);
    }, 30000);

};
module.exports = {run_talend_test};