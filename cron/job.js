const CronMasterJob = require('cron-master').CronMasterJob;
module.exports = new CronMasterJob({
    timeThreshold: 2 * 1000,
    // The usual params that you pass to the "cron" module go here
    cronParams: {
        cronTime: '* * * * * *',
        onTick: function (job, done) {
            console.log('running job');
            return done(null, 'result');
            console.log('finished running job');
        }
    }
});

// cmaster.getInstance().