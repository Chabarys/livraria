<?php

require("../def/function.php"); 

$connection = connection();

$result = $connection->query("SELECT * FROM livro ORDER BY livro_id DESC");
$arr = $result->fetchAll(2);

json_success($arr);