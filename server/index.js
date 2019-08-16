// JS file for adding the port listening the app separately, to prevent tests from hanging.
const app = require('./app');
const logger = require('@financial-times/n-logger').default;

// ensure a port is set, either by environment variable or default, and that the app is listening on that port
app.set('port', process.env.PORT ? process.env.PORT : 3124);

app.listen(app.get('port'), () => { 
    logger.info({event: 'app-listening', 'port': app.get('port')});
});