export interface IBankruptcyCheckReport {
    id?: string;
    bankruptcyFindings?: string;
    bankruptcyVerifiedBy?: string;
    bankruptcyVerifiedDate?: string;
    bankruptcyRemarks?: string;
}

export class BankruptcyCheckReport implements IBankruptcyCheckReport {
    constructor(
        public id?: string,
        public bankruptcyFindings?: string,
        public bankruptcyVerifiedBy?: string,
        public bankruptcyVerifiedDate?: string,
        public bankruptcyRemarks?: string
    ) {}
}
