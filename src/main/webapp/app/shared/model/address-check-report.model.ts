export interface IAddressCheckReport {
    id?: string;
    addressVerified?: string;
    idAuthVerifiedBy?: string;
    addressVerifiedBy?: string;
    addressVerifiedDate?: string;
    addressRemarks?: string;
}

export class AddressCheckReport implements IAddressCheckReport {
    constructor(
        public id?: string,
        public addressVerified?: string,
        public idAuthVerifiedBy?: string,
        public addressVerifiedBy?: string,
        public addressVerifiedDate?: string,
        public addressRemarks?: string
    ) {}
}
