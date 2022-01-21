<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Teacher extends Model
{
    use HasFactory;
    /**
     * The primary key associated with the table.
     *
     * @var string
     */
    protected $primaryKey = 'user_id';

    /**
     * Indicates if the model's ID is auto-incrementing.
     *
     * @var bool
     */
    public $incrementing = false;

    /**
     * The attributes that are mass assignable.
     *
     * @var string[]
     */
    protected $fillable = [
        'avatar',
        'user_id',
        'gender',
        'full_name',
        'email',
        'phone',
        'birthday',
        'hometown',
        'introduction',
    ];

    public function courses()
    {
        return $this->belongsToMany(Course::class, 'teaches', 'teacher_id', 'course_id');
    }
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
