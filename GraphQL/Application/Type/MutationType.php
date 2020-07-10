<?php

require_once(__DIR__ . "/../Db.php");
require_once(__DIR__ . "/../Types.php");

use GraphQL\Type\Definition\ObjectType;


class MutationType extends ObjectType
{
    public function __construct()
    {
        $config = [
            'fields' => function () {
                return [
                    'changeUserEmail' => [
                        'type' => Types::user(),
                        'description' => 'Изменение E-mail пользователя',
                        'args' => [
                            'id' => Types::int(),
                            'email' => Types::string()
                        ],
                        'resolve' => function ($root, $args) {
                            return MutationType::changeUserEmailResolve($root, $args);
                        }
                    ],
                    'addUser' => [
                        'type' => Types::user(),
                        'description' => 'Добавление пользователя',
                        'args' => [
                            'name' => Types::string(),
                            'lastName' => Types::string(),
                            'birthday' => Types::string(),
                            'email' => Types::string(),
                            'dateEmployment' => Types::string(),
                            'phone' => Types::string(),
                            'probation' => Types::string(),
                            'salary' => Types::int(),
                            'position_id' => Types::int(),
                            'position' => Types::string(),
                            'avatarUrl' => Types::string(),
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

    public static function changeUserEmailResolve($root, $args)
    {
        Db::update("UPDATE userList SET `email` = '{$args['email']}' WHERE `id` = {$args['id']}");
        $user = Db::selectOne("SELECT * from users WHERE id = {$args['id']}");
        return $user;
    }

    public static function addUserResolve($root, $args)
    {
        $args['birthday'] = new  DateTime($args['birthday']);
        $args['birthday'] = $args['birthday']->format('Y-m-d');
        $args['dateEmployment'] = new DateTime($args['dateEmployment']);
        $args['dateEmployment'] = $args['dateEmployment']->format('Y-m-d');

        $userId = Db::insert("INSERT INTO userList (`name`,`lastName`,`birthday`,`email`,
                            `dateEmployment`,`phone`,`probation`,`salary`,`position_id`) VALUES 
                        ('{$args['name']}','{$args['lastName']}','{$args['birthday']}','{$args['email']}',
                        '{$args['dateEmployment']}','{$args['phone']}','{$args['probation']}','{$args['salary']}',
                        '{$args['position_id']}')");
        return Db::selectOne("SELECT * from userList INNER JOIN `positions` ON position_id = positions.PositionId WHERE userList.id = $userId ");
    }

    public static function addPositionResolve($root, $args)
    {
        $positionId = Db::insert("INSERT INTO `positions`(`position`) VALUES ('{$args['position']}')");
//        return Db::selectOne("SELECT *, count( position_id) AS positionCount from `positions` WHERE PositionId = $positionId");
        return Db::select('SELECT  position, PositionId, count( position_id) AS positionCount FROM userList RIGHT JOIN `positions` ON position_id = Positionid WHERE PositionId = '.$positionId.' group by  PositionId, position');

    }

    public static function removePositionResolve($root, $args)
    {
        Db::insert("DELETE FROM `positions` WHERE PositionId = {$args['PositionId']}");
        return Db::select('SELECT * FROM `positions`');

    }
}
