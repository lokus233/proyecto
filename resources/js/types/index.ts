export * from './auth';
export * from './navigation';
export * from './ui';


export interface Categoria {
     id: number;
   nombre: string;
   descripcion: string;
   platos: Plato[];
}


export interface Plato {
   id: number;
   nombre: string;
   descripcion: string;
   precio: number;
   alergenos: string;
   imagen: string;
}


// 🛒 ESTE ES EL IMPORTANTE PARA EL CARRITO
export interface PlatoCarrito extends Plato {
   cantidad: number;
}
