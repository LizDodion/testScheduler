const path = require('path');
const cmaster = require('cron-master');

cmaster.getInstance().loadJobs(path.join(__dirname, '/', 'cron'), function (err, jobs) {
    if (err) {
        console.error('Failed to load jobs!');
    } else {
        jobs.forEach(function (job) {
            // Using event map for name.
            // Log output when the job is about to run.
            job.on(cmaster.EVENTS.TICK_STARTED, function () {
                console.log('Job tick starting!');
            });


            // Using String for event name.
            // Log output when the job has complete.
            job.on('tick-complete', function (err, res, time) {
                console.log('Job tick complete in %d!', time);
                if (err) {
                    console.error('Error running job %s: %s', job.meta.name, err);
                } else {
                    console.log('Job complete. Result: %s', res);
                }
            });

            job.on(cmaster.EVENTS.TIME_WARNING, function () {
                console.log('Job has %s exceeded expected run time!', job.meta.name);
            });

            job.on('overlapping-call', function () {
                console.log(
                    'Job %s attempting to run before previous tick is complete!',
                    job.meta.name
                );
            });
        });
    }
});