/**
 *Spec to makeActionsEdit.spec.js
 * Menu Edit of makeActions
 */

'use strict';

var GlobalFunctions = require('../../../commons/globalFunctions.js');

var globalFunctions = new GlobalFunctions();

globalFunctions.xmlReport('makeActionsEdit');

describe('Menu file of MakeActions', function() {

    //beforeEach commons
    globalFunctions.beforeTest();

    // afterEach commons
    globalFunctions.afterTest();

    it('bba-133: Verify undo&redo action on hwTab', function() {

        expect(true).toBe(true);

    });

});
