import { element, by, promise, ElementFinder } from 'protractor';

export class LicenseCheckReportComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    title = element.all(by.css('jhi-license-check-report div h2#page-heading span')).first();

    clickOnCreateButton(): promise.Promise<void> {
        return this.createButton.click();
    }

    getTitle(): any {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class LicenseCheckReportUpdatePage {
    pageTitle = element(by.id('jhi-license-check-report-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    licenseVerifiedInput = element(by.id('field_licenseVerified'));
    licRegistrationNumberInput = element(by.id('field_licRegistrationNumber'));
    licenseStatusInput = element(by.id('field_licenseStatus'));
    licVerifiedByInput = element(by.id('field_licVerifiedBy'));
    licVerifiedDateInput = element(by.id('field_licVerifiedDate'));
    licRemarksInput = element(by.id('field_licRemarks'));

    getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    setLicenseVerifiedInput(licenseVerified): promise.Promise<void> {
        return this.licenseVerifiedInput.sendKeys(licenseVerified);
    }

    getLicenseVerifiedInput() {
        return this.licenseVerifiedInput.getAttribute('value');
    }

    setLicRegistrationNumberInput(licRegistrationNumber): promise.Promise<void> {
        return this.licRegistrationNumberInput.sendKeys(licRegistrationNumber);
    }

    getLicRegistrationNumberInput() {
        return this.licRegistrationNumberInput.getAttribute('value');
    }

    setLicenseStatusInput(licenseStatus): promise.Promise<void> {
        return this.licenseStatusInput.sendKeys(licenseStatus);
    }

    getLicenseStatusInput() {
        return this.licenseStatusInput.getAttribute('value');
    }

    setLicVerifiedByInput(licVerifiedBy): promise.Promise<void> {
        return this.licVerifiedByInput.sendKeys(licVerifiedBy);
    }

    getLicVerifiedByInput() {
        return this.licVerifiedByInput.getAttribute('value');
    }

    setLicVerifiedDateInput(licVerifiedDate): promise.Promise<void> {
        return this.licVerifiedDateInput.sendKeys(licVerifiedDate);
    }

    getLicVerifiedDateInput() {
        return this.licVerifiedDateInput.getAttribute('value');
    }

    setLicRemarksInput(licRemarks): promise.Promise<void> {
        return this.licRemarksInput.sendKeys(licRemarks);
    }

    getLicRemarksInput() {
        return this.licRemarksInput.getAttribute('value');
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
