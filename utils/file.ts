import { writeFileSync, readFileSync, existsSync } from 'fs';

export function write(path: string, contents: string) {
    writeFileSync(path, contents);
}

export function read(path: string): string | null {
    let result = null;
    if (exists(path)) {
        try {
            result = readFileSync(path, 'utf8');
        } catch (error) {
            console.log(error)
        }
    }
    return result;
}

export function readJson<T>(path: string): T | null {
    let contents = read(path);
    let result = contents == null ? null : JSON.parse(contents) as T;
    return result;
}

export function exists(path: string): boolean {
    return existsSync(path);
}