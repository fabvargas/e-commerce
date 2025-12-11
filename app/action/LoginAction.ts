"use server";

import { userServicio } from "@/src/Servicios/UserServicio";
import { ValidationError } from "@/src/CustomError";


interface ResponseLogin {
    data?: {
        id: number;
        email: string;
    };
    error: boolean;
    message?: string;
}

export default async function LoginAction(formData: FormData): Promise<ResponseLogin> {
    try {
        const email = formData.get("email")
        const password = formData.get("password")

        // Validación inicial básica
        if (!email || !password) {
            return {
                error: true,
                message: "Debe completar todos los campos"
            };
        }
            console.log(email,password)

        // Buscar usuario
        const user = await userServicio.obtenerUsuarioPorEmail(email.toString()); 
        

        if (!user) {
            return {
                error: true,
                message: "Usuario no encontrado"
            };
        }

        // Validación de correo
        if (user.email !== email) {
            return {
                error: true,
                message: "Credenciales incorrectas"
            };
        }


        if (user.password !== password) {
            return {
                error: true,
                message: "Credenciales incorrectas"
            };
        }

        return {
            error: false,
            data: {
                id: user.id,
                email: user.email
            },
            message: "Login exitoso"
        };

    } catch (error) {
        if (error instanceof ValidationError) {
            return {
                error: true,
                message: error.message
            };
        }

        return {
            error: true,
            message: "Error inesperado en el login"
        };
    }
}
