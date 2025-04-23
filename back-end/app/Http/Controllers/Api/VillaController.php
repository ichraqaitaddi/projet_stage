<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Villa;

class VillaController extends Controller
{
    //
    public function index()
{
    return response()->json(Villa::all());
}

public function store(Request $request)
{
    

    $request->validate([
        'titre' => 'required',
        'description' => 'required',
        'prix' => 'required|numeric',
        'adresse' => 'required',
        'image' => 'required|image|mimes:jpeg,png,jpg|max:2048',
    ]);

    $imageName = time() . '.' . $request->image->extension();
    $request->image->move(public_path('images'), $imageName);

    $villa = new Villa();
    $villa->titre = $request->titre;
    $villa->description = $request->description;
    $villa->prix = $request->prix;
    $villa->adresse = $request->adresse;
    $villa->image = $imageName;
    $villa->save();

    return response()->json($villa, 201);
}
public function show($id)
{
    $villa = Villa::findOrFail($id);
    return response()->json($villa);
}

// Mettre à jour une villa existante
public function update(Request $request, $id)
{
    $villa = Villa::findOrFail($id);

    $request->validate([
        'titre' => 'required|string',
        'description' => 'required|string',
        'prix' => 'required|numeric',
        'adresse' => 'required|string',
        'image' => 'nullable|image', // L'image est optionnelle
    ]);

    $villa->titre = $request->titre;
    $villa->description = $request->description;
    $villa->prix = $request->prix;
    $villa->adresse = $request->adresse;

    // Si une nouvelle image est envoyée, on la remplace
    if ($request->hasFile('image')) {
        // Supprimer l'ancienne image du dossier public/images
        if ($villa->image) {
            $oldImagePath = public_path('images/' . $villa->image); // Chemin absolu de l'ancienne image
            if (file_exists($oldImagePath)) {
                unlink($oldImagePath); // Supprimer l'ancienne image
            }
        }

        // Sauvegarder la nouvelle image dans le dossier public/images
        $imagePath = $request->file('image')->getClientOriginalName(); // Récupérer le nom d'origine du fichier
        $request->file('image')->move(public_path('images'), $imagePath); // Déplacer l'image dans public/images
        $villa->image = $imagePath; // Assigner le chemin de la nouvelle image à la villa
    }

    $villa->save();

    return response()->json($villa);
}



// Supprimer une villa
public function destroy($id)
{
    $villa = Villa::findOrFail($id);

    // Supprimer l'image du dossier public/images si elle existe
    if ($villa->image) {
        $imagePath = public_path('images/' . $villa->image); // Chemin absolu de l'image
        if (file_exists($imagePath)) {
            unlink($imagePath); // Supprimer l'image
        }
    }

    $villa->delete();

    return response()->json(['message' => 'Villa supprimée avec succès']);
}







}
    

