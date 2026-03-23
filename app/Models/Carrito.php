<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Carrito extends Model
{
    protected $fillable = [
        'user_id',
        'precio_total',
        'estado',
        'fecha',
        'tipo',
        'metodo_pago',
    ];

    public function usuario(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function platos(): BelongsToMany
    {
        return $this->belongsToMany(Plato::class)->withPivot("cantidad");
    }

}
