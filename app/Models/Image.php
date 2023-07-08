<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Image extends Model
{
    use HasFactory;
    protected $guarded=[];

    public function getLocationAttribute($value){
        if($value && str_contains( strtolower($value),'http')){return $value;}
        return url('/').'/'. $value;
    }
}
