const logger = require('@financial-times/n-logger').default;
module.exports.sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
};
module.exports.runTask = async () => {
    try {
        logger.info({event: 'start', time: new Date(), 'job': '0'});
        await this.sleep(63000);
        logger.info({event: 'finished', time: new Date(), 'job': '0'});
    } catch (err) {
        // Handle error
    }
};