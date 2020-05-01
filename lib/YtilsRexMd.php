<?php

/**
 * Ytils RexMd
 * Main class
 *
 * @author Kim Schneider
 * @link ytils.com
 * @license MIT License
 */

class YtilsRexMd
{
    // For GUI: https://github.com/Codecademy/textarea-helper

    public const VERSION = '0.1.0';

    public const AJAX_URL = '../index.php?rex-api-call=YtilsRexMdApi';
    public const AJAX_SUCCESS = 'success';
    public const AJAX_ERROR = 'error';

    public const CSRF_TOKEN_KEY = 'ytilsRexMdCsrf';
    public const HTML_ID_PREFIX = 'ytilsRexMd';
    public const HTML_WRAPPER_CLASS = self::HTML_ID_PREFIX;

    public const EXPAND_IMAGE_DATA = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABGdBTUEAALGPC/xhBQAAAMBlWElmTU0AKgAAAAgABwESAAMAAAABAAEAAAEaAAUAAAABAAAAYgEbAAUAAAABAAAAagEoAAMAAAABAAIAAAExAAIAAAAPAAAAcgEyAAIAAAAUAAAAgodpAAQAAAABAAAAlgAAAAAAAABhAAAAAQAAAGEAAAABUGl4ZWxtYXRvciAzLjkAADIwMjA6MDQ6MTMgMTM6MDQ6NjgAAAOgAQADAAAAAQABAACgAgAEAAAAAQAAABigAwAEAAAAAQAAABgAAAAA8VYkRAAAAAlwSFlzAAAO6wAADusBcc2BlQAABCJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IlhNUCBDb3JlIDUuNC4wIj4KICAgPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICAgICAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIKICAgICAgICAgICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIgogICAgICAgICAgICB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOmV4aWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vZXhpZi8xLjAvIgogICAgICAgICAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyI+CiAgICAgICAgIDxkYzpzdWJqZWN0PgogICAgICAgICAgICA8cmRmOkJhZy8+CiAgICAgICAgIDwvZGM6c3ViamVjdD4KICAgICAgICAgPHhtcDpNb2RpZnlEYXRlPjIwMjA6MDQ6MTMgMTM6MDQ6Njg8L3htcDpNb2RpZnlEYXRlPgogICAgICAgICA8eG1wOkNyZWF0b3JUb29sPlBpeGVsbWF0b3IgMy45PC94bXA6Q3JlYXRvclRvb2w+CiAgICAgICAgIDxleGlmOlBpeGVsWERpbWVuc2lvbj4yNDwvZXhpZjpQaXhlbFhEaW1lbnNpb24+CiAgICAgICAgIDxleGlmOlBpeGVsWURpbWVuc2lvbj4yNDwvZXhpZjpQaXhlbFlEaW1lbnNpb24+CiAgICAgICAgIDxleGlmOkNvbG9yU3BhY2U+MTwvZXhpZjpDb2xvclNwYWNlPgogICAgICAgICA8dGlmZjpDb21wcmVzc2lvbj4wPC90aWZmOkNvbXByZXNzaW9uPgogICAgICAgICA8dGlmZjpYUmVzb2x1dGlvbj45NzwvdGlmZjpYUmVzb2x1dGlvbj4KICAgICAgICAgPHRpZmY6UmVzb2x1dGlvblVuaXQ+MjwvdGlmZjpSZXNvbHV0aW9uVW5pdD4KICAgICAgICAgPHRpZmY6T3JpZW50YXRpb24+MTwvdGlmZjpPcmllbnRhdGlvbj4KICAgICAgICAgPHRpZmY6WVJlc29sdXRpb24+OTc8L3RpZmY6WVJlc29sdXRpb24+CiAgICAgIDwvcmRmOkRlc2NyaXB0aW9uPgogICA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgqwcJ9iAAACGklEQVRIDbWWS0tCQRTHuz7SSBNdK7oX0TQUeqza1apN+xZBizaB4EaIok0gtCzbFPQZamWbqI0UKH4C8bFwYfjIZ2r/I47cuXT1preBYR5nzu/vPTNnRsHtdi8ajcZnp9O5uaBiyWazr61Wa1tnMBgSVqs1UCgUEv1+f6CGhkajEcDcKJfLCZ3L5drK5/NPyWRyVw04YwSDwUewd3Q0MRgM9MygpPV4PIcmk+lIvBaMDmoPYXlIp9NxxhwKiBcq7H8jnB3R2i4EVy0Wi6lYLGoxH2e2mQQymcwdAFSHxev1ngAerFQqVTbHWg3rzNoCfuZwOGKlUilar9c/BEFYFLPmEhjBo7lc7iKVSsUAXhLDqT+zgBiOTT2Vgtl4JgE5OM4/bTC3r9yAqU5qAY8g5sOwSH859uB6bgEAKkjMCOAUc66MThc3p/gLfD5fGMlTB/iGI0wZcHtAGYp6IPWhmNvt9kvMW6S2aWPuC5CNx3Boo4qTiM45izmJ/KlwXwBPugJ6jCB3WphdSSsVGPuoAScYF6IRvUkbipizsMgm0fjXTOhwAnTlYh8CuLjWkf5hnJirCb6KTJwAeQC+Uq1Wv/CM7oVCoX1GaTQat7+dc2aXazmBZrN5j6ezhxtRi7RfljhxayU22eHQCcAurUBI6KEYPxayXgoMjCn4/f4Xm822VqvV3tR89M1mMz3678J//W1pt9ufer3+/Acm6OihKIvalwAAAABJRU5ErkJggg==';

