export interface IPassportCheckReport {
    id?: string;
    passportVerified?: string;
    documentAuthenticityVerifiedBy?: string;
    documentAuthenticityVerifiedDate?: string;
    documentAuthenticityRemarks?: string;
}

export class PassportCheckReport implements IPassportCheckReport {
    constructor(
        public id?: string,
        public passportVerified?: string,
        public documentAuthenticityVerifiedBy?: string,
        public documentAuthenticityVerifiedDate?: string,
        public documentAuthenticityRemarks?: string
    ) {}
}
