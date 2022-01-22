<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Answer;
use Illuminate\Support\Facades\Validator;
use App\Models\Lecture;
use Illuminate\Http\Request;
use App\Models\Test;
use App\Models\TestResult;
use Illuminate\Support\Facades\DB;

function unique_multidim_array($array, $key) {
    $temp_array = array();
    $i = 0;
    $key_array = array();
   
    foreach($array as $val) {
        if (!in_array($val[$key], $key_array)) {
            $key_array[$i] = $val[$key];
            $temp_array[$i] = $val;
        }
        $i++;
    }
    return $temp_array;
}

class TestController extends Controller
{
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $req, Lecture $lecture)
    {
        //
        $validator = Validator::make($req->all(), [
            'name' => 'required|max:255',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'error_code' => 1,
                'error' => $validator->errors()
            ], 200);
        }
        $test = new Test($req->all());
        $test->lecture_id = $lecture->id;
        if($test->save()){
            return response()->json([
                'error_code' => 0,
                'test' => $test,
            ], 200);
        }else{
            return response()->json([
                'error_code' => 2,
                'msg' => 'Add test fail',
            ], 200);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Test $test)
    {
        //
        return response()->json([
            'error_code' => 0,
            'test' => $test,
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $req, Test $test)
    {
        if($req->name) $test->name = $req->name;
        $test->description = $req->description;
        if($test->save()){
            return response()->json([
                'error_code' => 0,
                'test' => $test,
            ], 200);
        }else{
            return response()->json([
                'error_code' => 2,
                'msg' => 'update test fail'
            ], 200);
        }
    }

    public function makeTest(Request $req, Test $test)
    {
        if($req->user['position']!='student'){
            return response()->json([
                'error_code' => 2,
                'msg' => 'student permision is require'
            ], 200);
        }
        $makeTest = $req->all();
        unique_multidim_array($makeTest,'id');
        $ids = DB::table('questions')->where('test_id', $test->id)->pluck('id');
        $ids = json_decode(json_encode($ids));
        $total = count($ids);
        $score = 0;
        foreach($makeTest as $makeQuestion){
            if(!in_array($makeQuestion['id'], $ids)) continue;
            $answer = Answer::find($makeQuestion['id']);
            if($answer){
                $extra = 1;
                if(!!$answer->choice1 != !!$makeQuestion['choice1']) $extra = 0;
                if(!!$answer->choice2 != !!$makeQuestion['choice2']) $extra = 0;
                if(!!$answer->choice3 != !!$makeQuestion['choice3']) $extra = 0;
                if(!!$answer->choice4 != !!$makeQuestion['choice4']) $extra = 0;
                $score += $extra;
            }
        }
        $testResult = TestResult::create([
            'student_id' => $req->user['id'],
            'test_id' => $test->id,
            'score' => $score,
        ]);
        $testResult->total = $total;
        return response()->json([
            'error_code' => 0,
            'test_result' => $testResult,
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Test $test)
    {
        //
        if($test->delete()){
            return response()->json([
                'error_code' => 0,
                'msg' => 'Delete test successfully'
            ], 200);
        }else{
            return response()->json([
                'error_code' => 2,
                'msg' => 'Delete test fail'
            ], 200);
        }
    }
}
