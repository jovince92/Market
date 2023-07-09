<?php

use App\Http\Controllers\Admin\BillboardController;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\DashboardCOntroller;
use App\Http\Controllers\Admin\ImageController;
use App\Http\Controllers\Admin\StoreController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\SocialiteController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Home');
})->name('home');


Route::middleware(['auth'])->prefix('admin')->name('admin.')->group(function(){
    Route::get('/', [StoreController::class,'index'])->name('index');

    Route::prefix('dashboard')->name('dashboard.')->group(function(){
        Route::get('/{id?}',[DashboardController::class,'index'])->name('index');
        Route::get('/{id?}/settings',[DashboardController::class,'settings'])->name('settings');
        
    });

    Route::prefix('{store_id?}/billboards')->name('billboards.')->group(function(){
        
        Route::get('/',[BillboardController::class,'index'])->name('index');
        Route::get('/create',[BillboardController::class,'create'])->name('create');
        Route::get('/{billboard_id}',[BillboardController::class,'show'])->name('show');
        Route::post('/store',[BillboardController::class,'store'])->name('store');
        Route::post('/update',[BillboardController::class,'update'])->name('update');
        Route::post('/delete',[BillboardController::class,'destroy'])->name('delete');
    });

    Route::prefix('{store_id?}/categories')->name('categories.')->group(function(){
        
        Route::get('/',[CategoryController::class,'index'])->name('index');
        Route::get('/create',[CategoryController::class,'create'])->name('create');
        Route::get('/store',[CategoryController::class,'store'])->name('store');
        Route::get('/update',[CategoryController::class,'update'])->name('update');
        Route::get('/destroy',[CategoryController::class,'destroy'])->name('delete');
    });

    Route::prefix('stores')->name('stores.')->group(function(){
        Route::post('/store',[StoreController::class,'store'])->name('store');
        Route::post('/update',[StoreController::class,'update'])->name('update');
        Route::post('/delete',[StoreController::class,'destroy'])->name('delete');
    });


    Route::prefix('images')->name('images.')->group(function(){
        Route::post('/store',[ImageController::class,'store'])->name('store');
        Route::post('/delete',[ImageController::class,'delete'])->name('delete');
    });
});




Route::get('/auth/google/redirect',[SocialiteController::class,'redirect'])->name('oauth.redirect');
Route::get('/auth/google/callback',[SocialiteController::class,'callback'])->name('oauth.callback');



Route::middleware('guest')->group(function () {
    Route::get('register', [RegisteredUserController::class, 'create'])
                ->name('register');

    Route::post('register', [RegisteredUserController::class, 'store']);

    Route::get('login', [AuthenticatedSessionController::class, 'create'])
                ->name('login');

    Route::post('login', [AuthenticatedSessionController::class, 'store']);

    
});



