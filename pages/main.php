<?php

$content = $this->i18n('main_content');
$content = str_replace('{{documentationUrlEn}}', '<a href="https://rexmd.ytils.com/en/documentation">https://rexmd.ytils.com/en/documentation</a>', $content);
$content = str_replace('{{documentationUrlDe}}', '<a href="https://rexmd.ytils.com/de/dokumentation">https://rexmd.ytils.com/de/dokumentation</a>', $content);

$fragment = new rex_fragment();
$fragment->setVar('title', $this->i18n('main_title'), false);
$fragment->setVar('body', $content, false);
echo $fragment->parse('core/page/section.php');
