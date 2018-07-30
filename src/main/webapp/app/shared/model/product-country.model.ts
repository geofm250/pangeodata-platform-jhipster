export interface IProductCountry {
    id?: string;
    turnAroundTime?: string;
    country?: string;
    cost?: string;
}

export class ProductCountry implements IProductCountry {
    constructor(public id?: string, public turnAroundTime?: string, public country?: string, public cost?: string) {}
}
