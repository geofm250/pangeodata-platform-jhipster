export interface IDriversLicenseCheckReport {
    id?: string;
    driversLicenseVerified?: string;
    driversLicenseNumber?: string;
    driversLicenseStatus?: string;
    driverLicenseVerifiedBy?: string;
    driversLicenseVerifiedDate?: string;
    driversLicenseRemarks?: string;
}

export class DriversLicenseCheckReport implements IDriversLicenseCheckReport {
    constructor(
        public id?: string,
        public driversLicenseVerified?: string,
        public driversLicenseNumber?: string,
        public driversLicenseStatus?: string,
        public driverLicenseVerifiedBy?: string,
        public driversLicenseVerifiedDate?: string,
        public driversLicenseRemarks?: string
    ) {}
}
