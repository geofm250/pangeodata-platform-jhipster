import { element, by, promise, ElementFinder } from 'protractor';

export class CivilLitigationCheckReportComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    title = element.all(by.css('jhi-civil-litigation-check-report div h2#page-heading span')).first();

    clickOnCreateButton(): promise.Promise<void> {
        return this.createButton.click();
    }

    getTitle(): any {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class CivilLitigationCheckReportUpdatePage {
    pageTitle = element(by.id('jhi-civil-litigation-check-report-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    civilRecordFoundInput = element(by.id('field_civilRecordFound'));
    civilFindingsInput = element(by.id('field_civilFindings'));
    civilVerifiedByInput = element(by.id('field_civilVerifiedBy'));
    civilVerifiedDateInput = element(by.id('field_civilVerifiedDate'));
    civilRemarksInput = element(by.id('field_civilRemarks'));

    getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    setCivilRecordFoundInput(civilRecordFound): promise.Promise<void> {
        return this.civilRecordFoundInput.sendKeys(civilRecordFound);
    }

    getCivilRecordFoundInput() {
        return this.civilRecordFoundInput.getAttribute('value');
    }

    setCivilFindingsInput(civilFindings): promise.Promise<void> {
        return this.civilFindingsInput.sendKeys(civilFindings);
    }

    getCivilFindingsInput() {
        return this.civilFindingsInput.getAttribute('value');
    }

    setCivilVerifiedByInput(civilVerifiedBy): promise.Promise<void> {
        return this.civilVerifiedByInput.sendKeys(civilVerifiedBy);
    }

    getCivilVerifiedByInput() {
        return this.civilVerifiedByInput.getAttribute('value');
    }

    setCivilVerifiedDateInput(civilVerifiedDate): promise.Promise<void> {
        return this.civilVerifiedDateInput.sendKeys(civilVerifiedDate);
    }

    getCivilVerifiedDateInput() {
        return this.civilVerifiedDateInput.getAttribute('value');
    }

    setCivilRemarksInput(civilRemarks): promise.Promise<void> {
        return this.civilRemarksInput.sendKeys(civilRemarks);
    }

    getCivilRemarksInput() {
        return this.civilRemarksInput.getAttribute('value');
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
