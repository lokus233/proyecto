<?php
namespace App\Http\Controllers;


use App\Models\Pedido;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;


class PedidoController extends Controller
{
   public function index(Request $request)
{
   Gate::authorize('admin');


   $query = Pedido::with(['usuario', 'platos'])->orderBy('created_at', 'desc');


   if ($request->filled('fecha_desde')) {
       $query->whereDate('created_at', '>=', $request->fecha_desde);
   }


   if ($request->filled('fecha_hasta')) {
       $query->whereDate('created_at', '<=', $request->fecha_hasta);
   }


   if ($request->filled('user_id')) {
       $query->where('user_id', $request->user_id);
   }


   $pedidos = $query->get();


   $usuarios = \App\Models\User::select('id', 'nombre', 'apellidos')->orderBy('nombre')->get();


   return Inertia::render('AdminPedidos', [
       'pedidos' => $pedidos,
       'usuarios' => $usuarios,
       'filtros' => $request->only(['fecha_desde', 'fecha_hasta', 'user_id']),
   ]);
}


   public function store(Request $request)
   {
       $datos = $request->validate([
           'platos' => ['required', 'array'],
           'platos.*.id' => ['required', 'exists:platos,id'],
           'platos.*.cantidad' => ['required', 'integer', 'min:1'],
           'platos.*.precio' => ['required', 'numeric'],
           'precio_total' => ['required', 'numeric'],
       ]);


       $pedido = Pedido::create([
           'user_id' => Auth::id(),
           'precio_total' => $datos['precio_total'],
           'estado' => 'pendiente',
       ]);


       foreach ($datos['platos'] as $plato) {
           $pedido->platos()->attach($plato['id'], [
               'cantidad' => $plato['cantidad'],
           ]);
       }


       return redirect()->route('pedidos.mis')->with('Pedido realizado correctamente.');
   }


   public function update(Request $request, Pedido $pedido)
   {
       Gate::authorize('admin');
       $pedido->update(['estado' => $request->estado]);
       return redirect()->route('pedidos.index');
   }


   public function destroy(Pedido $pedido)
   {
       Gate::authorize('admin');
       $pedido->delete();
       return redirect()->route('pedidos.index');
   }


   public function misPedidos()
   {
       $pedidos = Pedido::with('platos')
           ->where('user_id', Auth::id())
           ->orderBy('created_at', 'desc')
           ->get();


       return Inertia::render('UsuarioPedido', [
           'pedidos' => $pedidos,
       ]);
   }
}


