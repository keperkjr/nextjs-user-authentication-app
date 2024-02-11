import { IUser, User } from "@/repository/models/user";
import { getUser, saveUser } from "@/repository/userRepository";
import bcrypt from 'bcrypt'

export async function hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
}

export async function comparePassword(passwordPlain: string, passwordEncrypted: string): Promise<boolean> {
    return await bcrypt.compare(passwordPlain, passwordEncrypted);
}

export async function createUserAsync(name: string, email: string, password: string) : Promise<IUser> {
    const user = new User(name, email, await hashPassword(password));
    saveUser(user);
    return user;
}

export async function authenticateUserAsync(email: string, password: string) : Promise<IUser> {
    const user = getUser(email  || '');  
    console.log('user', user)              
    if (!user) {
        throw new Error("Invalid email")
    }

    const isPasswordValid = await comparePassword(password || '', user.password);
    if (!isPasswordValid) {
        throw new Error("Invalid password")
    }
    return user;
}