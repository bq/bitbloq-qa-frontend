/**
 *Spec to infotab
 */
'use strict';

var Variables = require('../../commons/variables.js'),
    GlobalFunctions = require('../../commons/globalFunctions.js'),
    InfoTab = require('../infotab/infotab.po.js'),
    Make = require('../make.po.js'),
    Modals = require('../../modals/modals.po.js'),
    Login = require('../../login/login.po.js'),
    Commons = require('../../commons/commons.po.js'),
    BloqsTab = require('../bloqstab/bloqstab.po.js'),
    Projects = require('../../projects/projects.po.js'),
    MyProjects = require('../../projects/myprojects/myprojects.po.js'),
    Hwtab = require('../hwtab/hwtab.po.js');

var vars = new Variables(),
    globalFunctions = new GlobalFunctions(),
    infoTab = new InfoTab(),
    make = new Make(),
    commons = new Commons(),
    bloqsTab = new BloqsTab(),
    login = new Login(),
    modals = new Modals(),
    projects = new Projects(),
    myprojects = new MyProjects(),
    hwtab = new Hwtab();

globalFunctions.xmlReport('bloqsprojectInfo');

describe('Info tab', function () {
    //beforeEach commons
    globalFunctions.beforeTest();

    // afterEach commons
    globalFunctions.afterTest();

    it('bbb-144:bloqsprojectInfo: Verificar en el tab de información que no aparecen las opciones que requieren registro', function () {
        make.get();
        modals.attentionContinueGuest.click();
        browser.sleep(vars.timeToWaitFadeModals);
        modals.rejectTour();
        browser.sleep(vars.timeToWaitFadeModals);
        make.infoTab.click();
        browser.sleep(vars.timeToWaitTab);
        expect(infoTab.infotabProjectName.getAttribute('disabled')).toBe('true');
        expect(infoTab.infotabDescription.getAttribute('disabled')).toBe('true');
        expect(infoTab.infotabYoutubeVideoInput.getAttribute('disabled')).toBe('true');
        expect(infoTab.infotabTaginputButton.getAttribute('disabled')).toBe('true');
    });

    it('bbb-145:bloqsprojectInfo:We can insert and save tag', function () {

        var userLogin = login.loginWithRandomUser();
        make.get();
        modals.rejectTour();
        browser.sleep(vars.timeToWaitFadeModals);
        //create new project
        make.infoTab.click();
        make.projectName.click();
        modals.inputModalChangeN.clear();
        modals.inputModalChangeN.sendKeys('Test_Save');
        modals.okDialog.click();
        browser.sleep(vars.timeToWaitAutoSave);

        //add tag
        infoTab.infotabTaginputText.sendKeys('TestTag_ONE_1');
        infoTab.infotabTaginputButton.click();
        infoTab.infotabTaginputText.sendKeys('TestTag_TWO_2');
        infoTab.infotabTaginputButton.click();
        browser.sleep(vars.timeToWaitAutoSave);
        infoTab.infotabTaginputText.sendKeys('TestTag__3,TestTag__4');
        browser.sleep(vars.timeToWaitSendKeys);
        infoTab.infotabTaginputButton.click();
        infoTab.infotabTaginputText.sendKeys('TestTag,Test,t,t,t,e,e,s,t');
        browser.sleep(vars.timeToWaitSendKeys);
        infoTab.infotabTaginputButton.click();

        //Show saved tag
        expect(element.all(by.repeater('tag in currentProject.userTags').row(0)).getText()).toContain('TestTag_ONE_1');
        expect(element.all(by.repeater('tag in currentProject.userTags').row(1)).getText()).toContain('TestTag_TWO_2');
        expect(element.all(by.repeater('tag in currentProject.userTags').row(2)).getText()).toContain('TestTag__3');
        expect(element.all(by.repeater('tag in currentProject.userTags').row(3)).getText()).toContain('TestTag__4');
        expect(element.all(by.repeater('tag in currentProject.userTags').row(4)).getText()).toContain('TestTag');
        expect(element.all(by.repeater('tag in currentProject.userTags').row(5)).getText()).toContain('Test');
        expect(element.all(by.repeater('tag in currentProject.userTags').row(6)).getText()).toContain('t');
        expect(element.all(by.repeater('tag in currentProject.userTags').row(7)).getText()).toContain('e');
        expect(element.all(by.repeater('tag in currentProject.userTags').row(8)).getText()).toContain('s');
        expect(element.all(by.repeater('tag in currentProject.userTags')).count()).toBe(9);

        //Logout and Login last user and test project exist with yours tags
        login.logout();
        login.get();
        login.login({ 'user': userLogin.user, 'password': userLogin.password });
        projects.get();
        //Open saved project
        myprojects.overMyProjects.click().then(function () {
            browser.sleep(vars.timeToWaitTab);
            browser.getAllWindowHandles().then(function (handles) {
                browser.switchTo().window(handles[1]).then(function () {
                    make.infoTab.click();
                    //Show saved tag
                    expect(element.all(by.repeater('tag in currentProject.userTags').row(0)).getText()).toContain('TestTag_ONE_1');
                    expect(element.all(by.repeater('tag in currentProject.userTags').row(1)).getText()).toContain('TestTag_TWO_2');
                    expect(element.all(by.repeater('tag in currentProject.userTags').row(2)).getText()).toContain('TestTag__3');
                    expect(element.all(by.repeater('tag in currentProject.userTags').row(3)).getText()).toContain('TestTag__4');
                    expect(element.all(by.repeater('tag in currentProject.userTags').row(4)).getText()).toContain('TestTag');
                    expect(element.all(by.repeater('tag in currentProject.userTags').row(5)).getText()).toContain('Test');
                    expect(element.all(by.repeater('tag in currentProject.userTags').row(6)).getText()).toContain('t');
                    expect(element.all(by.repeater('tag in currentProject.userTags').row(7)).getText()).toContain('e');
                    expect(element.all(by.repeater('tag in currentProject.userTags').row(8)).getText()).toContain('s');
                    expect(element.all(by.repeater('tag in currentProject.userTags')).count()).toBe(9);
                    login.logout();
                    browser.close().then(browser.switchTo().window(handles[0]));

                });
            });
        });
    });

    it('bbb-146:bloqsprojectInfo:Delete tag', function () {
        var userLogin = login.loginWithRandomUser();
        make.get();
        modals.rejectTour();
        browser.sleep(vars.timeToWaitFadeModals);
        //create new project
        make.infoTab.click();
        make.projectName.click();
        modals.inputModalChangeN.clear();
        modals.inputModalChangeN.sendKeys('Test_Save');
        modals.okDialog.click();
        browser.sleep(vars.timeToWaitAutoSave);

        //add tag
        infoTab.infotabTaginputText.sendKeys('TestTag_ONE_1');
        infoTab.infotabTaginputButton.click();
        infoTab.infotabTaginputText.sendKeys('TestTag_TWO_2');
        infoTab.infotabTaginputButton.click();
        browser.sleep(vars.timeToWaitAutoSave);

        //Show saved tag
        expect(element.all(by.repeater('tag in currentProject.userTags').row(0)).getText()).toContain('TestTag_ONE_1');
        expect(element.all(by.repeater('tag in currentProject.userTags').row(1)).getText()).toContain('TestTag_TWO_2');

        //Eliminate tag
        element.all(by.repeater('tag in currentProject.userTags').row(0)).click();
        browser.sleep(vars.timeToWaitFadeModals);
        infoTab.infotabRemoveTag.click();
        infoTab.infotabRemoveTag.click();
        browser.sleep(vars.timeToWaitFadeModals);
        browser.sleep(vars.timeToWaitAutoSave);

        expect(element(by.repeater('tag in currentProject.userTags')).isPresent()).toBe(false);

        //Logout and Login last user and test tags are deleted
        login.logout();
        login.get();
        login.login({ 'user': userLogin.user, 'password': userLogin.password });
        projects.get();
        //Open saved project
        myprojects.overMyProjects.click().then(function () {
            browser.sleep(vars.timeToWaitTab);
            browser.getAllWindowHandles().then(function (handles) {
                console.log(handles);
                browser.switchTo().window(handles[1]).then(function () {
                    //Test eliminate tag tag
                    make.infoTab.click();
                    expect(element(by.repeater('tag in currentProject.userTags')).isPresent()).toBe(false);
                    login.logout();
                    browser.close().then(browser.switchTo().window(handles[0]));
                });
            });
        });
    });

    it('bbb-147:bloqsprojectInfo:verify robot and board tags', function () {
        login.loginWithRandomUser();
        make.get();
        modals.rejectTour();
        browser.sleep(vars.timeToWaitFadeModals);
        hwtab.boardsTab.click();
        hwtab.hwBoardBQZum.click();
        make.infoTab.click();
        expect(infoTab.infotabBQZumTag.getText()).toMatch('bq ZUM', 'The tag Bqz ZUM does not matches');
        expect(infoTab.infotabBQZumDeleteTag.isPresent()).toBe(false, 'Bq ZUM tag can be removed');
        make.hardwareTab.click();
        hwtab.boardsTab.click();
        hwtab.hwBoardFreaduinoUno.click();
        make.infoTab.click();
        expect(infoTab.infotabFreaduinoUnoTag.getText()).toMatch('Freaduino UNO', 'The Freaduino UNO tag does not matches');
        expect(infoTab.infotabFreaduinoUnoDeleteTag.isPresent()).toBe(false, 'Freaduino UNO tag can be removed');
        expect(infoTab.infotabBQZumTag.isPresent()).toBe(false, 'Bq ZUM tag was not removed');
        make.hardwareTab.click();
        hwtab.robotsTab.click();
        hwtab.hwRobotMBot.click();
        modals.cancel();
        make.infoTab.click();
        expect(infoTab.infotabMCoreTag.getText()).toMatch('MCore', 'The MCore tag does not matches');
        expect(infoTab.infotabMCoreDeleteTag.isPresent()).toBe(false, 'MCore tag can be removed');
        expect(infoTab.infotabMBotTag.getText()).toMatch('mBot', 'The MBot tag does not matches');
        expect(infoTab.infotabMBotDeleteTag.isPresent()).toBe(false, 'MBot tag can be removed');
        expect(infoTab.infotabBQZumTag.isPresent()).toBe(false, 'Bq ZUM tag was not removed');
        expect(infoTab.infotabFreaduinoUnoTag.isPresent()).toBe(false, 'Freaduino UNO tag was not removed');

        login.logout();
    });

    it('bbb-148:bloqsprojectInfo: Verificar el cambio de tema del proyecto', function () {
        function setThemeColor(color) {
            var themeColor;
            if (color === 'gray') {
                themeColor = infoTab.infotabOptionGrayTheme;
            } else {
                themeColor = infoTab.infotabOptionColorTheme;
            }
            make.infoTab.click();
            infoTab.infotabChooseThemeButton.click();
            themeColor.click();
            make.softwareTab.click();
            bloqsTab.infotabToolboxFunctions.click();
            make.bloqsTab.click();
        }
        login.loginWithRandomUser();
        make.get();
        modals.rejectTour();
        browser.sleep(vars.timeToWaitFadeModals);
        setThemeColor('gray');
        expect(element(by.css('.bloq-void-function')).getCssValue('color')).toBe('rgba(221, 90, 10, 1)');
        setThemeColor('color');
        expect(element(by.css('.bloq-void-function')).getCssValue('color')).toBe('rgba(255, 255, 255, 1)');
        login.logout();
        make.get();
        modals.attentionContinueGuest.click();
        browser.sleep(vars.timeToWaitFadeModals);
        modals.rejectTour();
        browser.sleep(vars.timeToWaitFadeModals);
        setThemeColor('gray');
        expect(element(by.css('.bloq-void-function')).getCssValue('color')).toBe('rgba(221, 90, 10, 1)');
        setThemeColor('color');
        expect(element(by.css('.bloq-void-function')).getCssValue('color')).toBe('rgba(255, 255, 255, 1)');
    });

    it('bbb-149:bloqsprojectInfo: Verify the Youtube URL', function () {
        var validYoutubeUrl = 'https://youtu.be/f2WME8N8qXc?list=PL3AshJDPy8GQhVWkzsjc5IvrzD5ctpQXN';
        login.loginWithRandomUser();
        make.get();
        modals.rejectTour();
        browser.sleep(vars.timeToWaitFadeModals);
        make.infoTab.click();
        infoTab.infotabYoutubeVideoInput.sendKeys('https://www.youtube.com/user/TheRedsMusic');
        browser.sleep(vars.timeToWaitAutoSave + 2500);
        globalFunctions.navigatorLanguage()
            .then(function (language) {
                if (language === 'es') {
                    expect(commons.alertTextToast.getText()).toMatch(vars.enterValidYoutubeUrl);
                } else {
                    expect(commons.alertTextToast.getText()).toMatch(vars.enterValidYoutubeUrlEN);
                }
                infoTab.infotabYoutubeVideoInput.clear();
                browser.sleep(vars.timeToWaitAutoSave + 2500);
                infoTab.infotabYoutubeVideoInput.sendKeys(validYoutubeUrl);
                browser.sleep(vars.timeToWaitAutoSave + 2500);
                browser.refresh();
                make.infoTab.click();
                browser.sleep(1000);
                expect(infoTab.infotabYoutubeVideoInput.getAttribute('value')).toBe(validYoutubeUrl);
                browser.sleep(2500);
                infoTab.infotabYoutubeVideoInput.clear();
                infoTab.infotabYoutubeVideoInput.sendKeys('');
                browser.sleep(vars.timeToWaitAutoSave + 2500);
                browser.refresh();
                make.infoTab.click();
                browser.sleep(1000);
                expect(infoTab.infotabYoutubeVideoInput.getAttribute('value')).toBe('');
            });

    });

});
