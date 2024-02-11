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

var _db: IDatabase;
export function getDatabase() : IDatabase {
    if (!_db) {
        _db = new Database();
        saveDatabase(_db);
    }
    return _db;
}

export function saveDatabase(database: IDatabase) {
    _db = {...database};
}