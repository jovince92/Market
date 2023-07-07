<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Store;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class StoreController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $stores = Store::where('user_id',Auth::id())->first();
        if($stores){
            return redirect(route('admin.dashboard.index',['id'=>$stores->id]));
        }
        return Inertia::render('Admin/SetUpPage');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name'=>'string|required|min:1|max:200'
        ]);
        $store= Store::create([
            'user_id'=>Auth::id(),
            'name'=>$request->name
        ]);
        return redirect(route('admin.dashboard.index',['id'=>$store->id]));
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        $request->validate([
            'name'=>'string|required|min:1|max:200'
        ]);
        $store=Store::findOrFail($request->id);
        $store->update([
            'name'=>$request->name
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request)
    {
        $store=Store::findOrFail($request->id);
        $store->delete();
        $redirect_to_store = Store::where('user_id',Auth::id())->first();
        if(!$redirect_to_store){
            return redirect(route('admin.index'));
        }
        return redirect(route('admin.dashboard.index',['id'=>$redirect_to_store->id]));
    }
}
