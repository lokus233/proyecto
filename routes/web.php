<?php

use App\Http\Controllers\CategoriaController;
use App\Models\Categoria;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('Home', [
        'canRegister' => Features::enabled(Features::registration()),
        'mensaje' => '¡Bienvenidos a El Candelabro!',
        'usuario' => auth()->user()
    ]);
})->name('home');
Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});


Route::get('/carta', [CategoriaController::class, 'index']);
require __DIR__.'/settings.php';
