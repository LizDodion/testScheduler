'use strict';
// JS file to authenticate that API Keys are present in calls.
require('dotenv').config();

const API_HEADER = 'API_KEY';
const TEST_API_HEADER = 'test_call_key';

const apiAuthMiddleware = (req, res, next) => {
    if ((req.get(API_HEADER) === undefined || req.get(API_HEADER) !== process.env.API_KEY)
        &&
        (req.get(TEST_API_HEADER) === undefined || req.get(TEST_API_HEADER) !== process.env.TEST_API_KEY)
    ) {
        return res.status(500).send('API key required');
    }
    
    res.locals.isApiAuthenticated = true;

    return next();
};

module.exports = { apiAuthMiddleware };
