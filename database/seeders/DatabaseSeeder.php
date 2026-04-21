<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Categoria;
use App\Models\Plato;
use App\Models\Role;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // 1. LIMPIEZA RADICAL PARA POSTGRESQL
        // Borra todo, resetea IDs a 1 y elimina en cascada las relaciones
        DB::statement('TRUNCATE TABLE platos RESTART IDENTITY CASCADE;');
        DB::statement('TRUNCATE TABLE categorias RESTART IDENTITY CASCADE;');

        // 2. ROLES (Evitamos duplicados)
        $adminRole = Role::updateOrCreate(['nombre' => 'admin']);
        Role::updateOrCreate(['nombre' => 'cliente']);

        // 3. USUARIO ADMINISTRADOR
        $admin = User::updateOrCreate(
            ['email' => 'admin@proyecto.com'],
            [
                'nombre' => 'Admin Proyecto',
                'apellidos' => 'Lama',
                'telefono' => '600000000',
                'password' => Hash::make('admin123'),
            ]
        );
        $admin->roles()->sync([$adminRole->id]);

        // 4. EL MENÚ COMPLETO (5 Categorías x 10 Platos)
        $menu = [
            'Entrantes' => [
                'desc' => 'Para picar y compartir',
                'items' => [
                    ['nombre' => 'Nachos Supremos', 'descripcion' => 'Con guacamole, jalapeños y crema agria', 'precio' => 9.50, 'alergenos' => 'Lácteos', 'imagen' => 'nachos.jpg'],
                    ['nombre' => 'Croquetas de Jamón', 'descripcion' => 'Receta de la abuela (8 uds)', 'precio' => 10.00, 'alergenos' => 'Gluten, Lácteos', 'imagen' => 'croquetas.jpg'],
                    ['nombre' => 'Tequeños Venezolanos', 'descripcion' => 'Palitos de queso fritos con salsa de ajo', 'precio' => 8.50, 'alergenos' => 'Gluten, Lácteos', 'imagen' => 'tequenos.jpg'],
                    ['nombre' => 'Alitas Bourbon', 'descripcion' => 'Alitas marinadas con salsa barbacoa dulce', 'precio' => 11.00, 'alergenos' => 'Ninguno', 'imagen' => 'alitas.jpg'],
                    ['nombre' => 'Patatas Bravas', 'descripcion' => 'Con nuestra salsa secreta picante', 'precio' => 6.50, 'alergenos' => 'Huevo', 'imagen' => 'bravas.jpg'],
                    ['nombre' => 'Calamares a la Romana', 'descripcion' => 'Anillos de calamar fresco rebozado', 'precio' => 12.00, 'alergenos' => 'Gluten, Moluscos', 'imagen' => 'calamares.jpg'],
                    ['nombre' => 'Ensaladilla Rusa', 'descripcion' => 'Clásica con atún y ventresca', 'precio' => 7.50, 'alergenos' => 'Huevo, Pescado', 'imagen' => 'ensaladilla.jpg'],
                    ['nombre' => 'Provolone al Horno', 'descripcion' => 'Queso fundido con orégano y tomate', 'precio' => 9.00, 'alergenos' => 'Lácteos', 'imagen' => 'provolone.jpg'],
                    ['nombre' => 'Hummus de Garbanzo', 'descripcion' => 'Con pan de pita artesanal', 'precio' => 7.00, 'alergenos' => 'Sésamo, Gluten', 'imagen' => 'hummus.jpg'],
                    ['nombre' => 'Gambas al Ajillo', 'descripcion' => 'Con aceite de oliva virgen y guindilla', 'precio' => 14.00, 'alergenos' => 'Crustáceos', 'imagen' => 'gambas.jpg'],
                ]
            ],
            'Hamburguesas' => [
                'desc' => 'Carne 100% vacuno madurado',
                'items' => [
                    ['nombre' => 'Classic Burger', 'descripcion' => 'Lechuga, tomate, cebolla y queso cheddar', 'precio' => 10.50, 'alergenos' => 'Gluten, Lácteos', 'imagen' => 'classic.jpg'],
                    ['nombre' => 'Bacon Cheeseburger', 'descripcion' => 'Mucho bacon crujiente y doble de queso', 'precio' => 12.50, 'alergenos' => 'Gluten, Lácteos', 'imagen' => 'bacon.jpg'],
                    ['nombre' => 'Burger Trufada', 'descripcion' => 'Crema de trufa, setas y huevo poché', 'precio' => 15.00, 'alergenos' => 'Gluten, Huevo', 'imagen' => 'trufada.jpg'],
                    ['nombre' => 'La Cabra', 'descripcion' => 'Queso de cabra y cebolla caramelizada', 'precio' => 13.50, 'alergenos' => 'Gluten, Lácteos', 'imagen' => 'cabra.jpg'],
                    ['nombre' => 'Veggie Boom', 'descripcion' => 'Hamburguesa de lentejas y quinoa', 'precio' => 11.50, 'alergenos' => 'Gluten', 'imagen' => 'veggie.jpg'],
                    ['nombre' => 'BBQ Especial', 'descripcion' => 'Aros de cebolla y salsa barbacoa', 'precio' => 13.00, 'alergenos' => 'Gluten', 'imagen' => 'bbq.jpg'],
                    ['nombre' => 'Burger Picante', 'descripcion' => 'Sriracha, jalapeños y queso pepper jack', 'precio' => 12.50, 'alergenos' => 'Gluten, Lácteos', 'imagen' => 'picante.jpg'],
                    ['nombre' => 'Chicken Crispy', 'descripcion' => 'Pollo rebozado en cereales y mayonesa', 'precio' => 11.00, 'alergenos' => 'Gluten, Huevo', 'imagen' => 'chicken.jpg'],
                    ['nombre' => 'Blue Cheese', 'descripcion' => 'Con queso azul y nueces', 'precio' => 14.00, 'alergenos' => 'Gluten, Lácteos, Frutos secos', 'imagen' => 'blue.jpg'],
                    ['nombre' => 'Double Smash', 'descripcion' => 'Dos carnes finas y extra de queso', 'precio' => 14.50, 'alergenos' => 'Gluten, Lácteos', 'imagen' => 'smash.jpg'],
                ]
            ],
            'Pescados' => [
                'desc' => 'Frescos del día',
                'items' => [
                    ['nombre' => 'Salmón Teriyaki', 'descripcion' => 'A la plancha con sésamo y arroz', 'precio' => 16.50, 'alergenos' => 'Pescado, Soja', 'imagen' => 'salmon.jpg'],
                    ['nombre' => 'Bacalao Confitado', 'descripcion' => 'Sobre cama de pisto manchego', 'precio' => 18.00, 'alergenos' => 'Pescado', 'imagen' => 'bacalao.jpg'],
                    ['nombre' => 'Lubina a la Espalda', 'descripcion' => 'Con refrito de ajos y guindilla', 'precio' => 19.50, 'alergenos' => 'Pescado', 'imagen' => 'lubina.jpg'],
                    ['nombre' => 'Atún Rojo Grill', 'descripcion' => 'Marcado a fuego con algas wakame', 'precio' => 22.00, 'alergenos' => 'Pescado', 'imagen' => 'atun.jpg'],
                    ['nombre' => 'Pata de Pulpo', 'descripcion' => 'A la brasa con puré de patata trufado', 'precio' => 21.00, 'alergenos' => 'Moluscos', 'imagen' => 'pulpo.jpg'],
                    ['nombre' => 'Merluza al Pincho', 'descripcion' => 'Al vapor con salsa verde y almejas', 'precio' => 17.50, 'alergenos' => 'Pescado, Moluscos', 'imagen' => 'merluza.jpg'],
                    ['nombre' => 'Dorada a la Sal', 'descripcion' => 'Pieza entera cocinada a la sal', 'precio' => 18.50, 'alergenos' => 'Pescado', 'imagen' => 'dorada.jpg'],
                    ['nombre' => 'Fish & Chips', 'descripcion' => 'Bacalao rebozado con patatas fritas', 'precio' => 14.00, 'alergenos' => 'Pescado, Gluten', 'imagen' => 'fishchips.jpg'],
                    ['nombre' => 'Tartar de Atún', 'descripcion' => 'Con aguacate y un toque cítrico', 'precio' => 19.00, 'alergenos' => 'Pescado', 'imagen' => 'tartar.jpg'],
                    ['nombre' => 'Ceviche Clásico', 'descripcion' => 'Corvina marinada en lima y cilantro', 'precio' => 16.00, 'alergenos' => 'Pescado', 'imagen' => 'ceviche.jpg'],
                ]
            ],
            'Carnes' => [
                'desc' => 'Cortes premium a la brasa',
                'items' => [
                    ['nombre' => 'Entrecot de Ternera', 'descripcion' => '350g de carne de buey con patatas', 'precio' => 21.00, 'alergenos' => 'Ninguno', 'imagen' => 'entrecot.jpg'],
                    ['nombre' => 'Chuletón Madurado', 'descripcion' => '1kg de carne (mínimo 2 personas)', 'precio' => 45.00, 'alergenos' => 'Ninguno', 'imagen' => 'chuleton.jpg'],
                    ['nombre' => 'Solomillo al Whisky', 'descripcion' => 'Clásico sevillano con patatas', 'precio' => 16.50, 'alergenos' => 'Gluten', 'imagen' => 'solomillo.jpg'],
                    ['nombre' => 'Costillar BBQ', 'descripcion' => 'Costillas de cerdo cocinadas 12 horas', 'precio' => 18.00, 'alergenos' => 'Ninguno', 'imagen' => 'ribs.jpg'],
                    ['nombre' => 'Presa Ibérica', 'descripcion' => 'Con escamas de sal y pimientos de padrón', 'precio' => 19.00, 'alergenos' => 'Ninguno', 'imagen' => 'presa.jpg'],
                    ['nombre' => 'Cachopo Asturiano', 'descripcion' => 'Relleno de jamón y queso de los Beyos', 'precio' => 22.00, 'alergenos' => 'Gluten, Lácteos, Huevo', 'imagen' => 'cachopo.jpg'],
                    ['nombre' => 'Secreto Ibérico', 'descripcion' => 'A la parrilla con chimichurri', 'precio' => 17.00, 'alergenos' => 'Ninguno', 'imagen' => 'secreto.jpg'],
                    ['nombre' => 'Cordero Lechal', 'descripcion' => 'Chuletas de cordero a la brasa', 'precio' => 20.00, 'alergenos' => 'Ninguno', 'imagen' => 'cordero.jpg'],
                    ['nombre' => 'Pechuga de Pollo', 'descripcion' => 'A la crema de champiñones', 'precio' => 13.50, 'alergenos' => 'Lácteos', 'imagen' => 'pollo.jpg'],
                    ['nombre' => 'Carpaccio de Buey', 'descripcion' => 'Con lascas de parmesano y rúcula', 'precio' => 15.00, 'alergenos' => 'Lácteos', 'imagen' => 'carpaccio.jpg'],
                ]
            ],
            'Pizzas' => [
                'desc' => 'Masa artesanal de larga fermentación',
                'items' => [
                    ['nombre' => 'Pizza Margherita', 'descripcion' => 'Tomate, mozzarella fresca y albahaca', 'precio' => 10.00, 'alergenos' => 'Gluten, Lácteos', 'imagen' => 'margherita.jpg'],
                    ['nombre' => 'Pepperoni Lover', 'descripcion' => 'Doble ración de pepperoni picante', 'precio' => 12.00, 'alergenos' => 'Gluten, Lácteos', 'imagen' => 'pepperoni.jpg'],
                    ['nombre' => 'Cuatro Quesos', 'descripcion' => 'Mozzarella, gorgonzola, parmesano y emmental', 'precio' => 13.00, 'alergenos' => 'Gluten, Lácteos', 'imagen' => 'quesos.jpg'],
                    ['nombre' => 'Carbonara Auténtica', 'descripcion' => 'Base de crema, guanciale y huevo', 'precio' => 12.50, 'alergenos' => 'Gluten, Lácteos, Huevo', 'imagen' => 'carbonara.jpg'],
                    ['nombre' => 'BBQ Chicken Pizza', 'descripcion' => 'Pollo, bacon, cebolla y salsa barbacoa', 'precio' => 13.50, 'alergenos' => 'Gluten, Lácteos', 'imagen' => 'pizzabbq.jpg'],
                    ['nombre' => 'Pizza Vegetariana', 'descripcion' => 'Pimientos, calabacín, cebolla y aceitunas', 'precio' => 11.50, 'alergenos' => 'Gluten, Lácteos', 'imagen' => 'pizzaveggie.jpg'],
                    ['nombre' => 'Prosciutto e Funghi', 'descripcion' => 'Jamón cocido y champiñones frescos', 'precio' => 11.00, 'alergenos' => 'Gluten, Lácteos', 'imagen' => 'funghi.jpg'],
                    ['nombre' => 'Pizza Hawaiana', 'descripcion' => 'Piña y jamón (la polémica)', 'precio' => 11.50, 'alergenos' => 'Gluten, Lácteos', 'imagen' => 'hawaiana.jpg'],
                    ['nombre' => 'Marinera', 'descripcion' => 'Gambas, mejillones y un toque de ajo', 'precio' => 14.50, 'alergenos' => 'Gluten, Crustáceos, Moluscos', 'imagen' => 'marinera.jpg'],
                    ['nombre' => 'Pizza Calzone', 'descripcion' => 'Pizza cerrada rellena de todo un poco', 'precio' => 13.00, 'alergenos' => 'Gluten, Lácteos', 'imagen' => 'calzone.jpg'],
                ]
            ],
        ];

        // 5. INSERCIÓN DE DATOS
        foreach ($menu as $nombreCat => $datos) {
            $categoria = Categoria::create([
                'nombre' => $nombreCat,
                'descripcion' => $datos['desc'],
            ]);

            foreach ($datos['items'] as $platoData) {
                $categoria->platos()->create($platoData);
            }
        }
    }
}
