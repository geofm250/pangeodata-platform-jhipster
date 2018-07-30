export interface IAddress {
    id?: string;
    current?: string;
    startDate?: string;
    country?: string;
    endDate?: string;
    town?: string;
    address1?: string;
    address2?: string;
    postalCode?: string;
    province?: string;
}

export class Address implements IAddress {
    constructor(
        public id?: string,
        public current?: string,
        public startDate?: string,
        public country?: string,
        public endDate?: string,
        public town?: string,
        public address1?: string,
        public address2?: string,
        public postalCode?: string,
        public province?: string
    ) {}
}
