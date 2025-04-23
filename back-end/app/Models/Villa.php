<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Villa extends Model
{
    use HasFactory;

    // Spécifie les champs qui peuvent être assignés en masse (mass assignable)
    /* protected $fillable = [
        'titre',
        'description',
        'prix',
        'adresse',
        'image', 
    ];

    //  un attribut image stocké dans le système de fichiers,  ajouter une méthode pour générer l'URL
   public function getImageUrlAttribute()
    {
        return url('storage/images/' . $this->image);
    }*/
}
