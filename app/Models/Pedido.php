<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Pedido extends Model
{
    protected $fillable = [
        'user_id',
        'total',
        'estado',
    ];

    public function usuario(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }


    public function platos(): BelongsToMany
    {
        return $this->belongsToMany(Plato::class)
                    ->withPivot('cantidad')
                    ->withTimestamps();
    }
}
