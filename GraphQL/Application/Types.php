<?php

include_once "Type/QueryType.php";
include_once "Type/UserType.php";
include_once "Type/PositionType.php";
include_once "Type/MutationType.php";
include_once "Type/InputUserType.php";
include_once "Type/SalaryType.php";

use GraphQL\Type\Definition\Type;

class Types
{
    private static $query;
    private static $user;
    private static $position;
    private static $mutation;
    private static $inputUser;
    private static $numPosition;
    private static $salary;

    public static function query()
    {
        return self::$query ?: (self::$query = new QueryType());
    }

    public static function string()
    {
        return Type::string();
    }

    public static function int()
    {
        return Type::int();
    }

    public static function listOf($type)
    {
        return Type::listOf($type);
    }

    public static function nonNull($type){
        return Type::nonNull($type);
    }

    public static function user()
    {
        return self::$user ?: (self::$user = new UserType());
    }
    public static function position()
    {
        return self::$position ?: (self::$position = new PositionType());
    }
    public static function salary()
    {
        return self::$salary ?: (self::$salary = new SalaryType());
    }
    public static function mutation()
    {
        return self::$mutation ?: (self::$mutation = new MutationType());
    }

    public static function inputUser()
    {
        return self::$inputUser ?: (self::$inputUser = new InputUserType());
    }
}
