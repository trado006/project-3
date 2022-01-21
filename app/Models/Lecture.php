<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Lecture extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var string[]
     */
    protected $fillable = [
        'name',
        'description',
        'video_url',
        'course_id',
    ];

    public function tests(){
        return $this->hasMany(Test::class);
    }

    public function comments(){
        return $this->hasMany(Comment::class);
    }

}
