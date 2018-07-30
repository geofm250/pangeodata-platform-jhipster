export interface IReportedCriminalActivityCheck {
    id?: string;
    reportedCriminalActivityRecordFound?: string;
    reportedCriminalActivityVerifiedBy?: string;
    reportedCriminalActivityVerifiedDate?: string;
    reportedCriminalActivityRemarks?: string;
}

export class ReportedCriminalActivityCheck implements IReportedCriminalActivityCheck {
    constructor(
        public id?: string,
        public reportedCriminalActivityRecordFound?: string,
        public reportedCriminalActivityVerifiedBy?: string,
        public reportedCriminalActivityVerifiedDate?: string,
        public reportedCriminalActivityRemarks?: string
    ) {}
}
