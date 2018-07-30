export interface ICreditCheckReport {
    id?: string;
    creditFindings?: string;
    creditVerifiedBy?: string;
    creditVerifiedDate?: string;
    creditRemarks?: string;
}

export class CreditCheckReport implements ICreditCheckReport {
    constructor(
        public id?: string,
        public creditFindings?: string,
        public creditVerifiedBy?: string,
        public creditVerifiedDate?: string,
        public creditRemarks?: string
    ) {}
}