    /**
     * This method parses the content of a YtilsRexMd module and
     * finds/replaces rex-article://* and rex-media://* content.
     *
     * @param string $content
     * @return string
     */
    public static function parseContent(string $content): string
    {
        $content = static::replaceRexImages($content);
        $content = static::replaceRexArticleIds($content);

        // Fur surpressing multiple definition warning:
        /** @noinspection PhpUndefinedClassInspection */
        return Parsedown::instance()->parse($content);
    }

    /**
     * Generates a HTML5-idenfitifer.
     *
     * @return string
     */
    public static function createId(): string
    {
        return self::HTML_ID_PREFIX.mt_rand();
    }

    /**
     * @return string
     */
    public static function createAndRegisterCsrfToken(): string
    {
        if (self::isRexMdCsrfSessionExisting()) {

            return $_SESSION[self::CSRF_TOKEN_KEY];
        }

        $token = md5(substr(str_shuffle('0123456789abcdefghijklmnopqrstuvwxyz'), 0, 10).mt_rand());
        $_SESSION[self::CSRF_TOKEN_KEY] = $token;

        return $token;
    }

    /**
     * Pass in $_POST and validate against the session.
     *
     * @param array $post
     * @return bool
     */
    public static function validateCsrfToken(array $post) : bool
    {
        $csrfSessionExisting = self::isRexMdCsrfSessionExisting();
        if ($csrfSessionExisting && array_key_exists(self::CSRF_TOKEN_KEY, $post)) {

            return $_SESSION[self::CSRF_TOKEN_KEY] === $post[self::CSRF_TOKEN_KEY];
        }

        return false;
    }

    /**
     * Replaces rex-article://* content to the concrete urls.
     * The adjusted content will be returned.
     *
     * @param string $content
     * @return string
     */
    private static function replaceRexArticleIds(string $content): string
    {
        $prefix = 'rex-article';
        $matches = self::pregMatchAllForType($prefix, $content);
        foreach ($matches as $match) {

            $match = trim($match);
            $splitMatch = self::splitMatch($prefix, $match);
            if (!empty($splitMatch)) {

                $articleRef = $splitMatch[1];
                if (strpos($articleRef, ':') === false) {

                    $content = str_replace($match, self::articleIdToArticleUrl($articleRef), $content);

                } else {

                    $articleRefSplit = explode(':', $articleRef);
                    if (is_array($articleRefSplit) && count($articleRefSplit) === 2) {

                        $content = str_replace($match, self::articleIdToArticleUrl($articleRefSplit[0], $articleRefSplit[1]), $content);
                    }
                }
            }
        }

        return $content;
    }

    /**
     * Replaces rex-media://* content to the concrete urls.
     * The adjusted content will be returned.
     *
     * @param string $content
     * @return string
     */
    private static function replaceRexImages(string $content): string
    {
        $prefix = 'rex-media';
        $matches = self::pregMatchAllForType($prefix, $content);

        foreach ($matches as $match) {

            $match = trim($match);
            $splitMatch = self::splitMatch($prefix, $match);
            if (!empty($splitMatch)) {

                $content = str_replace($match, self::mediaFileToMediaUrl($splitMatch[1]), $content);
            }
        }

        return $content;
    }

    /**
     * Splits a match to an array with two indices. The first one is the prefix
     * with '://' and the second is the match that can be converted be rex_*::get(...)
     * calls.
     *
     * @param string $prefix
     * @param string $match
     * @return string[]
     */
    private static function splitMatch(string $prefix, string $match): array
    {
        $prefix = $prefix.'://';
        $matchExpl = explode($prefix, $match);

        if ($matchExpl && is_array($matchExpl) && count($matchExpl) === 2) {

            return array($matchExpl[0], $matchExpl[1]);
        }

        return array();
    }

    /**
     * Converts a file name aka. identifier to its url.
     *
     * @param string $file
     * @return string
     */
    private static function mediaFileToMediaUrl(string $file): string
    {
        $rm = rex_media::get($file);
        if (is_null($rm)) {

            return $file;
        }

        return $rm->getUrl();
    }

    /**
     * Returns the rex_article-URL for an existing $id/$cLang pair.
     *
     * @param string $id
     * @param string|null $cLang
     * @return string
     */
    private static function articleIdToArticleUrl(string $id, string $cLang = null): string
    {
        $ra = rex_article::get($id, $cLang);
        if (is_null($ra)) {

            if (is_null($cLang)) {

                return $id;
            }

            return $id.':'.$cLang;
        }

        return $ra->getUrl();
    }

    /**
     * Internal method to run different preg_match_all variants that are
     * supported by Ytils RexMd. The following $types are supported:
     *  - rex-media
     *  - rex-url
     *
     * @param string $type
     * @param string $content
     * @return array
     */
    private static function pregMatchAllForType(string $type, string $content): array
    {
        $count = preg_match_all('/(' . $type . '):\/\/([a-z0-9-_.])*/i', $content, $matches);

        if ($count) {

            return $matches[0];
        }

        return array();
    }

    /**
     * @return bool
     */
    private static function isRexMdCsrfSessionExisting(): bool
    {
        if (!session_id()) {

            session_start();
        }

        return array_key_exists(self::CSRF_TOKEN_KEY, $_SESSION);
    }
}
