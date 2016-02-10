'use strict';

//var path = require(path);

var Mock = function() {

    var cd = null;
    this.getCorbelDriver = function(env) {
        if (!cd) {
            env = env || 'next';
            var configFile = require('../../res/config/' + env + '/config.json');
            if (env === 'production') {
                env = 'lololololol';
            } else if (env === 'mvp') {
                env = '-current';
            } else {
                env = '-' + env;
            }
            console.info('Enviroment = ' + env);

            var corbel = require('../../../../../node_modules/corbel-js/dist/corbel.js'); //,
            // async = require('async'),
            // itemsCountDone = 0,
            // itemsCountError = 0;

            var options = {
                'clientId': configFile.adminClientId,
                'clientSecret': configFile.adminSecret,
                //'audience': 'http://iam.bqws.io',
                'urlBase': 'https://{{module}}' + env + '.bqws.io/v1.0/',
                'scopes': ['bitbloq:web', 'bitbloq:user', 'bitbloq:admin']
            };

            cd = corbel.getDriver(options);
        }
        return cd;
    };

    this.getAdminToken = function(env) {
        var that = this;
        var cd = that.getCorbelDriver(env),
            configFile = require('../../res/config/' + env + '/config.json');
        console.info('Corbel driver ok');
        return cd.iam.token().create({
            claims: {
                'basic_auth.username': configFile.adminUsername,
                'basic_auth.password': configFile.adminPassword
            }
        });
    };

    this.refreshCorbelCollection = function(collectionName, items, env, setId, done) {
        env = env || 'qa';
        var configFile = require('../../res/config/' + env + '/config.json');
        if (env === 'production') {
            env = 'lololololol';
        } else if (env === 'mvp') {
            env = '-current';
        } else {
            env = '-' + env;
        }
        console.log('Enviroment = ' + env);

        var corbel = require('../node_modules/corbel-js/dist/corbel.js'),
            async = require('async'),
            itemsCountDone = 0,
            itemsCountError = 0;

        var options = {
            'clientId': configFile.adminClientId,
            'clientSecret': configFile.adminSecret,
            //'audience': 'http://iam.bqws.io',
            'urlBase': 'https://{{module}}' + env + '.bqws.io/v1.0/',
            'scopes': ['bitbloq:web', 'bitbloq:user', 'bitbloq:admin']
        };

        var cd = corbel.getDriver(options);

        console.log('Corbel driver ok');
        cd.iam.token().create({
            claims: {
                'basic_auth.username': configFile.adminUsername,
                'basic_auth.password': configFile.adminPassword
            }
        }).then(function(response) {
            console.log('create token ok :');
            console.log(response.data.accessToken);
            cd.resources
                .collection(collectionName)
                .delete()
                .then(function() {
                    console.log('delete collection ok');
                    console.log('Creating collection, please wait, corbel only accept one by one :D');
                    async.eachSeries(items, function(item, callback) {
                        //grunt.log.writeln('add');
                        //console.log(item);
                        if (setId) {
                            var id = item._id;
                            delete item._id;
                            cd.resources
                                .resource(collectionName, id)
                                .update(item)
                                .then(function(response) {
                                    itemsCountDone++;
                                    callback(null, response);
                                }).catch(function() {
                                    itemsCountError++;
                                    callback(response);
                                });
                        } else {
                            cd.resources
                                .collection(collectionName)
                                .add(item)
                                .then(function(response) {
                                    itemsCountDone++;
                                    callback(null, response);
                                }).catch(function() {
                                    itemsCountError++;
                                    callback(response);
                                });
                        }
                    }, function(err, item) {

                        console.log('Finish with ' + itemsCountDone + ' items created');
                        console.log(itemsCountError + ' Errors');
                        if (err) {
                            console.error('err:');
                            console.error(err);
                        }
                        if (item) {
                            console.info(item);
                        }
                        done();
                    });
                }).catch(function(response) {
                    console.error('delete wrong');
                    console.error(response);
                    done();
                });
        }).catch(function(response) {
            console.error('create token error');
            console.error(response);
            done();
        });
    };

    // this.registerTask('updateCollection', function(collection, env, setId) {
    //     console.log('Updating= ' + collection + ' on ' + env + ' setting the ID:' + setId);
    //     var done = this.async(),
    //         item = grunt.file.readJSON('dataBaseFiles/' + collection + '/' + collection + '.json');
    //     refreshCorbelCollection('bitbloq:' + collection, item, env, setId, done);
    // });

    /**
     *  deleteUser:calvo.tom@gmail.com:next
     */
    this.deleteUser = function(email, env) {
        var that = this;
            //protractor = require('protractor');
        env = env || 'next';

        // var deferred = protractor.promise.defer();
        console.info('Deleting user= ' + email + ' on ' + env);
        var //done =  require('async'),
            https = require('https'),
            cd = that.getCorbelDriver(env);

        that.getAdminToken(env).then(function(response) {
            console.info('create token ok :');
            var result = '',
                options = {
                    hostname: 'iam-next.bqws.io',
                    port: 443,
                    path: '/v1.0/email/' + encodeURIComponent(email),
                    method: 'get',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Authorization': 'Bearer ' + response.data.accessToken
                    }
                };
            console.info(response.data.accessToken);
            var req = https.request(options, function(res) {
                res.setEncoding('utf8');
                res.on('data', function(chunk) {
                    result += chunk;
                });
                res.on('end', function() {
                    console.info(JSON.parse(result));
                    console.info(JSON.parse(result).id);
                    if (JSON.parse(result).id) {
                        cd.iam.user(JSON.parse(result).id).delete().then(function() {
                            console.log('User deleted');
                            // return deferred.fulfill();
                            //console.log(response);
                            // done();
                        }).catch(function(response) {
                            console.log('error');
                            console.log(response);
                            // done();
                        });
                    } else {
                        console.error('user not found');
                        // done();
                    }
                });
            });

            req.on('error', function(e) {
                console.error('error');
                console.error(e);
                // done();
            });
            req.end();
        }).catch(function(response) {
            console.error('create token error');
            console.error(response);
            // done();
        });

    };

    // grunt.registerTask('dbCollectionBackup', function(collectionName, env) {
    //     env = env || 'next';
    //     grunt.log.writeln('Creating a backup of= ' + collectionName + ' on ' + env);
    //     var done = this.async(),
    //         cd = getCorbelDriver(env);
    //
    //     getAdminToken(env).then(function(response) {
    //         cd.resources.collection(collectionName).get().then(function(response) {
    //             console.log('response');
    //             console.log(response);
    //         }).catch(function(error) {
    //             console.log('error');
    //             console.log(error);
    //         });
    //     }).catch(function() {
    //         grunt.log.error('create token error');
    //         console.log(response);
    //         done();
    //     });
    // });
};

module.exports = Mock;
