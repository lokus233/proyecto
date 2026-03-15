<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Carta extends Model
{
    protected $fillable = [
        'nombre',
        'descripcion',
        'precio',
        'imagen',
        'alergenos',
    ];
    public function usuarios(): BelongsToMany{
        return $this->belongsToMany(User::class);
    }

    public function platos(): HasMany{
        return $this->hasMany(Plato::class);
    }

    public function carritos(): BelongsToMany{
        return $this->belongsToMany(Carrito::class);
    }
}
