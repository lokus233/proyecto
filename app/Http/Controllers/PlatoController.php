<?php


namespace App\Http\Controllers;


use App\Models\Plato;
use App\Models\Categoria;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;


class PlatoController extends Controller
{
   public function index()
   {
       Gate::authorize('admin');


       $platos = Plato::with('categoria')->orderBy('nombre')->get();
       return Inertia::render('AdminPlatos', [
           'platos' => $platos,
       ]);
   }


   public function create()
   {
       Gate::authorize('admin');


       $categorias = Categoria::all();
       return Inertia::render('AdminPlatosCreate', [
           'categorias' => $categorias,
       ]);
   }


   public function store(Request $request)
   {
       Gate::authorize('admin');


       $datos = $request->validate([
           'nombre' => ['required', 'string', 'max:255'],
           'descripcion' => ['nullable', 'string'],
           'precio' => ['required', 'numeric', 'min:0'],
           'alergenos' => ['nullable', 'string'],
           'imagen' => ['nullable', 'image', 'max:2048'],
           'categoria_id' => ['required', 'exists:categorias,id'],
       ]);


       if ($request->hasFile('imagen')) {
           $datos['imagen'] = $request->file('imagen')->store('platos', 'public');
       }


       Plato::create($datos);


       return redirect()->route('platos.index')->with('Plato añadido correctamente.');
   }


   public function show(Plato $plato)
   {
       Gate::authorize('admin');


       $plato->load('categoria');
       return Inertia::render('AdminPlatosShow', [
           'plato' => $plato,
       ]);
   }


   public function edit(Plato $plato)
   {
       Gate::authorize('admin');


       $categorias = Categoria::all();
       return Inertia::render('AdminPlatosEdit', [
           'plato' => $plato,
           'categorias' => $categorias,
       ]);
   }


   public function update(Request $request, Plato $plato)
   {
       Gate::authorize('admin');


       $datos = $request->validate([
           'nombre' => ['required', 'string', 'max:255'],
           'descripcion' => ['nullable', 'string'],
           'precio' => ['required', 'numeric', 'min:0'],
           'alergenos' => ['nullable', 'string'],
           'imagen' => ['nullable', 'image', 'max:2048'],
           'categoria_id' => ['required', 'exists:categorias,id'],
       ]);


       if ($request->hasFile('imagen')) {
           $datos['imagen'] = $request->file('imagen')->store('platos', 'public');
       } else {
           unset($datos['imagen']);
       }


       $plato->update($datos);


       return redirect()->route('platos.index')->with('Plato actualizado correctamente.');
   }


   public function destroy(Plato $plato)
   {
       Gate::authorize('admin');


       $plato->delete();
       return redirect()->route('platos.index')->with('Plato eliminado correctamente.');
   }




}
