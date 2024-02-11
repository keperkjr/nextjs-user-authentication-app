import { getDatabase } from '@/repository/database';
import { IUser, User } from '@/repository/models/user';
import bcrypt from 'bcrypt'

export async function createUserAsync(name: string, email: string, password: string) : Promise<IUser> {
    const user = new User(name, email?.trim(), await bcrypt.hash(password, 10));
    saveUser(user);
    return user;
}

export function getUser(email: string) : IUser | undefined {
    const database = getDatabase();
    const user = database.users.find(x => x.email == email  || '' );
    return user;
}

export function saveUser(user: IUser) {
    const database = getDatabase();
    database.users.push(user);
}

export async function authenticateUserAsync(email: string, password: string) : Promise<IUser> {
    const user = getUser(email  || '' );  
    console.log('user', user)              
    if (!user) {
        throw new Error("Invalid email")
    }

    const isPasswordValid = await bcrypt.compare(password || '' , user.password);
    if (!isPasswordValid ) {
        throw new Error("Invalid password")
    }
    return user;
}