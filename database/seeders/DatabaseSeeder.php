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
            'telefono' => '600000000',
            'password' => Hash::make('admin123'),
        ]);
        $admin->roles()->attach($adminRole);

        $cartaPrincipal = Carta::create([
            'nombre' => 'Carta de Primavera',
            'descripcion' => 'Nuestros mejores platos de temporada',
            'precio' => null,
            'imagen' => 'portada_primavera.jpg'
        ]);

        $catEntrantes = Categoria::create([
            'nombre' => 'Entrantes',
            'descripcion' => 'Para abrir el apetito',
            'carta_id' => $cartaPrincipal->id
        ]);

        $catPrincipales = Categoria::create([
            'nombre' => 'Platos Principales',
            'descripcion' => 'Nuestra especialidad',
            'carta_id' => $cartaPrincipal->id
        ]);

        $catPostres = Categoria::create([
            'nombre' => 'Postres',
            'descripcion' => 'El toque dulce',
            'carta_id' => $cartaPrincipal->id
        ]);

        Plato::create([
            'nombre' => 'Nachos con Queso',
            'descripcion' => 'Nachos crujientes con mezcla de quesos y jalapeños',
            'precio' => 8.50,
            'alergenos' => 'Lácteos, Gluten',
            'imagen' => 'nachos.jpg',
            'categoria_id' => $catEntrantes->id,
            'carta_id' => $cartaPrincipal->id,
        ]);

        Plato::create([
            'nombre' => 'Hamburguesa Especial',
            'descripcion' => 'Carne de buey, queso cheddar y salsa secreta',
            'precio' => 12.90,
            'alergenos' => 'Sésamo, Lácteos, Gluten',
            'imagen' => 'burger.jpg',
            'categoria_id' => $catPrincipales->id,
            'carta_id' => $cartaPrincipal->id,
        ]);

        Plato::create([
            'nombre' => 'Tarta de Queso',
            'descripcion' => 'Tarta casera con mermelada de arándanos',
            'precio' => 6.00,
            'alergenos' => 'Lácteos, Huevo',
            'imagen' => 'cheesecake.jpg',
            'categoria_id' => $catPostres->id,
            'carta_id' => $cartaPrincipal->id,
        ]);
    }
}
