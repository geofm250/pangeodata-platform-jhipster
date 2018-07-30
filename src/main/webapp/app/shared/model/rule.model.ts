export interface IRule {
    id?: string;
    country?: string;
    rule?: string;
}

export class Rule implements IRule {
    constructor(public id?: string, public country?: string, public rule?: string) {}
}
