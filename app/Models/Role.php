<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Role extends Model
{
    protected $fillable = [
        'nombre',
    ];

    public function usuarios():BelongsToMany{
        return $this->belongsToMany(User::class);
    }
}
