<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use App\Models\utilisateurs;
use Illuminate\Support\Facades\Log;


class utilisateursController extends Controller
{
    public function register(Request $request)
    {
        $validatedData = $request->validate([
            'nom' => 'required|string|max:255',
            'prenom' => 'required|string|max:255',
            'email' => 'required|email|unique:utilisateurs',
            'password' => 'required|string|min:8',
        ]);

        // تعيين الدور بناءً على القيمة القادمة من الريكوست
        $role = $request->admin == 1 ? 'Admin' : 'Client';

        $validatedData['password'] = Hash::make($request->password);
        $validatedData['role'] = $role;

        $user = utilisateurs::create($validatedData);
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Utilisateur enregistré avec succès',
            'user' => $user,
            'token' => $token
        ], 201);
    }

    public function login(Request $request)
    {
        $validatedData = $request->validate([
            'email' => 'required|email',
            'password' => 'required|string|min:8',
        ]);

        $user = utilisateurs::where('email', $validatedData['email'])->first();

        if (!$user) {
            return response()->json(['message' => 'Email invalide'], 401);
        }

        if (!Hash::check($request->password, $user->password)) {
            return response()->json(['message' => 'Mot de passe incorrect'], 401);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Connexion réussie',
            'token' => $token,
            'user' => $user->makeHidden(['password'])
        ]);
    }

    public function index()
    {
        return response()->json(utilisateurs::all());
    }

    public function show(string $id)
    {
        $user = utilisateurs::find($id);
        if (!$user) return response()->json(['message' => 'Utilisateur non trouvé'], 404);
        return response()->json($user);
    }

    public function update(Request $request, $id)
    {
        Log::info('Update request:', $request->all()); // يسجل شنو جاي من React
    
        $validated = $request->validate([
            'email' => 'required|email',
            'admin' => 'required|in:0,1',
        ]);
    
        $utilisateur = utilisateurs::findOrFail($id);
        $utilisateur->update($validated);
    
        return response()->json(['message' => 'Utilisateur mis à jour']);
    }
    
    public function destroy($id)
    {
        $utilisateur = utilisateurs::findOrFail($id);
        $utilisateur->delete();
        return response()->json(['message' => 'Utilisateur supprimé']);
    }
}