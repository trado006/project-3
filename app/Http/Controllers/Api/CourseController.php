<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use App\Models\Course;
use App\Models\Student;
use App\Models\Study;
use App\Models\Teach;
use App\Models\Teacher;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CourseController extends Controller
{
    //
    public function index(){
        $courses = Course::all();
        foreach ($courses as $course) {
            if($course->picture_url)
                $course->picture = '/storage/'.$course->picture_url;
            else $course->picture = '';
            unset($course->picture_url);
        }
        return response()->json([
            'error_code' => 0,
            'courses' => $courses,
        ], 200);
    }

    public function myCourseTree(Request $req){
        if($req->user['position']=='admin'){
            $courses = Course::all();
            $data = [];
            foreach($courses as $courseIndex => $course){
                $data[] = ['id'=>$course->id, 'name'=>$course->name];
                $lectures = $course->lectures;
                $data[$courseIndex]['lectures'] = [];

                foreach($lectures as $lectureIndex => $lecture){
                    $data[$courseIndex]['lectures'][] = ['id'=> $lecture->id, 'name' => $lecture->name];
                    $tests = $lecture->tests;
                    $data[$courseIndex]['lectures'][$lectureIndex]['tests'] = [];
                }
            }
            return response()->json([
                'error_code' => 0,
                'courses' => $data,
            ]);
        }
        if($req->user['position']=='student'){
            $courses = Student::find($req->user['id'])->courses;
        }else{
            $courses = Teacher::find($req->user['id'])->courses;
        }
        $data = [];
        foreach($courses as $courseIndex => $course){
            $data[] = ['id'=>$course->id, 'name'=>$course->name];
            $lectures = $course->lectures;
            $data[$courseIndex]['lectures'] = [];

            foreach($lectures as $lectureIndex => $lecture){
                $data[$courseIndex]['lectures'][] = ['id'=> $lecture->id, 'name' => $lecture->name];
                $tests = $lecture->tests;
                $data[$courseIndex]['lectures'][$lectureIndex]['tests'] = [];
                foreach($tests as $testIndex => $test){
                    $data[$courseIndex]['lectures'][$lectureIndex]['tests'][] = ['id'=>$test->id,'name'=>$test->name];
                }
            }
        }
        return response()->json([
            'error_code' => 0,
            'courses' => $data,
        ],200);
    }
    
    public function search($keyword){
        $courses = Course::where('name', 'like', '%' . $keyword . '%')
        ->orWhere('code', 'like', '%' . $keyword . '%')->get();
        foreach ($courses as $course) {
            if($course->picture_url)
                $course->picture = '/storage/'.$course->picture_url;
            else $course->picture = '';
            unset($course->picture_url);
        }
        return response()->json([
            'error_code' => 0,
            'courses' => $courses,
        ],200);
    }

    public function show(Course $course){
        if($course->picture_url)
            $course->picture = '/storage/'.$course->picture_url;
        else $course->picture = '';
        unset($course->picture_url);
        return response()->json([
            'error_code' => 0,
            'course' => $course,
        ], 200);
    }

    public function store(Request $req){
        $file = $req->image->extension();
        if ($file != "jpg" && $file != "jpeg" && $file != "png") {
            return response()->json([
                "error_code" => 2,
                "msg" => "định dạng file ko đúng"
            ]);
        }
        $result = $req->file('image')->store('public/courses');
        if(!$result){
            return response()->json([
                'error_code' => 2,
                'msg' => "không lưu trữ file được"
            ], 200);
        }
        $validator = Validator::make($req->all(), [
            'code' => 'required|unique:courses|max:255',
            'name' => 'required|string',
            'description' => 'required|string',
            'price' => 'numeric|required',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'error_code' => 1,
                'error' => $validator->errors()
            ], 200);
        }
        //$course = Course::create($req->all());
        $course = new Course($req->all());
        $course->picture_url = $result;
        if($course->save()){
            return response()->json([
                'error_code' => 0,
                'course' => $course,
            ], 200);
        }else{
            unlink(storage_path('app/'.$result));
            return response([
                'error_code' => 2,
                'msg' => 'last operation error'
            ], 200);
        }
    }
    
    public function update(Request $req,Course $course){
        if($req->image){
            $file = $req->image->extension();
            if ($file != "jpg" && $file != "jpeg" && $file != "png") {
                return response()->json([
                    "error_code" => 2,
                    "msg" => "định dạng file ko đúng"
                ]);
            }
            $result = $req->file('image')->store('public/courses');
            if(!$result){
                return response()->json([
                    'error_code' => 2,
                    'msg' => "không lưu trữ file được"
                ], 200);
            }
            if($course->picture_url)
                unlink(storage_path('app/'.$course->picture_url));
            $course->picture_url = $result;
        }
        $changedable = ['code', 'name', 'description', 'price'];
        foreach($changedable as $key){
            if($req[$key]){
                $course[$key] = $req[$key];
            }
        }
        // return response()->json([
        //     'error_code' => 0,
        //     'course' => $course,
        // ],200);
        // exit();
        if($course->save()){
            return response()->json([
                'error_code' => 0,
                'course' => $course,
            ],200);
        }else{
            return response()->json([
                'error_code' => 2,
                'msg' => 'Update course fail',
            ],200);
        }
    }
    // public function register(){

    // }

    public function addStudent(Course $course, $login_name){
        $user = User::query()->where('login_name', $login_name)->first();
        if(!$user){
            return response()->json([
                'error_code' => 2,
                'msg' => 'login_name not available',
            ], 200);
        }
        if($user->position!='student'){
            return response()->json([
                'error_code' => 2,
                'msg' => 'user not a student',
            ], 200);
        }
        $student = Student::query()->find($user->id);
        $check = Study::where('course_id', $course->id)->where('student_id', $user->id)->first();
        if($check){
            return response()->json([
                'error_code' => 2,
                'msg' => 'Student has added into course',
            ], 200);
        }
        $study = Study::create(['course_id'=>$course->id,'student_id'=>$user->id]);
        $studentResponse = [
            'id' => $user->id,
            'login_name' => $user->login_name,
            'full_name' => $student->full_name,
            'gender' => $student->gender,
            'birthday' => $student->birthday,
            'position' => 'student',
        ];
        if($study){
            return response()->json([
                'error_code' => 0,
                'student' => $studentResponse,
            ], 200);
        }else{
            return response()->json([
                'error_code' => 2,
                'msg' => 'Student adding error',
            ], 200);
        }
    }

    public function addTeacher(Course $course, $login_name){
        $user = User::query()->where('login_name', $login_name)->first();
        $check = Teach::where('course_id', $course->id)->where('teacher_id', $user->id)->first();
        if($check){
            return response()->json([
                'error_code' => 2,
                'msg' => 'Teacher has added into course',
            ], 200);
        }
        if($user->position!='teacher'){
            return response()->json([
                'error_code' => 2,
                'msg' => 'user not a teacher',
            ], 200);
        }
        $teacher = Teacher::query()->find($user->id);
        $teach = Teach::create(['course_id'=>$course->id,'teacher_id'=>$user->id]);
        $teacherResponse = [
            'id' => $user->id,
            'login_name' => $user->login_name,
            'full_name' => $teacher->full_name,
            'gender' => $teacher->gender,
            'birthday' => $teacher->birthday,
            'position' => 'teacher',
        ];
        if($teach){
            return response()->json([
                'error_code' => 0,
                'teacher' => $teacherResponse,
            ], 200);
        }else{
            return response()->json([
                'error_code' => 2,
                'msg' => 'Teacher adding error',
            ], 200);
        }
    }

    public function getMember(Course $course){
        $students = $course->students;
        $studentsResponse = [];
        foreach ($students as $student) {
            $user = $student->user;
            $studentResponse = [];
            $studentResponse['login_name'] = $user->login_name;
            $studentResponse['full_name'] = $student->full_name;
            $studentResponse['gender'] = $student->gender;
            $studentResponse['birthday'] = $student->birthday;
            $studentResponse['id'] = $user->id;
            $studentResponse['position'] = 'student';
            $studentsResponse[] = $studentResponse;
        }
        $teachers = $course->teachers;
        $teachersResponse = [];
        foreach ($teachers as $teacher) {
            $user = $teacher->user;
            $teacherResponse = [];
            $teacherResponse['login_name'] = $user->login_name;
            $teacherResponse['full_name'] = $teacher->full_name;
            $teacherResponse['gender'] = $teacher->gender;
            $teacherResponse['birthday'] = $teacher->birthday;
            $teacherResponse['id'] = $user->id;
            $teacherResponse['position'] = 'teacher';
            $teachersResponse[] = $teacherResponse;
        }
        return response()->json([
            'error_code' => 0,
            'students' => $studentsResponse,
            'teachers' => $teachersResponse,
        ], 200);
    }

    public function deleteStudent(Course $course, Student $student){
        $study = Study::where('course_id',$course->id)
        ->where('student_id',$student->user_id)->delete();
        if($study){
            return response()->json([
                'error_code' => 0,
                'msg' => 'Delete student in course successfully'
            ], 200);
        }else{
            return response()->json([
                'error_code' => 2,
                'msg' => 'Delete student in course fail',
            ], 200);
        }
    }

    public function deleteTeacher(Course $course, Teacher $teacher){
        $teach = Teach::where('course_id',$course->id)
        ->where('teacher_id',$teacher->user_id)->delete();
        if($teach){
            return response()->json([
                'error_code' => 0,
                'msg' => 'Delete teacher in course successfully'
            ], 200);
        }else{
            return response()->json([
                'error_code' => 2,
                'msg' => 'Delete teacher in course fail',
            ], 200);
        }
    }
    
    public function destroy(Course $course){
        if($course->picture_url)
            unlink(storage_path('app/'.$course->picture_url));
        if($course->delete()){
            return response()->json([
                'error_code' => 0,
                'msg' => 'Destroy course successfully',
            ],200);
        }else{
            return response()->json([
                'error_code' => 2,
                'msg' => 'Destroy course error',
            ],200);
        }
    }
}
