/**
 *Spec to  para la tab de projects, es decir, para la pestaña de mis proyectos
 */

'use strict';

var Variables = require('../../commons/variables.js'),
    GlobalFunctions = require('../../commons/globalFunctions.js'),
    Make = require('../../bloqsproject/make.po.js'),
    Login = require('../../login/login.po.js'),
    Projects = require('../projects.po.js'),
    MyProjects = require('./myprojects.po.js'),
    Modals = require('../../modals/modals.po.js'),
    Infotab = require('../../bloqsproject/infotab/infotab.po.js'),
    MakeActions = require('../../bloqsproject/makeActions/makeActions.po.js'),
    Header = require('../../header/header.po.js'),
    Explore = require('../../explore/explore.po.js'),
    CodeProject = require('../../codeproject/codeproject.po.js'),
    Commons = require('../../commons/commons.po.js'),
    Bloqs = require('../../bloqs/bloqs.po.js');

var vars = new Variables(),
    globalFunctions = new GlobalFunctions(),
    login = new Login(),
    make = new Make(),
    projects = new Projects(),
    myprojects = new MyProjects(),
    modals = new Modals(),
    infotab = new Infotab(),
    makeActions = new MakeActions(),
    header = new Header(),
    explore = new Explore(),
    codeProject = new CodeProject(),
    commons = new Commons(),
    bloqs = new Bloqs();

globalFunctions.xmlReport('myprojects');

