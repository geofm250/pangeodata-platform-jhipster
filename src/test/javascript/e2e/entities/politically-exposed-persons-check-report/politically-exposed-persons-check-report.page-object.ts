import { element, by, promise, ElementFinder } from 'protractor';

export class PoliticallyExposedPersonsCheckReportComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    title = element.all(by.css('jhi-politically-exposed-persons-check-report div h2#page-heading span')).first();

    clickOnCreateButton(): promise.Promise<void> {
        return this.createButton.click();
    }

    getTitle(): any {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class PoliticallyExposedPersonsCheckReportUpdatePage {
    pageTitle = element(by.id('jhi-politically-exposed-persons-check-report-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    pepIdentifiedInput = element(by.id('field_pepIdentified'));
    pepVerifiedByInput = element(by.id('field_pepVerifiedBy'));
    pepVerifiedDateInput = element(by.id('field_pepVerifiedDate'));
    pepRemarksInput = element(by.id('field_pepRemarks'));

    getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    setPepIdentifiedInput(pepIdentified): promise.Promise<void> {
        return this.pepIdentifiedInput.sendKeys(pepIdentified);
    }

    getPepIdentifiedInput() {
        return this.pepIdentifiedInput.getAttribute('value');
    }

    setPepVerifiedByInput(pepVerifiedBy): promise.Promise<void> {
        return this.pepVerifiedByInput.sendKeys(pepVerifiedBy);
    }

    getPepVerifiedByInput() {
        return this.pepVerifiedByInput.getAttribute('value');
    }

    setPepVerifiedDateInput(pepVerifiedDate): promise.Promise<void> {
        return this.pepVerifiedDateInput.sendKeys(pepVerifiedDate);
    }

    getPepVerifiedDateInput() {
        return this.pepVerifiedDateInput.getAttribute('value');
    }

    setPepRemarksInput(pepRemarks): promise.Promise<void> {
        return this.pepRemarksInput.sendKeys(pepRemarks);
    }

    getPepRemarksInput() {
        return this.pepRemarksInput.getAttribute('value');
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
