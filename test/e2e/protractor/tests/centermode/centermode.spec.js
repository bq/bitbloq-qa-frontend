'use strict';

var GlobalFunctions = require('../commons/globalFunctions.js'),
    Login = require('../login/login.po.js'),
    Modals = require('../modals/modals.po.js'),
    Header = require('../header/header.po.js'),
    Variables = require('../commons/variables.js'),
    Centermode = require('./centermode.po.js');

var globalFunctions = new GlobalFunctions(),
    login = new Login(),
    modals = new Modals(),
    header = new Header(),
    vars = new Variables(),
    centermode = new Centermode();

globalFunctions.xmlReport('centermode');

describe('Center mode', function() {

    //beforeEach commons
    globalFunctions.beforeTest();

    // afterEach commons
    globalFunctions.afterTest();

    xit('bbb-389:centermode:Create a center', function() {
        centermode.createHeadMaster();
    });

    xit('bbb-390:centermode:Create a center by user <14', function() {
        login.loginWithRandomUser({
            youngThan14:true
        });
        header.openHeaderMenu.click();
        expect(header.centerModeBanner.isPresent()).toBe(false);
        login.logout();
    });

    xit('bbb-391:centermode:Create a center with empty fields', function() {
        login.loginWithRandomUser();
        header.openHeaderMenu.click();
        header.centerModeBanner.click();
        
        modals.okDialog.click();
        modals.okDialog.click();
        
        expect(modals.inputNameCenter.getAttribute('class')).toContain('input--error', '1');
        expect(modals.inputLocationCenter.getAttribute('class')).toContain('input--error','2');
        expect(modals.inputTelephoneCenter.getAttribute('class')).toContain('input--error','3');
        modals.inputNameCenter.sendKeys('hola');
        modals.okDialog.click();
        
        expect(modals.inputNameCenter.getAttribute('class')).not.toContain('input--error','4');
        expect(modals.inputLocationCenter.getAttribute('class')).toContain('input--error','5');
        expect(modals.inputTelephoneCenter.getAttribute('class')).toContain('input--error','6');
        modals.inputNameCenter.clear();
        modals.inputLocationCenter.sendKeys('dir');
        modals.okDialog.click();
        
        expect(modals.inputNameCenter.getAttribute('class')).toContain('input--error','7');
        expect(modals.inputLocationCenter.getAttribute('class')).not.toContain('input--error','8');
        expect(modals.inputTelephoneCenter.getAttribute('class')).toContain('input--error','9');
        modals.inputNameCenter.clear();
        modals.inputLocationCenter.clear();
        modals.inputTelephoneCenter.sendKeys('333333333');

        modals.okDialog.click();
        expect(modals.inputNameCenter.getAttribute('class')).toContain('input--error','10');
        expect(modals.inputLocationCenter.getAttribute('class')).toContain('input--error','11');
        expect(modals.inputTelephoneCenter.getAttribute('class')).not.toContain('input--error','12');
        
        modals.bladeClose.click();
        browser.sleep(vars.timeToWaitFadeModals);
        login.logout();
    });

    xit('bbb-392:centermode:Create a center with wrong field', function() {
        login.loginWithRandomUser();
        header.openHeaderMenu.click();
        header.centerModeBanner.click();
        
        modals.okDialog.click();
        modals.inputNameCenter.sendKeys('hola');
        modals.inputLocationCenter.sendKeys('dir');
        modals.inputTelephoneCenter.sendKeys('ee');
        
        modals.okDialog.click();
        expect(modals.inputNameCenter.getAttribute('class')).not.toContain('input--error', 'Name');
        expect(modals.inputLocationCenter.getAttribute('class')).not.toContain('input--error', 'Location');
        expect(modals.inputTelephoneCenter.getAttribute('class')).toContain('input--error', 'Phone');
        modals.bladeClose.click();

        browser.sleep(vars.timeToWaitFadeModals);
        login.logout();
    });

    xit('bbb-393:centermode:Create center option dissapear if the user have a center', function() {
        centermode.createHeadMaster({keepLogin:true});
        header.openHeaderMenu.click();
        expect(header.centerModeBanner.isPresent()).toBe(false);
        login.logout();
    });

    xit('bbb-395:centermode:The tabs of center mode', function() {
        //test student (default user)
        login.loginWithRandomUser();
        expect(header.navShowMoreMenu.isPresent()).toBe(false, 'Extra menu');
        expect(header.navProjects.isDisplayed()).toBe(true, 'Projects');
        expect(header.navTasks.isDisplayed()).toBe(true, 'Tasks');
        expect(header.navExplore.isDisplayed()).toBe(true, 'Explore');
        expect(header.navLearn.isDisplayed()).toBe(true, 'Learn');
        expect(header.navForum.isDisplayed()).toBe(true, 'Forum');
        login.logout();

        //test headmaster
        var headMaster = centermode.createHeadMaster({keepLogin:true});

        expect(header.navCenter.isDisplayed()).toBe(true, 'HeadMaster - My center');
        expect(header.navClass.isDisplayed()).toBe(true, 'HeadMaster - My classes');
        expect(header.navExercise.isDisplayed()).toBe(true, 'HeadMaster - My Exercises');
        header.navShowMoreMenu.click();
        expect(header.navProjects.isDisplayed()).toBe(true, 'HeadMaster - Projects');
        expect(header.navTasks.isDisplayed()).toBe(true, 'HeadMaster - Tasks');
        expect(header.navExplore.isDisplayed()).toBe(true, 'HeadMaster - Explore');
        expect(header.navLearn.isDisplayed()).toBe(true, 'HeadMaster - Learn');
        expect(header.navForum.isDisplayed()).toBe(true, 'HeadMaster - Forum');
        
        login.logout();
        
        //test teacher
        centermode.createTeacher({
            headMaster:headMaster,
            keepLogin:true
        }).then(function(teacher){
            expect(header.navCenter.isPresent()).toBe(false, 'HeadMaster - My center');
            expect(header.navClass.isDisplayed()).toBe(true, 'Teacher - My classes');
            expect(header.navExercise.isDisplayed()).toBe(true, 'Teacher - My Exercises');
            header.navShowMoreMenu.click();
            expect(header.navProjects.isDisplayed()).toBe(true, 'Teacher - Projects');
            expect(header.navTasks.isDisplayed()).toBe(true, 'Teacher - Tasks');
            expect(header.navExplore.isDisplayed()).toBe(true, 'Teacher - Explore');
            expect(header.navLearn.isDisplayed()).toBe(true, 'Teacher - Learn');
            expect(header.navForum.isDisplayed()).toBe(true, 'Teacher - Forum');

            login.logout();  
        });

    });

});
