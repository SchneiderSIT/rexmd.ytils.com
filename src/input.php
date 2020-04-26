<?php

$textAreaHtmlId = YtilsRexMd::createId();
$csrfToken = YtilsRexMd::createAndRegisterCsrfToken();

/** @var $this rex_article_content_editor */
$currentArticleId = $this->getArticleId();
$currentArticle = rex_article::get($currentArticleId);

?><div class="ytilsRexMd">
    <div class="ytilsRexMdEditor">
        <div class="r">Ytils RexMd <img data-attach="<?php echo $textAreaHtmlId; ?>" class="ytilsRexMdExpandButton" src="<?php echo YtilsRexMd::EXPAND_IMAGE_DATA; ?>" alt="" /></div>
        <div class="ytilsRexMdTextArea">
            <label>
                <textarea data-csrf="<?php echo $csrfToken; ?>" data-articleurl="<?php echo rex_getUrl($currentArticleId, rex_clang::getCurrentId()); ?>" data-articleid="<?php echo $currentArticleId; ?>" data-articletitle="<?php echo htmlentities($currentArticle->getName()); ?>" data-ajaxtarget="<?php echo YtilsRexMd::AJAX_URL; ?>" id="<?php echo $textAreaHtmlId; ?>" class="ytilsRexMdTextArea" name="REX_INPUT_VALUE[1]">REX_VALUE[1]</textarea>
            </label>
        </div>
    </div>
</div>