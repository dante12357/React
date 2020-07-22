<?php
use GraphQL\Type\Definition\ObjectType;

class SalaryType extends ObjectType{
    public function __construct()
    {
        $config = [
            'description' => 'Пользователь',
            'fields' => function () {
                return [
                    'id' => [
                        'type' => Types::int(),
                        'description' => 'Идентификатор зарплаты'
                    ],
                    'user_id' => [
                        'type' => Types::int(),
                        'description' => 'Идентификатор пользователя'
                    ],
                    'salary' => [
                        'type' => Types::string(),
                        'description' => 'Зарплата',

                    ],
                    'active_from' => [
                        'type' => Types::string(),
                        'description' => 'С какого дня активна',

                    ],
                    'review_period' => [
                        'type' => Types::string(),
                        'description' => 'До пересмотра'
                    ],
                    'notes' => [
                        'type' => Types::string(),
                        'description' => 'Заметка'
                    ],
                    'last_review' => [
                        'type' => Types::string(),
                        'description' => 'Дата добавления',

                    ],

                ];
            }
        ];

        parent::__construct($config);
    }
}
