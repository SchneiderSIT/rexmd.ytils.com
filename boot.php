<?php

/**
 * Ytils RexMd
 * Redaxo Add-on boot file.
 *
 * @author Kim Schneider <kim@schneidersit.de>
 * @license MIT License
 */

if (rex::isBackend() && is_object(rex::getUser())) {

    /** @noinspection PhpUnhandledExceptionInspection */
    rex_view::addCssFile($this->getAssetsUrl('YtilsRexMd.css'));
    rex_view::addCssFile($this->getAssetsUrl('ytils.yupput-0.9.css'));
    /** @noinspection PhpUnhandledExceptionInspection */
    rex_view::addJsFile($this->getAssetsUrl('YtilsToolboxCommon.js'));
    rex_view::addJsFile($this->getAssetsUrl('YtilsToolboxDateTime.js'));
    rex_view::addJsFile($this->getAssetsUrl('YtilsRexMd.js'));
    rex_view::addJsFile($this->getAssetsUrl('ytils.yupput-0.9.js'));
}