/**
 *
 * Global variables
 *
 */

'use strict';

var Variables = function() {
    //count for login
    this.user = 'luisangonzalez5';
    this.password = '123456';

    //count google for login
    this.userGoogle = 'test2bitbloq@gmail.com';
    this.userNameGoogle = 'qa2015';
    this.firstNameGoogle = 'Test';
    this.lastNameGoogle = 'Test';
    this.passwordGoogle = 'test2015bitbloq';

    //count facebook for login
    this.emailFb = 'webpruebas.2@gmail.com';
    this.passwordFb = 'webpruebas.2webpruebas.2';
    this.userFb = 'Paco';
    this.lastnameFb = 'Gómez';

    //timers
    this.timeToWaitFadeModals = 2000;
    this.timeToWaitAutoSave = 5600;
    this.timeToWaitTab = 3000;
    this.timeToWaitMenu = 500;
    this.timeToWaitSendKeys = 1000;
    this.timeToWaitLoadExporeProjects = 3000;
    this.timeForDelete = 15000;

    //Languages support email, default is EN
    this.supportEmailES = 'mailto:soporte.bitbloq@bq.com';
    this.supportEmailEN = 'mailto:support.bitbloq.en@bq.com';
    this.supportEmailFR = 'mailto:support.bitbloq.fr@bq.com';
    this.supportEmailDE = 'mailto:support.bitbloq.de@bq.com';
    this.supportEmailPT = 'mailto:support.bitbloq.pt@bq.com';
    this.supportEmailSV = 'mailto:support.bitbloq.sv@bq.com';
    this.supportEmailRU = 'mailto:support.bitbloq.ru@bq.com';
    this.supportEmailIT = 'mailto:support.bitbloq.it@bq.com';

    this.sendCommentsLiteral = 'Enviar comentarios a Bitbloq';
    this.infoErrorLiteral = 'Informar de un error';

    this.account = function(cuenta) {
        if (cuenta === 'google') {
            return {
                user: this.userGoogle,
                username: this.userNameGoogle,
                firstname: this.firstNameGoogle,
                lastname: this.lastNameGoogle,
                password: this.passwordGoogle
            };

        } else if (cuenta === 'facebook') {
            return {
                email: this.emailFb,
                password: this.passwordFb,
                user: this.userFb,
                lastname: this.lastnameFb
            };
        } else if (cuenta === 'bitbloq') {
            return {
                user: this.user,
                password: this.password
            };
        } else {
            throw 'NOT IS VALID ACCOUNT';
        }
    };

};

module.exports = Variables;
