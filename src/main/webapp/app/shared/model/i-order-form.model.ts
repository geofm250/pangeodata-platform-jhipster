export interface IIOrderForm {
    id?: string;
}

export class IOrderForm implements IIOrderForm {
    constructor(public id?: string) {}
}
