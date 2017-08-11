'use strict';

var Login = require('../login/login.po.js'),
    Header = require('../header/header.po.js'),
    Variables = require('../commons/variables.js'),
    Modals = require('../modals/modals.po.js'),
    Register = require('../register/register.po.js'),
    GlobalFunctions = require('../commons/globalFunctions.js'),
    MyCenter = require('./mycenter/myCenter.po.js');

var login = new Login(),
    register = new Register(),
    header = new Header(),
    modals = new Modals(),
    vars = new Variables(),
    globalFunctions = new GlobalFunctions(),
    mycenter = new MyCenter();

var CenterMode = function() {

    this.createHeadMaster = function(options) {
        options = options || {};
        var user = login.loginWithRandomUser();
        header.openHeaderMenu.click();
        header.centerModeBanner.click();
        modals.okDialog.click();
        modals.inputNameCenter.sendKeys(options.nameCenter || this.createRandomCenterName());
        modals.inputLocationCenter.sendKeys('dir');
        modals.inputTelephoneCenter.sendKeys('333333333');
        modals.okDialog.click();
        expect(header.navCenter.isDisplayed()).toBe(true);
        expect(header.navClass.isDisplayed()).toBe(true);
        expect(header.navExercise.isPresent()).toBe(true);

        if (!options.keepLogin) {
            login.logout();
        }
        return user;
    };

    this.createTeacher = function(options) {
        options = options || {};
        var teacher,
            deferred = protractor.promise.defer(),
            browserEmail = browser.forkNewDriverInstance();

        browserEmail.ignoreSynchronization = true;

        register.getExternalProviderEmail(browserEmail).then(function(email) {
            teacher = register.generateUser();
            teacher.userEmail = email;
            browserEmail.ignoreSynchronization = false;

            register.get();
            register.createAccount(teacher.username, teacher.userEmail, teacher.password, teacher.day, teacher.month, teacher.year, true, true);
            login.logout();
            //console.log('options.headMaster', options.headMaster);
            if (!options.headMaster) {
                options.headMaster = this.createHeadMaster();
            }
            //console.log('headMaster', options.headMaster);

            login.login({
                user: options.headMaster.userEmail,
                password: options.headMaster.password
            });
            //console.log('teacher', teacher);
            mycenter.addNewTeacher(teacher.userEmail);
            login.logout();

            browserEmail.ignoreSynchronization = true;

            var $2 = browserEmail.$;
            globalFunctions.scrollBottomPage(browserEmail).then(function() {
                browserEmail.sleep(5000);
                $2('#msg_1 > td:nth-child(2)').click();
                //Open popup email send
                browserEmail.sleep(1000);
                $2('#modalMessage > div.modal-body > a').click();

                //Switch to popup
                browserEmail.ignoreSynchronization = false;
                //News passwords
                $2(login.user.elementArrayFinder_.locator_.value).sendKeys(teacher.userEmail);
                $2(login.password.elementArrayFinder_.locator_.value).sendKeys(teacher.password);
                $2(login.loginButton.elementArrayFinder_.locator_.value).click();
                browser.sleep('5000');

                $2(modals.okDialog.elementArrayFinder_.locator_.value).click();
                //go back to the main window && login wiht new passwords
                login.login({
                    user: teacher.username,
                    password: teacher.password
                });
                //check
                expect(header.navCenter.isPresent()).toBe(false, 'Teacher creation fails- can see "My center" section');
                expect(header.navClass.isDisplayed()).toBe(true, 'Teacher creation fails- cant see "My classes" section');
                expect(header.navExercise.isDisplayed()).toBe(true, 'Teacher creation fails- cant see "My Exercises" section');
                if (!options.keepLogin) {
                    login.logout();
                }
                deferred.fulfill(teacher);

            });
        });
        return deferred.promise;
    };

    this.createStudent = function() {
        var student = login.loginWithRandomUser();
        browser.sleep(vars.timeToWaitTab);
        header.centerModeBanner.click();
        browser.sleep(vars.timeToWaitFadeModals);
        modals.okDialog.click();
        modals.okDialog.click();
        browser.sleep(vars.timeToWaitFadeModals);
        login.logout();
        return student;
    };

    this.createRandomCenterName = function() {
        return 'centerTest' + Number(new Date()) + Math.floor((Math.random() * 100000) + 1);
    };

};

module.exports = CenterMode;