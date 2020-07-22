<?php

require_once(__DIR__ . "/../Db.php");

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
                            return QueryType::userSelect($root, $args);
                        }
                    ],
                    'allUsers' => [
                        'type' => Types::listOf(Types::user()),
                        'description' => 'Список пользователей',
                        'resolve' => function () {
                            return QueryType::allUsersSelect();
                        }
                    ],
                    'allPositions' => [
                        'type' => Types::listOf(Types::position()),
                        'description' => 'Список должностей',
                        'resolve' => function () {
                            return QueryType::allPositionsSelect();
                        }
                    ],
                    'userSalary' => [
                        'type' => Types::salary(),
                        'description' => 'Зарпалата',
                        'args' => [
                            'id' => Types::int()
                        ],
                        'resolve' => function ($root, $args) {
                            return QueryType::SalarySelect($root, $args);
                        }
                    ],

                    'userSalaryHistory' => [
                        'type' => Types::listOf(Types::salary()),
                        'description' => 'История изменения зарплаты',
                        'args' => [
                            'id' => Types::int()
                        ],
                        'resolve' => function ($root, $args) {
                            return QueryType::SalaryHistorySelect($root, $args);
                        }
                    ],
                    'getNumPosition' => [
                        'type' => Types::listOf(Types::position()),
                        'description' => 'Количество людей на должности',
                        'resolve' => function () {
                            return QueryType::getNumPositionSelect();
                        }
                    ],
                ];
            }
        ];
        parent::__construct($config);
    }

    public static function userSelect($root, $args)
    {
        return Db::selectOne("SELECT * FROM userList WHERE id = {$args['id']}");

    }

    public static function allUsersSelect()
    {
        return Db::select('SELECT * FROM userList INNER JOIN `positions` ON position_id = positions.PositionId ORDER BY userList.id');

    }

    public static function allPositionsSelect()
    {
        return Db::select('SELECT * FROM `positions`');

    }

    public static function SalarySelect($root, $args)
    {
        return Db::selectOne("SELECT * FROM salary WHERE user_id = {$args['id']}");

    }
    public static function SalaryHistorySelect($root, $args)
    {
        return Db::select("SELECT * FROM historySalary WHERE user_id = {$args['id']}");

    }

    public static function getNumPositionSelect()
    {
        return Db::select('SELECT  position, PositionId, count( position_id) AS positionCount FROM userList RIGHT JOIN `positions` ON position_id = Positionid  group by  PositionId, position');

    }
}
