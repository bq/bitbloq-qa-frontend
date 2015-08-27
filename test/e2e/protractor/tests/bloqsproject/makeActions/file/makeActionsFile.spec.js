/**
 *Spec to makeActionsFile.spec.js
 * Menu File of makeActions
 */

'use strict';

var Variables = require('../../../commons/variables.js'),
    MakeActions = require('../makeActions.po.js'),
    Make = require('../../make.po.js'),
    Modals = require('../../../modals/modals.po.js');

var vars = new Variables(),
    makeActions = new MakeActions(),
    make = new Make(),
    modals = new Modals();

describe('Menu file of MakeActions', function() {

    //beforeEach commons
    vars.beforeTest();

    it('bba-88:Open new project', function() {

        make.get();
        modals.attentionContinueGuest.click();
        modals.rejectTour();
        browser.sleep(vars.timeToWaitFadeModals);

        makeActions.menuFile.click();
        makeActions.menuNewProject.click();

        browser.sleep(vars.timeToWaitTab);
        browser.getAllWindowHandles().then(function(handles) {

            browser.sleep(vars.timeToWaitTab);

            browser.switchTo().window(handles[1]);

            expect(browser.getCurrentUrl()).toMatch(/#\/bloqsproject/);

            browser.close().then(function() {
                browser.switchTo().window(handles[0]);
            });

        });

    });

    //TODO: Fail on saucelabs
    // it('Download project', function(done) {

    //     login.loginWithRandomUser();
    //     make.get();
    //     //create new project
    //     make.infoTab.click();
    //     infotab.infotabProjectName.clear();
    //     var name = 'Test_Save';
    //     infotab.infotabProjectName.sendKeys(name);
    //     browser.sleep(vars.timeToWaitAutoSave);
    //     //modals.attentionContinueGuest.click();
    //     //browser.sleep(vars.timeToWaitFadeModals);

    //     var project = element(by.id('currentproject')).evaluate('project'),
    //         filePath = path.resolve() + '/test/e2e/protractor/res/downloads/Test_Save.json';

    //     project.then(function(value) {
    //         var projectObj = {
    //             'name': value.name,
    //             'description': value.description,
    //             'software': value.software,
    //             'hardware': value.hardware,
    //             'hardwareTags': value.hardwareTags,
    //             'userTags': value.userTags
    //         };
    //         delete projectObj.software.freeBloqs;
    //         makeActions.menuFile.click().then(function() {
    //             makeActions.menuDownload.click().then(function() {
    //                 //Wait to download file
    //                 browser.sleep(4000);
    //                 expect(JSON.parse(fs.readFileSync(filePath, 'utf8'))).toEqual(projectObj);
    //                 fs.unlink(filePath, done);
    //             });
    //         });
    //     });
    // });

});
