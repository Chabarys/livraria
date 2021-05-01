<?php

require("../def/function.php"); 

$nomeLivro = $_REQUEST["nomeLivro"];
$nomeAutor = $_REQUEST["nomeAutor"];
$categoria = $_REQUEST["categoria"];

!$nomeLivro ? json_error("Por favor, preencha o nome do livro!") : null;
!$nomeAutor ? json_error("Por favor, preencha o nome do autor!") : null;
!$categoria ? json_error("Por favor, preencha a categoria!") : null;

$connection = connection();

$result = $connection->query("INSERT INTO  livro (nome, autor, categoria) VALUES ('{$nomeLivro}', '{$nomeAutor}', '{$categoria}')");

if(!$result){
    $erro = $connection->errorInfo();
    json_error("Houve algum erro -> {$erro[2]}");
}else{
    json_success([
        "message" => "Livro Inserido com sucesso",
    ]);
}
