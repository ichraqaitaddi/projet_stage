<?php

namespace App\Http\Controllers;

use App\Models\Villagagnez;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class VillagagnezController extends Controller
{
    // عرض جميع الفيلات
    public function index()
    {
        $villas = Villagagnez::all();
        return response()->json($villas);
    }

    // عرض فيلا معينة
    public function show($id)
    {
        try {
            $villa = Villagagnez::find($id);
            
            if (!$villa) {
                return response()->json(['error' => 'Villa not found'], 404);
            }

            return response()->json($villa);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    // تحديث بيانات الفيلا
    public function update(Request $request, $id)
    {
        $villa = Villagagnez::find($id);
        
        if (!$villa) {
            return response()->json(['error' => 'Villa not found'], 404);
        }

        // تحديث البيانات الأساسية
        $villa->titre = $request->input('titre', $villa->titre);
        $villa->description = $request->input('description', $villa->description);

        // إذا كانت هناك صورة جديدة، نقوم بتحديثها
        if ($request->hasFile('image')) {
            // حذف الصورة القديمة إذا كانت موجودة
            Storage::delete('public/' . $villa->image_url);

            // تخزين الصورة الجديدة
            $path = $request->file('image')->store('public/villas');
            $villa->image_url = 'villas/' . basename($path);
        }

        // حفظ التعديلات
        $villa->save();

        return response()->json($villa);
    }

    // حذف الفيلا
    public function destroy($id)
    {
        // التأكد من وجود الفيلة
        $villa = Villagagnez::find($id);
    
        if (!$villa) {
            // في حالة عدم وجود الفيلة
            return response()->json(['error' => 'Villa not found'], 404);
        }
    
        // التحقق إذا كانت الصورة موجودة وحذفها
        if ($villa->image_url) {
            // تأكد من حذف الصورة من مجلد التخزين
            Storage::delete('public/' . $villa->image_url);
        }
    
        // حذف السجل من القاعدة
        $villa->delete();
    
        // إرسال رسالة نجاح بعد الحذف
        return response()->json(['message' => 'Villa deleted successfully']);
    }
    

}
