import { element, by, promise, ElementFinder } from 'protractor';

export class IdentityCheckReportComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    title = element.all(by.css('jhi-identity-check-report div h2#page-heading span')).first();

    clickOnCreateButton(): promise.Promise<void> {
        return this.createButton.click();
    }

    getTitle(): any {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class IdentityCheckReportUpdatePage {
    pageTitle = element(by.id('jhi-identity-check-report-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    idVerifiedInput = element(by.id('field_idVerified'));
    idAuthVerifiedByInput = element(by.id('field_idAuthVerifiedBy'));
    idVerifiedDateInput = element(by.id('field_idVerifiedDate'));
    idRemarksInput = element(by.id('field_idRemarks'));

    getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    setIdVerifiedInput(idVerified): promise.Promise<void> {
        return this.idVerifiedInput.sendKeys(idVerified);
    }

    getIdVerifiedInput() {
        return this.idVerifiedInput.getAttribute('value');
    }

    setIdAuthVerifiedByInput(idAuthVerifiedBy): promise.Promise<void> {
        return this.idAuthVerifiedByInput.sendKeys(idAuthVerifiedBy);
    }

    getIdAuthVerifiedByInput() {
        return this.idAuthVerifiedByInput.getAttribute('value');
    }

    setIdVerifiedDateInput(idVerifiedDate): promise.Promise<void> {
        return this.idVerifiedDateInput.sendKeys(idVerifiedDate);
    }

    getIdVerifiedDateInput() {
        return this.idVerifiedDateInput.getAttribute('value');
    }

    setIdRemarksInput(idRemarks): promise.Promise<void> {
        return this.idRemarksInput.sendKeys(idRemarks);
    }

    getIdRemarksInput() {
        return this.idRemarksInput.getAttribute('value');
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
