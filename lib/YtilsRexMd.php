<?php

/**
 * Ytils RexMd
 * Main class
 *
 * @author Kim Schneider <kim@schneidersit.de>
 * @license MIT License
 */

class YtilsRexMd
{
    public const VERSION = '0.9.4';
    public const REDAXO_ADDON_ID = 'ytils_rex_md';

    public const MEDIA_POOL_IMAGE_SUFFIX = "://img";
    public const MEDIA_POOL_OTHER_SUFFIX = "://file";

    public const CONFIG_KEY_FONT_SIZE = 'ytils_rex_md_config_font_size';
    public const CONFIG_VALUE_FONT_SIZE = 16;
    public const CONFIG_KEY_YUPPUT_ITEMS = 'ytils_rex_md_config_number_of_yupput_items';
    public const CONFIG_VALUE_YUPPUT_ITEMS = 4;
    public const CONFIG_KEY_OUTER_DIV_CONTAINER = 'ytils_rex_md_config_outer_div_container';
    public const CONFIG_VALUE_OUTER_DIV_CONTAINER = 1;
    public const CONFIG_KEY_FONT = 'ytils_rex_md_config_font';
    public const CONFIG_VALUE_FONT = '"Lucida Grande", "Helvetica Neue", Helvetica, Arial, sans-serif';
    public const CONFIG_KEY_CONTAINS_FOR_ARTICLES_AND_MEDIAPOOL = 'ytils_rex_md_config_contains_for_articles_and_media_pool';
    public const CONFIG_VALUE_CONTAINS_FOR_ARTICLES_AND_MEDIAPOOL = 0;

    public const AJAX_URL_MD = '../index.php?rex-api-call=YtilsRexMdApi';
    public const AJAX_SUCCESS = 'success';
    public const AJAX_ERROR = 'error';

    public const CSRF_TOKEN_KEY = 'ytilsRexMdCsrf';
    public const HTML_ID_PREFIX = 'ytilsRexMd';
    public const HTML_WRAPPER_CLASS = self::HTML_ID_PREFIX;

    // public const OPEN_ARTICLE_YUPPUT_IMAGE_DATA = 'data:image/png;base64,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';
    // public const OPEN_MEDIA_POOL_YUPPUT_IMAGE_DATA = 'data:image/png;base64,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';
    public const EXPAND_IMAGE_DATA = 'data:image/png;base64,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';

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
        $content = Parsedown::instance()->parse($content);
        $content = static::replaceImagesFromMediaPool($content);
        $content = static::replaceRexArticleIds($content);

        return $content;
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
     * @return string
     */
    public static function getRexMdConfig(): string
    {
        $addon = rex_addon::get(static::REDAXO_ADDON_ID);

        $configObj = array();
        $configObj[static::CONFIG_KEY_YUPPUT_ITEMS] = $addon->getConfig(static::CONFIG_KEY_YUPPUT_ITEMS);
        $configObj[static::CONFIG_KEY_OUTER_DIV_CONTAINER] = $addon->getConfig(static::CONFIG_KEY_OUTER_DIV_CONTAINER);
        $configObj[static::CONFIG_KEY_FONT] = $addon->getConfig(static::CONFIG_KEY_FONT);
        $configObj[static::CONFIG_KEY_FONT_SIZE] = $addon->getConfig(static::CONFIG_KEY_FONT_SIZE);
        $configObj[static::CONFIG_KEY_CONTAINS_FOR_ARTICLES_AND_MEDIAPOOL] = $addon->getConfig(static::CONFIG_KEY_CONTAINS_FOR_ARTICLES_AND_MEDIAPOOL);

        return json_encode($configObj, JSON_FORCE_OBJECT);
    }

    /**
     * @return false|string
     * @throws rex_sql_exception
     */
    public static function getYupputArticleItemsJson(): string
    {
        $yupputItems = array();

        $articleTable = rex::getTablePrefix().'article';

        $dbHandle = rex_sql::factory();
        $dbHandle->setQuery('SELECT '.$articleTable.'.id, '.$articleTable.'.name, '.$articleTable.'.catname, '.$articleTable.'.status, '.$articleTable.'.clang_id FROM '.$articleTable.' ORDER BY name ASC, catname ASC;');
        $dbHandle->execute();

        foreach ($dbHandle as $row) {

            $id = $row->getValue('id');
            $clang = $row->getValue('clang_id');
            $name = $row->getValue('name');
            $cat = $row->getValue('catname');
            $isOnline = strval($row->getValue("status")) === '1';
            if ($isOnline) {

                $cat = '(online) '.$cat;

            } else {

                $cat = '(offline) '.$cat;
            }

            $yupputItem = array(
                'headline' => $name,
                'metaData' => $cat,
                'value' => $id.":".$clang
            );

            $yupputItems[] = $yupputItem;
        }

        return json_encode($yupputItems);
    }

