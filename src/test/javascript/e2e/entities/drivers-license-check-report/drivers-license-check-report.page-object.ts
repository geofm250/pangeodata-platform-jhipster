import { element, by, promise, ElementFinder } from 'protractor';

export class DriversLicenseCheckReportComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    title = element.all(by.css('jhi-drivers-license-check-report div h2#page-heading span')).first();

    clickOnCreateButton(): promise.Promise<void> {
        return this.createButton.click();
    }

    getTitle(): any {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class DriversLicenseCheckReportUpdatePage {
    pageTitle = element(by.id('jhi-drivers-license-check-report-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    driversLicenseVerifiedInput = element(by.id('field_driversLicenseVerified'));
    driversLicenseNumberInput = element(by.id('field_driversLicenseNumber'));
    driversLicenseStatusInput = element(by.id('field_driversLicenseStatus'));
    driverLicenseVerifiedByInput = element(by.id('field_driverLicenseVerifiedBy'));
    driversLicenseVerifiedDateInput = element(by.id('field_driversLicenseVerifiedDate'));
    driversLicenseRemarksInput = element(by.id('field_driversLicenseRemarks'));

    getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    setDriversLicenseVerifiedInput(driversLicenseVerified): promise.Promise<void> {
        return this.driversLicenseVerifiedInput.sendKeys(driversLicenseVerified);
    }

    getDriversLicenseVerifiedInput() {
        return this.driversLicenseVerifiedInput.getAttribute('value');
    }

    setDriversLicenseNumberInput(driversLicenseNumber): promise.Promise<void> {
        return this.driversLicenseNumberInput.sendKeys(driversLicenseNumber);
    }

    getDriversLicenseNumberInput() {
        return this.driversLicenseNumberInput.getAttribute('value');
    }

    setDriversLicenseStatusInput(driversLicenseStatus): promise.Promise<void> {
        return this.driversLicenseStatusInput.sendKeys(driversLicenseStatus);
    }

    getDriversLicenseStatusInput() {
        return this.driversLicenseStatusInput.getAttribute('value');
    }

    setDriverLicenseVerifiedByInput(driverLicenseVerifiedBy): promise.Promise<void> {
        return this.driverLicenseVerifiedByInput.sendKeys(driverLicenseVerifiedBy);
    }

    getDriverLicenseVerifiedByInput() {
        return this.driverLicenseVerifiedByInput.getAttribute('value');
    }

    setDriversLicenseVerifiedDateInput(driversLicenseVerifiedDate): promise.Promise<void> {
        return this.driversLicenseVerifiedDateInput.sendKeys(driversLicenseVerifiedDate);
    }

    getDriversLicenseVerifiedDateInput() {
        return this.driversLicenseVerifiedDateInput.getAttribute('value');
    }

    setDriversLicenseRemarksInput(driversLicenseRemarks): promise.Promise<void> {
        return this.driversLicenseRemarksInput.sendKeys(driversLicenseRemarks);
    }

    getDriversLicenseRemarksInput() {
        return this.driversLicenseRemarksInput.getAttribute('value');
    }

    save(): promise.Promise<void> {
        return this.saveButton.click();
    }

    cancel(): promise.Promise<void> {
        return this.cancelButton.click();
    }

    getSaveButton(): ElementFinder {
        return this.saveButton;
    }
}
