<?php

require_once(__DIR__ . "/../Db.php");
//include_once "../Types.php";

use GraphQL\Type\Definition\ObjectType;


class QueryType extends ObjectType
{
    public function __construct()
    {
        $config = [
            'fields' => function () {
                return [
                    'user' => [
                        'type' => Types::user(),
                        'description' => 'Возвращает пользователя по id',
                        'args' => [
                            'id' => Types::int()
                        ],
                        'resolve' => function ($root, $args) {
                            return Db::selectOne("SELECT * FROM userList WHERE id = {$args['id']}");
                        }
                    ],
                    'allUsers' => [
                        'type' => Types::listOf(Types::user()),
                        'description' => 'Список пользователей',
                        'resolve' => function () {
                            return Db::select('SELECT * FROM userList');
                        }
                    ],
                    'allPositions' => [
                        'type' => Types::listOf(Types::position()),
                        'description' => 'Список должностей',
                        'resolve' => function () {
                            return Db::select('SELECT * FROM `positions`');
                        }
                    ],
                ];
            }
        ];
        parent::__construct($config);
    }
}
