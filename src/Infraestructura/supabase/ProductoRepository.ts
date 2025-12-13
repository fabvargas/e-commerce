import { supabase } from "@/lib/SupabaseClient";
import { ProductoProps } from "@/src/Dominio/Entidades/Producto";
import { IProductoRepository } from "@/src/Dominio/RepoInterface/IProductoRepository";

export class ProductosRepositorio implements IProductoRepository {

  db = supabase;

  async obtenerTodos(): Promise<ProductoProps[]> {
    try {
      const { data, error } = await this.db
        .from("Producto")
        .select("*");
        console.log(data)

      if (error) {
        console.error("Supabase error al obtener productos:", error);
        return [];
      }

      if (!data) {
        console.error("Supabase devolvió data = null o undefined.");
        return [];
      }

      return data.map(item => ({
        id: item.id,
        nombre: item.nombre,
        precio: item.precio,
        descripcion: item.descripcion,
        stock: item.stock,
        imgUrl: item.imagenUrl  
      }));

    } catch (err) {
      console.error("Error inesperado en obtenerTodos():", err);
      return [];
    }
  }


  async obtenerPorId(id: number) {
    const { data, error } = await this.db
      .from("Producto")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error(`Error fetching product with id ${id}:`, error);
      return null;
    }

   
    return {
      id: data.id,
      nombre: data.nombre,
      precio: data.precio,
      descripcion: data.descripcion,
      stock: data.stock,
      imgUrl: data.imagenUrl
    };
  }

  async actualizarStock(id: number, stock: number): Promise<ProductoProps> {
    try {
      const { data, error } = await this.db
        .from("Producto")
        .update({ stock })
        .eq("id", id)
        .select()
        .single();

      if (error) {
        console.error(`Error updating stock for product ${id}:`, error);
        throw new Error("Error al actualizar el stock: " + error.message);
      }

      return {
        id: data.id,
        nombre: data.nombre,
        precio: data.precio,
        descripcion: data.descripcion,
        stock: data.stock,
        imgUrl: data.imagenUrl
      };
    } catch (err) {
      console.error("Error inesperado en actualizarStock():", err);
      throw err;
    }
  }
}
