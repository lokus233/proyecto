<?php

namespace App\Http\Controllers;

use App\Models\Plato;
use App\Models\Categoria;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PlatoController extends Controller
{
    public function index()
    {
        $platos = Plato::with('categoria')->get();
        return Inertia::render('AdminPlatos', [
            'platos' => $platos,
        ]);
    }

    public function create()
    {
        $categorias = Categoria::all();
        return Inertia::render('AdminPlatosCreate', [
            'categorias' => $categorias,
        ]);
    }

    public function store(Request $request)
    {
        $datos = $request->validate([
            'nombre'       => ['required', 'string', 'max:255'],
            'descripcion'  => ['nullable', 'string'],
            'precio'       => ['required', 'numeric', 'min:0'],
            'alergenos'    => ['nullable', 'string'],
            'imagen'       => ['nullable', 'image', 'max:2048'],
            'categoria_id' => ['required', 'exists:categorias,id'],
        ]);

        if ($request->hasFile('imagen')) {
            $datos['imagen'] = $request->file('imagen')->store('platos', 'public');
        }

        Plato::create($datos);

        return redirect()->route('platos.index')->with('success', 'Plato añadido correctamente.');
    }

    public function show(Plato $plato)
    {
        $plato->load('categoria');
        return Inertia::render('AdminPlatosShow', [
            'plato' => $plato,
        ]);
    }

    public function edit(Plato $plato)
    {
        $categorias = Categoria::all();
        return Inertia::render('AdminPlatosEdit', [
            'plato'      => $plato,
            'categorias' => $categorias,
        ]);
    }

    public function update(Request $request, Plato $plato)
    {
        $datos = $request->validate([
            'nombre'       => ['required', 'string', 'max:255'],
            'descripcion'  => ['nullable', 'string'],
            'precio'       => ['required', 'numeric', 'min:0'],
            'alergenos'    => ['nullable', 'string'],
            'imagen'       => ['nullable', 'image', 'max:2048'],
            'categoria_id' => ['required', 'exists:categorias,id'],
        ]);

        if ($request->hasFile('imagen')) {
            $datos['imagen'] = $request->file('imagen')->store('platos', 'public');
        } else {
            unset($datos['imagen']);
        }

        $plato->update($datos);

        return redirect()->route('platos.index')->with('success', 'Plato actualizado correctamente.');
    }

    public function destroy(Plato $plato)
    {
        $plato->delete();
        return redirect()->route('platos.index')->with('success', 'Plato eliminado correctamente.');
    }
}
