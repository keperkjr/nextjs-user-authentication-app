export interface IUser {
    name: string,
    email: string,
    password: string
};

export class User implements IUser {
    name: string;
    email: string;
    password: string;    
    constructor(name: string, email: string, password: string) {
        this.name = name;
        this.email = email;
        this.password = password;
    }
}