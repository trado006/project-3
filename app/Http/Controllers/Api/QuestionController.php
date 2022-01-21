<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Answer;
use App\Models\Question;
use App\Models\Test;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class QuestionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Test $test)
    {
        //
        $questions = $test->questions;
        return response()->json([
            'error_code' => 0,
            'questions' => $questions,
        ], 200);
    }

    public function getFullQuestions(Test $test){
        $fullQuestions = DB::table('questions')
        ->join('answers', 'questions.id', '=', 'answers.question_id')
        ->select('questions.*', 'answers.choice1 as answer1', 'answers.choice2 as answer2', 'answers.choice3 as answer3', 'answers.choice4 as answer4')
        ->where('questions.test_id', $test->id)
        ->get();
        return response()->json([
            'error_code' => 0,
            'full_questions' => $fullQuestions,
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $req, Test $test)
    {
        //
        $validator = Validator::make($req->all(),[
            'content' => 'required|string',
            'choice1' => 'required|string',
            'choice2' => 'required|string',
        ]);
        if($validator->fails()){
            return response()->json([
                'error_code' => 1,
                'error' => $validator->errors()
            ], 200);
        }
        $answerData = [
            'choice1' => ($req->choice1&&$req->answer1)? 1: 0,
            'choice2' => ($req->choice2&&$req->answer2)? 1: 0,
            'choice3' => ($req->choice3&&$req->answer3)? 1: 0,
            'choice4' => ($req->choice4&&$req->answer4)? 1: 0,
        ];
        $question = new Question($req->all());
        $question->test_id = $test->id;
        $question->save();
        $answer = new Answer($answerData);
        $answer->question_id = $question->id;
        $answer->save();

        $fullQuestion = DB::table('questions')
        ->join('answers', 'questions.id', '=', 'answers.question_id')
        ->select('questions.*', 'answers.choice1 as answer1', 'answers.choice2 as answer2', 'answers.choice3 as answer3', 'answers.choice4 as answer4')
        ->where('questions.id', $question->id)
        ->first();
        return response()->json([
            'error_code' => 0,
            'full_question' => $fullQuestion,
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $req, Question $question)
    {
        $validator = Validator::make($req->all(),[
            'content' => 'required|string',
            'choice1' => 'required|string',
            'choice2' => 'required|string',
        ]);
        if($validator->fails()){
            return response()->json([
                'error_code' => 1,
                'error' => $validator->errors()
            ], 200);
        }
        $answerData = [
            'choice1' => ($req->choice1&&$req->answer1)? 1: 0,
            'choice2' => ($req->choice2&&$req->answer2)? 1: 0,
            'choice3' => ($req->choice3&&$req->answer3)? 1: 0,
            'choice4' => ($req->choice4&&$req->answer4)? 1: 0,
        ];
        $question->content = $req->content;
        $question->choice1 = $req->choice1;
        $question->choice2 = $req->choice2;
        $question->choice3 = $req->choice3;
        $question->choice4 = $req->choice4;
        $question->save();
        Answer::query()->where('question_id', $question->id)->update($answerData);

        $fullQuestion = DB::table('questions')
        ->join('answers', 'questions.id', '=', 'answers.question_id')
        ->select('questions.*', 'answers.choice1 as answer1', 'answers.choice2 as answer2', 'answers.choice3 as answer3', 'answers.choice4 as answer4')
        ->where('questions.id', $question->id)
        ->first();
        return response()->json([
            'error_code' => 0,
            'full_question' => $fullQuestion,
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Question $question)
    {
        $question->delete();
        return response()->json([
            'error_code' => 0,
            'msg' => 'delete question successfully'
        ], 200);
    }
}
