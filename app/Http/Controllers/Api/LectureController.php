<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use App\Models\Course;
use App\Models\Lecture;
use Illuminate\Http\Request;

class LectureController extends Controller
{
    //
    public function store(Request $req, Course $course){
        $validator = Validator::make($req->all(), [
            'name' => 'required|max:255',
            'description' => 'required|string',
            'video_url' => 'required|max:1024',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'error_code' => 1,
                'error' => $validator->errors()
            ], 200);
        }
        $lecture = new Lecture($req->all());
        $lecture->course_id = $course->id;
        if($lecture->save()){
            return response()->json([
                'error_code' => 0,
                'lecture' => $lecture,
            ], 200);
        }else{
            return response()->json([
                'error_code' => 2,
                'msg' => 'Add lecture fail',
            ], 200);
        }
    }
    public function show(Lecture $lecture){
        return response()->json([
            'error_code' => 0,
            'lecture' => $lecture,
        ], 200);
        
    }
    public function update(Request $req, Lecture $lecture){
        $changedable = ['name', 'description', 'video_url'];
        foreach($changedable as $key){
            if($req[$key]){
                $lecture[$key] = $req[$key];
            }
        }
        if($lecture->save()){
            return response()->json([
                'error_code' => 0,
                'lecture' => $lecture,
            ], 200);
        }else{
            return response()->json([
                'error_code' => 0,
                'msg' => 'update lecture error',
            ], 200);
        }
    }
    public function destroy(Lecture $lecture){
        if($lecture->delete()){
            return response()->json([
                'error_code' => 0,
                'msg' => 'delete lecture successfully'
            ], 200);
        }else{
            return response()->json([
                'error_code' => 2,
                'msg' => 'delete lecture error'
            ], 200);
        }
    }
}
