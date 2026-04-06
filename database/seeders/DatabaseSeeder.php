<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Categoria;
use App\Models\Plato;
use App\Models\Role;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Roles (Evitamos duplicados con updateOrCreate)
        $adminRole = Role::updateOrCreate(['nombre' => 'admin']);
        $clienteRole = Role::updateOrCreate(['nombre' => 'cliente']);

        // 2. Usuario Administrador
        $admin = User::updateOrCreate(
            ['email' => 'admin@proyecto.com'],
            [
                'nombre' => 'Admin Proyecto',
                'apellidos' => 'Lama',
                'telefono' => '600000000',
                'password' => Hash::make('admin123'),
            ]
        );

        // Sincronizamos el rol para que no se repita en la tabla pivote
        $admin->roles()->sync([$adminRole->id]);

        // 3. Definición del Menú (Categorías -> Platos)
        $menu = [
            'Entrantes' => [
                'desc' => 'Para compartir y abrir el apetito',
                'items' => [
                    [
                        'nombre' => 'Nachos con Queso',
                        'descripcion' => 'Nachos crujientes con mezcla de quesos y jalapeños',
                        'precio' => 8.50,
                        'alergenos' => 'Lácteos, Gluten',
                        'imagen' => 'nachos.jpg',
                    ],
                    [
                        'nombre' => 'Croquetas Caseras',
                        'descripcion' => 'De jamón ibérico (6 unidades)',
                        'precio' => 9.00,
                        'alergenos' => 'Lácteos, Gluten, Huevo',
                        'imagen' => 'croquetas.jpg',
                    ],
                ]
            ],
            'Platos Principales' => [
                'desc' => 'Nuestra especialidad a la parrilla',
                'items' => [
                    [
                        'nombre' => 'Hamburguesa Especial',
                        'descripcion' => 'Carne de buey, queso cheddar y salsa secreta',
                        'precio' => 12.90,
                        'alergenos' => 'Sésamo, Lácteos, Gluten',
                        'imagen' => 'burger.jpg',
                    ],
                    [
                        'nombre' => 'Salmón a la Plancha',
                        'descripcion' => 'Con verduras salteadas y salsa de eneldo',
                        'precio' => 15.50,
                        'alergenos' => 'Pescado',
                        'imagen' => 'salmon.jpg',
                    ],
                ]
            ],
            'Postres' => [
                'desc' => 'El toque dulce para terminar',
                'items' => [
                    [
                        'nombre' => 'Tarta de Queso',
                        'descripcion' => 'Tarta casera con mermelada de arándanos',
                        'precio' => 6.00,
                        'alergenos' => 'Lácteos, Huevo',
                        'imagen' => 'cheesecake.jpg',
                    ],
                ]
            ],
        ];

        // 4. Inserción automática
        foreach ($menu as $nombreCat => $datos) {
            // Creamos la categoría
            $categoria = Categoria::create([
                'nombre' => $nombreCat,
                'descripcion' => $datos['desc'],
            ]);

            // Creamos los platos asociados a esa categoría
            foreach ($datos['items'] as $platoData) {
                $categoria->platos()->create($platoData);
            }
        }
    }
}
