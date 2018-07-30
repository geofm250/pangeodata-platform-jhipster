export interface ISession {
    id?: string;
    user?: string;
    passwordToken?: string;
}

export class Session implements ISession {
    constructor(public id?: string, public user?: string, public passwordToken?: string) {}
}
