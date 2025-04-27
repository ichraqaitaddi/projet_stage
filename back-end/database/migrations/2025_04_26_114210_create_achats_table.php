<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAchatsTable extends Migration
{
    public function up()
    {
        Schema::create('achats', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('utilisateurs')->onDelete('cascade'); // تعديل اسم الجدول هنا
            $table->integer('nombre_cles'); // nombre de clés acheté
            $table->timestamps(); // created_at / updated_at
            
        });
    }

    public function down()
    {
        Schema::dropIfExists('achats');
    }
}
