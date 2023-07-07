<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Store;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index($id=0){
        $stores = Store::where('user_id',Auth::id())->first();
        if(!$stores){
            return redirect(route('admin.index'));
        }

        $store=Store::findOrFail($id);
        return Inertia::render('Admin/Dashboard',['store'=>$store]);
    }

    public function settings($id){
        $store=Store::findOrFail($id);
        return Inertia::render('Admin/Settings',['store'=>$store]);
    }
}
