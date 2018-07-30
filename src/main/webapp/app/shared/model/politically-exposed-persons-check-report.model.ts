export interface IPoliticallyExposedPersonsCheckReport {
    id?: string;
    pepIdentified?: string;
    pepVerifiedBy?: string;
    pepVerifiedDate?: string;
    pepRemarks?: string;
}

export class PoliticallyExposedPersonsCheckReport implements IPoliticallyExposedPersonsCheckReport {
    constructor(
        public id?: string,
        public pepIdentified?: string,
        public pepVerifiedBy?: string,
        public pepVerifiedDate?: string,
        public pepRemarks?: string
    ) {}
}
