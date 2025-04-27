<?php
namespace App\Http\Controllers;

use App\Models\Achat;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class AchatController extends Controller
{
    public function store(Request $request)
    {
        Log::info('Data received for achat', ['request_data' => $request->all()]);

        // التحقق من المدخلات
        $request->validate([
            'user_id' => 'required|exists:utilisateurs,id',
            'nombre_cles' => 'required|integer|min:1',
        ]);

        // التحقق من إجمالي المفاتيح المتبقية
        $remainingKeys = DB::table('achats')->sum('total_keys') - DB::table('achats')->sum('nombre_cles');
        
        if ($remainingKeys <= 0) {
            return response()->json([
                'error' => 'لا توجد مفاتيح متاحة للشراء.'
            ], 400);
        }

        // التحقق من إجمالي المفاتيح التي اشتراها المستخدم
        $totalKeysBought = Achat::where('user_id', $request->user_id)->sum('nombre_cles');
        
        if ($totalKeysBought + $request->nombre_cles > 10) {
            return response()->json([
                'error' => 'لقد وصلت إلى الحد الأقصى من المفاتيح.'
            ], 400);
        }

        // تحديث عدد المفاتيح المتبقية في قاعدة البيانات
        DB::table('achats')->decrement('total_keys', $request->nombre_cles);

        // إنشاء عملية الشراء
        $achat = Achat::create([
            'user_id' => $request->user_id,
            'nombre_cles' => $request->nombre_cles,
        ]);

        return response()->json([
            'message' => 'تم تسجيل عملية الشراء بنجاح.',
            'achat' => $achat
        ], 201);
    }
}


