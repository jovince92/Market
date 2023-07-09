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
    public function store(Request $request)
    {
        //
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
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
