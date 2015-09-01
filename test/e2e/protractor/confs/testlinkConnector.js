/*
Connecto to testlink for upload test result
*/

'use strict';
/* jshint loopfunc: true */


console.log('start');
   //Connecto testlink
   var TestlinkConnect = require('testlink-connect'),
      fs = require('fs'),
      testlinkConnect = new TestlinkConnect('8b4c278f1df8e4059f894acadf9932bb', 'http://testlink.mundoreader.local/lib/api/xmlrpc/v1/xmlrpc.php'),
      file = '../../../../target/e2e/protractor/resultTest.json';

   //Configuration API
   var testlinkTestPlanID = '28822',
      testlinkBuildID = '921',
      testlinkUser = 'luisangonzalez';

   //Obj result
   var passed = {
      user: testlinkUser,
      testplanid: testlinkTestPlanID,
      buildid: testlinkBuildID,
      testcaseexternalid: '',
      notes: '',
      status: 'p',
      overwrite: true
   };

   //Red json result test && reprotTCResult
   var obj;
   fs.readFile(file, 'utf8', function(err, data) {
      if (err) {
         throw err;
      }
      obj = JSON.parse(data);

      for (var i in obj) {

         var test = obj[i].description.split(':');
         passed.testcaseexternalid = test[0];
         if (obj[i].assertions[0].passed) {
            passed.status = 'p';
         } else {
            passed.status = 'f';
         }
         //http://chaitanyaqa.github.io/testlink-api-client/classes/TestLinkApi.html#method_reportTCResult
         testlinkConnect.reportTCResult(passed, function(callback) {
            console.log(callback);
         });
      }

   });
