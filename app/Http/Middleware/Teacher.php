<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class Teacher
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        if($request->user['position']!='teacher'){
            return response()->json([
                'error_code' => 2,
                'msg' => 'Permision require teacher',
            ]);
        }
        return $next($request);
    }
}
