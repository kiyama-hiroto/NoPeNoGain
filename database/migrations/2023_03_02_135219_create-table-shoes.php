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
        Schema::create('shoes', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('price');
            $table->string('brand');
            $table->string('color');
            $table->string('category');
            $table->integer('stock');
        });
    }

    
    public function down(): void
    {
        Schema::dropIfExists('shoes');
    }
};
