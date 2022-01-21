<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Student;
use App\Models\User;
use App\Http\Controllers\util\ObjectToArray;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class StudentController extends Controller
{
    //
    public function index(){
        $users = User::where('position', 'student')->get();
        $students = Student::all();
        foreach ($users as $user) {
            $merge[$user->id] = $user;
        }
        foreach($students as $student){
            $merge[$student['user_id']] = ObjectToArray::mergeObjectsToArray($merge[$student['user_id']], $student);
        }
        $data = array();
        foreach($merge as $item){
            $data[] = $item;
        }
        return response()->json([
            'error_code' => 0,
            'students' => $data,
        ], 200);
    }

    public function search($keyword){
        $users = DB::table('students')
            ->join('users', 'students.user_id', '=', 'users.id')
            ->select('students.*', 'users.id', 'users.login_name')
            ->where('users.login_name', 'like', "%{$keyword}%")
            ->orWhere('students.full_name', 'like', "%{$keyword}%")
            ->orWhere('students.phone', 'like', "%{$keyword}%")
            ->orWhere('students.email', 'like', "%{$keyword}%")
            ->get();
        return response()->json([
            'error_code' => 0,
            'students' => $users,
        ], 200);
    }

    public function show(Request $request){
        $student = Student::find($request->id);
        return response()->json([
            'error_code' => 0,
            'data' => $student,
        ], 200);
    }
    public function update(Request $request){
        $student = new Student($request->all());
        return response()->json([
            'data' => $student,
        ], 200);
    }
}
