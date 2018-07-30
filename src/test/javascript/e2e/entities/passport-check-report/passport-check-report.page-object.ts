import { element, by, promise, ElementFinder } from 'protractor';

export class PassportCheckReportComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    title = element.all(by.css('jhi-passport-check-report div h2#page-heading span')).first();

    clickOnCreateButton(): promise.Promise<void> {
        return this.createButton.click();
    }

    getTitle(): any {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class PassportCheckReportUpdatePage {
    pageTitle = element(by.id('jhi-passport-check-report-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    passportVerifiedInput = element(by.id('field_passportVerified'));
    documentAuthenticityVerifiedByInput = element(by.id('field_documentAuthenticityVerifiedBy'));
    documentAuthenticityVerifiedDateInput = element(by.id('field_documentAuthenticityVerifiedDate'));
    documentAuthenticityRemarksInput = element(by.id('field_documentAuthenticityRemarks'));

    getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    setPassportVerifiedInput(passportVerified): promise.Promise<void> {
        return this.passportVerifiedInput.sendKeys(passportVerified);
    }

    getPassportVerifiedInput() {
        return this.passportVerifiedInput.getAttribute('value');
    }

    setDocumentAuthenticityVerifiedByInput(documentAuthenticityVerifiedBy): promise.Promise<void> {
        return this.documentAuthenticityVerifiedByInput.sendKeys(documentAuthenticityVerifiedBy);
    }

    getDocumentAuthenticityVerifiedByInput() {
        return this.documentAuthenticityVerifiedByInput.getAttribute('value');
    }

    setDocumentAuthenticityVerifiedDateInput(documentAuthenticityVerifiedDate): promise.Promise<void> {
        return this.documentAuthenticityVerifiedDateInput.sendKeys(documentAuthenticityVerifiedDate);
    }

    getDocumentAuthenticityVerifiedDateInput() {
        return this.documentAuthenticityVerifiedDateInput.getAttribute('value');
    }

    setDocumentAuthenticityRemarksInput(documentAuthenticityRemarks): promise.Promise<void> {
        return this.documentAuthenticityRemarksInput.sendKeys(documentAuthenticityRemarks);
    }

    getDocumentAuthenticityRemarksInput() {
        return this.documentAuthenticityRemarksInput.getAttribute('value');
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
