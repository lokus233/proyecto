<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Resenia extends Model
{
    protected $fillable = [
        'user_id',
        'puntuacion',
        'titulo',
        'comentario',
        'fecha_publicacion',
    ];

    public function usuario(){
        return $this->belongsTo(User::class);
    }
}
