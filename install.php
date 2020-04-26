<?php

/**
 * Ytils RexMd
 * Redaxo Add-on install file.
 *
 * @author Kim Schneider <kim@schneidersit.de>
 * @license MIT License
 */

const SLASH = DIRECTORY_SEPARATOR;

$iOBasePath = dirname(__FILE__).SLASH."src".SLASH; // Productive
$outputSrcPath = $iOBasePath."output.php";
$inputSrcPath = $iOBasePath."input.php";

$output = file_get_contents($outputSrcPath);
$input = file_get_contents($inputSrcPath);

$keyAndName = 'Ytils RexMd Markdown editor';

$db = rex_sql::factory();
$sql = "SELECT rex_module.id FROM rex_module WHERE rex_module.key = '".$keyAndName."' ORDER BY rex_module.createdate ASC LIMIT 1;";

/** @noinspection PhpUnhandledExceptionInspection */
$dbRes = $db->setDBQuery($sql);

// If the module is already existant on the database, we'll update the entry, otherwise we'll create a new one.
if ($dbRes->getRows()) {

    /** @noinspection PhpUnhandledExceptionInspection */
    $existingModuleId = $dbRes->getValue("id");
    $sql = "UPDATE rex_module SET rex_module.output = :output, rex_module.input = :input, rex_module.updatedate = NOW() WHERE id = :id LIMIT 1;";
    $params = array('output' => $output, 'input' => $input, 'id' => $existingModuleId);
    /** @noinspection PhpUnhandledExceptionInspection */
    $dbRes->setDBQuery($sql, $params);

} else {

    $sql = "INSERT INTO rex_module VALUES (NULL, '".$keyAndName."', '".$keyAndName."', :output, :input, NOW(), '', NOW(), '', NULL, 1);";
    $params = array('output' => $output, 'input' => $input);
    /** @noinspection PhpUnhandledExceptionInspection */
    $dbRes->setDBQuery($sql, $params);
}
