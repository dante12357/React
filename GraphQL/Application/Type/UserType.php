<?php

require_once(__DIR__ . "/../Db.php");
require_once(__DIR__ . "/../Types.php");

use GraphQL\Type\Definition\ObjectType;

class UserType extends ObjectType
{
    public function __construct()
    {
        $config = [
            'description' => 'Пользователь',
            'fields' => function () {
                return [
                    'id' => [
                        'type' => Types::string(),
                        'description' => 'Идентификатор пользователя'
                    ],
                    'name' => [
                        'type' => Types::string(),
                        'description' => 'Имя'
                    ],
                    'lastName' => [
                        'type' => Types::string(),
                        'description' => 'Фамилия'
                    ],
                    'birthday' => [
                        'type' => Types::string(),
                        'description' => 'День рождения',

                    ],
                    'email' => [
                        'type' => Types::string(),
                        'description' => 'Email пользователя'
                    ],
                    'dateEmployment' => [
                        'type' => Types::string(),
                        'description' => 'Дата начало работы пользователя',

                    ],
                    'phone' => [
                        'type' => Types::string(),
                        'description' => 'Телефон',

                    ],
                    'probation' => [
                        'type' => Types::string(),
                        'description' => 'Испытательный срок',

                    ],
                    'salary' => [
                        'type' => Types::string(),
                        'description' => 'Зарплата',

                    ],
                    'position_id' => [
                        'type' => Types::int(),
                        'description' => 'Должность',

                    ],
                    'avatarUrl' => [
                        'type' => Types::string(),
                        'description' => 'Аватар пользователя',
                    ],
                    'position' => [
                        'type' => Types::string(),
                        'description' => 'Название должности'
                    ]
//                'date_start' => [
//                    'type' => Types::string(),
//                    'description' => 'Дата начало отпуска пользователя',
//                    'resolved' => function($root){
//                    return DB::select()
//                    }
//                ],
//                'date_end' => [
//                    'type' => Types::string(),
//                    'description' => 'Дата конца отпуска пользователя'
//                ],
                ];
            }
        ];
        parent::__construct($config);
    }
}
