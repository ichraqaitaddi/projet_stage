<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\utilisateurs;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        // التحقق من صحة البيانات
        $validator = Validator::make($request->all(), [
            'nom' => 'required|string|max:255',
            'prenom' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:utilisateurs',
            'password' => 'required|string|min:6',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        // إنشاء المستخدم وتعيين admin إلى false بشكل افتراضي
        $user = utilisateurs::create([
            'nom' => $request->nom,
            'prenom' => $request->prenom,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'admin' => false,  // تعيينه كـ 'client' افتراضيًا
        ]);

        return response()->json(['message' => 'Utilisateur créé avec succès', 'user' => $user], 201);
    }

    public function login(Request $request)
    {
        $validatedData = $request->validate([
            'email' => 'required|email',
            'password' => 'required|string|min:8',
        ]);
    
        $user = utilisateurs::where('email', $validatedData['email'])->first();
    
        if (!$user) {
            return response()->json(['message' => 'Invalid Email'], 401);
        } elseif (!Hash::check($request->password, $user->password)) {
            return response()->json(['message' => 'Incorrect Password'], 401);
        }
    
        $token = $user->createToken('auth_token')->plainTextToken;
    
        // إرجاع الـ admin مع الـ token
        return response()->json([
            'message' => 'Connexion réussie',
            'token' => $token,
            'admin' => $user->admin,  // إرجاع قيمة admin
            'user' => $user->makeHidden(['password'])
        ]);
    }
}