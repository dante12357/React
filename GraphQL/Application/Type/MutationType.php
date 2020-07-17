<?php

require_once(__DIR__ . "/../Db.php");

use GraphQL\Type\Definition\ObjectType;


class MutationType extends ObjectType
{
    public function __construct()
    {
        $config = [
            'fields' => function () {
                return [
                    'changeUser' => [
                        'type' => Types::user(),
                        'description' => 'Изменение сотрудника',
                        'args' => [
                            'id' => Types::int(),
                            'name' => Types::string(),
                            'last_name' => Types::string(),
                            'birthday' => Types::string(),
                            'email' => Types::string(),
                            'date_employment' => Types::string(),
                            'phone' => Types::string(),
                            'probation' => Types::string(),
                            'salary' => Types::int(),
                            'position_id' => Types::int(),
                            'position' => Types::string(),
                            'avatarUrl' => Types::string(),
                        ],
                        'resolve' => function ($root, $args) {
                            return MutationType::changeUserResolve($root, $args);
                        }
                    ],
                    'addUser' => [
                        'type' => Types::user(),
                        'description' => 'Добавление пользователя',
                        'args' => [
                            'name' => Types::string(),
                            'last_name' => Types::string(),
                            'birthday' => Types::string(),
                            'email' => Types::string(),
                            'date_employment' => Types::string(),
                            'phone' => Types::string(),
                            'probation' => Types::string(),
                            'salary' => Types::int(),
                            'position_id' => Types::int(),
                            'position' => Types::string(),
                            'avatar_url' => Types::string(),
                        ],
                        'resolve' => function ($root, $args) {
                            return MutationType::addUserResolve($root, $args);
                        }
                    ],
                    'addPosition' => [
                        'type' => Types::position(),
                        'description' => 'Добавить должность',
                        'args' => [
                            'position' => Types::string(),
                            'positionCount' => Types::int()

                        ],
                        'resolve' => function ($root, $args) {
                            return MutationType::addPositionResolve($root, $args);

                        }
                    ],
                    'removePosition' => [
                        'type' => Types::position(),
                        'description' => 'Удалить должность',
                        'args' => [
                            'PositionId' => Types::int(),
                            'positionCount' => Types::int(),
                        ],
                        'resolve' => function ($root, $args) {
                            return MutationType::removePositionResolve($root, $args);
                        }
                    ]
                ];
            }
        ];
        parent::__construct($config);
    }

    public static function changeUserResolve($root, $args)
    {
        $args['birthday'] = new  DateTime($args['birthday']);
        $args['birthday'] = $args['birthday']->format('Y-m-d');
        $args['date_employment'] = new DateTime($args['date_employment']);
        $args['date_employment'] = $args['date_employment']->format('Y-m-d');
        Db::update("UPDATE userList SET 
            `name` = '{$args['name']}',
            `last_name` = '{$args['last_name']}',
            `birthday` = '{$args['birthday']}',
            `email` = '{$args['email']}',
            `date_employment` = '{$args['date_employment']}',
            `phone` = '{$args['phone']}',
            `probation` = '{$args['probation']}',
            `salary` = '{$args['salary']}',
            `position_id` = '{$args['position_id']}' WHERE `id` = {$args['id']}");
        return Db::selectOne("SELECT * from userList WHERE id = {$args['id']}");
    }

    public static function addUserResolve($root, $args)
    {
        $args['birthday'] = new  DateTime($args['birthday']);
        $args['birthday'] = $args['birthday']->format('Y-m-d');
        $args['date_employment'] = new DateTime($args['date_employment']);
        $args['date_employment'] = $args['date_employment']->format('Y-m-d');

        $userId = Db::insert("INSERT INTO userList (`name`,`last_name`,`birthday`,`email`,
                            `date_employment`,`phone`,`probation`,`salary`,`position_id`) VALUES 
                        ('{$args['name']}','{$args['last_name']}','{$args['birthday']}','{$args['email']}',
                        '{$args['date_employment']}','{$args['phone']}','{$args['probation']}','{$args['salary']}',
                        '{$args['position_id']}')");
        return Db::selectOne("SELECT * from userList INNER JOIN `positions` ON position_id = positions.PositionId WHERE userList.id = $userId ");
    }

    public static function addPositionResolve($root, $args)
    {
        $positionId = Db::insert("INSERT INTO `positions`(`position`) VALUES ('{$args['position']}')");
//        return Db::selectOne("SELECT *, count( position_id) AS positionCount from `positions` WHERE PositionId = $positionId");
        return Db::select('SELECT  position, PositionId, count(position_id) AS positionCount FROM userList RIGHT JOIN `positions` ON position_id = Positionid WHERE PositionId = ' . $positionId . ' group by  PositionId, position');

    }

    public static function removePositionResolve($root, $args)
    {
        Db::insert("DELETE FROM `positions` WHERE PositionId = {$args['PositionId']}");
        return Db::select('SELECT * FROM `positions`');

    }
}
