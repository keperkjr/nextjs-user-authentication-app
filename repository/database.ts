import { IUser } from '@/repository/models/user';

export interface IDatabase {
    users: Array<IUser>
};

class Database implements IDatabase {
    users: Array<IUser>;
    constructor() {
        this.users = new Array<IUser>();
    }
}

var db: IDatabase;
export function getDatabase() : IDatabase {
    if (!db) {
        db = new Database();
    }
    return db;
}