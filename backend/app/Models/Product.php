<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
        protected $fillable = [
        'name',
        'description',
        'category',
        'price',
        'image',
        'specifications'
    ];

    protected $casts = [
        'specifications' => 'array',
        'price' => 'decimal:2'
    ];
}
