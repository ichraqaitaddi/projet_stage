<?php

// app/Models/VillaGagnez.php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VillaGagnez extends Model
{
    use HasFactory;

    protected $table = 'villagagnez'; // ✅ أكدنا الاسم
    protected $fillable = [
        'titre', 'description', 'image_url',
    ];
}

