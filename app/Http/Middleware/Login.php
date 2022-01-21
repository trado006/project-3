<?php

namespace App\Http\Middleware;

use App\Models\User;
use App\Models\UserSession;
use Closure;
use Illuminate\Http\Request;

class Login
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
        $token = $request->bearerToken();
        //return response()->json($token, 200);
        //$token = $request->header('token');
        $checkTokenIsValid = UserSession::where('token', $token)->first();
        if (!$checkTokenIsValid) {
            return response()->json([
                'error_code' => 2,
                'msg' => "token not valid",
            ], 200);
        }
        $user = User::find($checkTokenIsValid->user_id);
        $request->user = [ 'id' => $user->id, 'position' => $user->position ];
        return $next($request);
    }
}
