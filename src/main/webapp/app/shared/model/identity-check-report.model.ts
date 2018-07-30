export interface IIdentityCheckReport {
    id?: string;
    idVerified?: string;
    idAuthVerifiedBy?: string;
    idVerifiedDate?: string;
    idRemarks?: string;
}

export class IdentityCheckReport implements IIdentityCheckReport {
    constructor(
        public id?: string,
        public idVerified?: string,
        public idAuthVerifiedBy?: string,
        public idVerifiedDate?: string,
        public idRemarks?: string
    ) {}
}
