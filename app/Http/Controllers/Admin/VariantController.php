<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Store;
use App\Models\Variant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class VariantController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index($store_id)
    {
        $store=Store::where('user_id',Auth::id())->where('id',$store_id)->firstOrFail();
        Inertia::share('current_store', $store);

        return Inertia::render('Admin/VariantIndex',[
            'variants'=>Variant::where('store_id',$store_id)->get()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create($store_id)
    {
        $store=Store::where('user_id',Auth::id())->where('id',$store_id)->firstOrFail();
        Inertia::share('current_store', $store);
        return Inertia::render('Admin/VariantPages/VariantCreate');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request,$store_id)
    {
        Store::where('user_id',Auth::id())->where('id',$request->store_id)->firstOrFail();
        Variant::create([
            'value'=>$request->value,
            'store_id'=>$request->store_id,
            'name'=>$request->name
        ]);

        return redirect(route('admin.variants.index',['store_id'=>$request->store_id]));
    }

    /**
     * Display the specified resource.
     */
    public function show($store_id=0,$variant_id)
    {
        $store=Store::where('user_id',Auth::id())->where('id',$store_id)->firstOrFail();
        $variant=Variant::where('store_id',$store_id)->where('id',$variant_id)->firstOrFail();
        Inertia::share('current_store', $store);
        return Inertia::render('Admin/VariantPages/VariantEdit',[
            'variant'=>$variant
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
    public function update(Request $request, $store_id)
    {
        Store::where('user_id',Auth::id())->where('id',$request->store_id)->firstOrFail();
        Variant::findOrFail($request->id)->update([
            'value'=>$request->value,
            'store_id'=>$request->store_id,
            'name'=>$request->name
        ]);

        return redirect(route('admin.variants.index',['store_id'=>$request->store_id]));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request ,$store_id)
    {
        Store::where('user_id',Auth::id())->where('id',$request->store_id)->firstOrFail();
        $variant=Variant::findOrFail($request->id);
        $variant->delete();
    }
}
