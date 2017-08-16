'use strict';

var GlobalFunctions = require('../../commons/globalFunctions.js'),
    Login = require('../../login/login.po.js'),
    Variables = require('../../commons/variables.js'),
    MyCenter = require('./myCenter.po.js'),
    Header = require('../../header/header.po.js'),
    Centermode = require('../centermode.po.js'),
    Modals = require('../../modals/modals.po.js'),
    Commons = require('../../commons/commons.po.js'),
    ThirdPartyRobotsApi = require('../../commons/api/ThirdPartyRobotsApi.js'),
    MyClass = require('../myclass/myclass.po.js');

var globalFunctions = new GlobalFunctions(),
    login = new Login(),
    vars = new Variables(),
    mycenter = new MyCenter(),
    header = new Header(),
    centermode = new Centermode(),
    modals = new Modals(),
    commons = new Commons(),
    thirdPartyRobotsApi = new ThirdPartyRobotsApi(),
    myclass = new MyClass(),
    flow = browser.controlFlow();

globalFunctions.xmlReport('mycenter');

describe('My center', function() {

    //beforeEach commons
    globalFunctions.beforeTest();

    // afterEach commons
    globalFunctions.afterTest();

    it('bbb-396:mycenter:Order the teacher', function() {
        var headMasterEmail = '210417prueba@prueba.es';
        var headMasterPass = 'prueba';
        login.login({
            user: headMasterEmail,
            password: headMasterPass
        });
        header.navCenter.click();
        expect(mycenter.teacherElems.get(0).getText()).toMatch(vars.emailFb.toLowerCase(), 'Default order - 0');
        expect(mycenter.teacherElems.get(1).getText()).toMatch(vars.userGoogleTwo.toLowerCase(), 'Default order - 1');
        expect(mycenter.teacherElems.get(2).getText()).toMatch(vars.userGoogle.toLowerCase(), 'Default order - 2');
        expect(mycenter.teacherElems.get(3).getText()).toMatch(headMasterEmail, 'Default order - 3');

        mycenter.teacherDropdownOrder.click();
        mycenter.teacherEmailDropdown.click();
        expect(mycenter.teacherElems.get(0).getText()).toMatch(headMasterEmail, 'Email order - 0');
        expect(mycenter.teacherElems.get(1).getText()).toMatch(vars.userGoogle.toLowerCase(), 'Email order - 1');
        expect(mycenter.teacherElems.get(2).getText()).toMatch(vars.userGoogleTwo.toLowerCase(), 'Email order - 2');
        expect(mycenter.teacherElems.get(3).getText()).toMatch(vars.emailFb.toLowerCase(), 'Email order - 3');

        mycenter.teacherDropdownOrder.click();
        mycenter.teacherNameDropdown.click();
        expect(mycenter.teacherElems.get(0).getText()).toMatch(headMasterEmail, 'Name order - 0');
        expect(mycenter.teacherElems.get(1).getText()).toMatch(vars.userGoogleTwo.toLowerCase(), 'Name order - 1');
        expect(mycenter.teacherElems.get(2).getText()).toMatch(vars.emailFb.toLowerCase(), 'Name order - 2');
        expect(mycenter.teacherElems.get(3).getText()).toMatch(vars.userGoogle.toLowerCase(), 'Name order - 3');

        mycenter.teacherDropdownOrder.click();
        mycenter.teacherSurnameDropdown.click();
        expect(mycenter.teacherElems.get(0).getText()).toMatch(headMasterEmail, 'Surname order - 0');
        expect(mycenter.teacherElems.get(1).getText()).toMatch(vars.userGoogleTwo.toLowerCase(), 'Surname order - 1');
        expect(mycenter.teacherElems.get(2).getText()).toMatch(vars.userGoogle.toLowerCase(), 'Surname order - 2');
        expect(mycenter.teacherElems.get(3).getText()).toMatch(vars.emailFb.toLowerCase(), 'Surname order - 3');

        mycenter.teacherDropdownOrder.click();
        mycenter.teacherGroupsDropdown.click();
        expect(mycenter.teacherElems.get(0).getText()).toMatch(vars.emailFb.toLowerCase(), 'Groups order - 0');
        expect(mycenter.teacherElems.get(1).getText()).toMatch(vars.userGoogleTwo.toLowerCase(), 'Groups order - 1');
        expect(mycenter.teacherElems.get(2).getText()).toMatch(vars.userGoogle.toLowerCase(), 'Groups order - 2');
        expect(mycenter.teacherElems.get(3).getText()).toMatch(headMasterEmail, 'Groups order - 3');

        mycenter.teacherDropdownOrder.click();
        mycenter.teacherStudentsDropdown.click();
        expect(mycenter.teacherElems.get(0).getText()).toMatch(vars.emailFb.toLowerCase(), 'Students order - 0');
        expect(mycenter.teacherElems.get(1).getText()).toMatch(vars.userGoogleTwo.toLowerCase(), 'Students order - 1');
        expect(mycenter.teacherElems.get(2).getText()).toMatch(vars.userGoogle.toLowerCase(), 'Students order - 2');
        expect(mycenter.teacherElems.get(3).getText()).toMatch(headMasterEmail, 'Students order - 3');

        login.logout();
    });

    it('bbb-397:mycenter:Create a teacher - VALID', function() {
        var headMaster = centermode.createHeadMaster();

        centermode.createTeacher({
            headMaster: headMaster
        }).then(function(teacher) {
            login.login({
                user: headMaster.userEmail,
                password: headMaster.password
            });
            header.navCenter.click();
            expect(mycenter.teacherElems.get(0).getText()).toMatch(teacher.userEmail.toLowerCase());
            expect(mycenter.teacherNotConfirmedText.isPresent(false));
            login.logout();
        });
    });

    it('bbb-398:mycenter:Create a teacher - headmaster email', function() {
        var headMaster = centermode.createHeadMaster({
            keepLogin: true
        });

        header.navCenter.click();
        mycenter.newTeacherButton.click();
        modals.inputEmailsTeacher.all(by.css('input')).get(0).sendKeys(headMaster.userEmail);
        browser.actions().sendKeys(protractor.Key.ENTER).perform();
        modals.okDialog.click();
        commons.expectToastTimeOutandText({
            text: 'Se han enviado 0 invitaciones correctamente.'
        });
        login.logout();
    });

    it('bbb-399:mycenter:Create a teacher - Wrong email', function() {
        centermode.createHeadMaster({
            keepLogin: true
        });

        header.navCenter.click();
        mycenter.newTeacherButton.click();
        modals.inputEmailsTeacher.all(by.css('input')).get(0).sendKeys('asdasdasdasdasd');
        browser.actions().sendKeys(protractor.Key.ENTER).perform();
        var email = modals.inputEmailsTeacher.all(by.css('input')).get(0);
        expect(email.getAttribute('class')).toContain('invalid-tag');
        modals.okDialog.click();
        browser.sleep(vars.timeToWaitFadeModals);
        login.logout();
    });

    it('bbb-400:mycenter:Create a teacher - The email doesnt exist', function() {
        centermode.createHeadMaster({
            keepLogin: true
        });

        header.navCenter.click();
        mycenter.newTeacherButton.click();
        modals.inputEmailsTeacher.all(by.css('input')).get(0).sendKeys('emailfake@prueba.es');
        browser.actions().sendKeys(protractor.Key.ENTER).perform();
        modals.okDialog.click();
        expect(modals.emailNoTeacher.getText()).toEqual('emailfake@prueba.es');
        modals.okDialog.click();
        browser.sleep(vars.timeToWaitFadeModals);
        login.logout();
    });

    it('bbb-402:mycenter:Delete a teacher - The teacher belongs to a center', function() {
        var headMaster = centermode.createHeadMaster();

        centermode.createTeacher({
            headMaster: headMaster
        }).then(function(teacher) {
            login.login({
                user: headMaster.userEmail,
                password: headMaster.password
            });
            header.navCenter.click();
            browser.actions().mouseMove(mycenter.teacherElems.get(0)).perform();
            mycenter.deleteTeacherButton.click();
            modals.okDialog.click();

            login.logout();
            login.login({
                user: teacher.userEmail,
                password: teacher.password
            });
            expect(header.navCenter.isPresent()).toBe(false, 'center');
            expect(header.navClass.isPresent()).toBe(false, 'classes');
            expect(header.navExercise.isPresent()).toBe(false, 'exercises');
            login.logout();
        });
    });

    it('bbb-403:mycenter:Delete a teacher - The teacher is the headmaster', function() {
        centermode.createHeadMaster({
            keepLogin: true
        });

        header.navCenter.click();
        browser.actions().mouseMove(mycenter.teacherElems.get(0)).perform();
        expect(mycenter.deleteTeacherButton.isPresent()).toBe(false);
        login.logout();
    });

    it('bbb-454:mycenter:Create a teacher - The teacher is already on the list', function() {
        var headMaster = centermode.createHeadMaster();
        centermode.createTeacher({
            headMaster: headMaster
        }).then(function(teacher) {
            login.login({
                user: headMaster.userEmail,
                password: headMaster.password
            });
            header.navCenter.click();
            mycenter.newTeacherButton.click();
            modals.inputEmailsTeacher.all(by.css('input')).get(0).sendKeys(teacher.userEmail);
            browser.actions().sendKeys(protractor.Key.ENTER).perform();
            modals.okDialog.click();
            commons.expectToastTimeOutandText({
                text: 'Se han enviado 0 invitaciones correctamente.'
            });
            expect(mycenter.teacherElems.count()).toEqual(2);
            login.logout();
        });
    });

    it('bbb-455:mycenter:the list of teacher', function() {
        var headMaster = centermode.createHeadMaster();
        centermode.createTeacher({
            headMaster: headMaster
        }).then(function() {
            centermode.createTeacher({
                headMaster: headMaster
            }).then(function() {
                login.login({
                    user: headMaster.userEmail,
                    password: headMaster.password
                });
                header.navCenter.click();
                expect(mycenter.teacherElems.count()).toBe(3);
                login.logout();
            });
        });
    });

    it('bbb-631:mycenter:Modify center mode information', function() {

        var headMaster = centermode.createHeadMaster({
                keepLogin: true
            }),
            fakeCenterInfo = {
                name: 'fakeCenterName',
                address: 'c/Falsa 123',
                phone: '666'
            };
        header.navCenter.click();
        mycenter.centerInfoTab.click();

        expect(mycenter.centerInfoEmailInput.isEnabled()).toBe(false, 'email should be disabled');

        mycenter.centerInfoNameInput.clear();
        mycenter.centerInfoNameInput.sendKeys(fakeCenterInfo.name);

        mycenter.centerInfoAddressInput.clear();
        expect(commons.toastCenterSavedData.isPresent(true, 'Named not changed'));

        mycenter.centerInfoAddressInput.sendKeys(fakeCenterInfo.address);

        mycenter.centerInfoPhoneInput.clear();
        expect(commons.toastCenterSavedData.isPresent(true, 'Address not changed'));

        mycenter.centerInfoPhoneInput.sendKeys(fakeCenterInfo.phone);
        mycenter.centerInfoPhoneInput.sendKeys(fakeCenterInfo.phone);

        expect(commons.toastCenterSavedData.isPresent(true, 'Phone not changed'));
        login.logout();

        login.login({
            user: headMaster.userEmail,
            password: headMaster.password
        });
        header.navCenter.click();
        mycenter.centerInfoTab.click();
        expect(mycenter.centerInfoNameInput.getAttribute('value')).toMatch(fakeCenterInfo.name);
        expect(mycenter.centerInfoAddressInput.getAttribute('value')).toMatch(fakeCenterInfo.address);
        expect(mycenter.centerInfoPhoneInput.getAttribute('value')).toMatch(fakeCenterInfo.phone);
        login.logout();
    });

    it('bbb-632:mycenter:Check robot activation', function() {
        var headMaster = centermode.createHeadMaster({
            keepLogin: true
        });

        header.navCenter.click();
        mycenter.centerSettingsTab.click();
        mycenter.activateMBotButton.click();

        modals.activateRobotCode1.sendKeys('aaaaaaaa-bbbbbbbbb-cccccccc-dddddddd');
        modals.okDialog.click();
        expect(modals.activateRobotErrorText.isDisplayed()).toBe(true, 'An error message should appear with a fake code');

        flow.execute(thirdPartyRobotsApi.getMBotPersonalCode).then(function(result) {
            mycenter.clearCodeInput();
            modals.activateRobotCode1.sendKeys(result[0].code);
            modals.okDialog.click();
            expect(modals.activateRobotErrorText.isDisplayed()).toBe(true, 'An error message should appear with a mbot personal code');
        });

        //activate mBot
        flow.execute(thirdPartyRobotsApi.getMBotCenterCode).then(function(result2) {
            mycenter.clearCodeInput();
            modals.activateRobotCode1.sendKeys(result2[0].code);
            modals.okDialog.click();
            expect(modals.activateRobotErrorText.isPresent()).toBe(false, 'Good code for mBot, error shouldnt appear');
        });
        expect(mycenter.toastRobotActivated.isPresent(true, 'mBot activation dont show confirmation'));
        expect(mycenter.activateMBotButton.isEnabled()).toBe(false, 'Activate mbot button should be disabled');

        //activate mranger
        flow.execute(thirdPartyRobotsApi.getMRangerCenterCode).then(function(result) {
            mycenter.activateMRangerButton.click();
            mycenter.clearCodeInput();
            modals.activateRobotCode1.sendKeys(result[0].code);
            modals.okDialog.click();
            expect(modals.activateRobotErrorText.isPresent()).toBe(false, 'Good code for mRanger, error shouldnt appear');
        });
        expect(mycenter.toastRobotActivated.isPresent(true, 'mRanger activation dont show confirmation'));
        expect(mycenter.activateMRangerButton.isEnabled()).toBe(false, 'Activate mranger button should be disabled');

        //activate starterkit
        flow.execute(thirdPartyRobotsApi.getStarterKitCenterCode).then(function(result) {
            mycenter.activateStarterKitButton.click();
            mycenter.clearCodeInput();
            modals.activateRobotCode1.sendKeys(result[0].code);
            modals.okDialog.click();
            expect(modals.activateRobotErrorText.isPresent()).toBe(false, 'Good code for starterKit, error shouldnt appear');
            expect(mycenter.toastRobotActivated.isPresent(true, 'StarterKit activation dont show confirmation'));
            expect(mycenter.activateStarterKitButton.isEnabled()).toBe(false, 'Activate starterKit button should be disabled');

            login.logout();

            var headMaster2 = centermode.createHeadMaster({
                keepLogin: true
            });
            header.navCenter.click();
            mycenter.centerSettingsTab.click();
            mycenter.activateStarterKitButton.click();
            modals.activateRobotCode1.sendKeys(result[0].code);
            modals.okDialog.click();
            expect(modals.activateRobotErrorText.isDisplayed()).toBe(true, 'An error message should appear with a used mbot center code');
        });

    });
});