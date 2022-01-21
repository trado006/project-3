<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Controllers\util\ObjectToArray;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use App\Models\User;
use App\Models\Student;
use App\Models\Teacher;
use App\Models\Admin;
use App\Models\Teach;
use App\Models\UserSession;

class UserController extends Controller
{
    //
    public function signUp(Request $req)
    {
        $validator = Validator::make($req->all(), [
            'login_name' => 'required|unique:users|max:255',
            'position' => 'required|string',
            'password' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'error_code' => 1,
                'error' => $validator->errors()
            ], 200);
        }
        
        if($req->position=='student'){
            return $this->insertStudent($req);
        }else if($req->position=='teacher'){
            return $this->insertTeacher($req);
        }
        return response()->json([
            'error_code' => 1,
            'error' => [
                'position'=>'Position not correct',
            ]
        ], 200);

        //Mail::to("tuan.ld184004@sis.hust.edu.vn")->send(new ConfirmEmail($req->username, $req->email));
    }

    public function logIn(Request $req)
    {
        if (Auth::attempt($req->only('login_name', 'password'))) {
            $checkTokenExit = User::find(Auth::id())->userSession;
            $user = User::where('id', Auth::id())->first();
            if($user->Position=='teacher'){
                $teacher = User::find(Auth::id())->teacher;
                if(!$teacher->active){
                    return response()->json([
                        'error_code' => 2,
                        'msg'=>"Teacher account is not active yet"
                    ], 200);
                }
            }
            if (empty($checkTokenExit)) {
                $userSession = UserSession::create([
                    "token" => Str::random(60),
                    'refresh_token' => Str::random(60),
                    'token_expried' => date('Y-m-d H:i:s', strtotime('+30 day')),
                    'refresh_token_expried' => date('Y-m-d H:i:s', strtotime('+365 day')),
                    'user_id' => Auth::id(),
                ]);
            } else {
                $userSession = $checkTokenExit;
            }
            $data = ObjectToArray::mergeObjectsToArray($user, $userSession);
            return response()->json([
                'error_code' => 0,
                "msg" => "Log in okey",
                "user" => $data
            ], 200);
        } else {
            return response()->json([
                'error_code' => 2,
                'msg' => "Account not exists",
            ], 200);
        }
    }

    public function uploadAvatar(Request $req)
    {

        $file = $req->image->extension();

        if ($file != "jpg" && $file != "jpeg" && $file != "png") {
            return response()->json([
                "error_code" => 2,
                "msg" => "định dạng file ko đúng"
            ]);
        }
        if($req->user['position']=='student'){
            $user = Student::find($req->user['id']);
        }else if($req->user['position']=='teacher'){
            $user = Teacher::find($req->user['id']);
        }else if($req->user['position']=='admin'){
            $user = Admin::find($req->user['id']);
        }
        if($user->avatar) unlink(storage_path('app/'.$user->avatar));

        $result = $req->file('image')->store('public/avatars');
        if(!$result){
            return response()->json([
                'error_code' => 2,
                'msg' => "không lưu trữ file được"
            ], 200);
        }
        
        $user->avatar = $result;
        $user->save();
        return response()->json([
            'error_code' => 0,
            "avatar" => '/storage/' . $user->avatar,
        ], 200);
    }

    public function changePassword(Request $req){

    }
    
    public function forgetPassword(Request $req){

    }

    public function show(Request $req){
        $user = User::find($req->user['id']);
        if($req->user['position']=='student'){
            $student = Student::find($req->user['id']);
            if($student->avatar)
                $student->avatar = '/storage/' . $student->avatar;
            if($student){
                return response()->json([
                    'error_code' => 0,
                    'user' => ObjectToArray::mergeObjectsToArray($user, $student),
                ], 200);
            }
        }
        if($req->user['position']=='teacher'){
            $teacher = Teacher::find($req->user['id']);
            if($teacher->avatar)
                $teacher->avatar = '/storage/' . $teacher->avatar;
            if($teacher){
                return response()->json([
                    'error_code' => 0,
                    'user' => ObjectToArray::mergeObjectsToArray($user, $teacher),
                ]);
            }
        }
        if($req->user['position']=='admin'){
            $admin = Admin::find($req->user['id']);
            if($admin->avatar)
                $admin->avatar = '/storage/' . $admin->avatar;
            if($admin){
                return response()->json([
                    'error_code' => 0,
                    'user' => ObjectToArray::mergeObjectsToArray($user, $admin),
                ]);
            }
        }
        return response()->json([
            'error_code' => 2,
            'msg' => 'User info not exists',
        ]);
    }

    public function update(Request $req){
        if($req->user['position']=='student'){
            $student = Student::find($req->user['id']);
            if(!$student){
                return response()->json([
                    'error_code' => 2,
                    'msg' => 'no student in data to update',
                ], 200);
            }
            foreach(ObjectToArray::mergeObjectsToArray($student) as $key => $value){
                if($req[$key]){
                    $student[$key] = $req[$key];
                }
            }
            $student->save();
            if($student){
                return response()->json([
                    'error_code' => 0,
                    'msg' => 'update student info successfully',
                ], 200);
            }
        }
        if($req->user['position']=='teacher'){
            $teacher = Teacher::find($req->user['id']);
            if(!$teacher){
                return response()->json([
                    'error_code' => 0,
                    'msg' => 'no teacher in data to update',
                ], 200);
            }
            foreach(ObjectToArray::mergeObjectsToArray($teacher) as $key => $value){
                //var_dump($key);
                //var_dump($req[$key]);
                if($req[$key]){
                    if($key!='active') $teacher[$key] = $req[$key];
                }
            }
            $teacher->save();
            if($teacher){
                return response()->json([
                    'error_code' => 0,
                    'msg' => 'update teacher info successfully',
                ], 200);
            }
        }
    }

    public function test(Request $req)
    {
        //Mail::to("tuan.ld184004@sis.hust.edu.vn")->send(new ConfirmEmail("le tuan", "abc@gmail.com"));
        return 1;
    }

    public function destroy(User $user){
        if($user->position=='admin'){
            return response()->json([
                'error_code' => 2,
                'msg' => "Cann't delete admin account",
            ], 200);
        }
        $result = $user->delete();
        if($result){
            return response()->json([
                'error_code' => 0,
                'msg' => 'remove user success',
            ], 200);
        }
        return response()->json([
            'error_code' => 2,
            'msg' => 'remve user don\'t working',
        ], 200);
    }

    private function insertStudent(Request $req){
        $studentValidator = Validator::make($req->all(), [
            'gender' => 'required',
            'full_name' => 'required',
            'email' => 'required|email:rfc,dns',
            'phone' => 'required|numeric',
            'birthday' => 'required|date_format:Y/m/d', //ex: 2000/01/01
            'hometown' => 'required',
        ]);
        if ($studentValidator->fails()) {
            return response()->json([
                'error_code' => 1,
                'error' => $studentValidator->errors()
            ], 200);
        }
        $gender = $req->gender;
        if($gender!='male'&& $gender!='female'&& $gender!='other'){
            return response()->json([
                'error_code' => 1,
                'error' => [
                    'gender'=>'Gender not correct'
                ]
            ], 200);
        }
        $user = new User($req->all());
        $user->password = bcrypt($req->password);
        if($user->save()){
            $student = new Student($req->all());
            $student['user_id'] = $user->id;
            if($student->save()){
                return response()->json([
                    'error_code' => 0,
                    "msg" => "Sign up new student account successfully",
                ], 200);
            }else{
                $user->delete();
                return response()->json([
                    'error_code' => 2,
                    'msg'=>'Insert student not working'
                ], 200);
            }
        }else{
            return response()->json([
                'eror-code' => 2,
                'msg'=>'Insert user not working'
            ], 200);
        }
    }

    private function insertTeacher(Request $req){
        $teacherValidator = Validator::make($req->all(), [
            'gender' => 'required',
            'full_name' => 'required',
            'email' => 'required|email:rfc,dns',
            'phone' => 'required|numeric',
            'birthday' => 'required|date_format:Y/m/d', //ex: 2000/01/01
            'hometown' => 'required',
            'introduction' => 'required',
        ]);
        if ($teacherValidator->fails()) {
            return response()->json([
                'error_code' => 1,
                'error' => $teacherValidator->errors()
            ], 200);
        }
        $gender = $req->gender;
        if($gender!='male'&& $gender!='female'&& $gender!='other'){
            return response()->json([
                'error_code' => 1,
                'error' => [
                    'gender'=>'Gender not correct'
                ]
            ], 200);
        }
        $user = new User($req->all());
        $user->password = bcrypt($req->password);
        if($user->save()){
            $teacher = new Teacher($req->all());
            $teacher['user_id'] = $user->id;
            if($teacher->save()){
                return response()->json([
                    'error_code' => 0,
                    "msg" => "Sign up new teacher account successfully",
                ], 200);
            }else{
                $user->delete();
                return response()->json([
                    'error_code' => 2,
                    'msg'=>'Insert teacher not working',
                ], 200);
            }
        }else{
            return response()->json([
                'error_code' => 2,
                'msg'=>'Insert user not working'
            ], 200);
        }
    }
}