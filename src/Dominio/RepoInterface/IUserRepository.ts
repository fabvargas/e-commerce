import { UserProps } from "../Entidades/User";

export interface IUserRepository{
    obtenerPorId(id:number):Promise<UserProps | null>;
    obtenerPorEmail(email:string):Promise<UserProps | null>;
    crearUsuario(email:string, password:string):Promise<UserProps>;
    actualizarUsuario(id:number, datos: {nombre?: string, direccion?: string, telefono?: string}):Promise<UserProps>;
}