// JS file for testing scenarios.

// Imports
const chai = require('chai');
const testApp = require('../../server/app');
const expect = chai.expect; // Using Expect style
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

// Set test key variable, as this is not used outside of tests running.
process.env.TEST_API_KEY = 'test-api-key';

describe('Test-Scenarios',() => {
    // API, when called without the API Key, returns a page with status 500 and expected text.
    it('API-Failure-Status-500', (done) => {
        chai.request(testApp)
        .get('/api/')
        .end(function (err,res){
            expect(res).to.have.status(500);
            expect(res).to.not.be.json;
            expect(res.text).to.include('API key required');
            done();
        });
    });

    // API, when called with the API Key, returns a page with status 200 and expected text.
    it('API-Success-Status-200', (done) => {
        chai.request(testApp)
        .get('/api/')
        .set('test_call_key', process.env.TEST_API_KEY)
        .end(function (err,res){
            expect(res).to.have.status(200);
            expect(res).to.be.json;
            expect(JSON.parse(res.text).result).to.equal('success');
            done();
        });
    });
});