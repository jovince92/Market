<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Store;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index($store_id)
    {
        $store=Store::where('user_id',Auth::id())->where('id',$store_id)->firstOrFail();
        Inertia::share('current_store', $store);

        return Inertia::render('Admin/CategoryIndex',[
            'categories'=>Category::where('store_id',$store_id)->get()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create($store_id)
    {
        $store=Store::where('user_id',Auth::id())->where('id',$store_id)->firstOrFail();
        Inertia::share('current_store', $store);
        return Inertia::render('Admin/CategoryPages/CategoryCreate');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request,$store_id)
    {
        Store::where('user_id',Auth::id())->where('id',$request->store_id)->firstOrFail();
        Category::create([
            'billboard_id'=>$request->billboard_id,
            'store_id'=>$request->store_id,
            'name'=>$request->name
        ]);

        return redirect(route('admin.categories.index',['store_id'=>$request->store_id]));
    }

    /**
     * Display the specified resource.
     */
    public function show($store_id=0,$category_id)
    {
        $store=Store::where('user_id',Auth::id())->where('id',$store_id)->firstOrFail();
        $category=Category::where('store_id',$store_id)->where('id',$category_id)->firstOrFail();
        Inertia::share('current_store', $store);
        return Inertia::render('Admin/CategoryPages/CategoryEdit',[
            'category'=>$category
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
    public function update(Request $request, string $id)
    {
        Store::where('user_id',Auth::id())->where('id',$request->store_id)->firstOrFail();
        Category::findOrFail($request->id)->update([
            'billboard_id'=>$request->billboard_id,
            'store_id'=>$request->store_id,
            'name'=>$request->name
        ]);

        return redirect(route('admin.categories.index',['store_id'=>$request->store_id]));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request ,$store_id)
    {
        Store::where('user_id',Auth::id())->where('id',$request->store_id)->firstOrFail();
        $category=Category::findOrFail($request->id);
        $category->delete();
    }
}
