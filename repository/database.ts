import { IUser } from '@/repository/models/user';
import * as fileHelper from '@/utils/file';
import path from 'path';

export interface IDatabase {
    users: Array<IUser>
};

class Database implements IDatabase {
    users: Array<IUser> = new Array<IUser>();
}

export function getDatabase() : IDatabase {
    const result = fileHelper.readJson<IDatabase>(getDatabasePath()) ?? new Database();
    return result;
}

export function saveDatabase(database: IDatabase) {
    fileHelper.write(getDatabasePath(), JSON.stringify(database));
}

function getDatabasePath() {
    return path.resolve('./', 'database.json');
}