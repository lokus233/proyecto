<?php

use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;


Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});

Route::get('/', function () {return inertia('Home');
});

require __DIR__.'/settings.php';


/*
Route::inertia('/', 'welcome', [
    'canRegister' => Features::enabled(Features::registration()),
])->name('home');
*/
