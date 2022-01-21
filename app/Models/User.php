<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var string[]
     */
    protected $fillable = [
        'login_name',
        'position',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array
     */
    // protected $casts = [
    //     'email_verified_at' => 'datetime',
    // ];

    /**
     * Get the user associated with the user session.
     */
    public function userSession()
    {
        return $this->hasOne(UserSession::class);
    }

    /**
     * Get the user associated with the student.
     */
    public function student(){
        return $this->hasOne(Student::class);
    }

    /**
     * Get the user associated with the teacher.
     */
    public function teacher(){
        return $this->hasOne(Teacher::class);
    }

    /**
     * Get the user associated with the admin.
     */
    public function admin(){
        return $this->hasOne(Admin::class);
    }
}
