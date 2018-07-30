export interface IReferenceCheckReport {
    id?: string;
    nameOfReference?: string;
    designationOfReference?: string;
    referenceResponse?: string;
    resVerifiedDate?: string;
}

export class ReferenceCheckReport implements IReferenceCheckReport {
    constructor(
        public id?: string,
        public nameOfReference?: string,
        public designationOfReference?: string,
        public referenceResponse?: string,
        public resVerifiedDate?: string
    ) {}
}
