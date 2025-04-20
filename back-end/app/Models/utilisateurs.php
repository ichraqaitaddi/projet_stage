<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;

class utilisateurs extends Model
{
    use HasFactory, HasApiTokens;

    protected $fillable = [
        'nom',
        'prenom',
        'email',
        'password',
        'admin',  // هنا admin بدلاً من role
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];
}