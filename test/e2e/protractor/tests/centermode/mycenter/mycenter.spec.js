'use strict';

var GlobalFunctions = require('../../commons/globalFunctions.js'),
    Login = require('../../login/login.po.js'),
    Variables = require('../../commons/variables.js'),
    MyCenter = require('./myCenter.po.js'),
    Header = require('../../header/header.po.js'),
    Centermode = require('../centermode.po.js'),
    Modals = require('../../modals/modals.po.js'),
    MyClass = require('../myclass/myclass.po.js');

var globalFunctions = new GlobalFunctions(),
    login = new Login(),
    vars = new Variables(),
    mycenter = new MyCenter(),
    header = new Header(),
    centermode = new Centermode(),
    modals = new Modals(),
    myclass = new MyClass();

globalFunctions.xmlReport('mycenter');

describe('My center', function() {

    //beforeEach commons
    globalFunctions.beforeTest();

    // afterEach commons
    globalFunctions.afterTest();

    it('bbb-396:mycenter:Order the teacher', function() {
        var headMasterEmail = '210417prueba@prueba.es';
        var headMasterPass = 'prueba';
        login.get();
        login.login(headMasterEmail,headMasterPass);
        browser.sleep(vars.timeToWaitTab);
        header.navCenter.click();
        browser.sleep(vars.timeToWaitTab);
        expect(mycenter.teacherElems.get(0).getText()).toMatch(vars.emailFb.toLowerCase());
        expect(mycenter.teacherElems.get(1).getText()).toMatch(vars.userGoogleTwo.toLowerCase());
        expect(mycenter.teacherElems.get(2).getText()).toMatch(vars.userGoogle.toLowerCase());
        expect(mycenter.teacherElems.get(3).getText()).toMatch(headMasterEmail);
        mycenter.teacherDropdownOrder.click();
        mycenter.teacherEmailDropdown.click();
        browser.sleep(vars.timeToWaitFadeModals);
        expect(mycenter.teacherElems.get(0).getText()).toMatch(headMasterEmail);
        expect(mycenter.teacherElems.get(1).getText()).toMatch(vars.userGoogle.toLowerCase());
        expect(mycenter.teacherElems.get(2).getText()).toMatch(vars.userGoogleTwo.toLowerCase());
        expect(mycenter.teacherElems.get(3).getText()).toMatch(vars.emailFb.toLowerCase());
        mycenter.teacherDropdownOrder.click();
        mycenter.teacherNameDropdown.click();
        browser.sleep(vars.timeToWaitFadeModals);
        expect(mycenter.teacherElems.get(0).getText()).toMatch(headMasterEmail);
        expect(mycenter.teacherElems.get(1).getText()).toMatch(vars.userGoogleTwo.toLowerCase());
        expect(mycenter.teacherElems.get(2).getText()).toMatch(vars.emailFb.toLowerCase());
        expect(mycenter.teacherElems.get(3).getText()).toMatch(vars.userGoogle.toLowerCase());
        mycenter.teacherDropdownOrder.click();
        mycenter.teacherSurnameDropdown.click();
        browser.sleep(vars.timeToWaitFadeModals);
        expect(mycenter.teacherElems.get(0).getText()).toMatch(headMasterEmail);
        expect(mycenter.teacherElems.get(1).getText()).toMatch(vars.userGoogleTwo.toLowerCase());
        expect(mycenter.teacherElems.get(2).getText()).toMatch(vars.emailFb.toLowerCase());
        expect(mycenter.teacherElems.get(3).getText()).toMatch(vars.userGoogle.toLowerCase());
        mycenter.teacherDropdownOrder.click();
        mycenter.teacherGroupsDropdown.click();
        browser.sleep(vars.timeToWaitFadeModals);
        expect(mycenter.teacherElems.get(0).getText()).toMatch(vars.emailFb.toLowerCase());
        expect(mycenter.teacherElems.get(1).getText()).toMatch(vars.userGoogleTwo.toLowerCase());
        expect(mycenter.teacherElems.get(2).getText()).toMatch(vars.userGoogle.toLowerCase());
        expect(mycenter.teacherElems.get(3).getText()).toMatch(headMasterEmail);
        mycenter.teacherDropdownOrder.click();
        mycenter.teacherStudentsDropdown.click();
        browser.sleep(vars.timeToWaitFadeModals);
        expect(mycenter.teacherElems.get(0).getText()).toMatch(vars.emailFb.toLowerCase());
        expect(mycenter.teacherElems.get(1).getText()).toMatch(vars.userGoogleTwo.toLowerCase());
        expect(mycenter.teacherElems.get(2).getText()).toMatch(vars.userGoogle.toLowerCase());
        expect(mycenter.teacherElems.get(3).getText()).toMatch(headMasterEmail);
        browser.sleep(vars.timeToWaitTab);
        login.logout();
    });

    it('bbb-397:mycenter:Create a teacher - VALID', function() {
        var headmaster = centermode.createHeadMaster('pruebacentro');
        var teacher = centermode.createTeacher(headmaster);
        login.get();
        login.login(teacher.user,teacher.password);
        browser.sleep(vars.timeToWaitTab);
        expect(header.navCenter.isPresent()).toBe(false);
        expect(header.navClass.isDisplayed()).toBe(true);
        expect(header.navExercise.isPresent()).toBe(false);
        expect(header.navClass.all(by.css('a')).first().getAttribute('href')).toEqual(browser.baseUrl+'#/center-mode/teacher');
        login.logout();
        login.get();
        login.login(headmaster.user,headmaster.password);
        browser.sleep(vars.timeToWaitTab);
        header.navCenter.click();
        browser.sleep(vars.timeToWaitTab);
        expect(mycenter.teacherElems.get(0).getText()).toMatch(teacher.userEmail.toLowerCase());
        login.logout();
    });

    it('bbb-399:mycenter:Create a teacher - Wrong email', function() {
        var headmaster = centermode.createHeadMaster('prueba');
        login.get();
        login.login(headmaster.user,headmaster.password);
        browser.sleep(vars.timeToWaitTab);
        header.navCenter.click();
        browser.sleep(vars.timeToWaitTab);
        mycenter.newTeacherButton.click();
        modals.inputEmailsTeacher.all(by.css('input')).get(0).sendKeys('emailes');
        browser.actions().sendKeys(protractor.Key.ENTER).perform();
        var email = modals.inputEmailsTeacher.all(by.css('input')).get(0);
        expect(email.getAttribute('class')).toContain('invalid-tag');
        modals.okDialog.click();
        browser.sleep(vars.timeToWaitTab);
        login.logout();
    });

    it('bbb-400:mycenter:Create a teacher - The email doesnt exist', function() {
        var headmaster = centermode.createHeadMaster('prueba');
        login.get();
        login.login(headmaster.user,headmaster.password);
        browser.sleep(vars.timeToWaitTab);
        header.navCenter.click();
        browser.sleep(vars.timeToWaitTab);
        mycenter.newTeacherButton.click();
        modals.inputEmailsTeacher.all(by.css('input')).get(0).sendKeys('emailfake@prueba.es');
        browser.actions().sendKeys(protractor.Key.ENTER).perform();
        modals.okDialog.click();
        expect(modals.emailNoTeacher.getText()).toEqual('emailfake@prueba.es');
        browser.sleep(vars.timeToWaitFadeModals);
        modals.okDialog.click();
        browser.sleep(vars.timeToWaitFadeModals);
        login.logout();
    });

    it('bbb-402:mycenter:Delete a teacher - The teacher belongs to a center', function() {
        var headmaster = centermode.createHeadMaster('prueba');
        var teacher = centermode.createTeacher(headmaster);
        login.get();
        login.login(headmaster.user,headmaster.password);
        browser.sleep(vars.timeToWaitTab);
        header.navCenter.click();
        browser.actions().mouseMove(mycenter.teacherElems.get(0)).perform();
        mycenter.deleteTeacherButton.click();
        browser.sleep(vars.timeToWaitTab);
        modals.okDialog.click();
        browser.sleep(vars.timeToWaitFadeModals);
        login.logout();
        login.get();
        login.login(teacher.user,teacher.password);
        expect(header.navCenter.isPresent()).toBe(false);
        expect(header.navClass.isPresent()).toBe(false);
        expect(header.navExercise.isPresent()).toBe(false);
        login.logout();
    });

    it('bbb-401:mycenter:Delete a teacher - The teacher belongs to several centers ', function() {
        var headmaster = centermode.createHeadMaster('center1');
        var teacher = centermode.createTeacher(headmaster);
        var otherHeadmaster = centermode.createHeadMaster('center2');
        login.get();
        login.login(otherHeadmaster.user,otherHeadmaster.password);
        browser.sleep(vars.timeToWaitTab);
        mycenter.addNewTeacher(teacher.userEmail);
        login.logout();
        login.get();
        login.login(teacher.user,teacher.password);
        myclass.addNewGroup('newGroup','center1').then(function() {
          myclass.addNewGroup('newGroup','center2').then(function(idgroup) {
            browser.sleep(vars.timeToWaitFadeModals);
            login.logout();
            login.get();
            login.login(headmaster.user,headmaster.password);
            browser.sleep(vars.timeToWaitTab);
            header.navCenter.click();
            browser.actions().mouseMove(mycenter.teacherElems.get(0)).perform();
            mycenter.deleteTeacherButton.click();
            browser.sleep(vars.timeToWaitTab);
            modals.okDialog.click();
            browser.sleep(vars.timeToWaitFadeModals);
            login.logout();
            login.get();
            login.login(teacher.user,teacher.password);
            browser.sleep(vars.timeToWaitTab);
            expect(header.navCenter.isPresent()).toBe(false);
            expect(header.navClass.isDisplayed()).toBe(true);
            expect(header.navExercise.isPresent()).toBe(false);
            expect(header.navClass.all(by.css('a')).first().getAttribute('href')).toEqual(browser.baseUrl+'#/center-mode/teacher');
            header.navClass.click();
            expect(myclass.groupsElems.get(0).getText()).toMatch(idgroup);
            login.logout();
          });
        });
    });

    it('bbb-403:mycenter:Delete a teacher - The teacher is the headmaster', function() {
        var headmaster = centermode.createHeadMaster('prueba');
        login.get();
        login.login(headmaster.user,headmaster.password);
        browser.sleep(vars.timeToWaitTab);
        header.navCenter.click();
        browser.actions().mouseMove(mycenter.teacherElems.get(0)).perform();
        expect(mycenter.deleteTeacherButton.isPresent()).toBe(false);
        login.logout();
    });

    it('bbb-455:mycenter:the list of teacher', function() {
        var headmaster = centermode.createHeadMaster('pruebacentro');
        login.get();
        login.login(headmaster.user,headmaster.password);
        browser.sleep(vars.timeToWaitTab);
        header.navCenter.click();
        browser.sleep(vars.timeToWaitTab);
        expect(mycenter.teacherElems.count()).toBeGreaterThan(0);
        login.logout();
    });

    it('bbb-398:mycenter:Create a teacher - The teacher is the headmaster', function() {
        var headmaster = centermode.createHeadMaster('pruebacentro');
        login.get();
        login.login(headmaster.user,headmaster.password);
        browser.sleep(vars.timeToWaitTab);
        mycenter.addNewTeacher(headmaster.userEmail);
        browser.sleep(vars.timeToWaitTab);
        expect(mycenter.teacherElems.count()).toEqual(1);
        login.logout();
    });

    it('bbb-454:mycenter:Create a teacher - The teacher is already on the list', function() {
        var headmaster = centermode.createHeadMaster('pruebacentro');
        var teacher = centermode.createTeacher(headmaster);
        login.get();
        login.login(headmaster.user,headmaster.password);
        browser.sleep(vars.timeToWaitTab);
        mycenter.addNewTeacher(teacher.userEmail);
        browser.sleep(vars.timeToWaitTab);
        expect(mycenter.teacherElems.count()).toEqual(2);
        login.logout();
    });

    it('bbb-456:mycenter:Teacher view', function() {
        var headmaster = centermode.createHeadMaster('pruebacentro');
        var teacher = centermode.createTeacher(headmaster);
        login.get();
        login.login(headmaster.user,headmaster.password);
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

    it('bbb-457:mycenter:The headmaster create a group in the teacher view', function() {
        var headmaster = centermode.createHeadMaster('pruebacentro');
        var teacher = centermode.createTeacher(headmaster);
        login.get();
        login.login(headmaster.user,headmaster.password);
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
        login.login(teacher.user,teacher.password);
        browser.sleep(vars.timeToWaitTab);
        header.navClass.click();
        expect(myclass.groupsElems.count()).toBe(1);
        browser.sleep(vars.timeToWaitTab);
        login.logout();
    });
});
