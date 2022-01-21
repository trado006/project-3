<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post("log-in", "Api\UserController@logIn");
Route::post("sign-up", "Api\UserController@signUp");
Route::post("change-password", "Api\UserController@changePassword")->middleware('auth_login');
Route::post("forget-password", "Api\UserController@forgetPassword");
Route::post("upload-avatar", "Api\UserController@uploadAvatar")->middleware('auth_login');
Route::get("my-info", "Api\UserController@show")->middleware('auth_login');
Route::put("my-info", "Api\UserController@update")->middleware('auth_login');

Route::get('courses', "Api\CourseController@index");
Route::get('course/{course}', "Api\CourseController@show");
Route::get("my-course-tree", "Api\CourseController@myCourseTree")->middleware('auth_login');
Route::get('search-course/{keyword}', "Api\CourseController@search");
//Route::post('register-course/{courseId}', "Api\CoourseController@register")->middleware('auth_login');

Route::middleware(['auth_login', 'admin'])->group(function () {
    Route::get("students", "Api\StudentController@index");
    Route::get("teachers", "Api\TeacherController@index");
    Route::get('students/search/{keyword}', "Api\StudentController@search");
    Route::get('teachers/search/{keyword}', "Api\TeacherController@search");
    Route::delete("user/{user}", "Api\UserController@destroy");
    Route::put("active-teacher/{teacher}", "Api\TeacherController@activeTeacher");
    Route::put("inactive-teacher/{teacher}", "Api\TeacherController@inactiveTeacher");
    
    Route::post("course", "Api\CourseController@store");
    Route::post("course/{course}", "Api\CourseController@update");
    Route::delete('course/{course}', 'Api\CourseController@destroy');
    Route::post('course/{course}/add-student/{login_name}', 'Api\CourseController@addStudent');
    Route::post('course/{course}/add-teacher/{login_name}', 'Api\CourseController@addTeacher');
    Route::delete('course/{course}/delete-student/{student}', "Api\CourseController@deleteStudent");
    Route::delete('course/{course}/delete-teacher/{teacher}', "Api\CourseController@deleteTeacher");
    Route::get('course/{course}/members', "Api\CourseController@getMember");
});
//done
Route::get("lecture/{lecture}", "Api\LectureController@show");
Route::get("test/{test}", "Api\TestController@show");
Route::get("test/{test}/questions", "Api\QuestionController@index");

Route::middleware(['auth_login', 'teacher'])->group(function () {
    Route::post("course/{course}/lecture", "Api\LectureController@store");
    Route::put("lecture/{lecture}", "Api\LectureController@update");
    Route::delete("lecture/{lecture}", "Api\LectureController@destroy");

    Route::post("lecture/{lecture}/test", "Api\TestController@store");
    Route::put("/test/{test}", "Api\TestController@update");
    Route::delete("test/{test}", "Api\TestController@destroy");
    
    Route::get("test/{test}/full-questions", "Api\QuestionController@getFullQuestions");
    Route::post("test/{test}/full-question", "Api\QuestionController@store");
    Route::put("full-question/{question}", "Api\QuestionController@update");
    Route::delete("full-question/{question}", "Api\QuestionController@destroy");
});

Route::get("lecture/{lecture}/comments", "Api\CommentController@index");
Route::post("lecture/{lecture}/comment", "Api\CommentController@store")->middleware('auth_login');
Route::put("comment/{comment}", "Api\CommentController@update")->middleware('auth_login');
Route::delete("comment/{comment}", "Api\CommentController@destroy")->middleware('auth_login');