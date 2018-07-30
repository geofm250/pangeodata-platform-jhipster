export interface IIOrderReport {
    id?: string;
}

export class IOrderReport implements IIOrderReport {
    constructor(public id?: string) {}
}
