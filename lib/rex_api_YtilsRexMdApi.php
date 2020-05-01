<?php

/**
 * Ytils RexMd
 * Redaxo Add-on AJAX API implementation.
 *
 * @author Kim Schneider
 * @link ytils.com
 * @license MIT License
 */

require_once(dirname(__FILE__) . DIRECTORY_SEPARATOR . 'Parsedown.php');
require_once(dirname(__FILE__) . DIRECTORY_SEPARATOR . 'YtilsRexMd.php');

class rex_api_YtilsRexMdApi extends rex_api_function
{
    const STATUS_KEY = 'status';
    const CONTENT_KEY = 'content';

    protected $published = true;

    public function execute()
    {
        header('Content-Type: application/json; charset=UTF-8');

        if (YtilsRexMd::validateCsrfToken($_POST)) {

            $parsed = YtilsRexMd::parseContent($_POST['input']);
            echo json_encode(array(self::STATUS_KEY => YtilsRexMd::AJAX_SUCCESS, self::CONTENT_KEY => $parsed));

        } else {

            echo json_encode(array(self::STATUS_KEY => YtilsRexMd::AJAX_ERROR, self::CONTENT_KEY => ''));
        }

        exit();
    }
}