export interface ILink {
    id?: string;
    requirementId?: string;
    url?: string;
}

export class Link implements ILink {
    constructor(public id?: string, public requirementId?: string, public url?: string) {}
}
