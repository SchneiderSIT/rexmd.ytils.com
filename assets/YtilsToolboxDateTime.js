/**
 * Ytils JavaScript Toolbox
 * DateTime
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
/*jslint browser: true */
/*jslint white: true */
/*jslint this: true */
/*jslint long: true */
/*global window */
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

    if (!window.Ytils.Toolbox.DateTime) {
        window.Ytils.Toolbox.DateTime = { };
    }

    window.Ytils.Toolbox.DateTime.Scheduler = function() {

        var TICK_SPEED = 100;

        var privStopped = false;
        var privTicks = 0;
        var privInterval = null;
        var privCallback = null;
        var privActive = false;
        var privIntervalHandle;

        var yCommon = Ytils.Toolbox.Common;

        /**
         * Set the interval to trigger callback with a value of 1/10 seconds.
         *
         * @param {number} interval
         * @returns {Window.Ytils.Toolbox.DateTime.Scheduler}
         */
        this.setInterval = function(interval) {

            if (!yCommon.isInt(interval)) {

                yCommon.throwException("Scheduler.setInterval() expects parameter interval to be an integer.");
            }

            if (interval <= 0) {

                yCommon.throwException("Scheduler.setInterval() expects parameter interval to be > 0.");
            }

            privInterval = (interval * TICK_SPEED);

            return this;
        };

        /**
         * Set up the callback to be fired when the 1/10 second-ticks reach the
         * interval value.
         *
         * @param callback
         * @returns {Window.Ytils.Toolbox.DateTime.Scheduler}
         */
        this.setCallback = function(callback) {

            if (!yCommon.isFunction(callback)) {

                yCommon.throwException("Scheduler.setCallback() expects parameter callback to be a function.");
            }

            privCallback = callback;

            return this;
        };

        /**
         * Reset the tick counter.
         *
         * @returns {Window.Ytils.Toolbox.DateTime.Scheduler}
         */
        this.resetTicks = function() {

            privTicks = 0;

            return this;
        };

        /**
         * Register an event listener to reset the tick counter
         * on any mousemove event.
         *
         * @returns {Window.Ytils.Toolbox.DateTime.Scheduler}
         */
        this.enableMousemoveReset = function() {

            var resetTicks = this.resetTicks;

            document.addEventListener("mousemove", function() {

                resetTicks();
            });

            return this;
        };

        /**
         * This function activates the Scheduler.
         */
        this.activate = function() {

            var resetTicks = this.resetTicks;

            privActive = true;
            if (!(privCallback && privInterval)) {

                yCommon.throwException("Callback and interval have to be set up before calling activate().");
            }

            privIntervalHandle = window.setInterval(function() {

                if (privStopped) {

                    resetTicks();
                }

                if (privActive && !privStopped) {

                    privTicks = privTicks + 100;
                    if (privTicks > privInterval) {

                        privCallback();
                        privTicks = 0;
                    }
                }

            }, TICK_SPEED);
        };

        /**
         * Stop the ticker without disabling it.
         */
        this.stop = function() {

            privStopped = true;
        };

        /**
         * Start the ticker.
         */
        this.start = function() {

            privStopped = false;
        };

        /**
         * This function deactivates the scheduler.
         */
        this.deactivate = function() {

            privActive = false;
            if (privIntervalHandle) {
                clearInterval(privIntervalHandle);
            }
        };
    };

}());