/*global $ */
/*global alert */
/*global document */
/*global window */
/*global console */
/*global Ytils */
/*jslint browser: true */
/*jslint long: true */
/*jslint this: true */
/*jslint white: true */
(function(){

    "use strict";
    $(document).on("rex:ready", function() {

        /**
         * Adds a "#" to HTML IDs.
         *
         * @param {string} id
         * @return {string}
         */
        var createJQueryIdSelector = function(id) {

            return "#" + id;
        };

        /**
         * This click() event opens up the full screen Ytils RexMd editor.
         */
        $(".ytilsRexMd").find(".ytilsRexMdExpandButton").click(function() {

            var AJAX_SUCCESS = "success";
            // n * 1/10 seconds.
            var FADEOUT_INTERVAL = 50;
            var FADING_SPEED = 300;
            // var AJAX_ERROR = "error";

            var BODY = "body";
            var DIV = "div";
            var IMG = "img";
            var A = "a";

            var SRC = "src";
            var HREF = "href";

            var HIDDEN = "hidden";
            var OVERFLOW = "overflow";

            var MEDIA_IMG_PREFIX = "./media/";
            var REDAXO_URL_PREFIX = "./redaxo/";

            // Saving functon not done yet, see below.
            // var MODULE_UPDATE_BTN_SELECTOR = "[name='btn_update']";
            // var MODULE_SAVE_BTN_SELECTOR = "[name='btn_save']";

            var openerId = $(this).data("attach");
            var openerSelector = createJQueryIdSelector(openerId);
            var yupputCallbackMode;

            var YUPPUT_MODE_ARTICLES = "A";
            var YUPPUT_MODE_MEDIA_POOL = "M";
            var PREVIEW_MODE = "V";

            var FULL_SCREEN_OVERLAY_CSS = "background-color: #F7F7F7; color: #525252; height: 100%; left: 0; position: fixed; top: 0; width: 100%; z-index: 1000;";
            var FULL_SCREEN_HEADER_CSS = "color: #525252; display: block; left: 0; margin: 0 auto; max-width: 720px; position: absolute; right: 0; top: 0; width: 100%; z-index: 4000;";
            var FULL_SCREEN_TEXTAREA_CSS = "color: #525252; display: block; height: 100%; left: 0; margin: 0 auto; max-width: 720px; padding-top: 80px; position: absolute; right: 0; top: 0; width: 100%; z-index: 2000;";
            var FULL_SCREEN_PREVIEW_CSS = "background-color: #F7F7F7; color: #525252; display: none; height: 100%; left: 0; margin: 0 auto; max-width: 720px; padding-top: 80px; padding-bottom: 80px; position: absolute; right: 0; top: 0; width: 100%; z-index: 3000;";
            var FULL_SCREEN_PREVIEW_CSS_CLASS = "ytilsRexMdFullScreenPreview";

            var FULL_SCREEN_OVERLAY = "FullScreenOverlay";
            var FULL_SCREEN_HEADER = "FullScreenHeader";
            var FULL_SCREEN_TEXTAREA = "FullScreenTextarea";
            var FULL_SCREEN_PREVIEW = "FullScreenPreview";
            var FULL_SCREEN_PREVIEW_INNER = "FullScreenPreviewInner";
            var TEXTAREA_INPUT = "TextAreaInput";

            var fullScreenOverlayId = openerId + FULL_SCREEN_OVERLAY;
            var fullScreenHeaderId = openerId + FULL_SCREEN_HEADER;
            var fullScreenTextareaId = openerId + FULL_SCREEN_TEXTAREA;
            var fullScreenPreviewId = openerId + FULL_SCREEN_PREVIEW;
            var fullScreenPreviewInnerId = openerId + FULL_SCREEN_PREVIEW_INNER;
            var textAreaInputId = openerId + TEXTAREA_INPUT;

            var errorMessageContainerId = openerId + "ErrorMessageContainer";
            var errorMessageId = openerId + "ErrorMessage";
            var errorMessageCloseBtnId = openerId + "ErrorMessageCloseBtn";
            var closeBtnId = openerId + "CloseBtn";
            var previewBtnId = openerId + "PreviewBtn";
            var mediaPoolYupputBtnId = openerId + "MediaPoolYupputBtnId";
            var articlesYupputBtnId = openerId + "ArticlesYupputBtnId";
            // Saving function not done yet, see below.
            // var saveBtnId = openerId + "SaveBtn";

            var openerIdSelector = createJQueryIdSelector(openerId);
            var fullScreenOverlaySelector = createJQueryIdSelector(fullScreenOverlayId);
            var fullScreenHeaderSelector = createJQueryIdSelector(fullScreenHeaderId);
            var fullScreenTextareaSelector = createJQueryIdSelector(fullScreenTextareaId);
            var fullScreenPreviewSelector = createJQueryIdSelector(fullScreenPreviewId);
            var fullScreenPreviewInnerSelector = createJQueryIdSelector(fullScreenPreviewInnerId);
            var textAreaInputSelector = createJQueryIdSelector(textAreaInputId);
            var errorMessageContainerSelector = createJQueryIdSelector(errorMessageContainerId);
            var errorMessageSelector = createJQueryIdSelector(errorMessageId);
            var errorMessageCloseBtnSelector = createJQueryIdSelector(errorMessageCloseBtnId);

            var closeBtnSelector = createJQueryIdSelector(closeBtnId);
            var previewBtnSelector = createJQueryIdSelector(previewBtnId);
            var mediaPoolYupputBtnIdSelector = createJQueryIdSelector(mediaPoolYupputBtnId);
            var articlesYupputBtnIdSelector = createJQueryIdSelector(articlesYupputBtnId);
            // Saving function not done yet, see below.
            // var saveBtnSelector = createJQueryIdSelector(saveBtnId;

            var ajaxtargetMd = $(openerSelector).data("ajaxtargetmd");
            var articleTitle = $(openerSelector).data("articletitle");
            var articleId = $(openerSelector).data("articleid");
            var csrf = $(openerSelector).data("csrf");
            var placeholder = $(openerSelector).data("placeholder");
            var placeholderArticles = $(openerSelector).data("i18nplaceholderarticles");
            var placeholderMediaPool = $(openerSelector).data("i18nplaceholdermediapool");
            var titleMediaPoolBtn = $(openerSelector).data("titlemediapoolbtn");
            var titleArticlesBtn = $(openerSelector).data("titlearticlesbtn");
            var titlePreviewBtn = $(openerSelector).data("titlepreviewbtn");
            var titleCloseBtn = $(openerSelector).data("titleclosebtn");

            var initialBodyOverflow = $(BODY).css(OVERFLOW);
            var previewVisible = false;
            var headerVisible = true;

            var currentCursorPosition = null;
            var currentOpenerCursorPosition = null;

            var rexMdConfig = window.Ytils.YtilsRexMd.Config;
            var rexMdConfigFontSize = rexMdConfig.ytils_rex_md_config_font_size || 16;
            var rexMdConfigFont = rexMdConfig.ytils_rex_md_config_font || "\"Lucida Grande\", \"Helvetica Neue\", Helvetica, Arial, sans-serif";
            var rexMdYupputItemCount = rexMdConfig.ytils_rex_md_config_number_of_yupput_items || 4; // $(openerSelector).data("yupputitemcount");
            var containsForArticlesAndMediaPool = rexMdConfig.ytils_rex_md_config_contains_for_articles_and_media_pool || 0;
            var yupputMpData = window.Ytils.YtilsRexMd.YupputMpData;
            var yupputArtData = window.Ytils.YtilsRexMd.YupputArtData;
            var yupput;

            /**
             * This function fetches the cursor position of the opener textarea.
             */
            var assignOpenerCursorPosition = function() {

                currentOpenerCursorPosition = $(openerIdSelector).prop("selectionStart");
            };

            /**
             * This function fades out the controls header.
             */
            var fadeOutControls = function() {

                if (headerVisible) {

                    $(fullScreenHeaderSelector).fadeOut(FADING_SPEED);
                    headerVisible = false;
                }
            };

            /**
             * This method fades in the controls header.
             */
            var fadeInControls = function() {

                if (!headerVisible) {
                    $(fullScreenHeaderSelector).fadeIn(FADING_SPEED);
                    headerVisible = true;
                }
            };

            // Fade out the controls after FADEOUT_INTERVAL * 1/10 seconds.
            var yScheduler = new window.Ytils.Toolbox.DateTime.Scheduler();
            yScheduler.setCallback(function() {

                fadeOutControls();
                yScheduler.stop();

            }).setInterval(FADEOUT_INTERVAL).activate();

            $(document).mousemove(function() {

                fadeInControls();
                yScheduler.start();
            });

            var scrollToTop = function() {

                $(textAreaInputSelector).scrollTop($(textAreaInputSelector)[0].scrollHeight, $(textAreaInputSelector).height());
                $(window).scrollTop(0);
            };

            var updateTextAreaInputAndSetFocus = function() {

                scrollToTop();
                $(textAreaInputSelector).focus().val($(openerSelector).val());
            };

            var updateModuleTextAreaInputAndSetFocus = function() {

                $(openerSelector).focus().val($(textAreaInputSelector).val());
            };

            var assignCursorPositionFromOpener = function() {

                assignOpenerCursorPosition();
                Ytils.YupputHtml.setCursorPosition($(textAreaInputSelector)[0], currentOpenerCursorPosition);
            };

            // First check, if container is already appended:
            if ($(fullScreenOverlaySelector).length) {

                $(fullScreenOverlaySelector).show();
                $(fullScreenHeaderSelector).show();
                $(fullScreenTextareaSelector).show();
                updateTextAreaInputAndSetFocus();
                assignCursorPositionFromOpener();

            } else {

                // Full overlay:
                var fullScreenOverlay = document.createElement(DIV);
                fullScreenOverlay.style.cssText = FULL_SCREEN_OVERLAY_CSS;
                fullScreenOverlay.id = fullScreenOverlayId;
                document.body.appendChild(fullScreenOverlay);

                // Header overlay:
                var fullScreenHeader = document.createElement(DIV);
                fullScreenHeader.style.cssText = FULL_SCREEN_HEADER_CSS;
                fullScreenHeader.id = fullScreenHeaderId;
                document.body.appendChild(fullScreenHeader);

                fullScreenHeader.innerHTML =
                    "<div style='float: left; overflow: hidden; padding: 30px 0 0 10px; width: 75%; white-space: nowrap; text-overflow: ellipsis;'>" +
                        "<h1 title='" + articleTitle + "' style='font-family: " + rexMdConfigFont + "; font-size: 28px; font-weight: normal; margin: 0;'><span style='font-size: 16px;'>[" + articleId + "]</span> " + articleTitle + "</h1>" +
                    "</div>" +
                    "<div style='float: left; overflow: hidden; padding: 30px 10px 0 0; text-align: right; width: 25%;'>" +
                        // Saving function not done yet, see below:
                        // "<span id='" + saveBtnId + "' data-attach='" + openerId + "' style='margin-right: 20px;'><img style='cursor: pointer;' src='../assets/addons/ytils_rex_md/save-525252.png' alt='' /></span>" +
                        "<span id='" + articlesYupputBtnId + "' data-attach='" + openerId + "'><img style='cursor: pointer; width: 24px; height: 24px;' src='../assets/addons/ytils_rex_md/open-folder-yupput-525252.png' title='" + titleArticlesBtn + "' alt='' /></span>" +
                        "&nbsp;&nbsp;&nbsp;" +
                        "<span id='" + mediaPoolYupputBtnId + "' data-attach='" + openerId + "'><img style='cursor: pointer; width: 24px; height: 24px;' src='../assets/addons/ytils_rex_md/mediapool-525252.png' title='" + titleMediaPoolBtn + "' alt='' /></span>" +
                        "&nbsp;&nbsp;&nbsp;" +
                        "<span id='" + previewBtnId + "' data-attach='" + openerId + "'><img style='cursor: pointer;' src='../assets/addons/ytils_rex_md/preview-525252.png' title='" + titlePreviewBtn + "' alt='' /></span>" +
                        "&nbsp;&nbsp;&nbsp;" +
                        "<span id='" + closeBtnId + "' data-attach='" + openerId + "'><img style='cursor: pointer;' src='../assets/addons/ytils_rex_md/close-525252.png' title='" + titleCloseBtn + "' alt='' /></span>" +
                    "</div>" +
                    "<div id='" + errorMessageContainerId + "' style='background-color: #F7F7F7; clear: both; display: none; padding-top: 10px;'>" +
                        "<div style='padding-right: 2px; text-align: right;'><span id='" + errorMessageCloseBtnId + "' style='cursor: pointer;'>&times;</span></div>" +
                        "<div id='" + errorMessageId + "' style='color: #721C24; background-color: #F8D7DA; border: #F5C6CB solid 1px; padding: 5px;'></div>" +
                    "</div>";

                // Textarea overlay:
                var fullScreenTextarea = document.createElement(DIV);
                fullScreenTextarea.style.cssText = FULL_SCREEN_TEXTAREA_CSS;
                fullScreenTextarea.id = fullScreenTextareaId;
                document.body.appendChild(fullScreenTextarea);

                fullScreenTextarea.innerHTML =
                    "<div style='height: 100%; padding-bottom: 80px; width: 100%;'>" +
                        "<textarea id='" + textAreaInputId + "' style='background: none; border: 0; color: #525252; font-family: " + rexMdConfigFont + "; font-size: " + rexMdConfigFontSize + "px; height: 100%; outline: none; width: 100%;'></textarea>" +
                    "<div>";

                // Textarea overlay:
                var fullScreenPreview = document.createElement(DIV);
                fullScreenPreview.style.cssText = FULL_SCREEN_PREVIEW_CSS;
                fullScreenPreview.className = FULL_SCREEN_PREVIEW_CSS_CLASS;
                fullScreenPreview.id = fullScreenPreviewId;

                fullScreenPreview.innerHTML =
                    "<div class='ytilsRexMdPreview' style='height: 100%; width: 100%;'>" +
                        "<div class='ytilsRexMd' id='" + fullScreenPreviewInnerId + "' style='font-family: " + rexMdConfigFont + "; background: none; border: 0; color: #525252; height: 100%; overflow: scroll; width: 100%;'></div>" +
                    "<div>";

                document.body.appendChild(fullScreenPreview);

                updateTextAreaInputAndSetFocus();
                $(BODY).css(OVERFLOW, HIDDEN);

                var displayErrorMessage = function(msg) {

                    $(errorMessageSelector).html(msg);
                    $(errorMessageContainerSelector).show();
                };

                var closeAllOverlays = function(attach) {

                    updateModuleTextAreaInputAndSetFocus();
                    yScheduler.deactivate();

                    var targetedFullScreenOverlaySelector = createJQueryIdSelector(attach + FULL_SCREEN_OVERLAY);
                    var targetedFullScreenHeaderSelector = createJQueryIdSelector(attach + FULL_SCREEN_HEADER);
                    var targetedFullScreenTextareaSelector = createJQueryIdSelector(attach + FULL_SCREEN_TEXTAREA);

                    $(targetedFullScreenOverlaySelector).hide();
                    $(targetedFullScreenHeaderSelector).hide();
                    $(targetedFullScreenTextareaSelector).hide();
                    previewVisible = false;
                    yupput.hide();

                    $(BODY).css(OVERFLOW, initialBodyOverflow);
                    Ytils.YupputHtml.setCursorPosition($(openerIdSelector)[0], currentCursorPosition);
                };

                var launchPreview = function() {

                    var errorText = $(openerSelector).data("i18npreviewerror");
                    var xhr = new XMLHttpRequest();
                    var request = "ytilsRexMdCsrf=" + csrf + "&input=" + $(textAreaInputSelector).val();
                    var response;
                    var parsedHtml;
                    var oAttr;

                    if (yupput.isVisible()) {

                        yupput.hide();
                    }

                    xhr.onload = function() {

                        if (xhr.status >= 200 && xhr.status < 300) {

                            response = JSON.parse(xhr.responseText);
                            if (response.status === AJAX_SUCCESS) {

                                parsedHtml = $.parseHTML(response.content);
                                $(IMG, parsedHtml).each(function() {

                                    oAttr = $(this, parsedHtml).attr(SRC);
                                    if (oAttr.substr(0, MEDIA_IMG_PREFIX.length) === MEDIA_IMG_PREFIX) {

                                        $(this, parsedHtml).attr(SRC, ("." + oAttr));
                                    }
                                });

                                if (window.Ytils.YtilsRexMd.isBackend) {

                                    $(A, parsedHtml).each(function() {

                                        oAttr = $(this, parsedHtml).attr(HREF);
                                        if (oAttr.substr(0, REDAXO_URL_PREFIX.length) === REDAXO_URL_PREFIX) {

                                            $(this, parsedHtml).attr(HREF, ("." + oAttr));
                                        }
                                    });
                                }

                                $(previewBtnSelector).hide();
                                previewVisible = true;

                                $(fullScreenPreviewSelector).show();
                                $(fullScreenPreviewInnerSelector).html(parsedHtml);

                            } else {

                                displayErrorMessage(errorText);
                            }

                        } else {

                            displayErrorMessage(errorText);
                        }
                    };

                    xhr.open('POST', ajaxtargetMd, true);
                    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
                    xhr.send(request);
                };

                $(previewBtnSelector).click(function() {

                    launchPreview();
                });

                $(errorMessageCloseBtnSelector).click(function() {

                    $(errorMessageContainerSelector).hide();
                });

                $(closeBtnSelector).click(function() {

                    if (previewVisible) {

                        previewVisible = false;
                        $(fullScreenPreviewSelector).hide();
                        $(previewBtnSelector).show();

                    } else {

                        closeAllOverlays($(this).data("attach"));
                    }
                });

                var assignCursorPosition = function() {

                    currentCursorPosition = $(textAreaInputSelector).prop("selectionStart");
                };

                $(textAreaInputSelector).keyup(function() {

                    assignCursorPosition();
                });

                $(textAreaInputSelector).click(function() {

                    assignCursorPosition();
                });

                $(openerIdSelector).keyup(function() {

                    assignOpenerCursorPosition();
                });

                $(openerIdSelector).click(function() {

                    assignOpenerCursorPosition();
                });

                var yupputSelectionCallback = function(selectedYupputItem/*, inputValue */) {

                    var textAreaVal;
                    var textAreaValSplit;
                    var newTextAreaVal;
                    var insertion;
                    var cursorInsertionPoint;

                    var splitTextAt = function(value, index)
                    {
                        var part0 = value.substring(0, index);
                        var part1 = value.substring(index);

                        return { "part0": part0, "part1": part1 };
                    };

                    textAreaVal = $(textAreaInputSelector).val();
                    textAreaValSplit = splitTextAt(textAreaVal, currentCursorPosition);
                    newTextAreaVal = textAreaValSplit.part0;

                    if (yupputCallbackMode === YUPPUT_MODE_ARTICLES) {

                        insertion = "[" + selectedYupputItem.headline + "](rex-article://" + selectedYupputItem.value + ")";

                    } else if (yupputCallbackMode === YUPPUT_MODE_MEDIA_POOL) {

                        if (Ytils.Toolbox.Common.isStringEndsWith(selectedYupputItem.value, "://img")) {

                            selectedYupputItem.value = selectedYupputItem.value.replace("://img", "");
                            insertion = "![" + selectedYupputItem.headline + "](" + selectedYupputItem.value + " \"" + selectedYupputItem.headline + "\")";

                        } else {

                            selectedYupputItem.value = selectedYupputItem.value.replace("://file", "");
                            insertion = "[" + selectedYupputItem.headline + "](rex-media://" + selectedYupputItem.value + ")";
                        }
                    }

                    cursorInsertionPoint = currentCursorPosition + insertion.length;
                    newTextAreaVal += insertion;
                    newTextAreaVal += textAreaValSplit.part1;

                    $(textAreaInputSelector).val(newTextAreaVal);
                    Ytils.YupputHtml.setCursorPosition($(textAreaInputSelector)[0], cursorInsertionPoint);

                    yupput.hide();
                };

                yupput = new Ytils.Yupput(yupputMpData, yupputSelectionCallback, {

                    "placeholder": placeholder,
                    "maxItemCount": rexMdYupputItemCount,
                    "ctrlShiftChar": null,
                    "hideOnClickOutside": true,
                    "containsForHeadlineMatches": !!containsForArticlesAndMediaPool
                });

                var launchYupputArticles = function() {

                    yupputCallbackMode = YUPPUT_MODE_ARTICLES;

                    if (yupput.isVisible()) {

                        yupput.hide();
                    }

                    yupput.updatePlaceholder(placeholderArticles);
                    yupput.updateData(yupputArtData);
                    yupput.show();
                };

                var launchYupputMediaPool = function() {

                    yupputCallbackMode = YUPPUT_MODE_MEDIA_POOL;

                    if (yupput.isVisible()) {

                        yupput.hide();
                    }

                    yupput.updatePlaceholder(placeholderMediaPool);
                    yupput.updateData(yupputMpData);
                    yupput.show();
                };

                $(articlesYupputBtnIdSelector).click(launchYupputArticles);
                $(mediaPoolYupputBtnIdSelector).click(launchYupputMediaPool);

                document.addEventListener("keydown", function(e) {

                    var ESCAPE = "Escape";

                    if (false === previewVisible) {

                        if (e.ctrlKey && e.shiftKey && e.key === YUPPUT_MODE_ARTICLES) {

                            launchYupputArticles();
                        }

                        if (e.ctrlKey && e.shiftKey && e.key === YUPPUT_MODE_MEDIA_POOL) {

                            launchYupputMediaPool();
                        }

                        if (e.ctrlKey && e.shiftKey && e.key === PREVIEW_MODE) {

                            launchPreview();
                        }

                        if (e.key === ESCAPE && false === yupput.isVisible()) {

                            closeAllOverlays(openerId);
                        }

                    } else {

                        if (e.key === ESCAPE) {

                            $(closeBtnSelector).trigger("click");
                        }
                    }
                });

                assignCursorPositionFromOpener();

                /* // Saving function not done yet.
                   // After creating a new module block
                   // we need to re-open the module behind the
                   // scenes.
                $(saveBtnSelector).click(function() {

                    updateModuleTextAreaInputAndSetFocus();

                    if ($(MODULE_UPDATE_BTN_SELECTOR).length) {
                        $(MODULE_UPDATE_BTN_SELECTOR).click();
                    } else {
                        $(MODULE_SAVE_BTN_SELECTOR).click();
                    }

                    updateTextAreaInputAndSetFocus();
                    scrollToTop();
                });
                */
            }
        });
    });

}());