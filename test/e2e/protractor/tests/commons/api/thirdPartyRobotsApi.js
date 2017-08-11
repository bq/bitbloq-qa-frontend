'use strict';

var Api = require('./api.js'),
    api = new Api();

var ThirdPartyRobotsApi = function() {

    /**
     * @param  {number} number "num of codes"
     * @param  {Array}  robots "mBot", "mRagner", ...
     * @param  {string} reason ""
     * @param  {string} reporter ""
     * @param  {string} type "personal" || "center"
     * @return {Promise}     
     *
     * Example
     * {
     *   "number": 2,
     *   "robots": ["mBot", "mRanger"], 
     *   "reason": "QA",
     *   "reporter" : "laura.delrio@bq.com",
     *   "type":  "personal"
     * }
     */
    this.generateCode = function(options) {
        options = options || {};

        return api.adminRequestToServer({
            method: 'POST',
            serverName: 'centermode',
            endPoint: 'third-party-robots/generateCodes',
            data: {
                number: options.number || 1,
                robots: options.robots,
                reason: options.reason || 'QA testing',
                reporter: options.reporter || 'qa@qa.qa',
                type: options.type
            }
        });
    };

};

module.exports = ThirdPartyRobotsApi;