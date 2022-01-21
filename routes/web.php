<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Response;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Route::get('/', function () {
//     return view('welcome');
// });
Route::get('storage/public/{typefolder}/{filename}', function ($typefolder, $filename)
{
    //Store: $result = $req->file('xyz')->store('public'); = public/filename.jpg
    //echo $typefolder;
    $path = storage_path('app/public/'.$typefolder.'/'.$filename);
    //echo $path;
    if (!File::exists($path)) {
        abort(404);
    }

    $file = File::get($path);
    $type = File::mimeType($path);

    $response = Response::make($file, 200);
    $response->header("Content-Type", $type);

    return $response;
});

Route::get('{path?}', function(Request $request){
    $request->session()->flush();
    return view('spa-view');
})->where('path', '[a-zA-Z0-9-/]+');
