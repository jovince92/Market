<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Billboard;
use App\Models\Image;
use App\Models\Store;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class BillboardController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index($store_id=0)
    {
        $store=Store::where('user_id',Auth::id())->where('id',$store_id)->firstOrFail();
        Inertia::share('current_store', $store);

        return Inertia::render('Admin/BillboardIndex',[
            'billboards'=>Billboard::where('store_id',$store_id)->get()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create($store_id=0)
    {
        $store=Store::where('user_id',Auth::id())->where('id',$store_id)->firstOrFail();
        Inertia::share('current_store', $store);
        return Inertia::render('Admin/BillboardPages/BillboardCreate',[
            'images'=>Image::where('user_id',Auth::id())->get()
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request,$store_id)
    {
        Store::where('user_id',Auth::id())->where('id',$request->store_id)->firstOrFail();
        Billboard::create([
            'store_id'=>$request->store_id,
            'label'=>$request->label,
            'image_id'=>$request->image
        ]);

        return redirect(route('admin.billboards.index',['store_id'=>$request->store_id]));
    }

    /**
     * Display the specified resource.
     */
    public function show($store_id=0,$billboard_id)
    {
        $store=Store::where('user_id',Auth::id())->where('id',$store_id)->firstOrFail();
        $billboard=Billboard::where('store_id',$store_id)->where('id',$billboard_id)->firstOrFail();
        Inertia::share('current_store', $store);
        return Inertia::render('Admin/BillboardPages/BillboardEdit',[
            'images'=>Image::where('user_id',Auth::id())->get(),
            'billboard'=>$billboard
        ]);
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
    public function update(Request $request ,$store_id)
    {
        Store::where('user_id',Auth::id())->where('id',$request->store_id)->firstOrFail();
        Billboard::findOrFail($request->id)->update([
            'label'=>$request->label,
            'image_id'=>$request->image
        ]);

        return redirect(route('admin.billboards.index',['store_id'=>$request->store_id]));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
