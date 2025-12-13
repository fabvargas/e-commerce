import { IUserRepository } from "../Dominio/RepoInterface/IUserRepository";
import { User } from "../Dominio/Entidades/User";
import { UserRepository } from "../Infraestructura/supabase/UserRepository";
import { ValidationError } from "../CustomError";

export class UserServicio {

    private repositorio: IUserRepository;

    constructor(repositorio: IUserRepository) {
        this.repositorio = repositorio;
    }

    async obtenerUsuarioPorId(id: number) {
        
            const user = await this.repositorio.obtenerPorId(id);
            if (!user) {
                return null;
            }

            return User.crear({
                id: user.id,
                email: user.email,
                password: user.password,
                nombre: user.nombre,
                direccion: user.direccion,
                telefono: user.telefono,
                rol: user.rol
            });
       
    }

    async obtenerUsuarioPorEmail(email: string) {
        
          
            const user = await this.repositorio.obtenerPorEmail(email)
            if (!user) {
                return null;
            }

            return User.crear({
                id: user.id,
                email: user.email,
                password: user.password,
                nombre: user.nombre,
                direccion: user.direccion,
                telefono: user.telefono,
                rol: user.rol
            });
        
    }

    async registrarUsuario(email: string, password: string, confirmPassword: string) {
        
            const existe = await this.repositorio.obtenerPorEmail(email);
            if (existe) {
                throw new ValidationError("El email ya está registrado");
            }

            if (password !== confirmPassword) {
                throw new ValidationError("Las contraseñas no coinciden");
            }

            const nuevo = await this.repositorio.crearUsuario(email, password);

            return User.crear({
                id: nuevo.id,
                email: nuevo.email,
                password: nuevo.password,
                rol: nuevo.rol
            });

    }

    async actualizarUsuario(id: number, datos: {nombre?: string, direccion?: string, telefono?: string}) {
        const actualizado = await this.repositorio.actualizarUsuario(id, datos);
        
        return User.crear({
            id: actualizado.id,
            email: actualizado.email,
            password: actualizado.password,
            nombre: actualizado.nombre,
            direccion: actualizado.direccion,
            telefono: actualizado.telefono,
            rol: actualizado.rol
        });
    }

     
}   


const userRepositorio = new UserRepository();
export const userServicio = new UserServicio(userRepositorio);