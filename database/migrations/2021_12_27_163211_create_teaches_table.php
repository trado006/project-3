<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTeachesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('teaches', function (Blueprint $table) {
            $table->unsignedBigInteger('teacher_id');
            $table->foreign('teacher_id')->references('user_id')->on('teachers')
            ->cascadeOnDelete()->cascadeOnUpdate();
            $table->index('teacher_id');
            $table->foreignId('course_id')->constrained()
            ->cascadeOnDelete()->cascadeOnUpdate();
            $table->unique(['teacher_id','course_id']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('teaches');
    }
}
