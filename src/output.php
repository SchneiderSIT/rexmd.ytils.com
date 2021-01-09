<?php

$addOn = rex_addon::get('ytils_rex_md');
$encapsulate = $addOn->getConfig('ytils_rex_md_config_outer_div_container') === 1;

$content = <<<'EOT'
REX_VALUE[id=1 output=html]
EOT;

?><?php if ($encapsulate) { ?><div class="<?php echo YtilsRexMd::HTML_WRAPPER_CLASS; ?>"><?php } ?><?php echo YtilsRexMd::parseContent($content); ?><?php if ($encapsulate) { ?></div><?php } ?>