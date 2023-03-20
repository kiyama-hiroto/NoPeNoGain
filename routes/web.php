<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;

use App\Models\User;


Route::get('/', function () {
    if (!Auth::check()) return redirect()->route("login");

    return view('index');
})->name('index');

Route::get('/login', function () {
    if (Auth::check()) return redirect()->route("index");
    return view('login');
})->name('login');

Route::post('/login', function (Request $request) {
    $params = $request->all();

    if(!$params['username'] || !$params['password']) {  
        return view('login', [
            "msg" => "Preencha todos os campos!"
        ]);
    }

    $user = User::where("username",$params['username'])->first();
    
       
    if($user && password_verify($params['password'], $user->password)) {
        Auth::login($user);
        return redirect()->route('index');
    } else {
        return view('login', [
            "msg" => "Dados de login invalidos!"
        ]);
    }


    // return view('login');
})->name('login.post');

Route::get('/logout', function (Request $request) {
    Auth::logout();

    return redirect()->route("login");
})->name('logout');