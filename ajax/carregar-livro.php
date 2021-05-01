<?php

require("../def/function.php"); 

$livro_id = $_REQUEST["livro_id"];

$connection = connection();

$result = $connection->query("SELECT * FROM livro WHERE livro_id = {$livro_id}");
$arr = $result->fetchAll(2);

if(count($arr) == 0) {
    json_error("Livro não encontrado!");
}

$livro = $arr[0];

json_success([
    "livro_id" => $livro["livro_id"],
    "nome" => $livro["nome"],
    "autor" => $livro["autor"],
    "categoria" => $livro["categoria"]
]);