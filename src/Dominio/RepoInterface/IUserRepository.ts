
export interface IUserRepository{
    obtenerPorId(id:number):Promise<{id:number, email:string, password:string} | null>;
    obtenerPorEmail(email:string):Promise<{id:number, email:string, password:string} | null>;
    crearUsuario(email:string, password:string):Promise<{id:number, email:string, password:string}>;
}