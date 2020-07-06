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
                            Db::update("UPDATE userList SET `email` = '{$args['email']}' WHERE `id` = {$args['id']}");
                            $user = Db::selectOne("SELECT * from users WHERE id = {$args['id']}");
                            return $user;
                        }
                    ],
                    'addUser' => [
                        'type' => Types::user(),
                        'description' => 'Добавление пользователя',
                        'args' => [
                            'name' => Types::string(),
                            'lastName' =>  Types::string(),
                            'birthday' => Types::string(),
                            'email' => Types::string(),
                            'dateEmployment' =>  Types::string(),
                            'phone' => Types::string(),
                            'probation' => Types::string(),
                            'salary' =>  Types::int(),
                            'position' => Types::string(),
                            'avatarUrl' => Types::string(),
                        ],
                        'resolve' => function ($root, $args) {

                            $args['birthday'] = new  DateTime($args['birthday']);
                            $args['birthday'] = $args['birthday'] -> format('Y-m-d');
                            $args['dateEmployment'] = new DateTime( $args['dateEmployment']);
                            $args['dateEmployment'] = $args['dateEmployment']->format('Y-m-d');

                            $userId = Db::insert("INSERT INTO userList (`name`,`lastName`,`birthday`,`email`,`dateEmployment`,`phone`,`probation`,`salary`,`position`,`avatarUrl`) VALUES 
                        ('{$args['name']}','{$args['lastName']}','{$args['birthday']}','{$args['email']}','{$args['dateEmployment']}','{$args['phone']}','{$args['probation']}','{$args['salary']}','{$args['position']}','{$args['avatarUrl']}')");
                            return Db::selectOne("SELECT * from userList WHERE id = $userId");
                        }
                    ]
                ];
            }
        ];
        parent::__construct($config);
    }
}
