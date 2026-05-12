<?php


namespace App\Http\Controllers;


use App\Models\User;
use App\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;


class UsuarioController extends Controller
{
   public function index()
   {
       Gate::authorize('admin');


       $usuarios = User::with('roles')->orderBy('nombre')->get();
       return Inertia::render('AdminUsuarios', [
           'usuarios' => $usuarios,
       ]);
   }


   public function create()
   {
       //
   }


   public function store(Request $request)
   {
       //
   }


   public function show(User $usuario)
   {
       //
   }


   public function edit(User $usuario)
   {
       Gate::authorize('admin');


       $usuario->load('roles');
       $roles = Role::all();
       return Inertia::render('AdminUsuariosEdit', [
           'usuario' => $usuario,
           'roles' => $roles,
       ]);
   }


   public function update(Request $request, User $usuario)
   {
       Gate::authorize('admin');


       $datos = $request->validate([
           'nombre' => ['required', 'string', 'max:255'],
           'apellidos' => ['required', 'string', 'max:255'],
           'email' => ['required', 'email', 'unique:users,email,' . $usuario->id],
           'telefono' => ['nullable', 'string', 'max:20'],
       ]);


       $usuario->update($datos);


       if ($request->has('roles')) {
           $usuario->roles()->sync($request->roles);
       }


       return redirect()->route('usuarios.index')->with('success', 'Usuario actualizado correctamente.');
   }


   public function toggleActivo(User $usuario)
   {
       Gate::authorize('admin');


       $usuario->update(['activo' => !$usuario->activo]);
       return redirect()->route('usuarios.index');
   }


   public function destroy(User $usuario)
   {
       Gate::authorize('admin');
       $usuario->delete();
       return redirect()->route('usuarios.index')->with('success', 'Usuario eliminado correctamente.');
   }
}
