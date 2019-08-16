// JS file for abstracting the API router and allowing testing of the calls to endpoints.
const express = require('express');
const router = express.Router();
const { apiAuthMiddleware: requireApiKey } = require('../middleware/api-auth');
router.get('/api/', requireApiKey, (req,res) => {
    res.status(200)
        .json({
          result: 'success'
        });
});

module.exports = router;