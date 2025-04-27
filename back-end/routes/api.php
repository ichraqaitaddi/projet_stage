<?php

use App\Models\utilisateurs;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\utilisateursController;
use App\Http\Controllers\AchatController;
use App\Http\Controllers\VillagagnezController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});
Route::post('/register', [utilisateursController::class, 'register']);
Route::post('/login', [utilisateursController::class, 'login']);
Route::get('/utilisateurs', [utilisateursController::class, 'index']);

//route pour crud villas
Route::apiResource('villas', App\Http\Controllers\Api\VillaController::class);
Route::put('/utilisateurs/{id}', [utilisateursController::class, 'update']);
Route::delete('/utilisateurs/{id}', [utilisateursController::class, 'destroy']);

Route::get('/villas/{id}', [VillaController::class, 'show']);



Route::middleware('auth:sanctum')->post('/achats', [AchatController::class, 'store']);




Route::get('/villa-tirage', [VillagagnezController::class, 'show']); 
Route::get('/villa-tirage', [VillagagnezController::class, 'index']); 


Route::put('/villa-tirage/{id}', [VillagagnezController::class, 'update']); // تعديل
Route::delete('/villa-tirage/{id}', [VillagagnezController::class, 'destroy']); // حذف

// في API Route (web.php)
Route::get('/remaining-keys', function () {
    $remainingKeys = DB::table('achats')->sum('total_keys') - DB::table('achats')->sum('nombre_cles');
    return response()->json([
        'remaining_keys' => $remainingKeys
    ]);
});
