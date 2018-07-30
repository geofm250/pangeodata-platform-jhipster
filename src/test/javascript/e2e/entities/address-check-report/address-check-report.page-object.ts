import { element, by, promise, ElementFinder } from 'protractor';

export class AddressCheckReportComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    title = element.all(by.css('jhi-address-check-report div h2#page-heading span')).first();

    clickOnCreateButton(): promise.Promise<void> {
        return this.createButton.click();
    }

    getTitle(): any {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class AddressCheckReportUpdatePage {
    pageTitle = element(by.id('jhi-address-check-report-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    addressVerifiedInput = element(by.id('field_addressVerified'));
    idAuthVerifiedByInput = element(by.id('field_idAuthVerifiedBy'));
    addressVerifiedByInput = element(by.id('field_addressVerifiedBy'));
    addressVerifiedDateInput = element(by.id('field_addressVerifiedDate'));
    addressRemarksInput = element(by.id('field_addressRemarks'));

    getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    setAddressVerifiedInput(addressVerified): promise.Promise<void> {
        return this.addressVerifiedInput.sendKeys(addressVerified);
    }

    getAddressVerifiedInput() {
        return this.addressVerifiedInput.getAttribute('value');
    }

    setIdAuthVerifiedByInput(idAuthVerifiedBy): promise.Promise<void> {
        return this.idAuthVerifiedByInput.sendKeys(idAuthVerifiedBy);
    }

    getIdAuthVerifiedByInput() {
        return this.idAuthVerifiedByInput.getAttribute('value');
    }

    setAddressVerifiedByInput(addressVerifiedBy): promise.Promise<void> {
        return this.addressVerifiedByInput.sendKeys(addressVerifiedBy);
    }

    getAddressVerifiedByInput() {
        return this.addressVerifiedByInput.getAttribute('value');
    }

    setAddressVerifiedDateInput(addressVerifiedDate): promise.Promise<void> {
        return this.addressVerifiedDateInput.sendKeys(addressVerifiedDate);
    }

    getAddressVerifiedDateInput() {
        return this.addressVerifiedDateInput.getAttribute('value');
    }

    setAddressRemarksInput(addressRemarks): promise.Promise<void> {
        return this.addressRemarksInput.sendKeys(addressRemarks);
    }

    getAddressRemarksInput() {
        return this.addressRemarksInput.getAttribute('value');
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
