<?php
namespace App\Http\Controllers;


use App\Models\Categoria;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;


class CategoriaController extends Controller
{
   public function index()
   {


       $categorias = Categoria::where('activo', true)->with([
           'platos' => function ($query) {
               $query->orderBy('nombre');
           }
       ])->get();


       return Inertia::render('carta', [
           'categorias' => $categorias,
       ]);
   }




   public function create()
   {
       Gate::authorize('admin');


       return Inertia::render('AdminCategoriasCreate');
   }


   public function store(Request $request)
   {
       Gate::authorize('admin');


       $datosCateg = $request->validate([
           'nombre' => ['required', 'string', 'max:255'],
           'descripcion' => ['nullable', 'string'],
           'imagen' => ['nullable', 'image', 'max:2048'],
       ]);


       if ($request->hasFile('imagen')) {
           $datosCateg['imagen'] = $request->file('imagen')->store('categorias', 'public');
       }


       Categoria::create($datosCateg);


       return redirect()->route('categorias.admin')->with('success', 'Categoría creada correctamente.');
   }
   public function edit(Categoria $categoria)
   {
       Gate::authorize('admin');


       return Inertia::render('AdminCategoriasEdit', [
           'categoria' => $categoria,
       ]);
   }


   public function update(Request $request, Categoria $categoria)
   {
       Gate::authorize('admin');


       $datos = $request->validate([
           'nombre' => ['required', 'string', 'max:255'],
           'descripcion' => ['nullable', 'string'],
           'imagen' => ['nullable', 'image', 'max:2048'],
       ]);


       if ($request->hasFile('imagen')) {
           $datos['imagen'] = $request->file('imagen')->store('categorias', 'public');
       } else {
           unset($datos['imagen']);
       }


       $categoria->update($datos);


       return redirect()->route('categorias.admin')->with('success', 'Categoría actualizada correctamente.');
   }


   public function destroy(Categoria $categoria)
   {
       Gate::authorize('admin');


       $categoria->delete();
       return redirect()->route('categorias.admin')->with('success', 'Categoría eliminada correctamente.');
   }


   public function adminIndex()
   {
       Gate::authorize('admin');


       $categorias = Categoria::orderBy('nombre')->get();
       return Inertia::render('AdminCategorias', [
           'categorias' => $categorias,
       ]);
   }


   public function cambiarActivoOculto(Categoria $categoria)
   {
       Gate::authorize('admin');


       $categoria->update(['activo' => !$categoria->activo]);
       return redirect()->route('categorias.admin');
   }


}
