<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Test;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TestResultController extends Controller
{
    //
    public function index(Test $test){
        $test_results = DB::table('test_results')
        ->join('students', 'test_results.student_id','=', 'students.user_id')
        ->select('test_results.*', 'students.full_name')
        ->where('test_id', $test->id)
        ->get();
        return response()->json([
            'error_code' => 0,
            'test_results' => $test_results,
        ], 200);
    }
}
