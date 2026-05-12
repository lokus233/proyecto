<?php
namespace App\Http\Controllers;


use App\Models\Pedido;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;


class PedidoController extends Controller
{
   public function index()
   {
       Gate::authorize('admin');
       $pedidos = Pedido::with(['usuario', 'platos'])->orderBy('created_at', 'desc')->get();
       return Inertia::render('AdminPedidos', [
           'pedidos' => $pedidos,
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


       return redirect()->route('carrito')->with('success', 'Pedido realizado correctamente.');
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
}
