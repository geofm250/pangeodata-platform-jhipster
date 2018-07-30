export interface ICriminalRecordReport {
    id?: string;
    recordFound?: string;
    offences?: string;
    verifiedBy?: string;
    verifiedDate?: string;
}

export class CriminalRecordReport implements ICriminalRecordReport {
    constructor(
        public id?: string,
        public recordFound?: string,
        public offences?: string,
        public verifiedBy?: string,
        public verifiedDate?: string
    ) {}
}
