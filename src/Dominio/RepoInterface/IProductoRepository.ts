import { ProductoProps } from "../Entidades/Producto";

export interface IProductoRepository {
    obtenerTodos(): Promise<ProductoProps[]>;
    obtenerPorId(id: number): Promise<ProductoProps | null>;
}