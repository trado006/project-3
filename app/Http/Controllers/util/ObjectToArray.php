<?php

namespace App\Http\Controllers\util;

class ObjectToArray{
    public static function mergeObjectsToArray(...$objs){
        $array = array();
        foreach ($objs as $obj) {
            $toJSON = json_encode($obj);
            $array = array_merge($array, json_decode($toJSON, true));
        }
        return $array;
    }
}