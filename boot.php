<?php

/**
 * Ytils RexMd
 * Redaxo Add-on boot file.
 *
 * @author Kim Schneider
 * @link ytils.com
 * @license MIT License
 */

if (rex::isBackend() && is_object(rex::getUser())) {

    /** @noinspection PhpUnhandledExceptionInspection */
    rex_view::addCssFile($this->getAssetsUrl('YtilsRexMd.css'));
    /** @noinspection PhpUnhandledExceptionInspection */
    rex_view::addJsFile($this->getAssetsUrl('YtilsToolboxCommon.js'));
    rex_view::addJsFile($this->getAssetsUrl('YtilsToolboxDateTime.js'));
    rex_view::addJsFile($this->getAssetsUrl('YtilsRexMd.js'));
}