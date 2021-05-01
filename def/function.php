<?php

// Conexão com o bando de dados
function connection(){ 
    return new PDO("pgsql:host=localhost dbname=database_livraria user=postgres password=postgres");
}

function json_error($message = ""){ 
    $json = ["status" => 2, "message" => $message];
    die(json_encode($json));  
}

function json_success($data = []){ 
    $json = ["status" => 0, "data" => $data];
    die(json_encode($json)); 
}