    /**
     * @return false|string
     * @throws rex_sql_exception
     */
    public static function getYupputMediaItemsJson(): string
    {
        $yupputItems = array();

        $mediaTable = rex::getTablePrefix().'media';
        $mediaCategoryTable = $mediaTable.'_category';

        $dbHandle = rex_sql::factory();
        $dbHandle->setQuery('SELECT '.$mediaTable.'.*, '.$mediaCategoryTable.'.name AS catname FROM '.$mediaTable.' LEFT OUTER JOIN '.$mediaCategoryTable.' ON '.$mediaTable.'.category_id = '.$mediaCategoryTable.'.id  ORDER BY '.$mediaTable.'.title ASC, '.$mediaTable.'.filename ASC;');
        $dbHandle->execute();

        foreach ($dbHandle as $row) {

            $file = $row->getValue('filename');
            $title = $row->getValue('title');
            $cat = $row->getValue('catname');
            $isImage = $row->getValue('width') !== null && $row->getValue('height') !== null;
            $headline = static::createYupputItemHeadline($title, $cat, $file);
            $metaData = $file;
            $thumbnail = rex_media_manager::getUrl('rex_mediapool_detail', $file);
            if ($isImage) {
                $value = $file.static::MEDIA_POOL_IMAGE_SUFFIX;
            } else {
                $value = $file.static::MEDIA_POOL_OTHER_SUFFIX;
            }

            $yupputItem = array(
                'headline' => $headline,
                'metaData' => $metaData,
                'thumbnail' => $thumbnail,
                'value' => $value
            );

            $yupputItems[] = $yupputItem;
        }

        return json_encode($yupputItems);
    }

    /**
     * @param string $title
     * @param string $category
     * @param string $filename
     * @return string
     */
    public static function createYupputItemHeadline(?string $title, ?string $category, ?string $filename)
    {
        if (false === static::isNullOrEmpty($title)) {

            if (false === static::isNullOrEmpty($category)) {

                return trim($title).' ('.trim($category).')';
            }

            return trim($title);
        }

        if (false === static::isNullOrEmpty($category)) {

            return trim($filename).' ('.trim($category).')';
        }

        return trim($filename);
    }

    /**
     * For installation process. Initiating the default config values.
     */
    public static function createDefaultConfig()
    {
        $addon = rex_addon::get(static::REDAXO_ADDON_ID);

        $addon->setConfig(static::CONFIG_KEY_YUPPUT_ITEMS, static::CONFIG_VALUE_YUPPUT_ITEMS);
        $addon->setConfig(static::CONFIG_KEY_OUTER_DIV_CONTAINER, static::CONFIG_VALUE_OUTER_DIV_CONTAINER);
        $addon->setConfig(static::CONFIG_KEY_FONT, static::CONFIG_VALUE_FONT);
        $addon->setConfig(static::CONFIG_KEY_FONT_SIZE, static::CONFIG_VALUE_FONT_SIZE);
        $addon->setConfig(static::CONFIG_KEY_CONTAINS_FOR_ARTICLES_AND_MEDIAPOOL, static::CONFIG_VALUE_CONTAINS_FOR_ARTICLES_AND_MEDIAPOOL);
    }

    /**
     * This function finds all <img>-tags created by the Yupput dialogue and
     * transforms the given image from /media folder to a backend/frontend relative
     * path.
     *
     * @param string $parsedContent
     * @return string
     */
    private static function replaceImagesFromMediaPool(string $parsedContent): string
    {
        preg_match_all('/<img(.*?)src=("|\'|)(.*?)("|\'| )(.*?)>/s', $parsedContent, $matches);

        if (is_array($matches) && is_array($matches[0]) && count($matches[0]) > 0) {

            foreach ($matches[0] as $imgElem) {

                try {

                    $srcAttr = 'src';

                    $dom = new DOMDocument();
                    $dom->loadHTML($imgElem);
                    /** @var $elem DOMElement */
                    $elem = $dom->getElementsByTagName('img')[0];
                    $src = $elem->getAttribute($srcAttr);

                    $rm = rex_media::get($src);
                    if (null !== $rm) {

                        $replacementUrl = $rm->getUrl();
                        $elem->setAttribute($srcAttr, $replacementUrl);

                        $transformedImgElem = $dom->saveHTML($elem);
                        $parsedContent = str_ireplace($imgElem, $transformedImgElem, $parsedContent);
                    } // else: Won't change $parsedContent as well.

                } catch (\Exception $e) {

                    // Do not change $parsedContent.
                }
            }
        }

        return $parsedContent;
    }

    /**
     * Whether a value is null or empty with only whitespaces.
     *
     * @param string $val
     * @return bool
     */
    private static function isNullOrEmpty(?string $val): bool
    {
        if (is_null($val)) {

            return true;
        }

        $val = trim($val);

        return $val === '';
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
        $matches = self::pregMatchForRexArticle($content);
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
     * Preg_matches rex-article://1 and rex-article://2:3.
     *
     * @param string $type
     * @param string $content
     * @return array
     */
    private static function pregMatchForRexArticle(string $content): array
    {
        $count = preg_match_all('/(rex-article):\/\/([a-z0-9-_.])*(:[0-9])?/i', $content, $matches);

        if ($count) {

            return $matches[0];
        }

        return array();
    }

    /**
     * Internal method to run different preg_match_all variants that are
     * supported by Ytils RexMd. The following $types are supported:
     *  - rex-media (without clang)
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
