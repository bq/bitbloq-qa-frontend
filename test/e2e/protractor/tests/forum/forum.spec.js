'use strict';
var GlobalFunctions = require('../commons/globalFunctions.js'),
    Variables = require('../commons/variables.js'),
    Forum = require('./forum.po.js'),
    Login = require('../login/login.po.js'),
    Header = require('../header/header.po.js'),
    Modals = require('../modals/modals.po.js');

var globalFunctions = new GlobalFunctions(),
    vars = new Variables(),
    forum = new Forum(),
    login = new Login(),
    header = new Header(),
    modals = new Modals();

globalFunctions.xmlReport('forum');

describe('Forum', function () {
    //beforeEach commons
    globalFunctions.beforeTest();

    // afterEach commons
    globalFunctions.afterTest();

    it('bbb-215:forum:check forum tag is present', function () {
        forum.get();
        browser.sleep(vars.timeToWaitTab);
        browser.getCurrentUrl().then(function (url) {
            expect(url).toMatch(/#\/forum/);

        });

    });
    it('bbb-216:forum:check create a new topic button', function () {

        login.loginWithRandomUser();
        // from the main forum page
        forum.get();
        expect(forum.newTopicButton.isPresent()).toBe(true, 'fallo0');
        forum.newTopicButton.click();
        browser.getCurrentUrl().then(function (url) {
            console.log('url', url);
            expect(url).toMatch(/#\/forum\/new-theme/, 'fallo1');
            //from a category
            forum.get();
            browser.sleep(vars.timeToWaitTab);
            forum.newsCategory.click();
            expect(forum.newTopicButton.isPresent()).toBe(true, 'fallo4');
            forum.newTopicButton.click();
            browser.getCurrentUrl().then(function (url) {
                expect(url).toMatch(/#\/forum\/new-theme/, 'fallo2');
                //from a topic
                forum.get();

                browser.sleep(vars.timeToWaitTab);
                forum.newsCategory.click();

                forum.createNewTopic();

                browser.sleep(vars.timeToWaitLoadForumCategory);
                expect(forum.newTopicButton.isPresent()).toBe(false, 'fallo3');

            });
        });
    });

    it('bbb-225:forum:create a new topic (not registered)', function () {
        forum.get();
        forum.newTopicButton.click();
        browser.getCurrentUrl().then(function (url) {
            expect(url).toMatch(/#\/login/);
            forum.get();
            browser.get('#/forum/new-theme/');
            browser.getCurrentUrl().then(function (url2) {
                expect(url2).toMatch(/#\/login/);
            });
        });
    });


    it('bbb-226:forum:create a new topic wrong', function () {
        login.loginWithRandomUser();

        var titulo = 'tema automatico ' + Number(new Date());
        var contenido = 'comentario automatico ' + Number(new Date());


        //topic no category
        forum.get();
        forum.newTopicButton.click();
        forum.newTopicTitle.sendKeys(titulo);
        forum.newTopicDescription.all(by.css('div')).get(15).click();
        forum.newTopicDescription.all(by.css('div')).get(15).sendKeys(contenido);
        expect(forum.publishTopic.getAttribute('aria-disabled')).toBe('true');


        //topic no title
        forum.get();
        forum.newTopicButton.click();
        forum.categoryList.click();
        forum.categoryList.all(by.css('li')).get(4).click();
        forum.newTopicDescription.all(by.css('div')).get(15).click();
        forum.newTopicDescription.all(by.css('div')).get(15).sendKeys(contenido);
        expect(forum.publishTopic.getAttribute('aria-disabled')).toBe('true');


        //topic no description
        forum.get();
        forum.newTopicButton.click();
        forum.categoryList.click();
        forum.categoryList.all(by.css('li')).get(4).click();
        forum.newTopicTitle.sendKeys(titulo);
        expect(forum.publishTopic.getAttribute('aria-disabled')).toBe('true');

        //all is ok
        forum.get();
        forum.newTopicButton.click();
        forum.categoryList.click();
        forum.categoryList.all(by.css('li')).get(4).click();
        forum.newTopicTitle.sendKeys(titulo);
        forum.newTopicDescription.all(by.css('div')).get(15).sendKeys(contenido);
        expect(forum.publishTopic.getAttribute('aria-disabled')).toBe('false');

        login.logout();
    });

    it('bbb-194:forum: contact us (unregister user)', function () {
        forum.get();
        globalFunctions.navigatorLanguage()
            .then(function (language) {
                expect(forum.contactUsLink.getAttribute('href')).toEqual(vars.supportEmail(language));
            });
    });

    it('bbb-191:forum: contact us (register user)', function () {

        login.loginWithRandomUser();
        forum.get();
        browser.executeScript('arguments[0].click()', forum.contactUsButton.getWebElement()).then(function () {
            expect(modals.okDialog.isEnabled()).toBe(false);
            modals.sendCommentsTextarea.sendKeys('Esto es un mensaje');
            browser.sleep(vars.timeToWaitSendKeys);
            expect(modals.okDialog.isEnabled()).toBe(true);
            modals.okDialog.click();
        });
    });

    it('bbb-217:forum:breadcrumbs functionalities', function () {

        login.loginWithRandomUser();
        forum.get();
        expect(forum.breadcrumbsForo.isPresent()).toBe(true, 'Forum breadcrumb fail 1');
        expect(forum.breadcrumbsForo.getCssValue('color')).toBe('rgba(55, 59, 68, 1)', 'Forum breadcrumb color fail 1');
        //categoria
        forum.newsCategory.click();
        expect(forum.breadcrumbsCategory.isPresent()).toBe(true, 'Category breadcrumb fail 1');
        expect(forum.breadcrumbsForo.getCssValue('color')).toBe('rgba(55, 59, 68, 1)', 'Forum breadcrumb color fail 2');
        expect(forum.breadcrumbsCategory.getCssValue('color')).toBe('rgba(140, 145, 155, 1)', 'Category breadcrumb color fail 1');
        forum.breadcrumbsForo.click();
        forum.newsCategory.click();
        //tema
        forum.categoryTopicTitleArray.get(0).click();
        expect(forum.breadcrumbsCategory.isPresent()).toBe(true, 'Topic breadcrumb fail 1');
        expect(forum.breadcrumbsForo.getCssValue('color')).toBe('rgba(55, 59, 68, 1)', 'Forum breadcrumb color fail 3');
        expect(forum.breadcrumbsCategory.getCssValue('color')).toBe('rgba(55, 59, 68, 1)', 'Category breadcrumb color fail 2');
        forum.breadcrumbsForo.click();
        expect(forum.breadcrumbsCategory.isPresent()).toBe(false, 'Category breadcrumb is present');
        forum.newsCategory.click();
        expect(forum.breadcrumbsCategory.isPresent()).toBe(true, 'Category breadcrumb fail 2');
        login.logout();

    });

    it('bbb-221:forum:verify check answer count for topic', function () {

        var titulo = 'tema automatico ' + Number(new Date());
        var contenido = 'comentario automatico ' + Number(new Date());

        login.loginWithRandomUser();
        forum.get();
        forum.createNewTopic(titulo, contenido, forum.categoryListOtros);
        forum.createAnswer();
        var answers = forum.answersArray;
        expect(answers.get(0).$('[data-element="forum-answer-number"]').getText()).toContain('1', 'Wrong answer number 1');
        forum.createAnswer();
        expect(answers.get(1).$('[data-element="forum-answer-number"]').getText()).toContain('2', 'Wrong answer number 2');
        forum.breadcrumbsCategory.click();


        //expect(element(by.xpath('//*[@data-element="forum-category-theme-title"][contains(text(), "' + titulo + '")]/../../../../../div[2]//span')).getText()).toContain('2', 'Wrong answer count');
        expect(forum.getAnswerByTitle(titulo).$('[data-element="forum-thread-numberofanswers"]').getText()).toContain('2', 'Wrong answer count');

        login.logout();

    });

    it('bbb-223:forum:check the last answer in a topic', function () {

        var titulo = 'tema automatico ' + Number(new Date());
        var contenido = 'comentario automatico ' + Number(new Date());

        var titulo2 = 'tema automatico2 ' + Number(new Date());
        var contenido2 = 'comentario automatico2 ' + Number(new Date());

        var user = login.loginWithRandomUser();
        forum.get();
        forum.createNewTopic(titulo, contenido, forum.categoryListOtros);

        protractor.promise.all([
            forum.createAnswer()
        ]).then(function () {
            var date = formatDate(new Date());
            browser.driver.navigate().refresh();
            expect(forum.answerUser.getText()).toBe(user.user.toLowerCase(), 'Usuario incorrecto en respuesta 1');
            expect(forum.answerUpdatedAt.getText()).toBe(date, 'Fecha incorrecta en respuesta 1');
            forum.breadcrumbsCategory.click();
            forum.createNewTopic(titulo2, contenido2, forum.categoryListOtros);
            protractor.promise.all([
                forum.createAnswer()
            ]).then(function () {
                date = formatDate(new Date());
                browser.driver.navigate().refresh();
                expect(forum.answerUser.getText()).toBe(user.user.toLowerCase(), 'Usuario incorrecto en respuesta 2');
                expect(forum.answerUpdatedAt.getText()).toBe(date, 'Fecha incorrecta en respuesta 2');
            });
        });
        login.logout();

        function formatDate(date) {
            var monthNames = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun',
                'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
            var fecha = date.getDate() + ' ' + monthNames[date.getMonth()] + '. ' + date.getFullYear() + ', ';
            if (date.getHours() < 10) {
                fecha = fecha + '0' + date.getHours();
            } else {
                fecha = fecha + date.getHours();
            }
            if (date.getMinutes() < 10) {
                fecha = fecha + ':0' + date.getMinutes();
            } else {
                fecha = fecha + ':' + date.getMinutes();
            }
            return fecha;
        }


    });

    it('bbb-218:forum:check differeciated sections on the forum', function () {

        forum.get();
        //general background color:
        expect(forum.forumBackground.getCssValue('background-color')).toBe('rgba(238, 238, 238, 1)', 'Forum background is not grey');
        forum.sectionsArray.count().then(function (numSections) {
            console.log('numSections ' + numSections);
            for (var sectionNumber = 0; sectionNumber < numSections; sectionNumber++) {
                if (sectionNumber !== 0) {
                    expect(forum.sectionsArray.get(sectionNumber).$('[data-element="forum-section-header"]').isPresent()).toBe(true, 'Title fail in section ' + sectionNumber);
                }

                expect(forum.sectionsArray.get(sectionNumber).getCssValue('background-color')).toBe('rgba(255, 255, 255, 1)', 'Background color is not white in section ' + sectionNumber);
                expect(forum.sectionsArray.get(sectionNumber).getCssValue('margin-bottom')).toBe('30px', 'Section margin is not 30px in section ' + sectionNumber);

                checkCategoriesOnSections(sectionNumber);
            }

            function hasLastTopic(section, category) {
                protractor.promise.all([
                    element(by.xpath('//*[contains(@class, "forum__main")]/div/*[contains(@class, "forum__block")][' + section + ']/div[contains(@class, "row")][' + category + ']//span[contains(@data-element, "forum-threads-counter")]')).getText(),
                    element(by.xpath('//*[contains(@class, "forum__main")]/div/*[contains(@class, "forum__block")][' + section + ']/div[contains(@class, "row")][' + category + ']/div[3]//span')).getText()
                ]).then(function (results) {
                    if (results[0] === 0 && results[1] === 0) {
                        expect(element(by.xpath('//*[contains(@class, "forum__main")]/div/*[contains(@class, "forum__block")][' + section + ']/div[contains(@class, "row")][' + category + ']/div[4]//a')).isPresent()).toBe(false, 'Does have last topic');
                    } else {
                        expect(element(by.xpath('//*[contains(@class, "forum__main")]/div/*[contains(@class, "forum__block")][' + section + ']/div[contains(@class, "row")][' + category + ']/div[4]//a')).isPresent()).toBe(true, 'Does not have last topic');
                    }
                });
            }
            function checkCategoriesOnSections(section) {
                element.all(by.xpath('//*[contains(@class, "forum__main")]/div/*[contains(@class, "forum__block")][' + section + ']/div[contains(@class, "row")]')).then(function (rows) {
                    for (var categoria = 1; categoria <= rows.length; categoria++) { //Iterates over the categories
                        //console.log('Seccion: '+seccion+' || Categoria: '+categoria);
                        hasLastTopic(section, categoria);
                    }
                });
            }
        });



        /*forum.sectionsArray.then(function (items) {
            for (var seccion = 0; seccion <= items.length; seccion++) { //Iterates over the sections
                if (seccion !== 0) { //Si no es la primera, no buscar titulo
                    console.log(seccion);
                    /*expect(element(by.xpath('//*[contains(@class, "forum__main")]/div/*[contains(@class, "forum__block")][' + seccion + ']/div[contains(@class, "section__heading")]')).isPresent()).toBe(true, 'Title fail');
                    element(by.xpath('//*[contains(@class, "forum__main")]/div/*[contains(@class, "forum__block")][' + seccion + ']/div[contains(@class, "section__heading")]')).getText().then(function (text) {
                        console.log('text ' + text);
                    });*/
        /*expect(forum.sectionsArray.get(seccion).$('[data-element="forum-section-header"]').isPresent()).toBe(true, 'Title fail in section ' + seccion);
        forum.sectionsArray.get(seccion).$('[data-element="forum-section-header"]').getText().then(function (text) {
            console.log('text ' + text);
        });
    }
    //console.log(items);
    expect(items[seccion].getCssValue('background-color')).toBe('rgba(255, 255, 255, 1)', 'Background color is not white');
    expect(items[seccion].getCssValue('margin-bottom')).toBe('30px', 'Section margin is not 30px');

    comprobarCategoriasDeSeccion(seccion);
}*/

        /**
        * This function recives a section and iterate over the categories inside it.
        **/
        /*function comprobarCategoriasDeSeccion(seccion) {
            element.all(by.xpath('//*[contains(@class, "forum__main")]/div/*[contains(@class, "forum__block")][' + seccion + ']/div[contains(@class, "row")]')).then(function (rows) {
                for (var categoria = 1; categoria <= rows.length; categoria++) { //Iterates over the categories
                    //console.log('Seccion: '+seccion+' || Categoria: '+categoria);
                    hasLastTopic(seccion, categoria);
                }
            });
        }*/

        /**
        * This function recieves section and category and asserts his behaviour
        **/
        /*function hasLastTopic(seccion, categoria) {
            protractor.promise.all([
                element(by.xpath('//*[contains(@class, "forum__main")]/div/*[contains(@class, "forum__block")][' + seccion + ']/div[contains(@class, "row")][' + categoria + ']//span[contains(@data-element, "forum-threads-counter")]')).getText(),
                element(by.xpath('//*[contains(@class, "forum__main")]/div/*[contains(@class, "forum__block")][' + seccion + ']/div[contains(@class, "row")][' + categoria + ']/div[3]//span')).getText()
            ]).then(function (results) {
                if (results[0] == 0 && results[1] == 0) {
                    expect(element(by.xpath('//*[contains(@class, "forum__main")]/div/*[contains(@class, "forum__block")][' + seccion + ']/div[contains(@class, "row")][' + categoria + ']/div[4]//a')).isPresent()).toBe(false, 'Does have last topic');
                } else {
                    expect(element(by.xpath('//*[contains(@class, "forum__main")]/div/*[contains(@class, "forum__block")][' + seccion + ']/div[contains(@class, "row")][' + categoria + ']/div[4]//a')).isPresent()).toBe(true, 'Does not have last topic');
                }
            });
        }
    });*/
    });

    it('bbb-236:forum:check visit counter to a topic', function () {


        var titulo = 'tema automatico ' + Number(new Date());
        var contenido = 'comentario automatico ' + Number(new Date());

        //create topic and visit topic (visit count does not increment)
        login.loginWithRandomUser();
        forum.get();
        forum.createNewTopic(titulo, contenido, forum.categoryListOtros);
        forum.breadcrumbsCategory.click();
        forum.categoryTopicTitleArray.get(0).click();
        forum.breadcrumbsCategory.click();

        expect(forum.firstTopicVisitCount.getText()).toContain('0', 'Wrong visits count 1');
        login.logout();

        //visit topic logged (increment visit count)
        login.loginWithRandomUser();
        forum.get();
        forum.othersCategory.click();
        forum.categoryTopicTitleArray.get(0).click();
        forum.breadcrumbsCategory.click();
        expect(forum.firstTopicVisitCount.getText()).toContain('1', 'Wrong visits count 2');
        login.logout();

        //visit topic with visitor (visit count does not increment)
        forum.get();
        forum.othersCategory.click();
        forum.categoryTopicTitleArray.get(0).click();
        forum.breadcrumbsCategory.click();
        expect(forum.firstTopicVisitCount.getText()).toContain('1', 'Wrong visits count 3');

    });

    it('bbb-237:forum:Answer a topic (not registered)', function () {

        forum.get();
        forum.othersCategory.click();
        forum.categoryTopicTitleArray.get(0).click();
        browser.sleep(vars.timeToWaitTab);
        expect(header.enterButton.isPresent()).toBe(true, 'Header Enter is not present');
        expect(forum.loginButton.isPresent()).toBe(true, 'Login Enter is not present');

    });

    it('bbb-238:forum:check category pages when many topics', function () {

        login.loginWithRandomUser();
        forum.get();
        forum.noTopicCategories.then(function (noTopic) {
            noTopic[0].click();
            browser.sleep(10000);
            expect(forum.paginationList.isPresent()).toBe(false, 'Pagination is present');
            forum.get();
            forum.moreThanTenTopicCategories.then(function (moreThanTen) {
                moreThanTen[0].click();
                browser.sleep(10000);
                expect(forum.paginationList.isPresent()).toBe(true, 'Pagination is not present');
                login.logout();
            });
        });
    });

    fit('bbb-239:check searchbar for a topic', function(){
        login.loginWithRandomUser({
            youngThan14: true
        });
        
        forum.get();
        expect(forum.searchBar.isPresent()).toBe(true);
        forum.searchBar.sendKeys('tema automatico');
        forum.searchResults.getText().then(function(text){
            expect(text).toContain('tema automatico');
            forum.searchResults.click();
            expect(forum.topicTopicTitle.getText()).toMatch(text);
            browser.sleep(10000);
        });
    });

    it('bbb-240:forum:verify click last topic', function () {

        var titulo = 'tema automatico ' + Number(new Date());
        var contenido = 'comentario automatico ' + Number(new Date());

        login.loginWithRandomUser();
        forum.get();
        forum.createNewTopic(titulo, contenido, forum.categoryListOtros);
        forum.breadcrumbsForo.click();
        forum.lastTopicOthers.click();
        browser.sleep(vars.timeToWaitTab);
        expect(forum.topicTopicTitle.getText()).toMatch(titulo, 'Wrong topic');
        login.logout();

    });

    it('bbb-241:check answer pages when too many answers', function () {

        var titulo = 'tema automatico ' + Number(new Date());
        var contenido = 'comentario automatico ' + Number(new Date());

        login.loginWithRandomUser();
        forum.get();
        forum.createNewTopic(titulo, contenido, forum.categoryListOtros);
        //bucle 10 anwsers (no pagination)
        for (var i = 0; i < 10; i++) {
            forum.createAnswer();
            expect(forum.paginationList.isPresent()).toBe(false, 'Pagination is present');
        }
        //create the 11 answer (pagination is present)
        forum.createAnswer();
        expect(forum.paginationList.isPresent()).toBe(true, 'No pagination is present');
        forum.breadcrumbsForo.click();
        forum.lastTopicOthers.click();
        browser.sleep(vars.timeToWaitTab);
        expect(forum.topicTopicTitle.getText()).toMatch(titulo, 'Wrong topic');
        login.logout();

    });

    it('bbb-242:check categories are always in the same order', function () {

        forum.get();
        forum.checkCategoriesOrder();
        forum.faqCategory.click();
        browser.driver.navigate().refresh();
        forum.get();
        forum.checkCategoriesOrder();
        login.loginFromHeaderForum();
        forum.checkCategoriesOrder();
        header.menuLearn.click();
        browser.driver.navigate().refresh();
        forum.get();
        forum.checkCategoriesOrder();
        login.logout();

    });

    it('bbb-243:check category dropdown when creating a topic from within a category', function () {

        login.loginWithRandomUser();
        forum.get();
        forum.othersCategory.click();
        forum.newTopicButton.click();
        expect(forum.categoryDropdownHeader.getText()).toMatch('Otros', 'Wrong category');
        login.logout();

    });

    it('bbb-360:comprobar que un menos de 14 años no puede escribir (antes de aceptar)', function() {

        login.loginWithRandomUser({
            youngThan14: true
        });

        forum.get();
        forum.newTopicButton.click();
        expect(forum.alertMsg.isPresent()).toBe(true);
        forum.newsCategory.click();
        forum.clickFirstPost();
        forum.createAnswer('automated answer');
        expect(forum.alertMsg.isPresent()).toBe(true);
    });

    it('bbb-368:Boton Responder a un tema', function () {

        var titulo = 'tema automatico ' + Number(new Date());
        var contenido = 'comentario automatico ' + Number(new Date());

        login.loginWithRandomUser();
        forum.get();
        expect(forum.answerTopicButton.isPresent()).toBe(false, 'Answer button is present');
        forum.othersCategory.click();
        expect(forum.answerTopicButton.isPresent()).toBe(false, 'Answer button is present');
        forum.createNewTopic(titulo, contenido, forum.categoryListOtros);
        expect(forum.answerTopicButton.isPresent()).toBe(true, 'Answer button is not present');
        login.logout();

    });

});
