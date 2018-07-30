import { element, by, promise, ElementFinder } from 'protractor';

export class ReferenceCheckReportComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    title = element.all(by.css('jhi-reference-check-report div h2#page-heading span')).first();

    clickOnCreateButton(): promise.Promise<void> {
        return this.createButton.click();
    }

    getTitle(): any {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class ReferenceCheckReportUpdatePage {
    pageTitle = element(by.id('jhi-reference-check-report-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    nameOfReferenceInput = element(by.id('field_nameOfReference'));
    designationOfReferenceInput = element(by.id('field_designationOfReference'));
    referenceResponseInput = element(by.id('field_referenceResponse'));
    resVerifiedDateInput = element(by.id('field_resVerifiedDate'));

    getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    setNameOfReferenceInput(nameOfReference): promise.Promise<void> {
        return this.nameOfReferenceInput.sendKeys(nameOfReference);
    }

    getNameOfReferenceInput() {
        return this.nameOfReferenceInput.getAttribute('value');
    }

    setDesignationOfReferenceInput(designationOfReference): promise.Promise<void> {
        return this.designationOfReferenceInput.sendKeys(designationOfReference);
    }

    getDesignationOfReferenceInput() {
        return this.designationOfReferenceInput.getAttribute('value');
    }

    setReferenceResponseInput(referenceResponse): promise.Promise<void> {
        return this.referenceResponseInput.sendKeys(referenceResponse);
    }

    getReferenceResponseInput() {
        return this.referenceResponseInput.getAttribute('value');
    }

    setResVerifiedDateInput(resVerifiedDate): promise.Promise<void> {
        return this.resVerifiedDateInput.sendKeys(resVerifiedDate);
    }

    getResVerifiedDateInput() {
        return this.resVerifiedDateInput.getAttribute('value');
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
