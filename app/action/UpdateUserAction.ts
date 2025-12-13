"use server";

import { userServicio } from "@/src/Servicios/UserServicio";
import { ValidationError } from "@/src/CustomError";

interface ResponseUpdateUser {
  error: boolean;
  message?: string;
  data?: {
    id: number;
    email: string;
    nombre?: string;
    direccion?: string;
    telefono?: string;
    rol?: string;
  };
}

export default async function UpdateUserAction(
  formData: FormData
): Promise<ResponseUpdateUser> {
  try {
    const id = formData.get("id");
    const nombre = formData.get("nombre");
    const direccion = formData.get("direccion");
    const telefono = formData.get("telefono");

    if (!id) {
      return {
        error: true,
        message: "ID de usuario no proporcionado",
      };
    }

    const datos: { nombre?: string; direccion?: string; telefono?: string } = {};
    
    if (nombre) datos.nombre = nombre.toString();
    if (direccion) datos.direccion = direccion.toString();
    if (telefono) datos.telefono = telefono.toString();

    const usuario = await userServicio.actualizarUsuario(Number(id), datos);

    return {
      error: false,
      message: "Usuario actualizado correctamente",
      data: {
        id: usuario.id,
        email: usuario.email,
        nombre: usuario.nombre,
        direccion: usuario.direccion,
        telefono: usuario.telefono,
        rol: usuario.rol,
      },
    };
  } catch (error) {
    if (error instanceof ValidationError) {
      return {
        error: true,
        message: error.message,
      };
    }

    return {
      error: true,
      message: "Error inesperado al actualizar el usuario",
    };
  }
}

