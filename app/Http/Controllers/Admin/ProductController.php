<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Image;
use App\Models\Product;
use App\Models\Store;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;
use Inertia\Inertia;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index($store_id)
    {
        $store=Store::where('user_id',Auth::id())->where('id',$store_id)->firstOrFail();
        Inertia::share('current_store', $store);

        return Inertia::render('Admin/ProductIndex',[
            'products'=>Product::where('store_id',$store_id)->get()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create($store_id)
    {
        $store=Store::with(['categories','variants'])->where('user_id',Auth::id())->where('id',$store_id)->firstOrFail();
        Inertia::share('current_store', $store);
        return Inertia::render('Admin/ProductPages/ProductCreate');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request,$store_id)
    {

        
        $request->validate([
            'price'=> 'required|decimal:2|min:0.01',
            'images.*'=> 'required|mimes:jpeg,png,jpg,webp'
        ]);

        Store::where('user_id',Auth::id())->where('id',$request->store_id)->firstOrFail();
        $product=Product::create([
            'category_id'=>$request->category_id,
            'store_id'=>$request->store_id,
            'name'=>$request->name,
            'price'=>$request->price
        ]);

        foreach($request->images as $image){
            $image_name=$product->id.'_'.$image->getClientOriginalName();
            $path_main='uploads/images/products/product_'.$product->id.'/';
            $path=public_path($path_main);
            
            
            if (!file_exists($path)) {
                File::makeDirectory($path,0777,true);
            }

            $new_image = $path_main.$image_name;
            
            $image->move($path, $new_image);
            Image::create([
                'user_id'=>Auth::id(),
                'product_id'=>$product->id,
                'name'=>$image_name,
                'location'=>$new_image
            ]);
            
        }

        return redirect(route('admin.products.index',['store_id'=>$request->store_id]));
    }

    /**
     * Display the specified resource.
     */
    public function show($store_id=0,$product_id)
    {
        $store=Store::with(['categories','variants'])->where('user_id',Auth::id())->where('id',$store_id)->firstOrFail();
        $product=Product::where('store_id',$store_id)->where('id',$product_id)->firstOrFail();
        Inertia::share('current_store', $store);
        return Inertia::render('Admin/ProductPages/ProductEdit',[
            'product'=>$product
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
        $request->validate([
            'price'=> 'required|decimal:2|min:0.01',
            'images.*'=> 'mimes:jpeg,png,jpg,webp'
        ]);

        Store::where('user_id',Auth::id())->where('id',$request->store_id)->firstOrFail();
        $product=Product::findOrFail($request->id);
        $product->update([
            'category_id'=>$request->category_id,
            'store_id'=>$request->store_id,
            'name'=>$request->name,
            'price'=>$request->price
        ]);

        if($request->files){
            foreach($request->images as $image){
                $image_name=$product->id.'_'.$image->getClientOriginalName();
                $path_main='uploads/images/products/product_'.$product->id.'/';
                $path=public_path($path_main);
                
                
                if (!file_exists($path)) {
                    File::makeDirectory($path,0777,true);
                }
    
                $new_image = $path_main.$image_name;
                
                $image->move($path, $new_image);
                Image::create([
                    'user_id'=>Auth::id(),
                    'product_id'=>$product->id,
                    'name'=>$image_name,
                    'location'=>$new_image
                ]);
                
            }
        }
        

        return redirect(route('admin.products.index',['store_id'=>$request->store_id]));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request ,$store_id)
    {
        Store::where('user_id',Auth::id())->where('id',$request->store_id)->firstOrFail();
        $product=Product::findOrFail($request->id);
        $images = Image::where('product_id',$product->id)->get();
        if($images){
            foreach($images as $image){
                @unlink(public_path($image->getAttributes()['location']));
                $image->delete();
            }
        }
        $product->delete();
    }

    
}
