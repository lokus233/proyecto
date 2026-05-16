import { createContext, useContext, useState } from 'react';
import { Plato, PlatoCarrito } from '@/types';


interface CarritoContextType {
   carrito: PlatoCarrito[];
   agregarAlCarrito: (plato: Plato) => void;
   quitarDelCarrito: (id: number) => void;
   cambiarCantidad: (id: number, cantidad: number) => void;
   vaciarCarrito: () => void;
}


const CarritoContext = createContext<CarritoContextType | null>(null);


export function CarritoProvider({ children }: { children: React.ReactNode }) {
   const [carrito, setCarrito] = useState<PlatoCarrito[]>([]);


   const agregarAlCarrito = (plato: Plato) => {
       setCarrito(prev => {
           const existe = prev.find(p => p.id === plato.id);
           if (existe) {
               return prev.map(p =>
                   p.id === plato.id
                       ? { ...p, cantidad: p.cantidad + 1 }
                       : p
               );
           }
           return [...prev, { ...plato, cantidad: 1 }];
       });
   };


   const quitarDelCarrito = (id: number) => {
       setCarrito(prev => prev.filter(p => p.id !== id));
   };


   const cambiarCantidad = (id: number, cantidad: number) => {
       if (cantidad < 1) {
           quitarDelCarrito(id);
           return;
       }
       setCarrito(prev =>
           prev.map(p =>
               p.id === id ? { ...p, cantidad } : p
           )
       );
   };


   const vaciarCarrito = () => {
       setCarrito([]);
   };


   return (
       <CarritoContext.Provider value={{ carrito, agregarAlCarrito, quitarDelCarrito, cambiarCantidad, vaciarCarrito }}>
           {children}
       </CarritoContext.Provider>
   );
}


export function useCarrito() {
   const context = useContext(CarritoContext);
   if (!context) throw new Error('useCarrito debe usarse dentro de CarritoProvider');
   return context;
}



