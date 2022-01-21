<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Comment;
use App\Models\Lecture;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    //
    public function index(Lecture $lecture){
        $comments = $lecture->comments;
        return response()->json([
            'error_code' => 0,
            'comments' => $comments
        ], 200);
    }
    public function store(Request $req, Lecture $lecture){
        $comment = new Lecture($req->all());
        $comment->lecture_id = $lecture->id;
        $comment->user_id = $req->user['id'];
        if($comment->save()){
            return response()->json([
                'error_code' => 0,
                'comment' => $comment
            ], 200);
        }else{
            return response()->json([
                'error_code' => 2,
                'msg' => 'add comment fails'
            ], 200);
        }
    }
    public function update(Request $req, Comment $comment){
        if($req->content){
           $comment->content = $req->content; 
        }
        if($comment->save()){
            return response()->json([
                'error_code' => 0,
                'comment' => $comment
            ], 200);
        }else{
            return response()->json([
                'error_code' => 2,
                'msg' => 'Update comment fails'
            ], 200);
        }
    }
    public function destroy(Comment $comment){
        if($comment->delete()){
            return response()->json([
                'error_code' => 0,
                'msg' => 'Delele comment successfully'
            ], 200);
        }else{
            return response()->json([
                'error_code' => 2,
                'msg' => 'Delete comment fails'
            ], 200);
        }
    }
}
