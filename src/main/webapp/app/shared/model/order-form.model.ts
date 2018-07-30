export interface IOrderForm {
    id?: string;
    formType?: string;
    input?: string;
    valid?: string;
    name?: string;
}

export class OrderForm implements IOrderForm {
    constructor(public id?: string, public formType?: string, public input?: string, public valid?: string, public name?: string) {}
}
