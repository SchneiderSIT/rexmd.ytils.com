<?php

require_once(dirname(__FILE__).'/../lib/YtilsRexMd.php');

const MIN_NUMBER_OF_YUPPUT_ITEMS = 1;
const MAX_NUMBER_OF_YUPPUT_ITEMS = 20;
const MIN_FONT_SIZE = 6;
const MAX_FONT_SIZE = 32;
const YINT = 'int';

$content = '';
$buttons = '';

if (rex_post('formsubmit', 'string') === '1') {

    $hasError = false;
    $numberOfYupputItems = rex_post(YtilsRexMd::CONFIG_KEY_YUPPUT_ITEMS, YINT);
    $fontSize = rex_post(YtilsRexMd::CONFIG_KEY_FONT_SIZE, YINT);
    $encapsulateOutputToDiv = rex_post(YtilsRexMd::CONFIG_KEY_OUTER_DIV_CONTAINER, YINT);
    $containsSearch = rex_post(YtilsRexMd::CONFIG_KEY_CONTAINS_FOR_ARTICLES_AND_MEDIAPOOL, YINT);

    if (false === ($numberOfYupputItems >= MIN_NUMBER_OF_YUPPUT_ITEMS && $numberOfYupputItems <= MAX_NUMBER_OF_YUPPUT_ITEMS)) {

        echo rex_view::error($this->i18n('ytils_rex_md_yupput_items_config_fail'));
        $hasError = true;

    } else {

        $this->setConfig(YtilsRexMd::CONFIG_KEY_YUPPUT_ITEMS, $numberOfYupputItems);
    }

    if (false === ($fontSize >= MIN_FONT_SIZE && $fontSize <= MAX_FONT_SIZE)) {

        echo rex_view::error($this->i18n('ytils_rex_md_font_size_config_fail'));
        $hasError = true;

    } else {

        $this->setConfig(YtilsRexMd::CONFIG_KEY_FONT_SIZE, $fontSize);
    }

    if ($encapsulateOutputToDiv === 1) {

        $this->setConfig(YtilsRexMd::CONFIG_KEY_OUTER_DIV_CONTAINER, $encapsulateOutputToDiv);

    } else {

        $this->setConfig(YtilsRexMd::CONFIG_KEY_OUTER_DIV_CONTAINER, 0);
    }

    if ($containsSearch === 1) {

        $this->setConfig(YtilsRexMd::CONFIG_KEY_CONTAINS_FOR_ARTICLES_AND_MEDIAPOOL, $containsSearch);

    } else {

        $this->setConfig(YtilsRexMd::CONFIG_KEY_CONTAINS_FOR_ARTICLES_AND_MEDIAPOOL, 0);
    }

    $this->setConfig(YtilsRexMd::CONFIG_KEY_FONT, rex_post(YtilsRexMd::CONFIG_KEY_FONT, 'string'));

    if (false === $hasError) {

        echo rex_view::success($this->i18n('config_saved'));
    }
}

$content .= '<fieldset><legend>' . $this->i18n('ytils_rex_md_config_ui_settings') . '</legend>';

$formElements = [];
$n = [];
$n['label'] = '<label for="ytils_rex_md_config_font">' . $this->i18n('ytils_rex_md_config_font') . '</label>';
$select = new rex_select();
$select->setId('ytils_rex_md_config_font');
$select->setAttribute('class', 'form-control');
$select->setName('ytils_rex_md_config_font');
$select->addOption('Lucida Grande, Helvetica Neue, Helvetica, Arial, sans-serif', '"Lucida Grande", "Helvetica Neue", Helvetica, Arial, sans-serif');
$select->addOption('Arial, Helvetica, sans-serif', 'Arial, Helvetica, sans-serif');
$select->addOption('Georgia, Times New Roman, Times, serif', 'Georgia, "Times New Roman", Times, serif');
$select->addOption('Times New Roman, Times, serif, Georgia', '"Times New Roman", Times, serif, Georgia');
$select->addOption('Verdana, Arial, Helvetica, sans-serif', 'Verdana, Arial, Helvetica, sans-serif');
$select->addOption('Courier New, Courier, monospace', '"Courier New", Courier, monospace');
$select->setSelected($this->getConfig('ytils_rex_md_config_font'));
$n['field'] = $select->get();
$formElements[] = $n;

$fragment = new rex_fragment();
$fragment->setVar('elements', $formElements, false);
$content .= $fragment->parse('core/form/container.php');

