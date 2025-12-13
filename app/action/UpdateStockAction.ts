"use server";

import { productoServicio } from "@/src/Servicios/ProducosServicio";

interface ResponseUpdateStock {
  error: boolean;
  message?: string;
  data?: {
    id: number;
    nombre: string;
    stock: number;
  };
}

export default async function UpdateStockAction(
  formData: FormData
): Promise<ResponseUpdateStock> {
  try {
    const id = formData.get("id");
    const stock = formData.get("stock");

    if (!id || !stock) {
      return {
        error: true,
        message: "ID y stock son requeridos",
      };
    }

    const stockNumber = parseInt(stock.toString());
    
    if (isNaN(stockNumber) || stockNumber < 0) {
      return {
        error: true,
        message: "El stock debe ser un número válido mayor o igual a 0",
      };
    }

    const producto = await productoServicio.actualizarStock(Number(id), stockNumber);

    return {
      error: false,
      message: "Stock actualizado correctamente",
      data: {
        id: producto.id,
        nombre: producto.nombre,
        stock: producto.stock,
      },
    };
  } catch (error) {
    return {
      error: true,
      message: "Error inesperado al actualizar el stock: " + (error as Error).message,
    };
  }
}

