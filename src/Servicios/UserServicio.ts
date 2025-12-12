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
                password: user.password
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
                password: user.password
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
                password: nuevo.password
            });

    }

     
}   


const userRepositorio = new UserRepository();
export const userServicio = new UserServicio(userRepositorio);