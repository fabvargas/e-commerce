"use server";

import { userServicio } from "@/src/Servicios/UserServicio";
import { ValidationError } from "@/src/CustomError";

interface ResponseRegister {
  error: boolean;
  message?: string;
}

export default async function RegisterAction(
  formData: FormData
): Promise<ResponseRegister> {
  try {
    const email = formData.get("email");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");

    // Validación básica
    if (!email || !password || !confirmPassword) {
      return {
        error: true,
        message: "Debe completar todos los campos",
      };
    }

    if (password.toString().length < 4) {
      return {
        error: true,
        message: "La contraseña debe tener al menos 4 caracteres",
      };
    }

   await userServicio.registrarUsuario(
      email.toString(),
      password.toString(),
      confirmPassword.toString()
    );

    return {
      error: false,
      message: "Usuario registrado correctamente",
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
      message: "Error inesperado al registrar usuario" 
    };
  }
}
