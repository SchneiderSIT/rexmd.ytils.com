<?php

$content = $this->i18n('main_content');
$content = str_replace('{{documentationUrlEn}}', '<a href="https://www.ytils.com/en/rexmd" target="_blank">ytils.com/rexmd</a>', $content);
// $content = str_replace('{{documentationUrlDe}}', '<a href="https://www.ytils.com/en/rexmd">https://www.ytils.com/rexmd</a>', $content);

$fragment = new rex_fragment();
$fragment->setVar('title', $this->i18n('main_title'), false);
$fragment->setVar('body', $content, false);
echo $fragment->parse('core/page/section.php');
