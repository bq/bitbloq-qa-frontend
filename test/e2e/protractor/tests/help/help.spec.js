'use strict';

var HelpSpec = function() {

	var Login = require('../login/login.po.js'),
	    Header = require('../header/header.po.js'),
	    Help = require('./help.po.js'),
	    Make = require('../make/make.po.js'),
	    Modals = require('../modals/modals.po.js'),
		Variables = require('../commons/variables.js');

	var login = new Login(),
		header = new Header(),
		help = new Help(),
		make = new Make(),
		modals = new Modals(),
		vars = new Variables();

	describe('Help ', function() {
		vars.beforeTest();

		it('bba-32:Appears the FAQs with a registered user', function() {
        	login.loginWithRandomUser();
        	header.navHelp.click();
        	help.tutorialTab.click();
        	help.faqTab.click();
        	expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '#/help/faq');
        	login.logout();
    	});

    	it('bba-77:Appears the FAQs with an unregistered user', function() {
    		make.get();
    		modals.attentionContinueGuest.click();
    		modals.rejectTour();
			browser.sleep(vars.timeToWaitFadeModals);
			header.navHelp.click();
        	help.tutorialTab.click();
        	help.faqTab.click();
        	expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '#/help/faq');
    	});
	});
};

module.exports = new HelpSpec();