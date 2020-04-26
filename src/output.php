<?php

$content = <<<'EOT'
REX_VALUE[id=1 output=html]
EOT;

?><div class="<?php echo YtilsRexMd::HTML_WRAPPER_CLASS; ?>"><?php echo YtilsRexMd::parseContent($content); ?></div>