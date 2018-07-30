import { element, by, promise, ElementFinder } from 'protractor';

export class CriminalRecordReportComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    title = element.all(by.css('jhi-criminal-record-report div h2#page-heading span')).first();

    clickOnCreateButton(): promise.Promise<void> {
        return this.createButton.click();
    }

    getTitle(): any {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class CriminalRecordReportUpdatePage {
    pageTitle = element(by.id('jhi-criminal-record-report-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    recordFoundInput = element(by.id('field_recordFound'));
    offencesInput = element(by.id('field_offences'));
    verifiedByInput = element(by.id('field_verifiedBy'));
    verifiedDateInput = element(by.id('field_verifiedDate'));

    getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    setRecordFoundInput(recordFound): promise.Promise<void> {
        return this.recordFoundInput.sendKeys(recordFound);
    }

    getRecordFoundInput() {
        return this.recordFoundInput.getAttribute('value');
    }

    setOffencesInput(offences): promise.Promise<void> {
        return this.offencesInput.sendKeys(offences);
    }

    getOffencesInput() {
        return this.offencesInput.getAttribute('value');
    }

    setVerifiedByInput(verifiedBy): promise.Promise<void> {
        return this.verifiedByInput.sendKeys(verifiedBy);
    }

    getVerifiedByInput() {
        return this.verifiedByInput.getAttribute('value');
    }

    setVerifiedDateInput(verifiedDate): promise.Promise<void> {
        return this.verifiedDateInput.sendKeys(verifiedDate);
    }

    getVerifiedDateInput() {
        return this.verifiedDateInput.getAttribute('value');
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
