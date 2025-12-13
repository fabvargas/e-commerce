"use server";

import { userServicio } from "@/src/Servicios/UserServicio";

interface ResponseGetUser {
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

export default async function GetUserAction(
  userId: number
): Promise<ResponseGetUser> {
  try {
    const usuario = await userServicio.obtenerUsuarioPorId(userId);

    if (!usuario) {
      return {
        error: true,
        message: "Usuario no encontrado",
      };
    }

    return {
      error: false,
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
    return {
      error: true,
      message: "Error inesperado al obtener el usuario",
    };
  }
}

