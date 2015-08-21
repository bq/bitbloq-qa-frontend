/**
 *Spec to header.html
 */

'use strict';

var LoginBitbloq = require('../login/login.po.js'),
    Variables = require('../commons/variables.js'),
    Register = require('../register/register.po.js'),
    Header = require('./header.po.js'),
    Make = require('../make/make.po.js'),
    Modals = require('../modals/modals.po.js'),
    Projects = require('../projects/projects.po.js');

var login = new LoginBitbloq(),
    vars = new Variables(),
    register = new Register(),
    header = new Header(),
    make = new Make(),
    modals = new Modals(),
    projects = new Projects();

describe('Language', function() {

    //beforeEach commons
    vars.beforeTest();

    it('Test language change', function() {

        login.get();
        var randomUserCredentials = register.generateUser();
        register.createAccountButtn.click();
        register.createAccount(
            randomUserCredentials.username,
            randomUserCredentials.userEmail,
            randomUserCredentials.password,
            randomUserCredentials.day,
            randomUserCredentials.month,
            randomUserCredentials.year,
            true,
            true);
        //wait succesfull login page
        expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '#/projects');

        header.openHeaderMenu.click();
        header.changeLanguage.click();
        modals.languagesDropdownButton.click();
        modals.languagesDropdownButton.all(by.css('li')).get(1).click();

        modals.okDialog.click();
        expect(header.menuLearn.getText()).toBe('Learn');
        login.logout();

        login.get();
        login.login(randomUserCredentials.username, randomUserCredentials.password);
        expect(header.menuLearn.getText()).toBe('Learn');
        // browser.pause();
        login.logout();
    });

});

describe('Navbar :', function() {

    it('Elements if no login --> Explora, aprende, ayuda, entrar', function() {

        //show always
        make.get();
        modals.attentionContinueGuest.click();
        modals.rejectTour();
        browser.sleep(vars.timeToWaitFadeModals);

        header.navExplore.click();
        expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '#/explore');

        expect(header.navLearn.getAttribute('href')).toEqual('http://diwo.bq.com/course/aprende-robotica-y-programacion-con-bitbloq-2/');

        header.navHelp.click();
        expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '#/help');

        header.navLogo.click();
        expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '#/');

        //no show is no login
        expect(header.navProjects.isPresent()).toBe(false);
        projects.get();
        expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '#/login');


    });

    it('Elements with login user --> Mis proyectos, Explora, aprende, ayuda', function() {

        login.loginWithRandomUser();
        make.get();
        modals.rejectTour();
        //Show all, inclusive myProjects
        expect(header.navProjects.isPresent()).toBe(true);
        projects.get();
        expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '#/projects');

        header.navExplore.click();
        expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '#/explore');

        expect(header.navLearn.getAttribute('href')).toEqual('http://diwo.bq.com/course/aprende-robotica-y-programacion-con-bitbloq-2/');

        header.navHelp.click();
        expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '#/help');

        header.navLogo.click();
        expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '#/projects');

        login.logout();


    });
});
