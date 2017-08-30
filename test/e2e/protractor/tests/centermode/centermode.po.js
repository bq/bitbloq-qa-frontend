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

var CenterMode = function () {
    var that = this;
    this.createHeadMaster = function (options) {
        options = options || {};
        var user;
        if (!options.useDevelopHeadMaster) {
            user = login.loginWithRandomUser();
            user.centerName = options.nameCenter || this.createRandomCenterName();
            header.openHeaderMenu.click();
            header.centerModeBanner.click();
            modals.okDialog.click();
            modals.inputNameCenter.sendKeys(user.centerName);
            modals.inputLocationCenter.sendKeys('dir');
            modals.inputTelephoneCenter.sendKeys('333333333');
            modals.okDialog.click();
            expect(header.navCenter.isDisplayed()).toBe(true);
            expect(header.navClass.isDisplayed()).toBe(true);
            expect(header.navExercise.isPresent()).toBe(true);

        } else {
            //options to develop faster, don't use in test, remove always that option
            console.log('Cuidado!! estás usando un usuario pregenerado!');
            user = vars.developHeadMaster;
            login.login({
                user: vars.developHeadMaster.userEmail,
                password: vars.developHeadMaster.password
            });
        }
        if (!options.keepLogin) {
            login.logout();
        }

        return user;
    };

    this.createTeacher = function (options) {
        options = options || {};
        var teacher,
            deferred = protractor.promise.defer(),
            browserEmail = browser.forkNewDriverInstance();

        browserEmail.ignoreSynchronization = true;

        register.getExternalProviderEmail(browserEmail).then(function (email) {
            teacher = register.generateUser();
            teacher.userEmail = email;
            browserEmail.ignoreSynchronization = false;

            register.get();
            register.createAccount(teacher.username, teacher.userEmail, teacher.password, teacher.day, teacher.month, teacher.year, true, true);
            login.logout();
            //console.log('options.headMaster', options.headMaster);
            if (!options.headMaster) {
                options.headMaster = that.createHeadMaster();
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
            globalFunctions.scrollBottomPage(browserEmail).then(function () {
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

                $2(modals.okDialog.elementArrayFinder_.locator_.value).click();
                browserEmail.sleep(vars.timeToWaitFadeModals);

                if (!options.keepEmailBrowserLogin) {
                    $2(header.navLogo.elementArrayFinder_.locator_.value).click();
                    $2($('[data-element="open-header-menu"]').elementArrayFinder_.locator_.value).click();
                    $2($('[data-element="header-menu-logout"]').elementArrayFinder_.locator_.value).click();
                }
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

                teacher.browserEmail = browserEmail;
                deferred.fulfill(teacher);

            });
        });
        return deferred.promise;
    };

    this.addTeacher = function (options) {
        options = options || {};
        var deferred = protractor.promise.defer(),
            emailNumber = 2;

        mycenter.addNewTeacher(options.teacher.userEmail);
        if (options.resend) {
            mycenter.getTeacherResendButton(options.teacher).click();
            emailNumber = 3;
        }
        var $2 = options.teacher.browserEmail.$;
        options.teacher.browserEmail.ignoreSynchronization = true;
        options.teacher.browserEmail.get('http://www.my10minutemail.com/');
        globalFunctions.scrollBottomPage(options.teacher.browserEmail).then(function () {
            options.teacher.browserEmail.sleep(5000);
            $2('#msg_' + emailNumber + ' > td:nth-child(2)').click();
            //Open popup email send
            options.teacher.browserEmail.sleep(2000);
            $2('#modalMessage > div.modal-body > a').click();

            //Switch to popup
            options.teacher.browserEmail.ignoreSynchronization = false;
            //News passwords
            $2(login.user.elementArrayFinder_.locator_.value).sendKeys(options.teacher.userEmail);
            $2(login.password.elementArrayFinder_.locator_.value).sendKeys(options.teacher.password);
            $2(login.loginButton.elementArrayFinder_.locator_.value).click();

            $2(modals.okDialog.elementArrayFinder_.locator_.value).click();
            options.teacher.browserEmail.sleep(vars.timeToWaitFadeModals);

            if (!options.keepEmailBrowserLogin) {
                $2(header.navLogo.elementArrayFinder_.locator_.value).click();
                $2($('[data-element="open-header-menu"]').elementArrayFinder_.locator_.value).click();
                $2($('[data-element="header-menu-logout"]').elementArrayFinder_.locator_.value).click();

            }
            deferred.fulfill();
        });
        return deferred.promise;
    };


    this.createRandomCenterName = function () {
        return 'centerTest' + Number(new Date()) + Math.floor((Math.random() * 100000) + 1);
    };

};

module.exports = CenterMode;