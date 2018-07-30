export interface IToken {
    id?: string;
    createdAt?: string;
    expiredAt?: string;
    userId?: string;
    token?: string;
}

export class Token implements IToken {
    constructor(public id?: string, public createdAt?: string, public expiredAt?: string, public userId?: string, public token?: string) {}
}
