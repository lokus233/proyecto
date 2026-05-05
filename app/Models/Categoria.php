<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Categoria extends Model
{
    protected $fillable = [
        'nombre',
        'descripcion',
        'imagen',
        'activo'
    ];

    public function platos(): HasMany
    {
        return $this->hasMany(Plato::class);
    }
}
