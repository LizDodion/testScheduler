const logger = require('@financial-times/n-logger').default;
const sfConnectionHelper = require('../lib/sf-connection-wrapper');
const CronJob = require('cron').CronJob;
const worker = require('../lib/oms_methode_integration');

let taskRunning = false;
let conn = undefined;
const talend_job = new CronJob({
        cronTime: '*/30 0-54 8-21 * * 0-6', // everyday, 9:13, 11:13, 4:13, 8:13,
        onTick: async () => {
            if (taskRunning ) {
                logger.info({event: 'TASK ALREADY RUNNING', time: new Date()});
                return;
            }
            if(conn===undefined){
                logger.info({event: 'WAITING FOR LOGIN', time: new Date()});
                conn = await sfConnectionHelper(process.env);
            }
            taskRunning = true;
            await worker.runTask(conn);
            taskRunning = false;
        },
        start: true,
        timeZone:
            'Europe/London'
    })
;
const login_job = new CronJob({
        cronTime: '59 7-20 * * 0-6', // everyday, 9:13, 11:13, 4:13, 8:13,
        onTick: async () => {
            conn = await sfConnectionHelper(process.env);
        },
        start: true,
        timeZone:
            'Europe/London'
    })
;
const logout_job = new CronJob({
        cronTime: '56 8-21 * * 0-6', // everyday, 9:13, 11:13, 4:13, 8:13,
        onTick: async () => {
            if(conn!==undefined){
                await conn.logout;
            }
            else {
                logger.info({event: 'NOT LOGGED IN',time: new Date()});
            }
        },
        start: true,
        timeZone:
            'Europe/London'
    })
;

talend_job.start();
login_job.start();
logout_job.start();
// job2.start();

