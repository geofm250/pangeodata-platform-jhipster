export interface IEducationReport {
    id?: string;
    degreeVerified?: string;
    institutionVerified?: string;
    attendanceStartDateVerified?: string;
    attendanceEndDate?: string;
    attendanceEndDateVerified?: string;
    degreeEarned?: string;
    majorVerified?: string;
    graduationDateVerified?: string;
    educationPersonContactName?: string;
    educationDesignationContact?: string;
    educationVerifiedDate?: string;
    educationRemarks?: string;
}

export class EducationReport implements IEducationReport {
    constructor(
        public id?: string,
        public degreeVerified?: string,
        public institutionVerified?: string,
        public attendanceStartDateVerified?: string,
        public attendanceEndDate?: string,
        public attendanceEndDateVerified?: string,
        public degreeEarned?: string,
        public majorVerified?: string,
        public graduationDateVerified?: string,
        public educationPersonContactName?: string,
        public educationDesignationContact?: string,
        public educationVerifiedDate?: string,
        public educationRemarks?: string
    ) {}
}