$formElements = [];
$n = [];
$n['label'] = '<label for="'.YtilsRexMd::CONFIG_KEY_FONT_SIZE.'">' . $this->i18n('ytils_rex_md_config_font_size') . '</label>';
$n['field'] = '<input class="form-control" type="number" min="'.MIN_FONT_SIZE.'" max="'.MAX_FONT_SIZE.'" id="'.YtilsRexMd::CONFIG_KEY_FONT_SIZE.'" name="'.YtilsRexMd::CONFIG_KEY_FONT_SIZE.'" value="'.$this->getConfig(YtilsRexMd::CONFIG_KEY_FONT_SIZE).'"/>';
$formElements[] = $n;
$fragment = new rex_fragment();
$fragment->setVar('elements', $formElements, false);
$content .= $fragment->parse('core/form/container.php');

$content .= '</fieldset><fieldset><legend>'.$this->i18n('ytils_rex_md_config_yupput_dialogue').'</legend>';

$formElements = [];
$n = [];
$n['label'] = '<label for="'.YtilsRexMd::CONFIG_KEY_YUPPUT_ITEMS.'">' . $this->i18n('ytils_rex_md_config_number_of_yupput_items') . '</label>';
$n['field'] = '<input class="form-control" type="number" min="'.MIN_NUMBER_OF_YUPPUT_ITEMS.'" max="'.MAX_NUMBER_OF_YUPPUT_ITEMS.'" id="'.YtilsRexMd::CONFIG_KEY_YUPPUT_ITEMS.'" name="'.YtilsRexMd::CONFIG_KEY_YUPPUT_ITEMS.'" value="'.$this->getConfig(YtilsRexMd::CONFIG_KEY_YUPPUT_ITEMS).'"/>';
$formElements[] = $n;
$fragment = new rex_fragment();
$fragment->setVar('elements', $formElements, false);
$content .= $fragment->parse('core/form/container.php');

$formElements = [];
$n = [];
$n['label'] = '<label for="'.YtilsRexMd::CONFIG_KEY_CONTAINS_FOR_ARTICLES_AND_MEDIAPOOL.'">' . $this->i18n('ytils_rex_md_config_contains_for_articles_and_mediapool') . '</label>';
$n['field'] = '<input type="checkbox" id="'.YtilsRexMd::CONFIG_KEY_CONTAINS_FOR_ARTICLES_AND_MEDIAPOOL.'" name="'.YtilsRexMd::CONFIG_KEY_CONTAINS_FOR_ARTICLES_AND_MEDIAPOOL.'"' . (!empty($this->getConfig(YtilsRexMd::CONFIG_KEY_CONTAINS_FOR_ARTICLES_AND_MEDIAPOOL)) && $this->getConfig(YtilsRexMd::CONFIG_KEY_CONTAINS_FOR_ARTICLES_AND_MEDIAPOOL) === 1 ? ' checked="checked"' : '') . ' value="1" />';
$formElements[] = $n;
$fragment = new rex_fragment();
$fragment->setVar('elements', $formElements, false);
$content .= $fragment->parse('core/form/checkbox.php');

$content .= '</fieldset><fieldset><legend>' . $this->i18n('ytils_rex_md_config_html_css') . '</legend>';

$formElements = [];
$n = [];
$n['label'] = '<label for="'.YtilsRexMd::CONFIG_KEY_OUTER_DIV_CONTAINER.'">' . $this->i18n('ytils_rex_md_config_outer_div_container') . '</label>';
$n['field'] = '<input type="checkbox" id="'.YtilsRexMd::CONFIG_KEY_OUTER_DIV_CONTAINER.'" name="'.YtilsRexMd::CONFIG_KEY_OUTER_DIV_CONTAINER.'"' . (!empty($this->getConfig(YtilsRexMd::CONFIG_KEY_OUTER_DIV_CONTAINER)) && $this->getConfig(YtilsRexMd::CONFIG_KEY_OUTER_DIV_CONTAINER) === 1 ? ' checked="checked"' : '') . ' value="1" />';
$formElements[] = $n;
$fragment = new rex_fragment();
$fragment->setVar('elements', $formElements, false);
$content .= $fragment->parse('core/form/checkbox.php');

$content .= "</fieldset>";

$formElements = [];
$n = [];
$n['field'] = '<button class="btn btn-save rex-form-aligned" type="submit" name="save" value="' . $this->i18n('config_save') . '">' . $this->i18n('config_save') . '</button>';
$formElements[] = $n;

$fragment = new rex_fragment();
$fragment->setVar('elements', $formElements, false);
$buttons = $fragment->parse('core/form/submit.php');
$buttons = '
<fieldset class="rex-form-action">
    ' . $buttons . '
</fieldset>
';

$fragment = new rex_fragment();
$fragment->setVar('class', 'edit');
$fragment->setVar('title', $this->i18n('config'));
$fragment->setVar('body', $content, false);
$fragment->setVar('buttons', $buttons, false);
$output = $fragment->parse('core/page/section.php');

$output = '<form action="' . rex_url::currentBackendPage() . '" method="post"><input type="hidden" name="formsubmit" value="1" />' . $output . '</form>';

echo $output;
