<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAnswersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('answers', function (Blueprint $table) {
            $table->foreignId('question_id')->constrained()->cascadeOnDelete()->cascadeOnUpdate();
            $table->primary('question_id');
            $table->boolean('choice1');
            $table->boolean('choice2');
            $table->boolean('choice3')->nullable();
            $table->boolean('choice4')->nullable();
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
        Schema::dropIfExists('answers');
    }
}
