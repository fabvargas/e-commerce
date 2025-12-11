export interface ProductoType {
  id: number;
  nombre: string;
  precio: number;
  descripcion: string;
  stock: number;
  imgUrl: string;
}

export interface CarritoItem {
  producto: ProductoType;
  cantidad: number;
}