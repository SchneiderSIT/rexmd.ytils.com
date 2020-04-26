/**
 * Ytils JavaScript Toolbox
 * Common
 *
 * by Kim Schneider
 *
 * www.ytils.com
 * www.schneidersit.de
 *
 * MIT License
 * See LICENSE file
 *
 * Party based on the work of Kevin van Zonneveld, published under MIT license.
 * Copyright (c) 2007-2016 Kevin van Zonneveld (https://kvz.io)
 * and Contributors (https://locutus.io/authors).
 */

// The JSLint configuration:
/*jslint browser: true */
/*jslint white: true */
/*jslint this: true */
/*jslint convert: true */
/*global window */
/*global isFinite */
/*global $ */
/*global Ytils */
(function(){

    "use strict";
    if (!window.Ytils) {
        window.Ytils = { };
    }

    if (!window.Ytils.Toolbox) {
        window.Ytils.Toolbox = { };
    }

    if (!window.Ytils.Toolbox.Common) {

        window.Ytils.Toolbox.Common = { };
    }

    /**
     * This function throws an exception with a common
     * Ytils JavaScript Toolbox prefix.
     *
     * @param {string} msg
     */
    window.Ytils.Toolbox.Common.throwException = function(msg) {

        throw "[Ytils JavaScript Toolbox]: " + msg;
    };

    /**
     * This method checks if param val is a function
     *
     * @param val
     * @returns {boolean}
     */
    window.Ytils.Toolbox.Common.isFunction = function(val) {

        return typeof val === "function";
    };

    /**
     * This method checks if param val is an integer number.
     *
     * @param val
     * @returns {boolean}
     */
    window.Ytils.Toolbox.Common.isInt = function(val) {

        return val === +val && Number.isFinite(val) && !(val % 1);
    };

}());