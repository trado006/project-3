<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class Admin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $req, Closure $next)
    {
        if($req->user['position']!='admin'){
            return response()->json([
                'error_code' => 2,
                'msg' => 'Permistion require admin',
            ]);
        }
        return $next($req);
    }
}
