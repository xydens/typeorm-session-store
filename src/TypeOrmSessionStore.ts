import {Store} from "express-session";
import * as e from "express";
import {Repository} from "typeorm";

import {SessionEntity} from "./Session.entity";

const ensure = <T extends any[]>(callback?: (...args: T) => void): (...args: T) => void =>
    // tslint:disable-next-line:no-empty
    typeof callback === "function" ? callback : () => {};

export class TypeOrmSessionStore extends Store {

    constructor(private readonly repository: Repository<SessionEntity>) {
        super();
    }

    all: (callback: (err: any, obj?: ({[p: string]: Express.SessionData} | null)) => void) => void;
    clear: (callback?: (err?: any) => void) => void;

    destroy = (sid: string, callback?: (err?: any) => void) => {
        this.repository.delete(sid)
            .then(() => ensure(callback)())
            .catch(error => ensure(callback)(error));
    }

    get = (sid: string, callback: (err: any, session?: (Express.SessionData | null)) => void): void => {
        this.repository.findOneOrFail(sid)
            .then(session => callback(null, session.data))
            .catch(error => callback(error, null));
    }

    length: (callback: (err: any, length?: (number | null)) => void) => void;
    load: (sid: string, fn: (err: any, session?: (Express.SessionData | null)) => any) => void;
    regenerate: (req: e.Request, fn: (err?: any) => any) => void;

    set = (sid: string, session: Express.SessionData, callback?: (err?: any) => void): void => {
        const entity = this.repository.create({
            sid,
            data: session,
        });
        this.repository.save(entity)
            .then(() => ensure(callback)())
            .catch(error => ensure(callback)(error));
    }

    touch: (sid: string, session: Express.SessionData, callback?: (err?: any) => void) => void;

}
