<?php

require("../def/function.php"); 

$livro_id = $_REQUEST["livro_id"];

!$livro_id ? json_error("Por favor, preencha o nome do livro!") : null;

$connection = connection();

$result = $connection->query("DELETE FROM livro WHERE livro_id = {$livro_id};");

if(!$result){
    $erro = $connection->errorInfo();
    json_error("Houve algum erro -> {$erro[2]}");
}else{
    json_success([
        "message" => "Livro Deletado com sucesso",
    ]);
}
