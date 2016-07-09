'use strict';

var Mustache = require ('mustache');

var Logger = function (cls) {

    var DEBUG = 0;
    var INFO  = 1;
    var WARN  = 2;
    var ERROR = 3;
    var FATAL = 4;

    var LEVEL = [
        '[DEBUG]',
        '[INFO] ',
        '[WARN] ',
        '[ERROR]',
        '[FATAL]'
    ];

    var Level = INFO;

    var toUtf8 = function (message) {

        var DLB  = new RegExp ('{{', 'g');
        var DRB  = new RegExp ('}}', 'g');
        var TLB  = new RegExp ('{{{', 'g');
        var TRB  = new RegExp ('{}}', 'g');

        return message
            .replace (TLB, '{{')
            .replace (TRB, '}}')
            .replace (DLB, '{{{')
            .replace (DRB, '}}}');
    };

    var trace = function (level, args) {

        var params  = [].slice.call (args);
        var message = toUtf8 (params[0]);
        var context = params.splice (1).map (JSON.stringify);
        var output  = Mustache.render (message, context);
        var log     = level > WARN ? console.error : console.log;
        log ('[%s] %s %s - %s', (new Date()).toISOString (), LEVEL[level], cls, output);
    };

    return {

        DEBUG : DEBUG,
        INFO  : INFO,
        WARN  : WARN,
        ERROR : ERROR,
        FATAL : FATAL,

        config : function (level) {

            Level = level;

        },

        debug : function () { if (DEBUG >= Level) trace (DEBUG, arguments); },
        info  : function () { if (INFO  >= Level) trace (INFO,  arguments); },
        warn  : function () { if (WARN  >= Level) trace (WARN,  arguments); },
        error : function () { if (ERROR >= Level) trace (ERROR, arguments); },
        fatal : function () { if (FATAL >= Level) trace (FATAL, arguments); }

    };
};

module.exports = Logger;
