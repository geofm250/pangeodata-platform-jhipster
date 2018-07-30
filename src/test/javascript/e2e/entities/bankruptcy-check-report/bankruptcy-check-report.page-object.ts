import { element, by, promise, ElementFinder } from 'protractor';

export class BankruptcyCheckReportComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    title = element.all(by.css('jhi-bankruptcy-check-report div h2#page-heading span')).first();

    clickOnCreateButton(): promise.Promise<void> {
        return this.createButton.click();
    }

    getTitle(): any {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class BankruptcyCheckReportUpdatePage {
    pageTitle = element(by.id('jhi-bankruptcy-check-report-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    bankruptcyFindingsInput = element(by.id('field_bankruptcyFindings'));
    bankruptcyVerifiedByInput = element(by.id('field_bankruptcyVerifiedBy'));
    bankruptcyVerifiedDateInput = element(by.id('field_bankruptcyVerifiedDate'));
    bankruptcyRemarksInput = element(by.id('field_bankruptcyRemarks'));

    getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    setBankruptcyFindingsInput(bankruptcyFindings): promise.Promise<void> {
        return this.bankruptcyFindingsInput.sendKeys(bankruptcyFindings);
    }

    getBankruptcyFindingsInput() {
        return this.bankruptcyFindingsInput.getAttribute('value');
    }

    setBankruptcyVerifiedByInput(bankruptcyVerifiedBy): promise.Promise<void> {
        return this.bankruptcyVerifiedByInput.sendKeys(bankruptcyVerifiedBy);
    }

    getBankruptcyVerifiedByInput() {
        return this.bankruptcyVerifiedByInput.getAttribute('value');
    }

    setBankruptcyVerifiedDateInput(bankruptcyVerifiedDate): promise.Promise<void> {
        return this.bankruptcyVerifiedDateInput.sendKeys(bankruptcyVerifiedDate);
    }

    getBankruptcyVerifiedDateInput() {
        return this.bankruptcyVerifiedDateInput.getAttribute('value');
    }

    setBankruptcyRemarksInput(bankruptcyRemarks): promise.Promise<void> {
        return this.bankruptcyRemarksInput.sendKeys(bankruptcyRemarks);
    }

    getBankruptcyRemarksInput() {
        return this.bankruptcyRemarksInput.getAttribute('value');
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
