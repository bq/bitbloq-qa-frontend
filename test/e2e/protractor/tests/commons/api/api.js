'use strict';

var Api = function () {
    var path = require('path'),
        fs = require('fs'),
        http = require('http'),
        Variables = require('../variables.js'),
        vars = new Variables(),
        configFile = JSON.parse(fs.readFileSync(path.resolve() + '/privateConfig.json', 'utf8'));

    function isJsonString(str) {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    }
    //method, endPoint, headers, data, callback
    this.requestToServer = function (params) {
        var deferred = protractor.promise.defer(),
            serverUrlFieldInConfigFile;
        params = params || {};
        params.env = vars.defaults.env;
        //params.env = 'beta';
        switch (params.serverName) {
            case 'api':
                serverUrlFieldInConfigFile = 'serverUrl';
                break;
            case 'centermode':
                serverUrlFieldInConfigFile = 'centerModeUrl';
                break;
            default:
                serverUrlFieldInConfigFile = 'serverUrl';

        }

        var urlRegExp = /((http[s]?|ftp):\/)?\/?([^:\/\s]+):?(\d+)?((\/\w+)*\/)([\w\-\.]+[^#?\s]+)(.*)?(#[\w\-]+)?/g,
            match = urlRegExp.exec(configFile[serverUrlFieldInConfigFile][params.env]),
            options = {
                hostname: match[3],
                port: match[4] || 80,
                path: match[5] + match[7] + params.endPoint,
                method: params.method
            },
            data = JSON.stringify(params.data);
        //console.log(options, data);

        options.headers = params.headers || {};
        options.headers['Content-Type'] = 'application/json';
        options.headers['Content-Length'] = Buffer.byteLength(data);
        var postRequest = http.request(options, function (res) {
            res.on('data', function (chunk) {
                // console.log('Received body data:', res.statusCode);
                // console.log(JSON.parse(chunk.toString()).token);
                //console.log('res.statusCode', res.statusCode);
                if ((res.statusCode >= 200) && (res.statusCode < 300)) {
                    var result = chunk.toString();
                    if (isJsonString(result)) {
                        result = JSON.parse(result);
                    }
                    //console.log(result);
                    deferred.fulfill(result);
                } else {
                    //console.log(res);
                    deferred.fulfill(res.statusCode);
                }
            });
        });

        postRequest.on('error', function (err) {
            console.log('problem with request:', err.message);
            deferred.fulfill(err);
        });

        postRequest.write(data);
        postRequest.end();
        return deferred.promise;
    };

    this.getToken = function () {

        var data = {
            email: configFile.adminUser,
            password: configFile.adminPassword
        };
        return this.requestToServer({
            method: 'POST',
            endPoint: 'auth/local',
            data: data
        });

    };

    //method, endPoint, data, callback
    this.adminRequestToServer = function (options) {
        var deferred = protractor.promise.defer(),
            that = this;

        options = options || {};
        options.headers = options.headers || {};

        this.getToken().then(function (res) {
            options.headers.Authorization = 'Bearer ' + res.token;
            that.requestToServer(options).then(function (result) {
                deferred.fulfill(result);
            });
        });

        return deferred.promise;
    };

};

module.exports = Api;