'use strict';

var Header = require('../../header/header.po.js'),
    Variables = require('../../commons/variables.js'),
    BloqsExercise = require('../../centermode/bloqsExercise/bloqsExercise.po.js'),
    Modals = require('../../modals/modals.po.js'),
    Make = require('../../bloqsproject/make.po.js'),
    GlobalFunctions = require('../../commons/globalFunctions.js');

var header = new Header(),
    vars = new Variables(),
    modals = new Modals(),
    make = new Make(),
    bloqsExercise = new BloqsExercise(),
    globalFunctions = new GlobalFunctions();

var Myprojects = function() {

    this.eliminateMyProjects = $('[data-element="eliminate-myproject"]');
    this.overMyProjects = $('[data-element="over-project"]');
    this.newProject = $('[data-element="projects-new-project"]');
    this.copyProject = $('[data-element="myprojects-copy-project"]');
    this.projectName = $('[data-element="projects-project-name"]');
    this.downloadIno = $('[data-element="myprojects-export-arduino-code-button"]');
    this.itemLayoutListButton = $('[data-element="myprojects-item-layout-list-button"]');
    //Dropdown order
    this.dropDownOrder = $('[data-element="myProyects_order_dropdown"]');
    this.dropDownOrderSortRecent = $('[data-element="myProyects_order_dropdown-0"]');
    this.dropDownOrderSortOld = $('[data-element="myProyects_order_dropdown-1"]');
    this.dropDownOrderSortNameAZ = $('[data-element="myProyects_order_dropdown-2"]');
    this.dropDownOrderSortNameZA = $('[data-element="myProyects_order_dropdown-3"]');
    this.timeTag = $('[data-element="myprojects-time-tag"]');
    //Data-tooltips
    this.copyProject = $('[data-element="myprojects-copy-project"]');
    this.downloadProject = $('[data-element="myprojects-download-project"]');
    this.exportArduinoProject = $('[data-element="myprojects-export-arduino-code-button"]')
    this.projectsCount = $('[data-element="projects-count"]');
    this.url = '#/projects';
    this.get = function() {
        browser.get(this.url);
    };

    this.getProjectObject = function(projectInfo) {
        return $('[data-element2="project-' + projectInfo.name + '"]');
    };

    this.getElementFromProjectMenu = function(element) {
        return $('[data-element="myprojects-' + element + '-project"]');
    }

    this.getProjectInfo = function(name) {
        return $('[data-element="project-' + name + '-options"]');
    }

    this.createProject = function(options) {
        options = options || {};
        var project = {
            name: 'Project_' + globalFunctions.getRandomNumber()
        };

        header.navProjects.click();
        this.newProject.click();
        browser.sleep(vars.timeToWaitTab);

        return browser.getAllWindowHandles().then(function(handles) {

            browser.sleep(vars.timeToWaitTab);

            browser.switchTo().window(handles[1]);

            expect(browser.getCurrentUrl()).toMatch(/#\/bloqsproject/);

            if (options.firstProyect) {
                modals.rejectTour();
            }

            make.projectName.click();
            modals.inputModalChangeN.clear();
            modals.inputModalChangeN.sendKeys(project.name);
            modals.ok();
            expect(make.savedMessageOK.isDisplayed()).toBe(true, 'Error saving the project');

            if (options.withRobot) {
                bloqsExercise.addRobot(options.withRobot);
                if (options.activateRobot) {
                    make.activateRobot({
                        robot: options.withRobot,
                        code: options.activateRobotCode,
                        disableActivateRobotExpects: options.disableActivateRobotExpects
                    });
                } else {
                    switch (options.withRobot) {
                        case 'MBot':
                        case 'MRanger':
                        case 'Starterkit':
                            modals.cancel();
                            break;
                    }
                }
            }

            return browser.close().then(function() {
                browser.switchTo().window(handles[0]);

                return project;
            });
        });
    };

};

module.exports = Myprojects;