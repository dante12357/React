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
                            return Db::select('SELECT * FROM userList INNER JOIN `positions` ON position_id = positions.PositionId ORDER BY userList.id');
                        }
                    ],
                    'allPositions' => [
                        'type' => Types::listOf(Types::position()),
                        'description' => 'Список должностей',
                        'resolve' => function () {
                            return Db::select('SELECT * FROM `positions`');
                        }
                    ],
                    'getNumPosition' => [
                        'type' => Types::listOf(Types::position()),
                        'description' => 'Количество людей на должности',
                        'resolve' => function () {
                            return Db::select('SELECT  position, PositionId, count( position_id) AS positionCount FROM userList RIGHT JOIN `positions` ON position_id = Positionid  group by  PositionId, position');
                        }
                    ],
                ];
            }
        ];
        parent::__construct($config);
    }
}
