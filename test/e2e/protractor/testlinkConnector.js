/*
Connecto to testlink for upload test result
*/

'use strict';

//Connecto testlink
var TestlinkConnect = require('testlink-connect'),
  testlinkConnect = new TestlinkConnect('8b4c278f1df8e4059f894acadf9932bb', 'http://testlink.mundoreader.local/lib/api/xmlrpc/v1/xmlrpc.php');

//Configuration

// dir = '../../../target/e2e/protractor/resultTest.json'
var testlinkTestPlanID = '28822',
  testlinkBuildID = '921',
  testlinkUser = 'luisangonzalez';

//tc.reportTCResult(passed,function(callback){ console.log(callback); });

var passed = {
  user: testlinkUser,
  testplanid: testlinkTestPlanID,
  buildid: testlinkBuildID,
  testcaseexternalid: 'bba-52',
  notes: '',
  status: 'p',
  overwrite: true
};

testlinkConnect.reportTCResult(passed, function(callback) {
  console.log(callback);
});


//bba-52 : Prueba 01 test case
//http://chaitanyaqa.github.io/testlink-api-client/classes/TestLinkApi.html#method_reportTCResult
