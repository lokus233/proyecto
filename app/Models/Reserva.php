<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Reserva extends Model
{
    protected $fillable = [
        'user_id',
        'numero_personas',
        'estado',
        'fecha_reserva',
        'hora_reserva'
    ];

    public function usuario(): BelongsTo{
        return $this->belongsTo(User::class);
    }
}
