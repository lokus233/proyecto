<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Plato extends Model
{
    protected $fillable = [
        'nombre',
        'descripcion',
        'precio',
        'alergenos',
        'imagen',
        'carta_id',
        'categoria_id',
    ];


    public function categoria(): BelongsTo
    {
        return $this->belongsTo(Categoria::class);
    }
    public function carta(): BelongsTo
    {
        return $this->belongsTo(Carta::class);
    }

    public function carritos(): BelongsToMany
    {
        return $this->belongsToMany(Carrito::class)->withPivot("cantidad");
    }
}
