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
                            'name' => Types::nonNull(Types::string()),
                            'last_name' => Types::nonNull(Types::string()),
                            'birthday' => Types::nonNull(Types::string()),
                            'email' => Types::nonNull(Types::string()),
                            'date_employment' => Types::nonNull(Types::string()),
                            'phone' => Types::nonNull(Types::string()),
                            'probation' => Types::nonNull(Types::int()),
//                            'salary' => Types::int(),
                            'position_id' => Types::int(),
//                            'position' => Types::nonNull(Types::int()),
                            'avatar_url' => Types::string(),
                        ],
                        'resolve' => function ($root, $args) {
                            return MutationType::changeUserResolve($root, $args);
                        }
                    ],
                    'changeSalary' => [
                        'type' => Types::salary(),
                        'description' => 'Изменение зарплаты',
                        'args' => [
                            'id' => Types::int(),
                            'user_id' => Types::int(),
                            'review_period' => Types::nonNull(Types::int()),
                            'active_from' => Types::nonNull(Types::string()),
                            'salary' => Types::int(),
//                            'last_review' => Types::string(),
                        ],
                        'resolve' => function ($root, $args) {
                            return MutationType::changeSalaryResolve($root, $args);
                        }
                    ],
                    'addUser' => [
                        'type' => Types::user(),
                        'description' => 'Добавление пользователя',
                        'args' => [
                            'name' => Types::nonNull(Types::string()),
                            'last_name' => Types::nonNull(Types::string()),
                            'birthday' => Types::nonNull(Types::string()),
                            'email' => Types::nonNull(Types::string()),
                            'date_employment' => Types::nonNull(Types::string()),
                            'phone' => Types::nonNull(Types::string()),
                            'probation' => Types::nonNull(Types::int()),
                            'salary' => Types::int(),
                            'position_id' => Types::int(),
//                            'position' => Types::nonNull(Types::int()),
                            'avatar_url' => Types::string(),
                        ],
                        'resolve' => function ($root, $args) {
                            return MutationType::addUserResolve($root, $args);
                        }
                    ],
                    'removeUser' => [
                        'type' => Types::user(),
                        'description' => 'Удалить сотрудника',
                        'args' => [
                            'id' => Types::int(),
                        ],
                        'resolve' => function ($root, $args) {
                            return MutationType::removeUserResolve($root, $args);
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

    public static function changeUserResolve ($root, $args)
    {
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
            `position_id` = '{$args['position_id']}' WHERE `id` = {$args['id']}");
        return Db::selectOne("SELECT * from userList WHERE id = {$args['id']}");
    }

    public static function changeSalaryResolve($root, $args)
    {
        $lastReview = new  DateTime();
        $lastReview = $lastReview->format('Y-m-d');

        Db::update("UPDATE salary SET 
            `review_period` = '{$args['review_period']}',
            `active_from` = '{$args['active_from']}',
            `salary` = '{$args['salary']}',
            `last_review` = '{$lastReview}'
             WHERE `user_id` = {$args['user_id']}");
//        return Db::selectOne("SELECT * from salary WHERE user_id = {$args['user_id']}");
    }

    public static function addUserResolve($root, $args)
    {
        $args['birthday'] = new  DateTime($args['birthday']);
        $args['birthday'] = $args['birthday']->format('Y-m-d');
        $args['date_employment'] = new DateTime($args['date_employment']);
        $args['date_employment'] = $args['date_employment']->format('Y-m-d');

        $userId = Db::insert("INSERT INTO userList (`name`,`last_name`,`birthday`,`email`,
                            `date_employment`,`phone`,`probation`,`position_id`) VALUES 
                        ('{$args['name']}','{$args['last_name']}','{$args['birthday']}','{$args['email']}',
                        '{$args['date_employment']}','{$args['phone']}','{$args['probation']}',
                        '{$args['position_id']}')");

        Db::insert("INSERT INTO salary (`user_id`,`salary`) VALUES ('{$userId}','{$args['salary']}')");
        Db::insert("INSERT INTO historySalary (`user_id`,`salary`,`active_from`) VALUES ('{$userId}','{$args['salary']}','{$args['date_employment']}')");

        return Db::selectOne("SELECT * from userList INNER JOIN `positions` ON position_id = positions.PositionId WHERE userList.id = $userId ");

    }
    public static function removeUserResolve($root, $args)
    {
        Db::insert("DELETE FROM `userList` WHERE id = {$args['id']}");
        return Db::select('SELECT * FROM `userList`');

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
