<?php


class Db
{
    private static $pdo;

//    private static  $instance = null;
//    private  $host = "localhost";
//    private  $user = "root";
//    private  $pass = "root";
//    private  $db_name = "artwork";

    private $conn;

//    private static  $instance = null;
//    private  $host = "localhost";
//    private  $user = "root";
//    private  $pass = "root";
//    private  $db_name = "artwork";
//
//    private function __construct()
//    {
//        $this->conn = new PDO("mysql:host=" . $this->host . ";dbname=" . $this->db_name, $this->user, $this->pass);
//
//    }
//
//    public static function getInstance()
//    {
//        if (self::$instance != null) {
//            return self::$instance;
//        }
//
//        return new self;
//    }
//    public function getConnection()
//    {
//        return $this->conn;
//    }

    public static function init($config)
    {
        self::$pdo = new PDO("mysql:host={$config['host']};dbname={$config['database']}", $config['username'], $config['password'], array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));
        self::$pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_OBJ);
    }

    public static function selectOne($query)
    {
        $records = self::select($query);
        return array_shift($records);
    }

    public static function select($query)
    {
        $statement = self::$pdo->query($query);
        return $statement->fetchAll();
    }

    public static function affectingStatement($query)
    {
        $statement = self::$pdo->query($query);
        return $statement->rowCount();
    }

    public static function update($query)
    {
        $statement = self::$pdo->query($query);
//        $statement->execute();
        return $statement->rowCount();
    }

    public static function insert($query)
    {
        $statement = self::$pdo->query($query);
//        $success = $statement->execute();
        return $statement ? self::$pdo->lastInsertId() : null;
    }
}