describe('My Projects', function () {

    //beforeEach commons
    globalFunctions.beforeTest();

    // afterEach commons
    globalFunctions.afterTest();

    it('SWBIT-3164:myProjects: Delete a project - send to trash', function () {
        sendProjectToTrash();
        login.logout();
    });

    it('SWBIT-3165:myProjects: Delete a project - delete permanently', function () {
        var projectName = sendProjectToTrash();
        browser.actions().mouseMove(projects.getTrashObject({
            'name': projectName
        })).perform();
        projects.getTrashOptions(projectName).click();
        projects.eliminate4ever.click();
        expect(commons.toastSendProjectToTrash.isPresent(true, 'Project not deleted'));
        projects.getTrashCount().then(function (result) {
            expect(Number(result)).toEqual(0);
        });
        projects.trashCount.getText().then(function (result) {
            expect(Number(result.slice(1, -1))).toEqual(0);
        });
        projects.myprojectsTab.click();
        expect(projects.projectsName.isPresent()).toBe(false);
        projects.getProjectCount().then(function (result) {
            expect(Number(result)).toEqual(0);
        });

        myprojects.projectsCount.getText().then(function (result) {
            expect(Number(result.slice(1, -1))).toEqual(0);
        });
        login.logout();
    });

    it('SWBIT-3166:myProjects: Delete a project - restore project', function () {
        var projectName = sendProjectToTrash();
        browser.actions().mouseMove(projects.getTrashObject({
            'name': projectName
        })).perform();
        projects.getTrashOptions(projectName).click();
        projects.restoreProject.click();
        expect(commons.toastSendProjectToTrash.isPresent(true, 'Project not deleted'));
        projects.getTrashCount().then(function (result) {
            expect(Number(result)).toEqual(0);
        });
        projects.trashCount.getText().then(function (result) {
            expect(Number(result.slice(1, -1))).toEqual(0);
        });
        projects.myprojectsTab.click();
        expect(projects.projectsName.isPresent()).toBe(true);
        projects.getProjectCount().then(function (result) {
            expect(Number(result)).toEqual(1);
        });

        myprojects.projectsCount.getText().then(function (result) {
            expect(Number(result.slice(1, -1))).toEqual(1);
        });
        login.logout();
    });

    function sendProjectToTrash() {
        //Create and check saved project
        login.loginWithRandomUser();
        make.get();
        modals.rejectTour();
        browser.sleep(vars.timeToWaitFadeModals);
        make.infoTab.click();
        infotab.infotabProjectName.clear();

        //Nombre del projecto
        var name = 'Test_Save_' + Number(new Date());
        make.projectName.click();
        modals.inputModalChangeN.clear();
        modals.inputModalChangeN.sendKeys(name);
        modals.okDialog.click();
        browser.sleep(vars.timeToWaitAutoSave);

        //Comprobar que se ha guardado el projecto por el nombre
        projects.get();
        expect(projects.projectsName.getText()).toEqual(name);

        projects.getProjectCount().then(function (result) {
            expect(Number(result)).toEqual(1);
        });
        myprojects.projectsCount.getText().then(function (result) {
            expect(Number(result.slice(1, -1))).toEqual(1);
        });
        browser.actions().mouseMove(myprojects.getProjectObject({
            'name': name
        })).perform();
        myprojects.getProjectInfo(name).click();
        myprojects.getElementFromProjectMenu('trash').click();
        expect(commons.toastSendProjectToTrash.isPresent(true, 'Project not deleted'));

        expect(projects.projectsName.isPresent()).toBe(false);
        projects.getProjectCount().then(function (result) {
            expect(Number(result)).toEqual(0);
        });

        myprojects.projectsCount.getText().then(function (result) {
            expect(Number(result.slice(1, -1))).toEqual(0);
        });
        projects.trashProjects.click();
        expect(projects.projectsName.isPresent()).toBe(true);
        projects.trashCount.getText().then(function (result) {
            expect(Number(result.slice(1, -1))).toEqual(1);
        });
        return name;
    }

    it('SWBIT-3152:myProjects:Verify that the Search bar work correctly', function () {

        //Save and publish 2 project begining in test_save__ , and use name of one
        // make.saveProjectAndPublish(true);

        make.saveProjectAndPublishNewUserAndLogout().then(function (savedProject) {
            // promise because expect return promise
            make.saveProjectAndPublishUser(savedProject.user.user, savedProject.user.password).then(function (project) {
                projects.get();

                projects.findBar.clear().sendKeys(project.projectName).then(function () {
                    browser.sleep(2000);
                    projects.getProjectCount().then(function (result) {
                        expect(Number(result)).toEqual(1);
                    });
                });

                projects.findBar.clear().sendKeys('test_save_').then(function () {
                    browser.sleep(2000);
                    projects.getProjectCount().then(function (result) {
                        expect(Number(result) >= 1).toBeTruthy();
                    });
                });

                projects.findBar.clear().sendKeys('no_test' + Number(new Date())).then(function () {
                    browser.sleep(2000);
                    projects.getProjectCount().then(function (result) {
                        expect(Number(result)).toEqual(0);
                    });
                });
                login.logout();
                return true;
            });
        });

    });

    it('SWBIT-3153:myProjects:Verify that the project can be published', function () {

        var nameProject = make.saveProjectNewUser().projectName;
        make.softwareTab.click();
        browser.sleep(vars.timeToWaitTab);
        bloqs.getBloqFunctions('bloq-return-function').then(function (bloque1) {
            bloqs.addToGroupVars(bloque1);
            bloqs.closeTab();
        });
        browser.sleep(vars.timeToWaitSaveNewProject);
        projects.get();
        var projectElem = projects.project;
        browser.actions().mouseMove(projectElem).perform();
        browser.sleep(6000);

        browser.actions().mouseMove(myprojects.getProjectObject({
            'name': nameProject
        })).perform();

        myprojects.getProjectInfo(nameProject).click();
        myprojects.getElementFromProjectMenu('explore').click();

        //confirm that we want publish our project.
        makeActions.publishButton.click();
        header.navExplore.click();
        //Check that the project is displayed in explora page.
        explore.exploreFind.clear().sendKeys(nameProject).then(function () {
            explore.exploreCounts.getText().then(function (value) {
                value = value.split('/');
                // Verify that it has a result
                expect(Number(value[1])).toEqual(1);
                header.navProjects.click();
                browser.actions().mouseMove(projectElem).perform();
                browser.sleep(6000);
                //Publish the project. Click on publish icon
                browser.actions().mouseMove(myprojects.getProjectObject({
                    'name': nameProject
                })).perform();

                myprojects.getProjectInfo(nameProject).click();
                myprojects.getElementFromProjectMenu('private').click();
                //confirm that we want publish our project.
                makeActions.privateButton.click();
                header.navExplore.click();
                //Check that the project isn't displayed in explora page.
                explore.exploreFind.clear().sendKeys(nameProject).then(function () {
                    explore.exploreCounts.getText().then(function (value) {
                        value = value.split('/');
                        // Verify that it hasn't any result
                        expect(Number(value[1])).toEqual(0);
                        login.logout();
                    });
                });

            });
        });

    });

    it('SWBIT-3157:myProjects:Verify if not have project, show create new project', function () {
        login.loginWithRandomUser();
        myprojects.newProject.click();
        globalFunctions.toMatchUrlInNewTab(/#\/bloqsproject/);
        login.logout();

    });

    it('SWBIT-3155:myProjects:Check if projects are show correctly in my projects', function () {

        var checkNameProjects = function (row, contain) {
            expect(element.all(by.repeater('project in projectSearched').row(row).column('project.name')).getText()).toContain(contain);
        };

        make.saveProjectNewUser('a');
        make.saveProject('aa');
        make.saveProject('aab');
        make.saveProject('za');
        make.saveProject('b');
        make.saveProject('c');
        make.saveProject('d');
        make.saveProject('e');
        make.saveProject('5');
        codeProject.saveCodeProject('g');
        myprojects.get();
        //Most recent
        checkNameProjects(0, 'g');
        checkNameProjects(1, '5');
        checkNameProjects(2, 'e');
        checkNameProjects(3, 'd');
        checkNameProjects(4, 'c');
        checkNameProjects(5, 'b');
        checkNameProjects(6, 'za');
        checkNameProjects(7, 'aab');
        checkNameProjects(8, 'aa');
        checkNameProjects(9, 'a');
        // Most old
        myprojects.dropDownOrder.click();
        browser.sleep(vars.timeToWaitTab);
        myprojects.dropDownOrderSortOld.click();
        browser.sleep(vars.timeToWaitTab);
        myprojects.dropDownOrder.click();
        myprojects.dropDownOrder.click();
        browser.sleep(vars.timeToWaitTab);
        checkNameProjects(0, 'a');
        checkNameProjects(1, 'aa');
        checkNameProjects(2, 'aab');
        checkNameProjects(3, 'za');
        checkNameProjects(4, 'b');
        checkNameProjects(5, 'c');
        checkNameProjects(6, 'd');
        checkNameProjects(7, 'e');
        checkNameProjects(8, '5');
        checkNameProjects(9, 'g');
        // Order AZ
        myprojects.dropDownOrder.click();
        browser.sleep(vars.timeToWaitTab);
        myprojects.dropDownOrderSortNameAZ.click();
        browser.sleep(vars.timeToWaitTab);
        myprojects.dropDownOrder.click();
        myprojects.dropDownOrder.click();
        browser.sleep(vars.timeToWaitTab);
        checkNameProjects(0, '5');
        checkNameProjects(1, 'a');
        checkNameProjects(2, 'aa');
        checkNameProjects(3, 'aab');
        checkNameProjects(4, 'b');
        checkNameProjects(5, 'c');
        checkNameProjects(6, 'd');
        checkNameProjects(7, 'e');
        checkNameProjects(8, 'g');
        checkNameProjects(9, 'za');
        // Order ZA
        myprojects.dropDownOrder.click();
        browser.sleep(vars.timeToWaitTab);
        myprojects.dropDownOrderSortNameZA.click();
        browser.sleep(vars.timeToWaitTab);
        myprojects.dropDownOrder.click();
        myprojects.dropDownOrder.click();
        browser.sleep(vars.timeToWaitTab);
        checkNameProjects(0, 'za');
        checkNameProjects(1, 'g');
        checkNameProjects(2, 'e');
        checkNameProjects(3, 'd');
        checkNameProjects(4, 'c');
        checkNameProjects(5, 'b');
        checkNameProjects(6, 'aab');
        checkNameProjects(7, 'aa');
        checkNameProjects(8, 'a');
        checkNameProjects(9, '5');

        //IN List
        myprojects.itemLayoutListButton.click();

        myprojects.dropDownOrder.click();
        browser.sleep(vars.timeToWaitTab);
        myprojects.dropDownOrderSortRecent.click();
        browser.sleep(vars.timeToWaitTab);
        myprojects.dropDownOrder.click();
        myprojects.dropDownOrder.click();
        browser.sleep(vars.timeToWaitTab);
        checkNameProjects(0, 'g');
        checkNameProjects(1, '5');
        checkNameProjects(2, 'e');
        checkNameProjects(3, 'd');
        checkNameProjects(4, 'c');
        checkNameProjects(5, 'b');
        checkNameProjects(6, 'za');
        checkNameProjects(7, 'aab');
        checkNameProjects(8, 'aa');
        checkNameProjects(9, 'a');
        // Most old
        myprojects.dropDownOrder.click();
        browser.sleep(vars.timeToWaitTab);
        myprojects.dropDownOrderSortOld.click();
        browser.sleep(vars.timeToWaitTab);
        myprojects.dropDownOrder.click();
        myprojects.dropDownOrder.click();
        browser.sleep(vars.timeToWaitTab);
        checkNameProjects(0, 'a');
        checkNameProjects(1, 'aa');
        checkNameProjects(2, 'aab');
        checkNameProjects(3, 'za');
        checkNameProjects(4, 'b');
        checkNameProjects(5, 'c');
        checkNameProjects(6, 'd');
        checkNameProjects(7, 'e');
        checkNameProjects(8, '5');
        checkNameProjects(9, 'g');
        // Order AZ
        myprojects.dropDownOrder.click();
        browser.sleep(vars.timeToWaitTab);
        myprojects.dropDownOrderSortNameAZ.click();
        browser.sleep(vars.timeToWaitTab);
        myprojects.dropDownOrder.click();
        myprojects.dropDownOrder.click();
        browser.sleep(vars.timeToWaitTab);
        checkNameProjects(0, '5');
        checkNameProjects(1, 'a');
        checkNameProjects(2, 'aa');
        checkNameProjects(3, 'aab');
        checkNameProjects(4, 'b');
        checkNameProjects(5, 'c');
        checkNameProjects(6, 'd');
        checkNameProjects(7, 'e');
        checkNameProjects(8, 'g');
        checkNameProjects(9, 'za');
        // Order ZA
        myprojects.dropDownOrder.click();
        browser.sleep(vars.timeToWaitTab);
        myprojects.dropDownOrderSortNameZA.click();
        browser.sleep(vars.timeToWaitTab);
        myprojects.dropDownOrder.click();
        myprojects.dropDownOrder.click();
        browser.sleep(vars.timeToWaitTab);
        checkNameProjects(0, 'za');
        checkNameProjects(1, 'g');
        checkNameProjects(2, 'e');
        checkNameProjects(3, 'd');
        checkNameProjects(4, 'c');
        checkNameProjects(5, 'b');
        checkNameProjects(6, 'aab');
        checkNameProjects(7, 'aa');
        checkNameProjects(8, 'a');
        checkNameProjects(9, '5');

        /*   DRAFT TODO check tooltips

        WebElement elem = driver.findElement(By.tagName("div"));
        action.moveToElement(elem);
        action.perform();


        // browser.actions().mouseMove(projects.project).perform();
        // browser.sleep(6000);
        //
        // browser.actions().
        //     mouseMove(myprojects.copyProject).
        //     perform();
        //
        // expect(myprojects.copyProject.isPresent()).toBeTruthy(true);
        //
        // // var script = "return window.getComputedStyle(document.querySelector(' '),':before').getPropertyValue('content')";
        //
        //  browser.executeScript('return window.getComputedStyle(document.querySelector(data-element="myprojects-rename-project"),:before).getPropertyValue("content")');
        //
        //
        //  this.getBloq = function(section, bloqClass) {
        //      var that = this,
        //          bloqsuniquetag = Date.now();
        //
        //      return browser.executeScript('document.querySelectorAll(\'[data-element="toolbox-' + section + '"] .' + bloqClass + '\')[0].setAttribute("bloqsuniquetag", "' + bloqsuniquetag + '")').then(function() {
        //          var toolbox = that.getToolboxPO(section);
        //          toolbox.click();
        //          browser.sleep(1000);
        //          return $('[bloqsuniquetag="' + bloqsuniquetag + '"]');
        //      });
        //  };
        //
        //
        // browser.pause();
          */

        login.logout();
    });

    it('SWBIT-3160:myProjects:Verify you can change the name of a project', function () {
        var originalName = make.saveProjectNewUser().projectName;
        browser.sleep(vars.timeToWaitSaveNewProject);
        projects.get();
        browser.sleep(vars.timeToWaitTab);

        //rename

        myprojects.timeTag.getText().then(function (timeCreation) {
            browser.actions().mouseMove(myprojects.overMyProjects).perform();
            browser.sleep(vars.timeToWaitFadeModals);
            browser.actions().mouseMove(myprojects.getProjectObject({
                'name': originalName
            })).perform();
            myprojects.getProjectInfo(originalName).click();
            myprojects.getElementFromProjectMenu('rename').click();
            modals.inputModalChangeN.clear();
            modals.inputModalChangeN.sendKeys('new name');
            browser.sleep(vars.timeToWaitSendKeys);
            browser.sleep(54000);
            modals.okDialog.click();
            browser.sleep(vars.timeToWaitAutoSave);

            expect(myprojects.timeTag.getText()).not.toMatch(timeCreation);
            expect(myprojects.projectName.getText()).not.toMatch(originalName);
            login.logout();
        });

    });

    it('bbb-XX:myProjects: Check no pagination when not enough projects', function () {
        make.saveProjectNewUser('Project_1');
        myprojects.get();

        expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '#/projects/myprojects?page=1');

        projects.getProjectCount().then(function (result) {
            expect(Number(result)).toEqual(1);
        });

        browser.sleep(3000);
        browser.executeScript('$("#projects__view").scrollTop(10000);').then(function () {
            expect(browser.isElementPresent((myprojects.getMyProjectsPage(1)))).toBe(false);
        });
        login.logout();
    });

    it('bbb-XX:myProjects: Check Pagination', function () {
        make.saveProjectNewUser('Project_1');
        make.saveProject('Project_2');
        make.saveProject('Project_3');
        make.saveProject('Project_4');
        make.saveProject('Project_5');
        make.saveProject('Project_6');
        make.saveProject('Project_7');
        make.saveProject('Project_8');
        make.saveProject('Project_9');
        make.saveProject('Project_10');
        make.saveProject('Project_11');
        make.saveProject('Project_12');
        make.saveProject('Project_13');
        make.saveProject('Project_14');
        make.saveProject('Project_15');
        make.saveProject('Project_16');
        make.saveProject('Project_17');
        make.saveProject('Project_18');
        make.saveProject('Project_19');
        make.saveProject('Project_20');
        make.saveProject('Project_21');
        make.saveProject('Project_22');
        myprojects.get();

        expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '#/projects/myprojects?page=1');

        projects.getProjectCount().then(function (result) {
            expect(Number(result)).toEqual(20);
        });

        browser.sleep(3000);
        browser.executeScript('$("#projects__view").scrollTop(10000);').then(function () {
            myprojects.getMyProjectsPage(2).click();
            browser.sleep(3000);
            expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '#/projects/myprojects?page=2');
            projects.getProjectCount().then(function (result) {
                expect(Number(result)).toEqual(2);
            });
            myprojects.getMyProjectsPage(1).click();
            expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '#/projects/myprojects?page=1');
        });
        login.logout();
    });

    it('bbb-XX:myProjects: Check Pagination Back and Next', function () {
        make.saveProjectNewUser('Project_1');
        make.saveProject('Project_2');
        make.saveProject('Project_3');
        make.saveProject('Project_4');
        make.saveProject('Project_5');
        make.saveProject('Project_6');
        make.saveProject('Project_7');
        make.saveProject('Project_8');
        make.saveProject('Project_9');
        make.saveProject('Project_10');
        make.saveProject('Project_11');
        make.saveProject('Project_12');
        make.saveProject('Project_13');
        make.saveProject('Project_14');
        make.saveProject('Project_15');
        make.saveProject('Project_16');
        make.saveProject('Project_17');
        make.saveProject('Project_18');
        make.saveProject('Project_19');
        make.saveProject('Project_20');
        make.saveProject('Project_21');
        make.saveProject('Project_22');
        myprojects.get();

        expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '#/projects/myprojects?page=1');

        projects.getProjectCount().then(function (result) {
            expect(Number(result)).toEqual(20);
        });

        browser.sleep(3000);
        browser.executeScript('$("#projects__view").scrollTop(10000);').then(function () {
            myprojects.paginationLast.click();
            expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '#/projects/myprojects?page=1');
            myprojects.paginationNext.click();
            browser.sleep(3000);
            expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '#/projects/myprojects?page=2');
            projects.getProjectCount().then(function (result) {
                expect(Number(result)).toEqual(2);
            });
            myprojects.paginationLast.click();
            expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '#/projects/myprojects?page=1');
        });
        login.logout();
    });

    fit('bbb-XX:myProjects: Check Pagination Enter Url', function () {
        make.saveProjectNewUser('Project_1');
        make.saveProject('Project_2');
        make.saveProject('Project_3');
        make.saveProject('Project_4');
        make.saveProject('Project_5');
        make.saveProject('Project_6');
        make.saveProject('Project_7');
        make.saveProject('Project_8');
        make.saveProject('Project_9');
        make.saveProject('Project_10');
        make.saveProject('Project_11');
        make.saveProject('Project_12');
        make.saveProject('Project_13');
        make.saveProject('Project_14');
        make.saveProject('Project_15');
        make.saveProject('Project_16');
        make.saveProject('Project_17');
        make.saveProject('Project_18');
        make.saveProject('Project_19');
        make.saveProject('Project_20');
        make.saveProject('Project_21');
        make.saveProject('Project_22');
        myprojects.get();

        expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '#/projects/myprojects?page=1');

        projects.getProjectCount().then(function (result) {
            expect(Number(result)).toEqual(20);
        });

        browser.get('#/projects/myprojects?page=2');
        projects.getProjectCount().then(function (result) {
            expect(Number(result)).toEqual(2);
        });

        expect(browser.isElementPresent($('[data-element2="project-Project_2"]'))).toBe(true);
        expect(browser.isElementPresent($('[data-element2="project-Project_1"]'))).toBe(true);

    });

});