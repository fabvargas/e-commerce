import { supabase } from "@/lib/SupabaseClient";
import { UserProps } from "@/src/Dominio/Entidades/User";
import { IUserRepository } from "@/src/Dominio/RepoInterface/IUserRepository";

export class UserRepository implements IUserRepository {   

    db = supabase;
    
    async obtenerPorId(id: number): Promise<UserProps | null> {
        const { data, error } = await this.db
            .from("Usuario")
            .select("*")
            .eq("id", id)
            .single();

        if (error) {
            console.error(`Error fetching user with id ${id}:`, error);
            return null;
        }

        return {
            id: data.id,
            email: data.email,
            password: data.password
        };
    }

    async obtenerPorEmail(email: string): Promise<UserProps | null> {
        const { data, error } = await this.db
            .from("Usuario")
            .select("*")
            .eq("email", email)
            .single();

        if (error) {
            console.error(`Error fetching user with email ${email}:`, error);
            return null;
        }

        return {
            id: data.id,
            email: data.email,
            password: data.password
        };
    }

    async crearUsuario(email: string, password: string): Promise<UserProps> {
        const { data, error } = await this.db
            .from("Usuario")
            .insert([{ email, password }])
            .select()
            .single();

        if (error) {
            console.error("Error creating user:", error);
            throw new Error("Error al crear el usuario: " + error.message);
        }

        return {
            id: data.id,
            email: data.email,
            password: data.password
        };
    }
}