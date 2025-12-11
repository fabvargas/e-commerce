
const db=[
    {
        id:1,
        email:"fabian@gmail.com",
        password:"123456"
    },
    {
        id:2,
        email:"pepe@gmail.com",
        password:"654321"
    }
]


export class MockUser {

    db = db;
    
    async obtenerPorId(id:number){
        const user = db.find(u=>u.id===id);
        return user || null;
    }

    async obtenerPorEmail(email:string){
        const user = db.find(u=>u.email===email);
        return user || null;
    }

    async crearUsuario(email:string, password:string){
        const newUser = {
            id: this.db.length + 1,
            email,
            password
        };
        this.db.push(newUser);
        return newUser;
    }

    

}
