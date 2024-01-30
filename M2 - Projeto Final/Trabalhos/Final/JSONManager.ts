import {readFileSync, writeFileSync} from 'fs'

export abstract class JSONManager {
    static read(path: string) {
        const jsonString = readFileSync(path, {
            encoding: "utf-8"
        })

        return JSON.parse(jsonString)
    }

    static add(path: string, data: Object) {
        const currentData = JSONManager.read(path)
        currentData.push(data);
        writeFileSync(path, JSON.stringify(currentData, null, 2))
    }

    static replace(path: string, data: Object) {
        writeFileSync(path, JSON.stringify(data, null, 2))
    }
}