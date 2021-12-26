/**
 * Ytils Yupput
 * Self-contained full library file.
 *
 * by Kim Schneider
 *
 * www.ytils.com
 * www.schneidersit.de
 *
 * MIT License
 * See LICENSE file
 */

// The JSLint configuration:
/*global Ytils */
/*global window */
/*global alert */
/*global Image */
/*global console */
/*jslint long: true */
/*jslint browser: true */
/*jslint white: true */
/*jslint this: true */
/*jslint for: true */
(function() {

        "use strict";
    if (!window.Ytils) {

        window.Ytils = { };
    }
        Ytils.YupputHelper = { };

    /**
     * Whether given parameter obj is a HTML element or not.
     *
     * @param {*} obj
     * @returns {boolean}
     */
    Ytils.YupputHelper.isHtmlElement = function(obj) {

        return (typeof obj === "object") && (obj.nodeType === 1) &&
            (typeof obj.style === "object") && (typeof obj.ownerDocument === "object");
    };

    /**
     * Whether current browser is the Internet Explorer and if so, which version.
     *
     * @returns {{isIE: boolean, version: number}|{isIE: boolean, version: null}}
     */
    Ytils.YupputHelper.isIEWVersion = function()
    {
        var ua = window.navigator.userAgent;
        var msIE = ua.indexOf("MSIE ");
        var version;

        if (msIE > 0)
        {
            try {

                version = parseInt(ua.substring(msIE + 5, ua.indexOf(".", msIE)), 10);

                return { "isIE": true, "version": version };

            } catch { }

            return { "isIE": true, "version": null };
        }

        return { "isIE": false, "version": null };
    };

    /**
     * Whether given param is an array or not.
     *
     * @param {*} obj
     * @returns {boolean}
     */
    Ytils.YupputHelper.isArray = function(obj) {

        return typeof obj === "object" && typeof obj.length === "number";
    };

    /**
     * Whether given param is an object or not.
     *
     * @param {*} obj
     * @returns {boolean}
     */
    Ytils.YupputHelper.isObject = function(obj) {

        return typeof obj === "object";
    };

    /**
     * Whether given param is a boolean or not.
     *
     * @param {*} obj
     * @returns {boolean}
     */
    Ytils.YupputHelper.isBoolean = function(obj) {

        return typeof obj === "boolean";
    };

    /**
     * Whether given param is a string or not.
     *
     * @param {*} obj
     * @returns {boolean}
     */
    Ytils.YupputHelper.isString = function(obj) {

        return typeof obj === "string";
    };

    /**
     * To generate ids for YupputItem containers.
     *
     * @param {numeric} numericId
     * @returns {string}
     */
    Ytils.YupputHelper.createUniqueFindingId = function(numericId) {

        return "ytilsYupputFinding" + numericId;
    };

    /**
     * This function simply returns the current timestamp.
     * You may NOT use this value directly as a HTML id as it is invalid to
     * use just numbers as HTML id.
     *
     * @returns {number}
     */
    Ytils.YupputHelper.createUniqueButUpcountableInitialId = function() {

        return Date.now();
    };

    /**
     * Whether obj is a string and contains val or not.
     *
     * @param {*} obj
     * @param {string} val
     */
    Ytils.YupputHelper.isStringContaining = function(obj, val) {

        var a = Ytils.YupputHelper.isString(obj);
        var b = obj.indexOf(val) !== -1;

        return  a && b;
    };

    /**
     * Whether obj is a string and starts with val or not.
     *
     * @param {*} obj
     * @param {string} val
     */
    Ytils.YupputHelper.isStringStartingWith = function(obj, val) {

        return Ytils.YupputHelper.isString(obj) && (obj.lastIndexOf(val, 0) === 0);
    };

    /**
     * Returns true if obj is a non-empty string.
     *
     * @param {*} obj
     * @returns {boolean}
     */
    Ytils.YupputHelper.isNonEmptyString = function(obj) {

        if (Ytils.YupputHelper.isString(obj)) {

            return obj.trim() !== "";
        }

        return false;
    };

    /**
     * Returns true if obj is a number representing an integer value.
     *
     * @param {*} obj
     * @returns {boolean}
     */
    Ytils.YupputHelper.isInt = function(obj) {

        return typeof obj === "number" && obj === parseInt(obj, 10);
    };

    /**
     * Returns true if val is a string of length 1 between 0-9, a-z and A-Z.
     *
     * @param {*} val
     * @returns {boolean}
     */
    Ytils.YupputHelper.isAz09Char = function(val) {

        var OK_CHARS = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

        return Ytils.YupputHelper.isString(val) && val.length === 1 && OK_CHARS.indexOf(val) !== -1;
    };

    /**
     * Expects parameter val to be a string.
     *
     * @param {string} val
     * @param {string} msg
     */
    Ytils.YupputHelper.expectString = function(val, msg) {

        if (!Ytils.YupputHelper.isString(val)) {

            Ytils.YupputHelper.thrErr(msg);
        }
    };

    /**
     * Expects parameter val to be an integer.
     *
     * @param {string} val
     * @param {string} msg
     */
    Ytils.YupputHelper.expectInt = function(val, msg) {

        if (!Ytils.YupputHelper.isInt(val)) {

            Ytils.YupputHelper.thrErr(msg);
        }
    };

    /**
     * Expects parameter val to be a boolean.
     *
     * @param {string} val
     * @param {string} msg
     */
    Ytils.YupputHelper.expectBoolean = function(val, msg) {

        if (!Ytils.YupputHelper.isBoolean(val)) {

            Ytils.YupputHelper.thrErr(msg);
        }
    };

    /**
     * Expects parameter val to be a single char within a-z, A-Z or 0-9.
     *
     * @param {string} val
     * @param {string} msg
     */
    Ytils.YupputHelper.expectAz09Char = function(val, msg) {

        if (!Ytils.YupputHelper.isAz09Char(val)) {

            Ytils.YupputHelper.thrErr(msg);
        }
    };

    /**
     * Expects parameter val to be a single char within a-z, A-Z or 0-9.
     *
     * @param {string} val
     * @param {string} msg
     */
    Ytils.YupputHelper.expectAz09CharOrNull = function(val, msg) {

        if (null !== val) {

            if (!Ytils.YupputHelper.isAz09Char(val)) {

                Ytils.YupputHelper.thrErr(msg);
            }
        }
    };

    /**
     * Expects parameter func to be a function and throws an exception with string msg if func is not a function.
     *
     * @param {function} func
     * @param {string} msg
     * @throws Throws an exception with message msg.
     */
    Ytils.YupputHelper.expectFunction = function(func, msg) {

        if (typeof func !== "function") {

            Ytils.YupputHelper.thrErr(msg);
        }
    };

    /**
     * Expects parameter func to be a function or null and throws an exception with string msg if func is not a function.
     *
     * @param {function} func
     * @param {string} msg
     * @throws Throws an exception with message msg.
     */
    Ytils.YupputHelper.expectFunctionOrNull = function(func, msg) {

        if (null !== func && typeof func !== "function") {

            Ytils.YupputHelper.thrErr(msg);
        }
    };

    /**
     * Savely return object key key from parameter obj or null if obj is not an object or the key does not exist.
     *
     * @param {object} obj
     * @param {string|number} key
     * @returns {null|*}
     */
    Ytils.YupputHelper.god = function(obj, key) {

        if (Ytils.YupputHelper.isObject(obj) && obj.hasOwnProperty(key)) {

            return obj[key];
        }

        return null;
    };

    /**
     * Savely return object key key from parameter obj or default def if obj is not an object or the key does not exist.
     *
     * @param {object} obj
     * @param {string|number} key
     * @param {*} def
     * @returns {null|*}
     */
    Ytils.YupputHelper.godd = function(obj, key, def) {

        if (Ytils.YupputHelper.isObject(obj) && obj.hasOwnProperty(key)) {

            return obj[key];
        }

        return def;
    };

    /**
     * Throws a "[Ytils.Yupput] "-prefixed exception.
     * @param error
     */
    Ytils.YupputHelper.thrErr = function(error) {

        throw "[Ytils.Yupput] " + error;
    };
        Ytils.YupputHtml = { };

    /**
     * This function returns the CSS text for a HTML element referenced by id and returns the CSS for the key cssKey.
     *
     * @param {string} id
     * @param {string} cssKey
     * @returns {*}
     */
    Ytils.YupputHtml.getCssFromElement = function(id, cssKey)
    {
        return window.getComputedStyle(document.getElementById(id)).getPropertyValue(cssKey);
    };

    /**
     * Updates the z-index of HTML element referenced by id
     *
     * @param {string} id
     * @param {number} zIndex
     */
    Ytils.YupputHtml.setZIndexImportant = function(id, zIndex)
    {
        Ytils.YupputHtml.expectExisting(id);
        document.getElementById(id).style.setProperty("z-index", zIndex, "important");
    };

    /**
     * Creates and appends a div with given id if it does not exists. In both cases it will return the html element.
     *
     * @param {string} id
     * @returns {HTMLElement}
     */
    Ytils.YupputHtml.createAndAppendIfNotExists = function(id) {

        if (false === Ytils.YupputHtml.isExisting()) {

            return Ytils.YupputHtml.createAndAppendDivWithId(id);
        }

        return document.getElementById(id);
    };

    /**
     * Sets the inner HTML of the HTML element referenced by the given id.
     *
     * @param {string} id
     * @param {string} html
     */
    Ytils.YupputHtml.setInnerHtml = function(id, html) {

        if (false === Ytils.YupputHtml.isExisting(id)) {

            Ytils.YupputHelper.thrErr("setInnerHtml expects parameter id to represent an existing HTML ID.");
        }

        document.getElementById(id).innerHTML = html;
    };

    /**
     * Clears the inner HTML of the HTML element referenced by the given id.
     *
     * @param {string} id
     * @return HTMLObjectElement
     */
    Ytils.YupputHtml.clearInnerHtmlAndGetElement = function(id)
    {
        Ytils.YupputHtml.setInnerHtml(id, "");

        return document.getElementById(id);
    };

    /**
     * * Creates a DIV-HtmlObjectElement, but not appends it to the body.
     *
     * @returns {HTMLDivElement}
     */
    Ytils.YupputHtml.createDivHtmlElement = function() {

        return document.createElement("div");
    };

    /**
     * Creates a DIV-HtmlObjectElement with a id and class name, but not appends it to the body.
     *
     * @param {string} id
     * @param {string} className
     * @returns {HTMLObjectElement}
     */
    Ytils.YupputHtml.createDivHtmlElementWIdAndClass = function(id, className) {

        var div = Ytils.YupputHtml.createDivHtmlElement();
        div.className = className;
        div.id = id;

        return div;
    };

    /**
     * Creates a new DIV-HTMLObjectElement, appends it to the body and returns the newly created element.
     *
     * @param {string} id
     * @returns {HTMLObjectElement}
     */
    Ytils.YupputHtml.createAndAppendDivWithId = function(id) {

        var div = Ytils.YupputHtml.createDivHtmlElement();
        div.id = id;

        document.body.appendChild(div);

        return div;
    };

    /**
     * Whether an HTML element exists with a given id or not.
     *
     * @param {string} id
     * @returns {boolean}
     */
    Ytils.YupputHtml.isExisting = function(id) {

        return null !== document.getElementById(id);
    };

    /**
     * Expects parameter id to represent an existing HTML element. Otherweise an exception will be thrown.
     *
     * @param id
     */
    Ytils.YupputHtml.expectExisting = function(id) {

        if (false === Ytils.YupputHtml.isExisting(id)) {

            Ytils.YupputHelper.thrErr("Expecting existing HTML element with ID: " + id);
        }
    };

    /**
     * Sets the selection range to an input type="text" or textarea handle.
     *
     * @param {HTMLObjectElement} inputHandle
     * @param {number} start
     * @param {number} end
     */
    Ytils.YupputHtml.setSelectionRange = function(inputHandle, start, end) {

        var CHARACTER = "character";
        var range;

        if (inputHandle.setSelectionRange) {

            inputHandle.focus();
            inputHandle.setSelectionRange(start, end);

        } else if (inputHandle.createTextRange) {

            range = inputHandle.createTextRange();

            range.collapse(true);
            range.moveEnd(CHARACTER, end);
            range.moveStart(CHARACTER, start);
            range.select();
        }
    }

    /**
     * Sets the cursor position to an input type="text" or textarea handle.
     *
     * @param {HTMLObjectElement} inputHandle
     * @param {number} pos
     */
    Ytils.YupputHtml.setCursorPosition = function(inputHandle, pos)
    {
        Ytils.YupputHtml.setSelectionRange(inputHandle, pos, pos);
    }

    /**
     * Forces the browser to load an image so it might be available when Yupput.show() is called.
     *
     * @param {string} url
     */
    Ytils.YupputHtml.preloadImage = function(url) {

        var img = new Image();
        img.src = url;
    };

    /**
     * Hides HTML element with id.
     *
     * @param {string} id
     * @returns {HTMLObjectElement|null}
     */
    Ytils.YupputHtml.hide = function(id) {

        var elem = document.getElementById(id);
        if (elem) {

            return Ytils.YupputHtml.hideElement(elem);
        }

        return null;
    };

    /**
     * Adds display: none; CSS to a given HTMLObject element. If parameter is invalid, an exception will be thrown.
     *
     * @param {object} elem
     * @returns HTMLObjectElement
     */
    Ytils.YupputHtml.hideElement = function(elem) {

        if (elem && elem.style) {

            elem.style.display = "none";

        } else {

            Ytils.YupputHelper.thrErr("Ytils.YupputHtml.hideElement() expects parameter elem to be an instance of HTMLObjectElement.");
        }

        return elem;
    };

    /**
     * Shows HTML element with id.
     *
     * @param {string} id
     * @return {HTMLObjectElement|null}
     */
    Ytils.YupputHtml.show = function(id) {

        var elem = document.getElementById(id);
        if (elem) {

            return Ytils.YupputHtml.showElement(elem);
        }

        return null;
    };

    /**
     * Adds display: block; CSS to a given HTMLObject element. If parameter is invalid, an exception will be thrown.
     *
     * @param {object} elem
     * @return HTMLObjectElement
     */
    Ytils.YupputHtml.showElement = function(elem) {

        if (elem && elem.style) {

            elem.style.display = "block";

        } else {

            Ytils.YupputHelper.thrErr("Ytils.YupputHtml.showElement() expects parameter elem to be an instance of HTMLObjectElement.");
        }

        return elem;
    };

    /**
     * Adds visibility: visible/hidden; CSS to a given HTMLObject element. If parameter is invalid, an exception with
     * message excMsg will be thrown.
     *
     * @param {object} elem
     * @param {string} visibility
     * @param {string} excMsg
     * @return HTMLObjectElement
     */
    Ytils.YupputHtml.visibleOrInvisibleElement = function(elem, visibility, excMsg) {

        if (elem && elem.style) {

            elem.style.visibility = visibility;

        } else {

            Ytils.YupputHelper.thrErr(excMsg);
        }

        return elem;
    };

    /**
     * Adds visibility: visible; CSS to a given HTMLObject element. If parameter is invalid, an exception will be thrown.
     *
     * @param {object} elem
     * @return HTMLObjectElement
     */
    Ytils.YupputHtml.visibleElement = function(elem) {

        var msg = "Ytils.YupputHtml.visibleElement() expects parameter elem to be an instance of HTMLObjectElement.";

        return Ytils.YupputHtml.visibleOrInvisibleElement(elem, "visible", msg);
    };

    /**
     * Adds visibility: hidden; CSS to a given HTMLObject element. If parameter is invalid, an exception will be thrown.
     *
     * @param {object} elem
     * @return HTMLObjectElement
     */
    Ytils.YupputHtml.invisibleElement = function(elem) {

        var msg = "Ytils.YupputHtml.invisibleElement() expects parameter elem to be an instance of HTMLObjectElement.";

        return Ytils.YupputHtml.visibleOrInvisibleElement(elem, "hidden", msg);
    };


        Ytils.YupputInput = { };

    /**
     * Returns an input HTML element handle.
     *
     * @param {string} id
     * @throws Throws an exception if id does not represent a HTML input handle.
     * @returns {HTMLElement}
     */
    Ytils.YupputInput.getInputTypeTextHandleById = function(id) {

        var inputHandle = document.getElementById(id);
        var isInputText = Ytils.YupputHelper.isHtmlElement(inputHandle) && inputHandle.type === "text";

        if (false === isInputText) {

            throw "Parameter id does not represent a HTML input element.";
        }

        return inputHandle;
    };

    /**
     * Moves Cursor to the end of a HTML input type text element.
     *
     * @param {string} id
     */
    Ytils.YupputHtml.moveCursorToEndOfInput = function(id) {

        var handle = Ytils.YupputInput.getInputTypeTextHandleById(id);
        var inputLength = handle.value.length;

        handle.focus();
        handle.setSelectionRange(inputLength, inputLength);
    };

    /**
     * Clears the value of an input element.
     *
     * @param {string} id
     */
    Ytils.YupputInput.clearInput = function(id) {

        Ytils.YupputInput.getInputTypeTextHandleById(id).value = "";
    };

    /**
     * Returns the value of an HTML input type="text" element.
     *
     * @param {string} id
     * @returns {string}
     */
    Ytils.YupputInput.getValueFromInput = function(id) {

        return Ytils.YupputInput.getInputTypeTextHandleById(id).value;
    };

    /**
     * Whether the referenced input type="text" is empty or not.
     *
     * @param {string} id
     * @returns {boolean}
     */
    Ytils.YupputInput.isEmptyInput = function(id) {

        var val = Ytils.YupputInput.getValueFromInput(id);

        return false === Ytils.YupputHelper.isNonEmptyString(val);
    };


    /**
     * @typedef YupputItem
     * @property {string} html - The rendered HTML according to the data below.
     * @property {string} values.headline - The headline of the entry.
     * @property {string[]} values.metaData - An array of string to display meta data in the second row below the headline.
     * @property {string} [values.thumbnail] - Optional: The url to the thumbnail image.
     * @property {string} values.value - The value to return to the callback if value[x] has been selected.
     */

    /**
     * The Yupput constructor.
     *
     * @param {YupputItem[]} values - An array of objects with the following parameters:
     * @param {inputCallback} callback - The callback function for selections on Yupput. Two parameters will be passed into this callback.
     * @callback inputCallback
     * @param {YupputItem} callback.selectedYupputItem The value of the selected item that has been passed in into Yupput before.
     * @param {string} callback.inputValue The value of the input element at the enter-key-event or on selection of an item.
     *
     * @callback callbackOnChange
     * @param {string} callback.inputValue The current value of the input element.
     * @callback callbackThumbnailClick
     * @param {string} callback.value The current value of the input element.
     * @param {string} callback.thumbnail The current thumbnail image.
     *
     * @param {object} config
     * @param {string} [config.placeholder] - The placeholder text for the input on the top, defaults to "Search value".
     * @param {number} [config.zIndex] - The z-index for the absolute positioned Yupput container, defaults to 2000.
     * @param {number} [config.maxItemCount] - The maximum number of items being displayed on the Yupput dialogue. Defaults to 4.
     * @param {string} [config.ctrlShiftChar] - The char that opens the Yupput dialogue, when hit together with Control and Shift. If set to null, no keyboard combination will open Yupput directly. Defaults to "Y".
     * @param {boolean} [config.hideOnEscape] - Whether to hide Yupput dialogue on escape or not. Defaults to true.
     * @param {boolean} [config.matchCaseInsensitive] - Whether to match case insensitive or not. Defaults to true.
     * @param {boolean} [config.callbackOnNoSelOnEnter] - Whether to fire @callback inputCallback on enter when nothing's been selected. Will use first displayed item or null. Defaults to false.
     * @param {boolean} [config.hideOnCallbackFired] - Whether to hide Yupput dialogue on callback fired or not. Defaults to false.
     * @param {boolean} [config.hideOnClickOutside] - Whether to hide Yupput dialogue on a click outside the dialogue or not. Defaults to false.
     * @param {boolean} [config.preloadImages] - Whether to preload the images of the items passed into the constructor or not. Defaults to false.
     * @param {boolean} [config.matchOnlyHeadline] - Whether to find matches only over the headline value and not within meta data. Defaults to false.
     * @param {boolean} [config.containsForHeadlineMatches] - Whether to use contains for headline matching instead of starts-with-check. Defaults to false.
     * @param {boolean} [config.containsForMetaMatches] - Whether to use contains for meta string matching instead of starts-with-check. Defaults to false.
     * @param {boolean} [config.moveCursorToEndOnUp] - Whether to force the cursor stay at the end of the input element when pressing up. Defaults to true.
     * @param {boolean} [config.stopPropagateEnter] - Whether to stop propagation of enter when hit while the cursor is in Yupput's input field. Defaults to false.
     * @param {boolean} [config.stopPropagateEscape] - Whether to stop propagation of escape when hit while the cursor is in Yupput's input field. Defaults to false.
     * @param {boolean} [config.stopPropagateDblClick] - Whether to stop propagation of double clicking the input field to close Yupput input without selection. Defaults to false.
     * @param {callbackOnChange} [config.callbackOnChange] - Optional function callback that will be fired on input change. The current input value will be passed in.
     * @param {callbackThumbnailClick} [config.callbackThumbnailClick] - Optional callback for clicks on the thumbnail. If callback is configured, this won't trigger the main click on a Yupput item.
     * @throws Will throw an exception if current browser is an Internet Explorer with a version lower than 10.
     * @constructor
     */
    Ytils.Yupput = function(values, callback, config) {

        var DATA_KEY_HEADLINE = "headline";
        var DATA_KEY_META_DATA = "metaData";
        var DATA_KEY_THUMBNAIL = "thumbnail";
        var DATA_KEY_META_VALUE = "value";

        // Configuration defaults:
        var DEFAULT_PLACEHOLDER = "Search value";
        var DEFAULT_Z_INDEX = 2000;
        var DEFAULT_MAX_ITEM_COUNT = 4;
        var DEFAULT_CTRL_SHIFT_CHAR = "Y";
        var DEFAULT_STOP_PROPAGATE_ENTER = false;
        var DEFAULT_STOP_PROPAGATE_ESCAPE = false;
        var DEFAULT_STOP_PROPAGATE_DBLCLICK = false;
        var DEFAULT_HIDE_ON_ESCAPE = true;
        var DEFAULT_PRELOAD_IMAGES = false;
        var DEFAULT_MATCH_ONLY_HEADLINE = false;
        var DEFAULT_CONTAINS_FOR_HEADLINE_MATCHES = false;
        var DEFAULT_CONTAINS_FOR_META_MATCHES = false;
        var DEFAULT_CALLBACK_ON_NO_SELECTION_ON_ENTER = false;
        var DEFAULT_HIDE_ON_CALLBACK = false;
        var DEFAULT_HIDE_ON_CLICK_OUTSIDE = false;
        var DEFAULT_MATCH_CASE_INSENSITIVE = true;
        var DEFAULT_MOVE_CURSOR_BACK_TO_END_ON_UP_ARROW = true;

        // CSS IDs:
        var CONTAINER_ID = "ytilsYupputOuterContainer";
        var CONTAINER_FINDINGS_ID = "ytilsYupputFindings";
        var INPUT_ID = "ytilsYupputInput";
        var CONTAINER_FINDINGS_UP_ID = "ytilsYupputFindingsUpIndicator";
        var CONTAINER_FINDINGS_DOWN_ID = "ytilsYupputFindingsDownIndicator";
        var FINDINGS_UP_BTN_ID = "ytilsYupputFindingsUpBtn";
        var FINDINGS_DOWN_BTN_ID = "ytilsYupputFindingsDownBtn";

        // CSS classes:
        var FINDING_CONTAINER_CLASS = "ytilsYupputFinding";
        var FINDING_HOVER_AND_SELECTION_CLASS = "ytilsYupputFindingHighlighted";
        var FINDING_THUMBNAIL_CONTAINER = "ytilsYupputFindingLeft";

        // HTML templates:
        var FINDING_HTML_TEMPLATE = "<div class=\"ytilsYupputFindingLeft\" style=\"{{thumbnail}}\"></div><div class=\"ytilsYupputFindingRight\">    <div class=\"ytilsYupputFindingMainLine\"><span class=\"ytilsYupputFindingRightTextInner\">{{headline}}</span></div>    <div class=\"ytilsYupputFindingSubLine\"><span class=\"ytilsYupputFindingRightTextInner\">{{metaData}}</span></div></div><div class=\"ytilsYupputClearance\"></div>";

        var EMPTY = "";
        var NO_SELECTED_ITEM = -1;

        /**
         * @type YupputItem[]
         */
        var valuesPrivate;

        /**
         * @type YupputItem[]
         */
        var valuesPrivateWRendering;

        /**
         * @type YupputItem[]
         */
        var valuesPrivateWRenderingMatching;

        /**
         * @type YupputItem[]
         */
        var valuesPrivateWRenderingNotMatching;

        /**
         * @type {number}
         */
        var valuesPrivateWRenderingMatchCount = 0;

        /**
         * @type {number}
         */
        var startValueDisplayed = 0;

        // General configuration settings.
        /**
         * @type {string}
         */
        var placeholder;

        /**
         * @type {number}
         */
        var zIndex;

        /**
         * @type {number}
         */
        var maxItemCount;

        /**
         * @type {boolean}
         */
        var preloadImages;

        /**
         * @type {boolean}
         */
        var matchOnlyHeadline;

        /**
         * @type {boolean}
         */
        var moveCursorToEndOnUp;

        // Event configuration settings:
        /**
         * @†ype {boolean}
         */
        var stopPropagateEnter;

        /**
         * @†ype {boolean}
         */
        var stopPropagateEscape;

        /**
         * @†ype {boolean}
         */
        var stopPropagateDblClick;

        /**
         * @†ype {boolean}
         */
        var hideOnEscape;

        /**
         * @†ype {boolean}
         */
        var hideOnCallbackFired;

        /**
         * @†ype {boolean}
         */
        var hideOnClickOutside;

        /**
         * @†ype {boolean}
         */
        var matchCaseInsensitive;

        /**
         * @†ype {boolean}
         */
        // var initialized = false;

        /**
         * @†ype {callbackOnChange|null}
         */
        var callbackOnChange;

        /**
         * @type {callbackThumbnailClick|null}
         */
        var callbackThumbnailClick;

        /**
         * @†ype {boolean}
         */
        var containsForHeadlineMatches;

        /**
         * @†ype {boolean}
         */
        var containsForMetaMatches;

        /**
         * @†ype {function}
         */
        var matchForHeadlineMatchesCallback = Ytils.YupputHelper.isStringStartingWith;

        /**
         * @†ype {function}
         */
        var matchForMetaMatchesCallback = Ytils.YupputHelper.isStringStartingWith;

        /**
         * @†ype {string}
         */
        var containerFindingsInnerHtml = EMPTY;

        /**
         * @†ype {boolean}
         */
        var uiVisible = false;

        /**
         * @†ype {string}
         */
        var ctrlShiftChar;

        /**
         * @†ype {boolean}
         */
        var callbackOnNoSelOnEnter;

        /**
         * {YupputItem} selectedItem
         */
        var selectedItem = NO_SELECTED_ITEM;

        /**
         * @type {string}
         */
        var bottomLineCssText = null;

        /**
         * @type {function}
         */
        var hidePrivate;

        /**
         * This function fires the callback passed into the constructor.
         *
         * @paran {booelan} isClicked
         */
        var fireInputCallback = function() {

            var selectedYupputItem;
            var inputValue = Ytils.YupputInput.getValueFromInput(INPUT_ID);

            if (NO_SELECTED_ITEM !== selectedItem) {

                selectedYupputItem = valuesPrivateWRenderingMatching[selectedItem];
                callback(selectedYupputItem, inputValue);

                if (hideOnCallbackFired) {

                    hidePrivate();
                }

            } else {

                if (callbackOnNoSelOnEnter) {

                    callback(null, inputValue);

                    if (hideOnCallbackFired) {

                        hidePrivate();
                    }
                }
            }
        };

        /**
         * Depending on current active state, up/down buttons can be made
         * visible or invisible.
         */
        var displayOrHideDownButton = function() {

            var yhtml = Ytils.YupputHtml;

            var upArrowContainer = document.getElementById(CONTAINER_FINDINGS_UP_ID);
            var downArrowContainer = document.getElementById(CONTAINER_FINDINGS_DOWN_ID);
            var upArrowElem = document.getElementById(FINDINGS_UP_BTN_ID);
            var downArrowElem = document.getElementById(FINDINGS_DOWN_BTN_ID);

            var operateUpDownButtonVisibility = function() {

                yhtml.showElement(upArrowContainer);
                yhtml.showElement(downArrowContainer);

                if (startValueDisplayed > 0) {

                    yhtml.visibleElement(upArrowElem);

                } else {

                    yhtml.invisibleElement(upArrowElem);
                }

                if (!(startValueDisplayed + maxItemCount >= valuesPrivateWRenderingMatching.length)) {

                    yhtml.visibleElement(downArrowElem);

                } else {

                    yhtml.invisibleElement(downArrowElem);
                }
            };

            if (!valuesPrivateWRenderingMatching.length) {

                yhtml.hideElement(upArrowContainer);
                yhtml.hideElement(downArrowContainer);

            } else {

                if (maxItemCount > valuesPrivateWRenderingMatching.length) {

                    yhtml.invisibleElement(upArrowElem);
                    yhtml.invisibleElement(downArrowElem);

                } else {

                    operateUpDownButtonVisibility();
                }
            }
        };

        /**
         * Renders one <div class="ytilsYupputFinding">...</div>.
         *
         * @param {string} thumbnail
         * @param {string} headline
         * @param {string} metaData
         * @return {string} The HTML to render
         */
        var createFindingHtml = function(thumbnail, headline, metaData) {

            var yh = Ytils.YupputHelper;
            var findingHtml = FINDING_HTML_TEMPLATE;

            if (yh.isNonEmptyString(thumbnail)) {
                findingHtml = findingHtml.replace("{{thumbnail}}", "background-image: url(" + thumbnail + ");");
            } else {
                findingHtml = findingHtml.replace("{{thumbnail}}", "width: 0 !important;");
            }

            if (yh.isNonEmptyString(headline)) {
                findingHtml = findingHtml.replace("{{headline}}", headline);
            } else {
                findingHtml = findingHtml.replace("{{headline}}", EMPTY);
            }

            if (yh.isNonEmptyString(metaData)) {
                findingHtml = findingHtml.replace("{{metaData}}", metaData);
            } else {
                findingHtml = findingHtml.replace("{{metaData}}", EMPTY);
            }

            return findingHtml;
        };

        /**
         * Prepares all values to be rendered as html slice.
         */
        var prepareAllValuesAndAppendToBody = function() {

            var i;
            var god = Ytils.YupputHelper.god;
            var c = valuesPrivate.length;
            var idI = Ytils.YupputHelper.createUniqueButUpcountableInitialId();

            var findingsContainer = Ytils.YupputHtml.clearInnerHtmlAndGetElement(CONTAINER_FINDINGS_ID);
            valuesPrivateWRendering = [ ];

            var newFindingDiv;
            var thumbnail;
            var headline;
            var metaData;
            var itemHtml;
            var value;
            for (i = 0; i < c; i += 1) {

                thumbnail = god(valuesPrivate[i], DATA_KEY_THUMBNAIL);
                headline = god(valuesPrivate[i], DATA_KEY_HEADLINE);
                metaData = god(valuesPrivate[i], DATA_KEY_META_DATA);
                value = god(valuesPrivate[i], DATA_KEY_META_VALUE);
                itemHtml = createFindingHtml(thumbnail, headline, metaData);

                valuesPrivateWRendering[i] = { };
                valuesPrivateWRendering[i].thumbnail = thumbnail;
                valuesPrivateWRendering[i].headline = headline;
                valuesPrivateWRendering[i].metaData = metaData;
                valuesPrivateWRendering[i].value = value;
                valuesPrivateWRendering[i].html = itemHtml;
                valuesPrivateWRendering[i].id = Ytils.YupputHelper.createUniqueFindingId(idI);
                idI += 1;

                newFindingDiv = Ytils.YupputHtml.createDivHtmlElementWIdAndClass(valuesPrivateWRendering[i].id, FINDING_CONTAINER_CLASS);
                newFindingDiv.innerHTML = valuesPrivateWRendering[i].html;
                newFindingDiv = Ytils.YupputHtml.hideElement(newFindingDiv);

                findingsContainer.append(newFindingDiv);
            }
        };

        /**
         * Hides a given array of YupputItems.
         *
         * @param {YupputItem[]} items
         */
        var hideYupputItems = function(items) {

            var targetedHtmlId;
            var i;

            var c = items.length;
            for (i = 0; i < c; i += 1) {

                targetedHtmlId = items[i].id;
                Ytils.YupputHtml.hide(targetedHtmlId);
            }
        };

        var hideAll = function() {

            hideYupputItems(valuesPrivateWRendering);
        };

        var hideAllNonMatching = function() {

            hideYupputItems(valuesPrivateWRenderingNotMatching);
        };

        /**
         * Filters all prepared values according to the input.
         *
         * @param {string} inputValue
         */
        var filterAllValues = function(inputValue) {

            var god = Ytils.YupputHelper.god;

            // Reset matches:
            valuesPrivateWRenderingMatchCount = 0;
            valuesPrivateWRenderingMatching = [ ];
            valuesPrivateWRenderingNotMatching = [ ];

            var matchesHeadlineOrMetaData = function(item, inputValue) {

                var headlineHaystack = god(item, DATA_KEY_HEADLINE);
                var metaDataHaystack = god(item, DATA_KEY_META_DATA);

                // Apply case-insensitivity - if configured or default.
                if (matchCaseInsensitive) {

                    headlineHaystack = headlineHaystack.toLowerCase();
                    metaDataHaystack = metaDataHaystack.toLowerCase();
                    inputValue = inputValue.toLowerCase();
                }

                var headlineMatch = matchForHeadlineMatchesCallback(headlineHaystack, inputValue);
                var metaDataMatch = false;

                if (false === matchOnlyHeadline) {

                    metaDataMatch = matchForMetaMatchesCallback(metaDataHaystack, inputValue);
                }

                return headlineMatch || metaDataMatch;
            };

            var i;
            var c = valuesPrivateWRendering.length;

            if (Ytils.YupputHelper.isNonEmptyString(inputValue)) {

                for (i = 0; i < c; i += 1) {

                    if (matchesHeadlineOrMetaData(valuesPrivateWRendering[i], inputValue)) {

                        valuesPrivateWRenderingMatching.push(valuesPrivateWRendering[i]);
                        valuesPrivateWRenderingMatchCount += 1;
                    } else {

                        valuesPrivateWRenderingNotMatching.push(valuesPrivateWRendering[i]);
                    }
                }
            } else {

                valuesPrivateWRenderingNotMatching = valuesPrivateWRendering;
                hideAllNonMatching();
            }
        };

        /**
         * Iterates over the matched items and assigns the iteration number to match the keyboard up-/down-count equivalent.
         *
         * @param {string} id
         * @return {number}
         */
        var getSelectedItemPositionByHtmlId = function(id) {

            var i;
            var c = valuesPrivateWRenderingMatching.length;
            if (c > maxItemCount) {

                 c = maxItemCount;
            }

            for (i = 0; i < c; i += 1) {

                if (valuesPrivateWRenderingMatching[i].id === id) {

                    return i;
                }
            }

            return NO_SELECTED_ITEM;
        };

        /**
         * This function iterates over all YupputItems and shows or hides them.
         * This function also (re-)displays the bottom line
         *
         * border-bottom: #b6b6b6 solid 1px
         */
        var showMatchingItemsAndHideNotMatchingItems = function() {

            var totalAmountMatches = valuesPrivateWRenderingMatching.length;

            /**
             * Shows a matching item and assigns bottomLineCssText if it did not happen yet.
             * The value for bottomLineCssText will be retrieved from the computed style. This is for the case
             * Yupput's CSS is overwritten by someone.
             *
             * @param {YupputItem} item
             */
            var showMatchingItem = function(item) {

                var elementHandle = Ytils.YupputHtml.show(item.id);

                if (null === bottomLineCssText) {

                    bottomLineCssText = Ytils.YupputHtml.getCssFromElement(item.id, "border-bottom");
                }

                elementHandle.style.borderBottom = bottomLineCssText;
            };

            /**
             * Removes the bottom line for the last matching item. This will be repaired on every item
             * being shown - everytime. Therefore this function can only be called after rendering is done.
             *
             * @param {YupputItem} lastItem
             */
            var removeBottomLineFromLastDisplayedItem = function(lastItem) {

                var elementHandle = document.getElementById(lastItem.id);
                elementHandle.style.borderBottom = "none";
            };

            /**
             * Shows all matching YupputItems.
             */
            var showAllMatching = function() {

                var i;
                var c = valuesPrivateWRenderingMatching.length;
                for (i = 0; i < c; i += 1) {

                    showMatchingItem(valuesPrivateWRenderingMatching[i]);

                    if (i === (c - 1)) {

                        removeBottomLineFromLastDisplayedItem(valuesPrivateWRenderingMatching[i]);
                    }
                }
            };

            /**
             * Shows matching subset of valuesPrivateWRenderingMatching with parameters from/to as array-indexes.
             *
             * @param {number} from
             * @param {number} to
             */
            var showMatching = function(from, to) {

                var i;
                if (to >= valuesPrivateWRenderingMatching.length) {

                    to = valuesPrivateWRenderingMatching.length;
                }

                for (i = from; i < to; i += 1) {

                    showMatchingItem(valuesPrivateWRenderingMatching[i]);

                    if (i === (to - 1)) {

                        removeBottomLineFromLastDisplayedItem(valuesPrivateWRenderingMatching[i]);
                    }
                }
            };

            // Rendering strategy:
            //
            // 1.) Hide all:
            // 2.) If maxItemCount >= totalAmountMatches -> show all
            //     If maxItemCount < totalAmountMatches
            //          2a.) startValueDisplayed + maxItemCount <= valuesPrivateWRenderingMatching.length -> show all from startValueDisplayed.
            //          2b.) startValueDisplayed + maxItemCount > valuesPrivateWRenderingMatching.length -> Reduce startValueDisplayed by overhang.
            hideAll();

            var backShiftedStartValue;
            if (totalAmountMatches > 0) {

                if (maxItemCount >= totalAmountMatches) {

                    showAllMatching();

                } else {

                    if ((startValueDisplayed + maxItemCount) <= totalAmountMatches) {

                        showMatching(startValueDisplayed, (startValueDisplayed + maxItemCount));

                    } else {

                        backShiftedStartValue = totalAmountMatches - maxItemCount;
                        showMatching(backShiftedStartValue, totalAmountMatches);
                    }
                }
            }
        };

        /**
         * This function has to be called whenever the displayed amount of YupputItems changes. This can happen by
         *  - Change of the inputValue
         *  - Navigation by up/down-buttons
         *  Later options:
         *  - Clicking the arrow indicators on the right
         *  - Mouse wheel
         *
         * @param {string} inputValue
         */
        var filterAllValuesAndRender = function(inputValue) {

            filterAllValues(inputValue);
            showMatchingItemsAndHideNotMatchingItems();
            displayOrHideDownButton();
        };

        /**
         * Removes all highlightings from visible YupputItems.
         */
        var unhighlightAllItems = function() {

            var i;
            var elemHandle;

            if (valuesPrivateWRenderingMatching && valuesPrivateWRenderingMatching.length) {

                for (i = 0; i < valuesPrivateWRenderingMatching.length; i += 1) {

                    elemHandle = document.getElementById(valuesPrivateWRenderingMatching[i].id);
                    if (elemHandle && elemHandle.classList) {

                        elemHandle.classList.remove(FINDING_HOVER_AND_SELECTION_CLASS);
                    }
                }
            }
        };

        /**
         * This function sets selection values to initial state (e.g. when closing the dialogue).
         * We must also not forget to unhighlight a possibly previous selected item.
         */
        var resetSelectedItemAndHighlightings = function() {

            startValueDisplayed = 0;
            selectedItem = NO_SELECTED_ITEM;
            unhighlightAllItems();
        };

        /**
         * Hides the dialogue.
         */
        hidePrivate = function() {

            resetSelectedItemAndHighlightings();
            Ytils.YupputInput.clearInput(INPUT_ID);
            Ytils.YupputHtml.hide(CONTAINER_ID);

            uiVisible = false;
        };

        /**
         * Shows the dialogue if not visible yet.
         */
        var showPrivate = function() {

            if (false === uiVisible) {

                Ytils.YupputHtml.show(CONTAINER_ID);
                Ytils.YupputHtml.setZIndexImportant(CONTAINER_ID, zIndex);
                filterAllValuesAndRender(Ytils.YupputInput.getValueFromInput(INPUT_ID));

                setFocus();
                uiVisible = true;
            }
        };

        /**
         * Sets the focus to the input element.
         */
        var setFocus = function() {

            var inputHandle = document.getElementById(INPUT_ID);

            inputHandle.focus();
            inputHandle.select();
        };

        /**
         * Creates the surrounding container for Yupput.
         */
        var createInitialContainer = function() {

            Ytils.YupputHtml.createAndAppendIfNotExists(CONTAINER_ID);
            Ytils.YupputHtml.hide(CONTAINER_ID);

            containerFindingsInnerHtml = "<div id=\"ytilsYupputInputContainer\">    <div id=\"ytilsYupputInputContainerInputContainer\">        <label id=\"ytilsYupputInputLabel\">            <input id=\"ytilsYupputInput\" type=\"text\" name=\"ytilsYupputInput\" value=\"\" placeholder=\"" + placeholder + "\" />        </label>    </div>    <div id=\"ytilsYupputFindingsUpIndicator\"><img id=\"ytilsYupputFindingsUpBtn\" src=\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAWCAYAAACyjt6wAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAACXBIWXMAAAsTAAALEwEAmpwYAAACwklEQVRIie2TzWsTQRiH39lMkp0VTPxA9B9p8eClB7O700SttJdQjNKCPRS8+VWlKtKC4EGhCFKqFomWStRtNpuLhV5E6P+h8SBo3MzO7M6OFwMiLU3S+HHoc53fvL+HeRmAPfboDKWUVqvVZjzPm+jnXNSPIbOzs3hgYOBBOp2eiqJIRVF0nVI614/Zuxbc3NxMNhqNBULIRBzHAACglIIwDO9alnUDIaT+maDrummE0CNd10uc81hKOYMQyiSTycuapgHn/DEATNu2zXvt0Hq9uL6+rgPAoq7rJSGEVEpNU0rnbNu+EkXRPAAAIWQSABZ/Zv+eoOM4BmPsiWEYxTAMQynllGVZC+1zy7KuCSHmpZRACCkyxhaXlpZ6kux6xfV6fV8cx88IISOc85ZS6qJpmstbZWu12h2M8UwikYAgCFYTiUQpl8v5f0zQdd39CKFlQkhBCBGEYXiOUrqyw52byWTyFsYYgiB4q5Qat237W6edHa+4UqlkEUJlwzAKQggmhDi/kxwAgG3bt6MouhqGodJ1vYAQKlcqlWynvR29oOd5B5VSZcMwTgZB4AshSvl8frXTEgAA13UvYYzvp1IpxBjzms3m6NjY2PddCzqOcxhj/NIwjKEgCJpRFI1TSt90I/eL5DTG+F4qlUozxhyEUMk0zS89C9br9SNxHK8SQk5wzr+GYVgcHh6u9iLXplqtnsIYP9V1PcMY20AIjeZyuc9dC3qed0wp9YoQcpxzLoQQxW7Xuh1ra2s5jHGZEHKg1Wq9RwidNU3zY8eC1Wr1KELotWEYg0IIxjmfzOfzz/sh18Z13SFN01YIIYd83/+glDpNKf30e267X2xlMplBIQSTUl7otxwAgG3b76SUI0EQNLLZ7CAAWFvlthSM49hptVoLUsozlmW96LdcG0rphlKq4Pv+wziOnT/Vs8d/zQ95AVLOnhBRJAAAAABJRU5ErkJggg==\" alt=\"\" /></div>    <div id=\"ytilsYupputFindings\">    </div>    <div id=\"ytilsYupputFindingsDownIndicator\"><img id=\"ytilsYupputFindingsDownBtn\" src=\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAWCAYAAACyjt6wAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAACXBIWXMAAAsTAAALEwEAmpwYAAACzUlEQVRIie2Tv2sUQRTH38zu7MzeoWnE4P+RxkaIze5tcooa4y+iTQIaECz9ERVUUBtBLbSI4q8oIiq6tzN7FqawEM0fIhGJOaP7xrvZGwst5LjEXC5p1E85+77vfYY3C/CfvxzS7jCO4w1CiDN5nj8Iw/D9WgoopQLXdbdprc+Wy+VPrd9puxCltFwsFo8SQl4mSbJlDeX2Oo7zvFAojFNKy21dFsvOz8+/E0L0Oo7zTEq5dbXl4jg+4DjObc/z/Fqt9g4AVLu6tisGAEjTdJO19mmhUNiMiJ+NMfsGBwerqyQ35HneFOfcQ8S3hJBdYRh+6EgQAKBarW601j7xfX+L1rpmjDk0MDDwohu5SqUywBib4pz3IOIbSulQEAQfF6tfbMUAAPAruCPLsphz3sMYeyylPLpSuSRJtjPGHgkhehDxtTFm51JyfxQEAAjDcG5hYWE/Iqae53HXda9KKY91KhfH8ZDrulNCiHVZlr0ihOxu99d2LAgAMDw8/FVrvQ8RJWOMuK57RSl1fLlylUplL+f8nhCimGWZ1FrvCcNwbjnZJd9gK1LK9YSQ+0KIbcYYaDQaZ6MoOrdUJkmSYcbYXc/zBCK+tNaORFH0ZbkzOxIEAKhWq8U8z+8IIYbyPAdjzIVSqXS6XW2apiOEkJuc8wIiPqOUHgyC4Fsn85a14t8JguDb7OzsiNb6oeu6wBibUEpdhJbLSinHKKW3OOeFLMseG2NGOpWD1qadMD09LRBx0vf9A81mE+r1+qVSqXQCAEApNU4pveZ5noOIU77vj/b39+uVzFmxIACAlJIDwHXO+Viz2YRGo3HZWltzHOcC55xqre9Yaw9HUfR9pTO6EgQAsNYSpdR5xtgpQn62o5QCIk729vaO9/X1Nbrp3/EbbIUQYqMomqjX6yfzPLeEENBa35iZmTnSrdyqk6bpqFJqwlrb9cX/88/wA121MqctorD3AAAAAElFTkSuQmCC\" alt=\"\" /></div></div>";
            Ytils.YupputHtml.setInnerHtml(CONTAINER_ID, containerFindingsInnerHtml);
        };

        /**
         * Handles the movement of selectedItem and startValueDisplayed
         * when the up or down button is pressed.
         *
         * @param {number} direction
         */
        var operateUpAndDownSelection = function(direction) {

            var selectedYupputItem;

            // Strategy:
            // The selectedItem moves the viewport.
            // The top end of the viewport is startValueDisplayed.
            // If selectedItem touches gets lower than startValueDisplayed, viewport moves up until 0 is reached.
            // If selectedItem touches the bottom bound which is defined by (startValueDisplayed + maxItemCount),
            // the viewport moves down until the bottom is reached.

            // 1. Calculate selectedItem.
            if (NO_SELECTED_ITEM === selectedItem) {

                selectedItem = startValueDisplayed;

            } else {

                selectedItem += direction;
                if (selectedItem < 0) {

                    selectedItem = 0;

                } else if (selectedItem >= valuesPrivateWRenderingMatching.length) {

                    selectedItem = valuesPrivateWRenderingMatching.length -1;
                }
            }

            // 2. Calculate startValueDisplayed from selectedItem.
            if (selectedItem < startValueDisplayed) {

                startValueDisplayed = selectedItem;

            } else if (selectedItem > (startValueDisplayed + maxItemCount - 1)) {

                startValueDisplayed += 1;
            }

            // Unhighlight all and then highlight the one selected.
            unhighlightAllItems();
            selectedYupputItem = valuesPrivateWRenderingMatching[selectedItem];
            document.getElementById(selectedYupputItem.id).classList.add(FINDING_HOVER_AND_SELECTION_CLASS);

            filterAllValuesAndRender(Ytils.YupputInput.getValueFromInput(INPUT_ID));
            displayOrHideDownButton();
        };

        /**
         * Initializes keydown and -up events.
         */
        var initKeyListeners = function() {

            if (null !== ctrlShiftChar) {

                document.addEventListener("keydown", function(e) {

                    if (e.ctrlKey && e.shiftKey && e.key === ctrlShiftChar) {

                        if (false === uiVisible) {

                            e.stopPropagation();
                            showPrivate();

                        } else {

                            setFocus();
                        }
                    }
                });
            }

            var inputVal;
            var inputHandle = Ytils.YupputInput.getInputTypeTextHandleById(INPUT_ID);
            inputHandle.ondblclick = function(e) {

                hidePrivate();

                if (stopPropagateDblClick) {

                    e.stopPropagation();
                }
            };

            inputHandle.onkeyup = function(e) {

                var optionalCursorMoveToEndOfInput = function() {

                    if (moveCursorToEndOnUp) {

                        Ytils.YupputHtml.moveCursorToEndOfInput(INPUT_ID);
                    }
                };

                if (hideOnEscape && e.key === "Escape") {

                    hidePrivate();

                    if (stopPropagateEscape) {

                        e.stopPropagation();
                    }

                } else if (e.key === "Enter") {

                    if (uiVisible) {

                        fireInputCallback();
                    }

                    if (stopPropagateEnter) {

                        e.stopPropagation();
                    }

                } else {

                    // false === e.ctrlKey - because it would'nt be rendered afterwards in this case.
                    if (e.key === "ArrowDown") {

                        operateUpAndDownSelection(1);
                        optionalCursorMoveToEndOfInput();
                        // filterAllValuesAndRender(); is called in function operateUpAndDownSelection().

                    } else if (e.key === "ArrowUp") {

                        operateUpAndDownSelection(-1);
                        optionalCursorMoveToEndOfInput();
                        // filterAllValuesAndRender(); is called in function operateUpAndDownSelection().

                    } else {

                        if (false === e.ctrlKey) {

                            inputVal = Ytils.YupputInput.getValueFromInput(INPUT_ID);
                            // NPE avoided by checks in construct().
                            if (null !== callbackOnChange) {

                                callbackOnChange(inputVal);
                            }

                            resetSelectedItemAndHighlightings();
                            filterAllValuesAndRender(inputVal);
                        }
                    }
                }
            };
        };

        /**
         * Initializes mousemove-listeners on all YupputItems.
         *
         * @param {boolean} initial - Only initially the mouse-out-event for the surrounding findings-container is required.
         */
        var initMouseListeners = function(initial) {

            var CLICK = "click";
            var MOUSE_MOVE = "mousemove";
            var MOUSE_LEAVE = "mouseleave";

            var i;
            var c = valuesPrivateWRendering.length;
            var yupputFindingContainerHandle;

            if (true === hideOnClickOutside) {

                document.addEventListener(CLICK, function (e) {

                    var cTarget = e.target;
                    while (cTarget.parentNode !== null) {

                        cTarget = cTarget.parentNode;
                        if (cTarget.id && cTarget.id === CONTAINER_ID) {

                            return;
                        }
                    }

                    hidePrivate();
                });
            }

            var registerMouseMoveBehaviour = function(yupputFindingContainerHandle) {

                yupputFindingContainerHandle.addEventListener(MOUSE_MOVE, function() {

                    selectedItem = getSelectedItemPositionByHtmlId(this.id);
                    this.classList.add(FINDING_HOVER_AND_SELECTION_CLASS);
                });
            };

            var registerMouseClickBehaviour = function(yupputFindingContainerHandle) {

                yupputFindingContainerHandle.addEventListener(CLICK, function(e) {

                    var clickedYupputItem;
                    selectedItem = getSelectedItemPositionByHtmlId(this.id);
                    clickedYupputItem = valuesPrivateWRenderingMatching[selectedItem];


                    if (callbackThumbnailClick !== null && e.target.className === FINDING_THUMBNAIL_CONTAINER) {

                        callbackThumbnailClick(clickedYupputItem.value, clickedYupputItem.thumbnail);

                    } else {

                        fireInputCallback();
                    }
                });
            };

            var registerMouseLeaveBehaviour = function(yupputFindingContainerHandle) {

                yupputFindingContainerHandle.addEventListener(MOUSE_LEAVE, function() {

                    this.classList.remove(FINDING_HOVER_AND_SELECTION_CLASS);
                });
            };

            if (initial) {

                document.getElementById(CONTAINER_FINDINGS_ID).addEventListener(MOUSE_LEAVE, function() {

                    selectedItem = NO_SELECTED_ITEM;
                });
            }

            for (i = 0; i < c; i += 1) {

                yupputFindingContainerHandle = document.getElementById(valuesPrivateWRendering[i].id);
                registerMouseMoveBehaviour(yupputFindingContainerHandle);
                registerMouseClickBehaviour(yupputFindingContainerHandle);
                registerMouseLeaveBehaviour(yupputFindingContainerHandle);
            }
        };

        
    /**
     * Constructor.
     *
     * @param {object[]} values - An array of objects with the following parameters:
     * @param {string} values.headline - The headline of the entry.
     * @param {string[]} values.metaData - An array of string to display meta data in the second row below the headline.
     * @param {string} [values.thumbnail] - Optional: The url to the thumbnail image.
     * @param {string} values.value - The value to return to the callback if value[x] has been selected.
     * @throws Will throw an exception if current browser is an Internet Explorer with a version lower than 10.
     */
    var construct = function(values) {

        var preload = function() {

            var i;
            var c = valuesPrivate.length;

            for (i = 0; i < c; i += 1) {

                if (Ytils.YupputHelper.isString(valuesPrivate[i].thumbnail)) {

                    Ytils.YupputHtml.preloadImage(valuesPrivate[i].thumbnail);
                }
            }
        };

        var god = Ytils.YupputHelper.god;
        var godd = Ytils.YupputHelper.godd;
        var ieCheck = Ytils.YupputHelper.isIEWVersion();

        if (ieCheck.isIE && ieCheck.version <= 9) {

            throw "Ytils Yupput requires Internet Explorer with a version higher or equal 10.";
        }

        placeholder = godd(config,"placeholder", DEFAULT_PLACEHOLDER);
        zIndex = godd(config,"zIndex", DEFAULT_Z_INDEX);
        maxItemCount = godd(config,"maxItemCount", DEFAULT_MAX_ITEM_COUNT);
        ctrlShiftChar = godd(config,"ctrlShiftChar", DEFAULT_CTRL_SHIFT_CHAR);
        hideOnEscape = godd(config,"hideOnEscape", DEFAULT_HIDE_ON_ESCAPE);
        preloadImages = godd(config,"preloadImages", DEFAULT_PRELOAD_IMAGES);
        matchOnlyHeadline = godd(config,"matchOnlyHeadline", DEFAULT_MATCH_ONLY_HEADLINE);
        stopPropagateEnter = godd(config,"stopPropagateEnter", DEFAULT_STOP_PROPAGATE_ENTER);
        stopPropagateEscape = godd(config,"stopPropagateEscape", DEFAULT_STOP_PROPAGATE_ESCAPE);
        stopPropagateDblClick = godd(config,"stopPropagateDblClick", DEFAULT_STOP_PROPAGATE_DBLCLICK);
        containsForHeadlineMatches = godd(config,"containsForHeadlineMatches", DEFAULT_CONTAINS_FOR_HEADLINE_MATCHES);
        containsForMetaMatches = godd(config,"containsForMetaMatches", DEFAULT_CONTAINS_FOR_META_MATCHES);
        callbackOnNoSelOnEnter = godd(config,"callbackOnNoSelOnEnter", DEFAULT_CALLBACK_ON_NO_SELECTION_ON_ENTER);
        hideOnCallbackFired = godd(config,"hideOnCallbackFired", DEFAULT_HIDE_ON_CALLBACK);
        hideOnClickOutside = godd(config,"hideOnClickOutside", DEFAULT_HIDE_ON_CLICK_OUTSIDE);
        matchCaseInsensitive = godd(config,"matchCaseInsensitive", DEFAULT_MATCH_CASE_INSENSITIVE);
        callbackOnChange = god(config, "callbackOnChange");
        moveCursorToEndOnUp = godd(config,"moveCursorToEndOnUp", DEFAULT_MOVE_CURSOR_BACK_TO_END_ON_UP_ARROW);
        callbackThumbnailClick = god(config, "callbackThumbnailClick");

        if (containsForHeadlineMatches) {
            matchForHeadlineMatchesCallback = Ytils.YupputHelper.isStringContaining;
        }
        if (containsForMetaMatches) {
            matchForMetaMatchesCallback = Ytils.YupputHelper.isStringContaining;
        }

        var yyh = Ytils.YupputHelper;

        // Check callback parameter:
        yyh.expectFunction(callback, "Ytils.Yupput expects parameter callback to be a function.");

        // Check config options:
        yyh.expectFunctionOrNull(callbackOnChange, "Ytils.Yupput expects config option .callbackOnChange to be a function.");
        yyh.expectString(placeholder, "Ytils.Yupput expects config option .placeholder to be a string.");
        yyh.expectInt(zIndex, "Ytils.Yupput expects config option .zIndex to be an integer number.");
        yyh.expectInt(maxItemCount, "Ytils.Yupput expects config option .maxItemCount to be an integer number.");
        yyh.expectBoolean(hideOnEscape, "Ytils.Yupput expects config option .hideOnEscape to be a boolean.");
        yyh.expectBoolean(matchCaseInsensitive, "Ytils.Yupput expects config option .matchCaseInsensitive to be a boolean.");
        yyh.expectBoolean(callbackOnNoSelOnEnter, "Ytils.Yupput expects config option .callbackOnNoSelOnEnter to be a boolean.");
        yyh.expectBoolean(hideOnCallbackFired, "Ytils.Yupput expects config option .hideOnCallbackFired to be a boolean.");
        yyh.expectBoolean(preloadImages, "Ytils.Yupput expects config option .preloadImages to be a boolean.");
        yyh.expectBoolean(matchOnlyHeadline, "Ytils.Yupput expects config option .matchOnlyHeadline to be a boolean.");
        yyh.expectBoolean(containsForHeadlineMatches, "Ytils.Yupput expects config option .containsForHeadlineMatches to be a boolean.");
        yyh.expectBoolean(containsForMetaMatches, "Ytils.Yupput expects config option .containsForMetaMatches to be a boolean.");
        yyh.expectBoolean(stopPropagateEnter, "Ytils.Yupput expects config option .stopPropagateEnter to be a boolean.");
        yyh.expectBoolean(stopPropagateEscape, "Ytils.Yupput expects config option .stopPropagateEscape to be a boolean.");
        yyh.expectBoolean(stopPropagateDblClick, "Ytils.Yupput expects config option .stopPropagateDblClick to be a boolean.");
        yyh.expectBoolean(moveCursorToEndOnUp, "Ytils.Yupput expects config option .moveCursorToEndOnUp to be a boolean.");
        yyh.expectAz09CharOrNull(ctrlShiftChar, "Ytils.Yupput expects config option .ctrlShiftChar to be a single char within a-z, A-Z or 0-9.");
        yyh.expectFunctionOrNull(callbackOnChange, "Ytils.Yupput expects config option .callbackOnChange to be a function.");


        if (null !== ctrlShiftChar) {

            ctrlShiftChar = ctrlShiftChar.toUpperCase();
        }

        createInitialContainer();
        valuesPrivate = values;
        prepareAllValuesAndAppendToBody();

        Ytils.YupputHtml.expectExisting(INPUT_ID);
        initKeyListeners();
        initMouseListeners(true);

        if (preloadImages) {

            preload();
        }
    };

    construct(values);

        

    /**
     * Returns true if the Yupput dialogue is active or not.
     *
     * @returns {boolean}
     */
    this.isVisible = function() {

        return uiVisible;
    };

    /**
     * Updates the placeholder of Yupput's input type="text" element.
     *
     * @param {string} placeholder
     */
    this.updatePlaceholder = function(placeholder) {

        document.getElementById(INPUT_ID).placeholder = placeholder;
    };

    /**
     * Updates the data records
     *
     * @param {object[]} values - An array of objects with the following parameters:
     * @param {string} values.headline - The headline of the entry.
     * @param {string[]} values.metaData - An array of string to display meta data in the second row below the headline.
     * @param {string} [values.thumbnail] - Optional: The url to the thumbnail image.
     * @param {string} values.value - The value to return to the callback if value[x] has been selected.
     */
    this.updateData = function(values) {

        valuesPrivate = values;
        unhighlightAllItems();
        prepareAllValuesAndAppendToBody();
        initMouseListeners(false);
    };

    /**
     * Renders the dialogue.
     */
    this.show = function() {

        showPrivate(values);
    };

    /**
     * Hides the dialogue and resets it.
     */
    this.hide = function() {

        hidePrivate();
    };
    };

}());