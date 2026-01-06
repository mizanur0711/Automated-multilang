<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Translation extends Model
{
    protected $fillable = [
        'source_text',
        'source_language',
        'target_language',
        'translated_text',
        'context',
        'is_approved'
    ];

    protected $casts = [
        'is_approved' => 'boolean'
    ];
}
