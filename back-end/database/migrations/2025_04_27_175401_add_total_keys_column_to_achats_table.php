<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddTotalKeysColumnToAchatsTable extends Migration
{
    public function up()
    {
        Schema::table('achats', function (Blueprint $table) {
            $table->integer('total_keys')->default(100); // إضافة عدد المفاتيح الكلي المتاح في البداية
        });
    }

    public function down()
    {
        Schema::table('achats', function (Blueprint $table) {
            $table->dropColumn('total_keys'); // حذف العمود في حالة الرجوع إلى التعديلات السابقة
        });
    }
}
