'use strict';

var Walkthrough = function() {
	this.stepOne = $('.tour-step--first');
	this.boards = $('[data-element="toolbox-boards"]');
	this.freaduino = $('[data-transfer="Freaduino UNO"]');
	this.protoboardCanvas = $('#protoboard-canvas');
	this.stepTwo = $('.tour-step--second');
	this.stepThree = $('.tour-step--third');
	this.stepFour = $('.tour-step--fourth');
	this.stepFive = $('.tour-step--fifth');
	this.stepSix = $('.tour-step--sixth');
	this.stepSeven = $('.tour-step--seventh');
};

module.exports = Walkthrough;
