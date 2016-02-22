/**
 *Spec to makeActionsFile.spec.js
 * Menu File of makeActions
 */

'use strict';

var Variables = require('../../../commons/variables.js'),
    GlobalFunctions = require('../../../commons/globalFunctions.js'),
    MakeActions = require('../makeActions.po.js'),
    Make = require('../../make.po.js'),
    Modals = require('../../../modals/modals.po.js'),
    Login = require('../../../login/login.po.js'),
    Projects = require('../../../projects/projects.po.js'),
    path = require('path'),
    fs = require('fs');

var vars = new Variables(),
    globalFunctions = new GlobalFunctions(),
    makeActions = new MakeActions(),
    modals = new Modals(),
    make = new Make(),
    login = new Login(),
    projects = new Projects();

globalFunctions.xmlReport('makeActionsFileLocal');

describe('Menu file of MakeActions, specs only in local ', function() {

    //beforeEach commons
    globalFunctions.beforeTest();

    // afterEach commons
    globalFunctions.afterTest();

    it('bba-90:makeactionsFileLocal:Open from file, download and compare if is equal ', function() {

        var fileToUpload = path.resolve() + '/test/e2e/protractor/res/onlyBoardZum.json';
        make.importFileGuestUser(fileToUpload);

        //If file download exist, delete it
        var fileDownload = path.resolve() + '/target/onlyBoardZum.json';

        //Download file
        makeActions.menuFile.click();
        browser.sleep(vars.timeToWaitMenu);
        makeActions.menuDownload.click();

        //Wait to download file and compare upload file to download file
        browser.driver.wait(function() {
            return fs.existsSync(fileDownload);
        }, 4000).then(function() {

            expect(JSON.parse(fs.readFileSync(fileDownload, 'utf8'))).toEqual(JSON.parse(fs.readFileSync(fileToUpload, 'utf8')));

        });

    });

    // OjO need fix bug --> not charge dropdowns
    it('bba-91:makeactionsFileLocal:Check export in arduino project (only one project)', function() {

        var fileToUpload = path.resolve() + '/test/e2e/protractor/res/CreandoUnVoltimetroBitbloq.json';
        make.importFileGuestUser(fileToUpload);

        var fileToCompare = path.resolve() + '/test/e2e/protractor/res/CreandoUnVoltimetroBitbloq.ino';
        fileToCompare = globalFunctions.filePath(fileToCompare);

        //If file download exist, delete it (a export file, no a upload file )
        var fileDownload = path.resolve() + '/target/CreandoUnVoltimetroBitbloq.ino';
        fileDownload = globalFunctions.filePath(fileDownload);
        var fileDownload2 = path.resolve() + '/target/asdfg.ino';
        fileDownload2 = globalFunctions.filePath(fileDownload2);

        if (fs.existsSync(fileDownload)) {
            // Make sure the browser doesn't have to rename the download.
            fs.unlinkSync(fileDownload);
        }

        //Download file
        makeActions.menuFile.click();
        browser.sleep(vars.timeToWaitMenu);
        makeActions.menuExportArduino.click();

        //Wait to download file and compare upload file to download file

        browser.driver.wait(function() {
            return fs.existsSync(fileDownload);
        }, 4000).then(function() {

            expect(fs.readFileSync(fileDownload, 'utf8')).toEqual(fs.readFileSync(fileToCompare, 'utf8'));
            //import a new project and change its nawe with strange characters
            make.importFileNewUser(fileToUpload);
            make.projectName.click();
            modals.inputModalChangeN.clear();
            modals.inputModalChangeN.sendKeys('asdfg!"·$%&');
            browser.sleep(vars.timeToWaitSendKeys);
            modals.okDialog.click();
            //download the project
            makeActions.menuFile.click();
            browser.sleep(vars.timeToWaitMenu);
            makeActions.menuExportArduino.click();
            browser.driver.wait(function() {
                return fs.existsSync(fileDownload2);
            }, 4000).then(function() {
                expect(fs.readFileSync(fileDownload2, 'utf8')).toEqual(fs.readFileSync(fileToCompare, 'utf8'));

            });
        });

        // TODO , first fix bug upload second project

        //Upload other project

        //Upload file
        // fileToUpload = path.resolve() + '/test/e2e/protractor/res/Comunicacion_Serie_USB_con_bitbloq__Leer.json';
        // fileToCompare = path.resolve() + '/test/e2e/protractor/res/Comunicacion_Serie_USB_con_bitbloq__Leer.ino';

        //makeActions.inputUploadFile.sendKeys(fileToUpload);
        //
        ////If file download exist, delete it (a export file, no a upload file )
        //fileDownload = path.resolve() + '/target/e2e/protractor/Comunicacion_Serie_USB_con_bitbloq__Leer.ino';
        //if (fs.existsSync(fileDownload)) {
        //    // Make sure the browser doesn't have to rename the download.
        //    fs.unlinkSync(fileDownload);
        //}

        ////Download file
        //makeActions.menuFile.click();
        //makeActions.menuExportArduino.click();
        //
        ////Wait to download file and compare upload file to download file
        //browser.driver.wait(function() {
        //    return fs.existsSync(fileDownload);
        //}, 4000).then(function() {
        //
        //    expect(fs.readFileSync(fileDownload, 'utf8')).toEqual(fs.readFileSync(fileToCompare, 'utf8'));
        //
        //    fs.unlink(fileDownload, done);
        //});

    });

    it('bba-64:makeactionsFileLocal: delete a project', function() {
        login.loginWithRandomUser();
        projects.createNewProject();
        browser.sleep(vars.timeToWaitTab);
        browser.getAllWindowHandles().then(function(handles) {
            browser.switchTo().window(handles[1]);
            browser.sleep(vars.timeToWaitTab);
            modals.rejectTour();
            browser.sleep(vars.timeToWaitFadeModals);
            makeActions.menuFile.click();
            browser.sleep(vars.timeToWaitMenu);

            makeActions.removeProject.getAttribute('aria-disabled').then(function(disabled) {
                expect(disabled).toBe('true');
                make.saveProject();
                makeActions.menuFile.click();
                browser.sleep(vars.timeToWaitMenu);
                makeActions.removeProject.click();
                browser.sleep(vars.timeToWaitTab);
                browser.sleep(vars.timeForDelete);
                projects.get();
                expect(projects.projectsName.isPresent()).toBe(false);
                login.logout();
                make.get();
                browser.sleep(vars.timeToWaitTab);
                modals.attentionContinueGuest.click();
                browser.sleep(vars.timeToWaitFadeModals);
                modals.rejectTour();
                browser.sleep(vars.timeToWaitFadeModals);
                makeActions.menuFile.click();
                browser.sleep(vars.timeToWaitMenu);
                makeActions.removeProject.getAttribute('aria-disabled').then(function(disabled2) {
                    expect(disabled2).toBe('true');
                    makeActions.inputUploadFile.sendKeys(globalFunctions.filePath(path.resolve() + '/res/Boton_Bloqs.json'));
                    browser.sleep(vars.timeToWaitSendKeys);
                    makeActions.removeProject.getAttribute('aria-disabled').then(function(disabled3) {
                        expect(disabled3).toBe('true');
                    });
                });

            });

        });

    });

});
