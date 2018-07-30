import { element, by, promise, ElementFinder } from 'protractor';

export class CreditCheckReportComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    title = element.all(by.css('jhi-credit-check-report div h2#page-heading span')).first();

    clickOnCreateButton(): promise.Promise<void> {
        return this.createButton.click();
    }

    getTitle(): any {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class CreditCheckReportUpdatePage {
    pageTitle = element(by.id('jhi-credit-check-report-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    creditFindingsInput = element(by.id('field_creditFindings'));
    creditVerifiedByInput = element(by.id('field_creditVerifiedBy'));
    creditVerifiedDateInput = element(by.id('field_creditVerifiedDate'));
    creditRemarksInput = element(by.id('field_creditRemarks'));

    getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    setCreditFindingsInput(creditFindings): promise.Promise<void> {
        return this.creditFindingsInput.sendKeys(creditFindings);
    }

    getCreditFindingsInput() {
        return this.creditFindingsInput.getAttribute('value');
    }

    setCreditVerifiedByInput(creditVerifiedBy): promise.Promise<void> {
        return this.creditVerifiedByInput.sendKeys(creditVerifiedBy);
    }

    getCreditVerifiedByInput() {
        return this.creditVerifiedByInput.getAttribute('value');
    }

    setCreditVerifiedDateInput(creditVerifiedDate): promise.Promise<void> {
        return this.creditVerifiedDateInput.sendKeys(creditVerifiedDate);
    }

    getCreditVerifiedDateInput() {
        return this.creditVerifiedDateInput.getAttribute('value');
    }

    setCreditRemarksInput(creditRemarks): promise.Promise<void> {
        return this.creditRemarksInput.sendKeys(creditRemarks);
    }

    getCreditRemarksInput() {
        return this.creditRemarksInput.getAttribute('value');
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
