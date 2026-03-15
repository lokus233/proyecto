<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Categoria;
use App\Models\Carta;
use App\Models\Plato;
use App\Models\Role;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $adminRole = Role::create(['nombre' => 'admin']);
        $clienteRole = Role::create(['nombre' => 'cliente']);

        $admin = User::create([
            'nombre' => 'Admin Proyecto',
            'apellidos' => 'Lama',
            'email' => 'admin@proyecto.com',
            'password' => Hash::make('admin123'),
        ]);
        $admin->roles()->attach($adminRole);

        $cartaPrincipal = Carta::create([
            'nombre' => 'Carta de Primavera',
            'descripcion' => 'Nuestros mejores platos de temporada',
            'precio' => 4.00,
        ]);

        $catEntrantes = Categoria::create(['nombre' => 'Entrantes', 'descripcion' => 'Para abrir el apetito']);
        $catPrincipales = Categoria::create(['nombre' => 'Platos Principales', 'descripcion' => 'Nuestra especialidad']);
        $catPostres = Categoria::create(['nombre' => 'Postres', 'descripcion' => 'El toque dulce']);

        Plato::create([
            'nombre' => 'Nachos con Queso',
            'descripcion' => 'Nachos crujientes con mezcla de quesos y jalapeños',
            'precio' => 8.50,
            'categoria_id' => $catEntrantes->id,
            'carta_id' => $cartaPrincipal->id,
        ]);

        Plato::create([
            'nombre' => 'Hamburguesa Especial',
            'descripcion' => 'Carne de buey, queso cheddar y salsa secreta',
            'precio' => 12.90,
            'categoria_id' => $catPrincipales->id,
            'carta_id' => $cartaPrincipal->id,
        ]);

        Plato::create([
            'nombre' => 'Tarta de Queso',
            'descripcion' => 'Tarta casera con mermelada de arándanos',
            'precio' => 6.00,
            'categoria_id' => $catPostres->id,
            'carta_id' => $cartaPrincipal->id,
        ]);
    }
}
