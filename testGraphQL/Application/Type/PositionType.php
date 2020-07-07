<?php

require_once(__DIR__ . "/../Db.php");
require_once(__DIR__ . "/../Types.php");

use GraphQL\Type\Definition\ObjectType;

class PositionType extends ObjectType
{
    public function __construct()
    {
        $config =[
            'description' => 'Должность',
            'fields' => function(){
                return[
                    'id' => [
                        'type' => Types::int(),
                        'description' => 'Идентификатор должности'
                    ],
                    'position' => [
                        'type' => Types::string(),
                        'description' => 'Название должности'
                    ],
                ];
            }

];
            parent::__construct($config);
    }
}
