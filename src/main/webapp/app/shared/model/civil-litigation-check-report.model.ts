export interface ICivilLitigationCheckReport {
    id?: string;
    civilRecordFound?: string;
    civilFindings?: string;
    civilVerifiedBy?: string;
    civilVerifiedDate?: string;
    civilRemarks?: string;
}

export class CivilLitigationCheckReport implements ICivilLitigationCheckReport {
    constructor(
        public id?: string,
        public civilRecordFound?: string,
        public civilFindings?: string,
        public civilVerifiedBy?: string,
        public civilVerifiedDate?: string,
        public civilRemarks?: string
    ) {}
}
