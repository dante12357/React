<?php
function Types ($className){
    $path = __DIR__.'/Application'. $className.'.php';
    if (file_exists($path))
    {
        require_once $path;
    }
};

