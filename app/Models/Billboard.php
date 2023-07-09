<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Billboard extends Model
{
    use HasFactory;
    protected $guarded=[];
    protected $with=['image'];
    public function store(){
        return $this->belongsTo(Store::class);
    }

    public function image(){
        return $this->belongsTo(Image::class);
    }

    public function categories(){
        return $this->hasMany(categories::class);
    }
}

