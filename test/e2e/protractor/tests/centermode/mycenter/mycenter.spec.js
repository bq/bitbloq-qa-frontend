'use strict';

var GlobalFunctions = require('../../commons/globalFunctions.js'),
    Login = require('../../login/login.po.js'),
    Variables = require('../../commons/variables.js'),
    MyCenter = require('./myCenter.po.js'),
    Header = require('../../header/header.po.js'),
    Centermode = require('../centermode.po.js'),
    Modals = require('../../modals/modals.po.js'),
    Commons = require('../../commons/commons.po.js'),
    MyClass = require('../myclass/myclass.po.js');

var globalFunctions = new GlobalFunctions(),
    login = new Login(),
    vars = new Variables(),
    mycenter = new MyCenter(),
    header = new Header(),
    centermode = new Centermode(),
    modals = new Modals(),
    commons = new Commons(),
    myclass = new MyClass();

globalFunctions.xmlReport('mycenter');

describe('My center', function() {

    //beforeEach commons
    globalFunctions.beforeTest();

    // afterEach commons
    globalFunctions.afterTest();

    xit('bbb-396:mycenter:Order the teacher', function() {
        var headMasterEmail = '210417prueba@prueba.es';
        var headMasterPass = 'prueba';
        login.get();
        login.login(headMasterEmail, headMasterPass);
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

    xit('bbb-397:mycenter:Create a teacher - VALID', function() {
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

    xit('bbb-398:mycenter:Create a teacher - headmaster email', function() {
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

    xit('bbb-399:mycenter:Create a teacher - Wrong email', function() {
        var headMaster = centermode.createHeadMaster({
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

    xit('bbb-400:mycenter:Create a teacher - The email doesnt exist', function() {
        var headmaster = centermode.createHeadMaster({
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

    xit('bbb-401:mycenter:Delete a teacher - The teacher belongs to several centers ', function() {
        var headmaster = centermode.createHeadMaster('center1');
        var teacher = centermode.createTeacher(headmaster);
        var otherHeadmaster = centermode.createHeadMaster('center2');
        login.get();
        login.login(otherHeadmaster.user, otherHeadmaster.password);
        browser.sleep(vars.timeToWaitTab);
        mycenter.addNewTeacher(teacher.userEmail);
        login.logout();
        login.get();
        login.login(teacher.user, teacher.password);
        myclass.addNewGroup('newGroup', 'center1').then(function() {
            myclass.addNewGroup('newGroup', 'center2').then(function(idgroup) {
                browser.sleep(vars.timeToWaitFadeModals);
                login.logout();
                login.get();
                login.login(headmaster.user, headmaster.password);
                browser.sleep(vars.timeToWaitTab);
                header.navCenter.click();
                browser.actions().mouseMove(mycenter.teacherElems.get(0)).perform();
                mycenter.deleteTeacherButton.click();
                browser.sleep(vars.timeToWaitTab);
                modals.okDialog.click();
                browser.sleep(vars.timeToWaitFadeModals);
                login.logout();
                login.get();
                login.login(teacher.user, teacher.password);
                browser.sleep(vars.timeToWaitTab);
                expect(header.navCenter.isPresent()).toBe(false);
                expect(header.navClass.isDisplayed()).toBe(true);
                expect(header.navExercise.isPresent()).toBe(false);
                expect(header.navClass.all(by.css('a')).first().getAttribute('href')).toEqual(browser.baseUrl + '#/center-mode/teacher');
                header.navClass.click();
                expect(myclass.groupsElems.get(0).getText()).toMatch(idgroup);
                login.logout();
            });
        });
    });

    xit('bbb-402:mycenter:Delete a teacher - The teacher belongs to a center', function() {
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

    xit('bbb-403:mycenter:Delete a teacher - The teacher is the headmaster', function() {
        var headmaster = centermode.createHeadMaster({
            keepLogin: true
        });

        header.navCenter.click();
        browser.actions().mouseMove(mycenter.teacherElems.get(0)).perform();
        expect(mycenter.deleteTeacherButton.isPresent()).toBe(false);
        login.logout();
    });

    xit('bbb-454:mycenter:Create a teacher - The teacher is already on the list', function() {
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

    xit('bbb-455:mycenter:the list of teacher', function() {
        var headMaster = centermode.createHeadMaster();
        centermode.createTeacher({
            headMaster: headMaster
        }).then(function(teacher1) {
            centermode.createTeacher({
                headMaster: headMaster
            }).then(function(teacher2) {
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

    it('bbb-456:mycenter:Teacher view', function() {
        var headmaster = centermode.createHeadMaster('pruebacentro');
        var teacher = centermode.createTeacher(headmaster);
        login.get();
        login.login(headmaster.user, headmaster.password);
        browser.sleep(vars.timeToWaitTab);
        header.navCenter.click();
        browser.sleep(vars.timeToWaitTab);
        mycenter.teacherElems.filter(function(elem) {
            return elem.getText().then(function(text) {
                return text.includes(teacher.userEmail.toLowerCase());
            });
        }).first().click();
        expect(browser.getCurrentUrl()).toMatch('#/center-mode/center-teacher/');
        browser.sleep(vars.timeToWaitTab);
        mycenter.get();
        login.logout();
    });

    xit('bbb-457:mycenter:The headmaster create a group in the teacher view', function() {
        var headmaster = centermode.createHeadMaster('pruebacentro');
        var teacher = centermode.createTeacher(headmaster);
        login.get();
        login.login(headmaster.user, headmaster.password);
        browser.sleep(vars.timeToWaitTab);
        header.navCenter.click();
        browser.sleep(vars.timeToWaitTab);
        mycenter.teacherElems.filter(function(elem) {
            return elem.getText().then(function(text) {
                return text.includes(teacher.userEmail.toLowerCase());
            });
        }).first().click();
        expect(browser.getCurrentUrl()).toMatch('#/center-mode/center-teacher/');
        myclass.newGroupButton.click();
        modals.inputModalNoChangeN.sendKeys('prueba grupo de director');
        browser.sleep(vars.timeToSendKeys);
        modals.okDialog.click();
        browser.sleep(vars.timeToWaitTab);
        modals.cancelDialog.click();
        mycenter.get();
        browser.sleep(vars.timeToWaitFadeModals);
        login.logout();
        login.get();
        browser.sleep(vars.timeToWaitTab);
        login.login(teacher.user, teacher.password);
        browser.sleep(vars.timeToWaitTab);
        header.navClass.click();
        expect(myclass.groupsElems.count()).toBe(1);
        browser.sleep(vars.timeToWaitTab);
        login.logout();
    });
    xit('bbb-631:mycenter:The tabs of center mode', function() {

        //test headmaster
        var headMaster = centermode.createHeadMaster({
            keepLogin: true
        });

        header.navCenter.click();

        login.logout();

    });
});