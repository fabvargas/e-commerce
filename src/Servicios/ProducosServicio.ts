import { Producto } from "../Dominio/Entidades/Producto";
import { IProductoRepository } from "../Dominio/RepoInterface/IProductoRepository";

export class ProductosServicio {

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
                    imgUrl: prod.imgUrl
                }); 
            });

            return productosValidos;
        }
        catch (error) {
            throw new Error("Error al obtener los productos: " + (error as Error).message);
        }
       
    }
}