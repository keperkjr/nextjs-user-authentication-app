import { IDatabase, getDatabase, saveDatabase } from '@/repository/database';
import { IUser } from '@/repository/models/user';

function findUser(database: IDatabase, email: string) : IUser | undefined {
    const user = database.users.find(x => x.email == email);
    return user;
}

export function getUser(email: string) : IUser | undefined {
    const database = getDatabase();
    const user = findUser(database, email);
    return user;
}

export function saveUser(user: IUser) {
    const database = getDatabase();
    let existing = findUser(database, user.email);
    if (existing) {
        existing = {...user};
    } else {
        database.users.push(user);
    }
    saveDatabase(database);
}