<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var string[]
     */
    protected $fillable = [
        'code',
        'name',
        'picture_url',
        'description',
        'price',
    ];
    
    public function lectures(){
        return $this->hasMany(Lecture::class);
    }

    public function teachers(){
        return $this->belongsToMany(Teacher::class, 'teaches', 'course_id', 'teacher_id');
    }
    
    public function students(){
        return $this->belongsToMany(Student::class, 'studies', 'course_id', 'student_id');
    }
}
