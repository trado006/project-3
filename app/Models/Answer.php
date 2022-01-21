<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Answer extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'question_id',
        'choice1',
        'choice2',
        'choice3',
        'choice4',
    ];
    
    /**
     * The model's default values for attributes.
     *
     * @var array
     */
    protected $attributes = [
        'choice3' => null,
        'choice4' => null,
    ];
}
