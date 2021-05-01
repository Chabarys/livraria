<?php

require("../def/function.php"); 

$idLivro = $_REQUEST["idLivro"];
$nomeLivro = $_REQUEST["nomeLivro"];
$nomeAutor = $_REQUEST["nomeAutor"];
$categoria = $_REQUEST["categoria"];

!$

$connection = connection();

$result = $connection->query("UPDATE livro SET nome = '{$nomeLivro}' AND autor = '{$nomeAutor}' AND categoria = '{$categoria}' WHERE livro_id = {$idLivro}");

if(!$result){
    $erro = $connection->errorInfo();
    json_error("Houve algum erro -> {$erro[2]}");
}else{
    json_success([
        "message" => "Livro editado com sucesso",
    ]);
}