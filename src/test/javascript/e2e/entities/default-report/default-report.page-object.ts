import { element, by, promise, ElementFinder } from 'protractor';

export class DefaultReportComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    title = element.all(by.css('jhi-default-report div h2#page-heading span')).first();

    clickOnCreateButton(): promise.Promise<void> {
        return this.createButton.click();
    }

    getTitle(): any {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class DefaultReportUpdatePage {
    pageTitle = element(by.id('jhi-default-report-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    verifiedByInput = element(by.id('field_verifiedBy'));
    findingsInput = element(by.id('field_findings'));
    verifiedDateInput = element(by.id('field_verifiedDate'));
    remarksInput = element(by.id('field_remarks'));

    getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    setVerifiedByInput(verifiedBy): promise.Promise<void> {
        return this.verifiedByInput.sendKeys(verifiedBy);
    }

    getVerifiedByInput() {
        return this.verifiedByInput.getAttribute('value');
    }

    setFindingsInput(findings): promise.Promise<void> {
        return this.findingsInput.sendKeys(findings);
    }

    getFindingsInput() {
        return this.findingsInput.getAttribute('value');
    }

    setVerifiedDateInput(verifiedDate): promise.Promise<void> {
        return this.verifiedDateInput.sendKeys(verifiedDate);
    }

    getVerifiedDateInput() {
        return this.verifiedDateInput.getAttribute('value');
    }

    setRemarksInput(remarks): promise.Promise<void> {
        return this.remarksInput.sendKeys(remarks);
    }

    getRemarksInput() {
        return this.remarksInput.getAttribute('value');
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
