<?php

use App\Http\Controllers\CategoriaController;
use App\Http\Controllers\PlatoController;
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
Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});


Route::get('/carta', [CategoriaController::class, 'index']);

Route::get('/login', function () {
    return Inertia::render('auth/login',[
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
        'nombre'   => ['required', 'string', 'max:255'],
        'apellidos'=> ['required', 'string', 'max:255'],
        'email'    => ['required', 'email', 'unique:usuarios'],
        'telefono' => ['nullable', 'string', 'max:20'],
        'password' => ['required', 'confirmed', 'min:8'],
    ]);

    $usuario = \App\Models\User::create([
        'nombre'    => $datosRegistro['nombre'],
        'apellidos' => $datosRegistro['apellidos'],
        'email'     => $datosRegistro['email'],
        'telefono'  => $datosRegistro['telefono'] ?? null,
        'password'  => bcrypt($datosRegistro['password']),
    ]);

    Auth::login($usuario);

    return redirect('/');
});

Route::middleware(['auth'])->group(function () {
    Route::resource('platos', PlatoController::class);
});

require __DIR__ . '/settings.php';
