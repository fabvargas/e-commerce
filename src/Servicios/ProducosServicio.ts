import { Producto } from "../Dominio/Entidades/Producto";
import { IProductoRepository } from "../Dominio/RepoInterface/IProductoRepository";
import { ProductosRepositorio } from "../Infraestructura/supabase/ProductoRepository";

 class ProductosServicio {

    private repositorio: IProductoRepository;

    constructor(repositorio: IProductoRepository) {
        this.repositorio = repositorio;
    }

    async obtenerTodosLosProductos() {
        try {
            const productos = await this.repositorio.obtenerTodos();
            console.log(productos)
            
            const productosValidos = productos.map(prod => {
                return Producto.crear({
                    id: prod.id,
                    nombre: prod.nombre,
                    precio: prod.precio,
                    descripcion: prod.descripcion,
                    stock: prod.stock,
                    imgUrl: prod.imgUrl
                }); 
            });

            return productosValidos;
        }
        catch (error) {
            console.log(error)
            throw new Error("Error al obtener los productos: " + (error as Error).message);
        }
       
    }

    async obtenerProductoPorId(id: number) {
        try {
            const producto = await this.repositorio.obtenerPorId(id);
            if (!producto) {
                return null;
            }

            return Producto.crear({
                id: producto.id,
                nombre: producto.nombre,
                precio: producto.precio,
                descripcion: producto.descripcion,
                stock: producto.stock,
                imgUrl: producto.imgUrl
            });
        } catch (error) {
            throw new Error("Error al obtener el producto: " + (error as Error).message);
        }
    }

    async actualizarStock(id: number, stock: number) {
        try {
            if (stock < 0) {
                throw new Error("El stock no puede ser negativo");
            }

            const productoActualizado = await this.repositorio.actualizarStock(id, stock);
            
            return Producto.crear({
                id: productoActualizado.id,
                nombre: productoActualizado.nombre,
                precio: productoActualizado.precio,
                descripcion: productoActualizado.descripcion,
                stock: productoActualizado.stock,
                imgUrl: productoActualizado.imgUrl
            });
        } catch (error) {
            throw new Error("Error al actualizar el stock: " + (error as Error).message);
        }
    }
}


const productosRepositorio = new ProductosRepositorio();

export const productoServicio = new ProductosServicio( productosRepositorio); 

