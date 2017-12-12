'use strict';
var Login = require('../login/login.po.js'),
    Variables = require('../commons/variables.js'),
    Commons = require('../commons/commons.po.js'),
    GlobalFunctions = require('../commons/globalFunctions.js');

var login = new Login(),
    vars = new Variables(),
    commons = new Commons(),
    globalFunctions = new GlobalFunctions();

var Forum = function () {
    //header
    this.newTopicButton = $('[data-element="forum-new-topic-button"]');
    this.breadcrumbsForo = $('[data-element="forum-header-breadcrumb-forum"]');
    this.breadcrumbsCategory = $('[data-element="forum-header-breadcrumb-category"]');

    //Footer
    this.contactUsLink = $('[data-element="forum-contact-us-link"]');
    this.contactUsButton = $('[data-element="forum-contact-us-button"]');

    //forum
    this.forumBackground = $('[data-element="forum"]');
    this.forumThreadsCounterArray = element.all(by.xpath('//*[contains(@data-element, "forum-threads")]'));
    this.forumBlockItemTitleArray = by.xpath('//*[contains(@class, "block__item__title")]');

    //sections
    this.sectionsArray = element.all(by.xpath('//*[@data-element="forum-section"]'));
    this.forumSectionHeader = $('[data-element="forum-section-header"]');

    //categories
    this.categoriesArray = element.all(by.xpath('//*[@data-element="forum-section-category"]'));

    this.newsCategory = $('[data-element="forum-category-Noticias"]');
    this.faqCategory = $('[data-element="forum-category-Preguntas frecuentes"]');
    this.othersCategory = $('[data-element="forum-category-Otros"]');
    this.othersForumThreadsCounter = $('[data-element="forum-threads-counter-Otros"]');
    this.lastTopicArray = element.all(by.xpath('//*[contains(@class, "block__last-theme__title")]'));
    this.lastTopicOthers = element(by.xpath('//*/div[3]/div[5]/div[4]/ul/li/a/h3'));
    this.noTopicCategories = element.all(by.xpath('//span[contains(@data-element, "forum-threads")][text()="0"]/../../../..//a'));
    this.moreThanTenTopicCategories = element.all(by.xpath('//*[contains(@data-element, "forum-threads")][.>11]/../../../..//*[contains(@data-element, "forum-category")]'));

    //new topic
    this.categoryList = $('[data-element="forum_category_dropdown"]');
    this.newTopicTitle = $('[data-element="forum-new-theme-title"]');
    this.newTopicDescription = $('[data-element="forum-new-theme-description"]');
    this.forumScroll = '$(\'[data-element="forum-scroll"]\')';
    this.publishTopic = $('[data-element="forum-publish-theme"]');
    this.categoryDropdownHeader = $('[data-element="forum_category_dropdown-heading"]');

    //new topic category dropdown
    this.categoryListNoticias = $('[data-element="forum_category_dropdown-Noticias"]');
    this.categoryListBienvenida = $('[data-element2="forum_category_dropdown-Bienvenida"]');
    this.categoryListOtros = $('[data-element2="forum_category_dropdown-Otros"]');

    //category topic lists
    this.categoryTopicTitle = $('[data-element="forum-category-theme-title"]');
    this.categoryTopicTitleArray = element.all(by.xpath('//*[@data-element="forum-category-theme-title"]'));

    this.topicsArray = element.all(by.xpath('//*[@data-element="forum-topic"]'));
    //this.firstTopicVisitCount = element(by.xpath('//div[@class="forum__block"]/div[1]/div[3]//span'));
    this.firstTopicVisitCount = this.topicsArray.get(0).$('[data-element="forum-thread-numberofviews"]');

    //inside a topic
    this.topicTopicTitle = $('[data-element="forum-theme-theme-title"]');
    this.topicTopicContent = $('[data-element="forum-theme-theme-content"]');
    this.answerTopic = $('[data-element="forum-theme-answer-theme"]');
    this.publishAnswerButton = $('[data-element="forum-theme-publish-answer-button"]');
    this.answerContent = $('[data-element="forum-theme-answer"]');
    this.answersArray = element.all(by.xpath('//*[@data-element="forum-answer"]'));
    this.firstAnswerTopic = element(by.xpath('//div[contains(@class, "ng-scope")]/div[1]/div/span[contains(@class, "forum__answer-number")]'));
    this.secondAnswerTopic = element(by.xpath('//div[contains(@class, "ng-scope")]/div[2]/div/span[contains(@class, "forum__answer-number")]'));
    this.answerUser = element(by.xpath('//div[contains(@class, "answer__header")]/h2[contains(@class, "ng-binding")]'));
    this.answerUpdatedAt = element(by.xpath('//*[contains(@ng-if, "answer.updatedAt")]'));
    this.loginButton = element(by.xpath('//*[contains(@class, "btn--primary")]'));
    this.paginationList = element(by.xpath('//*[contains(@class, "pagination__list")]'));
    this.answerTopicButton = $('[data-element="forum-new-reply-button"]');

    //FAQS
    this.faqCastellanoThreadCounter = $('[data-element="forum-threads-counter-Preguntas frecuentes"]');
    this.faqEnglishThreadCounter = $('[data-element="forum-threads-counter-English"]');
    this.faqNetherlandsThreadCounter = $('[data-element="forum-threads-counter-Netherlands"]');
    this.faqPyccknnThreadCounter = $('[data-element="forum-threads-counter-Pусский"]');
    this.faqItalianoThreadCounter = $('[data-element="forum-threads-counter-Italiano"]');
    this.faqEuskaraThreadCounter = $('[data-element="forum-threads-counter-Euskara"]');
    this.faqCatalaThreadCounter = $('[data-element="forum-threads-counter-Català"]');
    this.faqFrancaisThreadCounter = $('[data-element="forum-threads-counter-Français"]');
    this.faqDeutschThreadCounter = $('[data-element="forum-threads-counter-Deutsch"]');
    this.faqPortuguesThreadCounter = $('[data-element="forum-threads-counter-Português"]');
    this.faqGalegoThreadCounter = $('[data-element="forum-threads-counter-Galego"]');
    this.faqChineseThreadCounter = $('[data-element="forum-threads-counter-简体中文"]');

    //versions
    this.versionCategory = $('[data-element="forum-category-Versiones de Bitbloq"]');

    this.url = '#/forum';

    this.get = function () {
        browser.get(this.url);
    };
    this.createTopicNewUser = function (title, description, category) {
        var user = login.loginWithRandomUser();
        var results = this.createNewTopic(title, description, category);
        return {
            topicTitle: results.topicTitle,
            topicDescription: results.topicDescription,
            user: user

        };

    };
    this.createNewTopic = function (title, description, category) {
        var nameTitle = title || 'titulo_' + Number(new Date());
        var nameDescription = description || 'descripcion_' + Number(new Date());
        var topicCategory = category || this.categoryListNoticias;
        this.get();
        this.newTopicButton.click();
        browser.sleep(vars.timeToWaitTab);
        this.categoryList.click();
        topicCategory.click();
        this.newTopicTitle.sendKeys(nameTitle);
        browser.sleep(vars.timeToWaitSendKeys);

        this.newTopicDescription.all(by.css('div')).get(15).click();
        this.newTopicDescription.all(by.css('div')).get(15).sendKeys(nameDescription);

        browser.sleep(vars.timeToWaitSendKeys);
        this.publishTopic.click();
        //en el momento de creacion de este test, no existia traduccion para este toast
        //una vez exista, se añadira el control del idioma para saucelabs
        globalFunctions.navigatorLanguage()
            .then(function (language) {
                if (language === 'es') {
                    commons.expectToastTimeOutandText({
                        'alertElement': commons.alertTextToast,
                        'text': vars.threadCreated
                    });
                } else {
                    commons.expectToastTimeOutandText({
                        'alertElement': commons.alertTextToast,
                        'text': vars.threadCreatedEN
                    });
                }
            });

        browser.sleep(vars.timeToWaitTab);

        return {
            topicTitle: nameTitle,
            topicDescription: nameDescription

        };

    };
    this.createAnswer = function (answer) {
        var answerText = answer || 'answer_' + Number(new Date());
        this.answerTopic.all(by.css('div')).get(15).click();
        this.answerTopic.all(by.css('div')).get(15).sendKeys(answerText);
        browser.sleep(vars.timeToWaitSendKeys);
        this.publishAnswerButton.click();
        browser.sleep(vars.timeToWaitTab);

        return {
            answer: answerText,

        };
    };

    this.isPresentTitle = function () {
        return $('[data-element="forum-theme-theme-title"]').isPresent();
    };

    this.isPresentContentThread = function () {
        return $('[data-element="forum-theme-theme-content"]').isPresent();
    };

    this.checkCategoriesOrder = function () {
        element.all(this.forumBlockItemTitleArray).then(function (items) {
            expect(items.length).toBe(22);
            expect(items[0].getText()).toBe('Noticias', 'Noticias title fail');
            expect(items[1].getText()).toBe('Bienvenida', 'Bienvenida title fail');
            expect(items[2].getText()).toBe('Preguntas frecuentes', 'Preguntas frecuentes title fail');
            expect(items[3].getText()).toBe('¡Ayuda!', 'Ayuda title fail');
            expect(items[4].getText()).toBe('Exposición', 'Exposición title fail');
            expect(items[5].getText()).toBe('Laboratorio de ideas', 'Laboratorio title fail');
            expect(items[6].getText()).toBe('Otros', 'Otros title fail');
            expect(items[7].getText()).toBe('Preguntas', 'Preguntas title fail');
            expect(items[8].getText()).toBe('Sugerencias', 'Sugerencias title fail');
            expect(items[9].getText()).toBe('Errores y fallos en la web', 'Errores title fail');
            expect(items[10].getText()).toBe('Versiones de Bitbloq', 'Versiones title fail');
            expect(items[11].getText()).toBe('English', 'English title fail');
            expect(items[12].getText()).toBe('Netherlands', 'Netherlands title fail');
            expect(items[13].getText()).toBe('Pусский', 'Pусский title fail');
            expect(items[14].getText()).toBe('Italiano', 'Italiano title fail');
            expect(items[15].getText()).toBe('Euskara', 'Euskara title fail');
            expect(items[16].getText()).toBe('Català', 'Català title fail');
            expect(items[17].getText()).toBe('Français', 'Français title fail');
            expect(items[18].getText()).toBe('Deutsch', 'Deutsch title fail');
            expect(items[19].getText()).toBe('Português', 'Português title fail');
            expect(items[20].getText()).toBe('Galego', 'Galegotitle fail');
            expect(items[21].getText()).toBe('简体中文', '简体中文 title fail');
        });
    };

    this.getAnswerByTitle = function (title) {
        return element(by.xpath('//*[@data-element="forum-category-theme-title"][contains(text(), "' + title + '")]/../../../../..'));

    };

    this.alertMsg = element(by.className('alert--content'));
    this.firstPost = element(by.xpath('//div[@class="forum__block"]/div[1]//a'));
};
module.exports = Forum;