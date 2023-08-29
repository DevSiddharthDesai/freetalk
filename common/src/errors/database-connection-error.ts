import { CustomError } from "./custom-error";

export class DBConnectionError extends CustomError{
    statusCode = 500;

    constructor(){
        super('db connection error');
    }

    generateErrors(){
        return [{message: 'db connection error'}]
    }
}