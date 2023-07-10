<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;
    protected $guarded=[];

    protected $with=['billboard','store'];

    public function billboard(){
        return $this->belongsTo(Billboard::class);
    }

    public function store(){
        return $this->belongsTo(Store::class);
    }

    public function products(){
        return $this->hasMany(Product::class);
    }
}
