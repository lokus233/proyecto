<?php
use App\Http\Controllers\CategoriaController;
use App\Http\Controllers\PedidoController;
use App\Http\Controllers\PlatoController;
use App\Http\Controllers\UsuarioController;
use App\Models\Categoria;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;


Route::get('/', function () {
   return Inertia::render('Home', [
       'canRegister' => Features::enabled(Features::registration()),
       'mensaje' => '¡Bienvenidos a El Candelabro!',
   ]);
})->name('home');


Route::get('/carta', [CategoriaController::class, 'index']);


Route::get('/login', function () {
   return Inertia::render('auth/login', [
       'Registro' => 'true',
       'ResetContraseña' => 'false'
   ]);
})->name('login');


Route::post('/login', function (Request $request) {
   $datosCuenta = $request->validate([
       'email' => ['required', 'email'],
       'password' => ['required'],
   ]);
   if (Auth::attempt($datosCuenta)) {
       $request->session()->regenerate();
       return redirect()->intended('/');
   }
   return back()->withErrors([
       'email' => 'Ese email o contraseña no son correctos.',
   ])->onlyInput('email');
});


Route::post('/logout', function (Request $request) {
   Auth::logout();
   $request->session()->invalidate();
   $request->session()->regenerateToken();
   return redirect('/');
})->name('logout');


Route::get('/register', function () {
   return Inertia::render('auth/register');
})->name('register');


Route::post('/register', function (Request $request) {
   $datosRegistro = $request->validate([
       'nombre' => ['required', 'string', 'max:255'],
       'apellidos' => ['required', 'string', 'max:255'],
       'email' => ['required', 'email', 'unique:users'],
       'telefono' => ['nullable', 'string', 'max:20'],
       'password' => ['required', 'confirmed', 'min:8'],
   ]);
   $usuario = \App\Models\User::create([
       'nombre' => $datosRegistro['nombre'],
       'apellidos' => $datosRegistro['apellidos'],
       'email' => $datosRegistro['email'],
       'telefono' => $datosRegistro['telefono'] ?? null,
       'password' => bcrypt($datosRegistro['password']),
   ]);
   Auth::login($usuario);
   return redirect('/');
});


Route::get('/bodega', function () {
   return Inertia::render('Bodega');
})->name('bodega');


Route::middleware(['auth'])->group(function () {
   Route::resource('platos', PlatoController::class);
   Route::resource('categorias', CategoriaController::class)->except(['index']);
   Route::get('/adminCategorias', [CategoriaController::class, 'adminIndex'])->name('categorias.admin');
   Route::put('/categorias/{categoria}/toggle', [CategoriaController::class, 'cambiarActivoOculto'])->name('categorias.toggle');
   Route::resource('usuarios', UsuarioController::class);
   Route::put('/platos/{plato}/toggle', [PlatoController::class, 'toggleActivo'])->name('platos.toggle');
   Route::put('/usuarios/{usuario}/toggle', [UsuarioController::class, 'toggleActivo'])->name('adminUsuarios.toggle');
   Route::get('/carrito', function () {
       return Inertia::render('carrito');
   })->name('carrito');
   Route::resource('pedidos', PedidoController::class)->only(['store', 'update', 'destroy']);
   Route::get('/adminPedidos', [PedidoController::class, 'index'])->name('pedidos.index');
   Route::get('/mis-pedidos', [PedidoController::class, 'misPedidos'])->name('pedidos.mis');
});


require __DIR__ . '/settings.php';



