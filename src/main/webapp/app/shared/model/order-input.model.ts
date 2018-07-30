export interface IOrderInput {
    id?: string;
    name?: string;
    orderId?: string;
    label?: string;
    input?: string;
    iCoverName?: string;
}

export class OrderInput implements IOrderInput {
    constructor(
        public id?: string,
        public name?: string,
        public orderId?: string,
        public label?: string,
        public input?: string,
        public iCoverName?: string
    ) {}
}
