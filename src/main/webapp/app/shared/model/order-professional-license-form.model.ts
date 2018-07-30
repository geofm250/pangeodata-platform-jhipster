export interface IOrderProfessionalLicenseForm {
    id?: string;
    nameOfLicense?: string;
    town?: string;
    licenseInstitution?: string;
}

export class OrderProfessionalLicenseForm implements IOrderProfessionalLicenseForm {
    constructor(public id?: string, public nameOfLicense?: string, public town?: string, public licenseInstitution?: string) {}
}
