/**
 * Page objects of alerts.html
 */
'use strict';

//TODO , check alert && add data-element
var Alerts = function() {

    this.alert = element(by.binding('alert.text'));

    this.alertTextEditCode = 'Si editas el código no podrás volver a utilizar los bloques en este proyecto.';
    this.alertTextEditCodeEN = 'If you edit the code, you won´t be able to use the blocks in this project';
    this.textResetPasswordNewLink = 'No se ha podido cambiar la contraseña. Por favor, solicita un nuevo link';
    this.textResetPasswordNewLinkEN = 'It was not possible to change your password. Please request a new link';
};

module.exports = Alerts;
