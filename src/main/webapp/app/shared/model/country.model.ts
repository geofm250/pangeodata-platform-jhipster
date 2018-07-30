export interface ICountry {
    id?: string;
    name?: string;
    code?: string;
    localCheck?: string;
}

export class Country implements ICountry {
    constructor(public id?: string, public name?: string, public code?: string, public localCheck?: string) {}
}
