<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: *');
header('Access-Control-Allow-Headers: content-type');
require_once __DIR__ . '/../vendor/autoload.php';

require_once __DIR__ .'/loader.php';
include_once "Application/Db.php";
include_once "Application/Types.php";

//use Application\Db;
//use Application\Types;
use GraphQL\GraphQL;
use GraphQL\Type\Schema;
spl_autoload_register("Types");

try {
    $config=[
        'host' =>'localhost',
        'username' => 'root',
        'password' => '',
        'database' => 'myDB',
    ];

    Db::init($config);

    $rawInput = file_get_contents('php://input');
    $input = json_decode($rawInput, true);
    $query = $input['query'];

//    if(isset($input['variables'])){
//        $variables = json_decode($input['variables'], true);
//    }
//    else {
//        $variables = null;
//
//    }
//    $variables = isset($input['variables']) ? json_decode($input['variables'], true) : null;
//    var_dump($variables);
    $schema = new Schema([
        'query' => Types::query(),
        'mutation' => Types::mutation()
    ]);

    $result = GraphQL::executeQuery($schema, $query,null, null, $input['variables']);
} catch (\Exception $e) {
    $result = [
        'error' => [
            'message' => $e->getMessage(),
            'status' => $e ->getCode()
        ]
    ];
}
header('Content-Type: application/json; charset=UTF-8');
echo json_encode($result);
