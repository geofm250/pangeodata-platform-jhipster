import { element, by, promise, ElementFinder } from 'protractor';

export class OrderProfessionalLicenseFormComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    title = element.all(by.css('jhi-order-professional-license-form div h2#page-heading span')).first();

    clickOnCreateButton(): promise.Promise<void> {
        return this.createButton.click();
    }

    getTitle(): any {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class OrderProfessionalLicenseFormUpdatePage {
    pageTitle = element(by.id('jhi-order-professional-license-form-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    nameOfLicenseInput = element(by.id('field_nameOfLicense'));
    townInput = element(by.id('field_town'));
    licenseInstitutionInput = element(by.id('field_licenseInstitution'));

    getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    setNameOfLicenseInput(nameOfLicense): promise.Promise<void> {
        return this.nameOfLicenseInput.sendKeys(nameOfLicense);
    }

    getNameOfLicenseInput() {
        return this.nameOfLicenseInput.getAttribute('value');
    }

    setTownInput(town): promise.Promise<void> {
        return this.townInput.sendKeys(town);
    }

    getTownInput() {
        return this.townInput.getAttribute('value');
    }

    setLicenseInstitutionInput(licenseInstitution): promise.Promise<void> {
        return this.licenseInstitutionInput.sendKeys(licenseInstitution);
    }

    getLicenseInstitutionInput() {
        return this.licenseInstitutionInput.getAttribute('value');
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
