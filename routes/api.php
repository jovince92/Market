<?php

use App\Models\Billboard;
use App\Models\Store;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/


Route::name('api.')->group(function(){
    Route::get('/store/',function(Request $request){
        return Store::with(['billboards'])->findOrFail($request->id);
    })->name('store');

    Route::get('/billboards',function(Request $request){
        if(!$request->billboard_id){
            return Billboard::where('store_id',$request->store_id)->get();
        }
        return Billboard::where('store_id',$request->store_id)->where('id',$request->billboard_id)->first();
    })->name('billboards');

    
});

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });



