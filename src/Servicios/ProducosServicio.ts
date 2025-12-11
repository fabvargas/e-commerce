import { Producto } from "../Dominio/Entidades/Producto";
import { IProductoRepository } from "../Dominio/RepoInterface/IProductoRepository";
import { ProductosRepositorio } from "../Infraestructura/MockProductos";

 class ProductosServicio {

    private repositorio: IProductoRepository;

    constructor(repositorio: IProductoRepository) {
        this.repositorio = repositorio;
    }

    async obtenerTodosLosProductos() {
        try {
            const productos = await this.repositorio.obtenerTodos();
            
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
}


const productosRepositorio = new ProductosRepositorio();

export const productoServicio = new ProductosServicio( productosRepositorio); 

