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
                    'PositionId' => [
                        'type' => Types::int(),
                        'description' => 'Идентификатор должности'
                    ],
                    'position' => [
                        'type' => Types::string(),
                        'description' => 'Название должности'
                    ],
                    'positionCount' => [
                        'type' => Types::int(),
                        'description' => 'Количество кто использует должность'
                    ]
                ];
            }

];
            parent::__construct($config);
    }
}
