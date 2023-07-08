<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Image;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;

class ImageController extends Controller
{
    public function store(Request $request){

        $request->validate([
            'image' => 'required|mimes:jpeg,png,jpg,webp'
        ]);

        $image = $request->file('image') ;
        $image_model=Image::create([
            'user_id'=>Auth::id(),
            'name'=>'',
            'location'=>''
        ]);

        
        $image_name=$image_model->id.'_'.$image->getClientOriginalName();

        $path=public_path('uploads/images/misc/');

        
        if (!file_exists($path)) {
            File::makeDirectory($path,0777,true);
        }

        $new_image = 'uploads/images/misc/'.$image_name;
        $request->file('image')->move($path, $new_image);   
        $image_model->update([
            'name'=>$image_name,
            'location'=>$new_image
        ]);
    }

    public function delete(Request $request){
        $image=Image::findOrFail($request->id);
        @unlink(public_path($image->getAttributes()['location']));
        $image->delete();
    }
}
