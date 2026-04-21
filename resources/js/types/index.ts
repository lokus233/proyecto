export type * from './auth';
export type * from './navigation';
export type * from './ui';
export interface Categoria{
    nombre:string,
    descripcion:string,
    platos:Plato[],
 }

 export interface Plato{
    id:number,
    nombre:string,
    descripcion:string,
    precio:number,
    alergenos:string,
    imagen:string,
 }
