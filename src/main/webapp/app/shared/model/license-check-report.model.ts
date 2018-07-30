export interface ILicenseCheckReport {
    id?: string;
    licenseVerified?: string;
    licRegistrationNumber?: string;
    licenseStatus?: string;
    licVerifiedBy?: string;
    licVerifiedDate?: string;
    licRemarks?: string;
}

export class LicenseCheckReport implements ILicenseCheckReport {
    constructor(
        public id?: string,
        public licenseVerified?: string,
        public licRegistrationNumber?: string,
        public licenseStatus?: string,
        public licVerifiedBy?: string,
        public licVerifiedDate?: string,
        public licRemarks?: string
    ) {}
}
