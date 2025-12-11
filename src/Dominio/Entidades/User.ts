import { ValidationError } from "@/src/CustomError";

export interface IUser{
    id:number;
    email:string;
    password:string;
}

export class User implements IUser{
    id: number;
    email: string;
    password: string;

    private constructor(id:number, email:string, password:string){
        this.id=id;
        this.email=email;
        this.password=password;
    }

    private validatedEmail():boolean{
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(this.email);
    }

    private validatedPassword():boolean{
        return this.password.length >=6;
    }

    private static validate({email, password}:IUser){
        const tempUser = new User(0, email, password);
        if(!tempUser.validatedEmail()){
            throw new ValidationError("Email no es valido");
        }
        if(!tempUser.validatedPassword()){
            throw new ValidationError("Password debe tener al menos 6 caracteres");
        }
    }

    static crear({id, email, password}:IUser):User{
        
        this.validate({id, email, password});

        return new User(id, email, password);
        
    }
}