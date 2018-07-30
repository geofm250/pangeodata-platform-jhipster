export interface IEmploymentReport {
    id?: string;
    employerVerified?: string;
    employmentStartDateVerified?: string;
    employmentEndDateVerified?: string;
    titleVerified?: string;
    slaryVerified?: string;
    reasonForTermination?: string;
    employmentPersonContactName?: string;
    employmentDesignationContact?: string;
    employmentVerifiedDate?: string;
    employmentRehireEligibility?: string;
    employmentRehireExplanation?: string;
    employmentRemarks?: string;
}

export class EmploymentReport implements IEmploymentReport {
    constructor(
        public id?: string,
        public employerVerified?: string,
        public employmentStartDateVerified?: string,
        public employmentEndDateVerified?: string,
        public titleVerified?: string,
        public slaryVerified?: string,
        public reasonForTermination?: string,
        public employmentPersonContactName?: string,
        public employmentDesignationContact?: string,
        public employmentVerifiedDate?: string,
        public employmentRehireEligibility?: string,
        public employmentRehireExplanation?: string,
        public employmentRemarks?: string
    ) {}
}
