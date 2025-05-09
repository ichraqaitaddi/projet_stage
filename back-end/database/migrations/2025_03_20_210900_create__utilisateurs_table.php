<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('utilisateurs', function (Blueprint $table) {
            $table->id();
            $table->string('nom', 50)->nullable(false);
            $table->string('prenom', 50)->nullable(false);
            $table->string('email', 100)->unique()->nullable(false);
            $table->string('password', 255)->nullable(false);
            $table->boolean('admin')->default(false); // false = client, true = admin
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('utilisateurs');
    }
};