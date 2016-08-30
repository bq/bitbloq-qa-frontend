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

    //STATIC (no del) count google for login and forum admin
    this.userGoogle = 'test2bitbloq@gmail.com';
    this.userNameGoogle = 'qa2015';
    this.firstNameGoogle = 'Test';
    this.lastNameGoogle = 'Test';
    this.passwordGoogle = 'test2016bitbloq';

    //DINAMIC (del)
    this.userGoogleTwo = 'testprove2016@gmail.com';
    this.userNameGoogleTwo = 'googerUserTest' + Number(new Date());
    this.firstNameGoogleTwo = 'Benito';
    this.lastNameGoogleTwo = 'Camelas';
    this.passwordGoogleTwo = 'test2016bitbloq';

    //count facebook for login
    this.emailFb = 'webpruebas.2@gmail.com';
    this.passwordFb = 'webpruebas.2webpruebas.2';
    this.userFb = 'Paco';
    this.lastnameFb = 'Gómez';
    this.usernameFb = 'webpruebas';

    //timers
    this.timeToWaitFadeModals = 2000;
    this.timeToWaitAutoSave = 6600;
    this.timeToWaitTab = 3000;
    this.timeToWaitMenu = 500;
    this.timeToWaitSendKeys = 1000;
    this.timeToWaitLoadExporeProjects = 3000;
    this.timeForDelete = 15000;
    this.timeToWaitLoadForumCategory = 15000;
    this.timeToWaitSaveNewProject = 2000;
    this.timeToWaitAlert = 3500;

    //FAQS
    this.numberOfFaqs = 20;

    //versions
    this.versionBitbloq = '3.1.0';

    //Languages support email, default is EN
    this.supportEmailES = 'mailto:soporte.bitbloq@bq.com';
    this.supportEmailFR = 'mailto:support.bitbloq.fr@bq.com';
    this.supportEmailDE = 'mailto:support.bitbloq.de@bq.com';
    this.supportEmailPT = 'mailto:support.bitbloq.pt@bq.com';
    this.supportEmailRU = 'mailto:support.bitbloq.ru@bq.com';
    this.supportEmailIT = 'mailto:support.bitbloq.it@bq.com';
    this.supportEmailSV = 'mailto:support.bitbloq.sv@bq.com';
    this.supportEmailEN = 'mailto:support.bitbloq.en@bq.com';
    this.supportEmail = function(language) {
        switch (language) {
            case 'es':
                return this.supportEmailES;
            case 'fr':
                return this.supportEmailFR;
            case 'de':
                return this.supportEmailDE;
            case 'pt':
                return this.supportEmailPT;
            case 'ru':
                return this.supportEmailRU;
            case 'it':
                return this.supportEmailIT;
            default:
                return this.supportEmailEN;
        }
    };

    //Literals
    this.enterValidYoutubeUrl = 'Introduce una url de Youtube válida';
    this.enterValidYoutubeUrlEN = 'Enter a valid Youtube URL';

    this.infoErrorLiteral = 'Informar de un error';
    this.infoErrorLiteralEN = 'Report an error';

    this.nameNewProject = 'Proyecto sin título';
    this.nameNewProjectEN = 'Untitled project';

    this.contact = 'Contacto';
    this.contactEN = 'Contact';

    this.diwoUrlLearn = 'http://diwo.bq.com/course/aprende-robotica-y-programacion-con-bitbloq-2/';
    this.diwoUrlLearnEN = 'http://diwo.bq.com/en/course/aprende-robotica-y-programacion-con-bitbloq-2/';

    this.toastIsPrivateProject = 'Este es un proyecto privado y no tienes permisos para verlo.';
    this.toastIsPrivateProjectEN = 'This is a private project and you are not allowed to view it.';

    //Toast Literals
    this.toastResetPasswordNewLink = 'No se ha podido cambiar la contraseña. Por favor, solicita un nuevo link';

    //send comentes
    this.sendCommentsLiteralEN = 'Send comments to Bitbloq';
    this.sendCommentsLiteral = 'Enviar comentarios a Bitbloq';

    //Pictures Toast
    this.pictureSmall = 'Las dimensiones de la imagen son demasiado pequeñas';
    this.pictureSmallEN = 'The image dimensions are too small';
    this.pictureBig = 'Las dimensiones de la imagen son muy grandes';
    this.pictureBigEN = 'The image dimensions are too big';
    this.fileNoPicture = 'El archivo no es una imagen';
    this.fileNoPictureEN = 'This is not an image file';

    //Forum Toast
    this.threadCreated = 'Tema creado';
    this.threadCreatedEN = 'Thread created';


    this.account = function(cuenta) {
        if (cuenta === 'google') {
            return {
                user: this.userGoogle,
                username: this.userNameGoogle,
                firstname: this.firstNameGoogle,
                lastname: this.lastNameGoogle,
                password: this.passwordGoogle
            };
        } else if (cuenta === 'googleProve') {
            return {
                user: this.userGoogleTwo,
                username: this.userNameGoogleTwo,
                firstname: this.firstNameGoogleTwo,
                lastname: this.lastNameGoogleTwo,
                password: this.passwordGoogleTwo
            };
        } else if (cuenta === 'facebook') {
            return {
                email: this.emailFb,
                password: this.passwordFb,
                user: this.userFb,
                lastname: this.lastnameFb,
                username: this.usernameFb
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
