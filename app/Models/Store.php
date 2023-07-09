<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Store extends Model
{
    use HasFactory;
    protected $guarded=[];
    protected $with=['user','billboards'];
    public function user(){
        return $this->belongsTo(User::class);
    }
    public function billboards(){
        return $this->hasMany(Billboard::class);
    }
}
