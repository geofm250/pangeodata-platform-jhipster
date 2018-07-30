export interface IICoverName {
    id?: string;
    name?: string;
    requirementId?: string;
}

export class ICoverName implements IICoverName {
    constructor(public id?: string, public name?: string, public requirementId?: string) {}
}
