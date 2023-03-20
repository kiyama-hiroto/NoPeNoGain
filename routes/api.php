<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Models\Shoes;


Route::get('/shoes', function (Request $request) {
    
    $shoes = Shoes::all();
    
    $json =  json_encode($shoes);
    
    return $json;
});

