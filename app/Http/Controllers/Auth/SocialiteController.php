<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Laravel\Socialite\Facades\Socialite;

class SocialiteController extends Controller
{
    public function redirect(){
        return Socialite::driver('google')->redirect();
    }

    public function callback(){
        $google_user = Socialite::driver('google')->user();
        
        
        $user = User::updateOrCreate([
            'google_id' => $google_user->id,
        ], [
            'google_id' => $google_user->id,
            'name' => $google_user->user['given_name'],
            'email' => $google_user->user['email'],
            'avatar'=>$google_user->user['picture'],
            'password'=>Hash::make(Str::uuid())
        ]);
    
        Auth::login($user);
    
        return redirect('/');
    }
}
