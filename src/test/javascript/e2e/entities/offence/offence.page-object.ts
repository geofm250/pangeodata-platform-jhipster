import { element, by, promise, ElementFinder } from 'protractor';

export class OffenceComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    title = element.all(by.css('jhi-offence div h2#page-heading span')).first();

    clickOnCreateButton(): promise.Promise<void> {
        return this.createButton.click();
    }

    getTitle(): any {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class OffenceUpdatePage {
    pageTitle = element(by.id('jhi-offence-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    offenceInput = element(by.id('field_offence'));
    offenceDateInput = element(by.id('field_offenceDate'));
    sentenceInput = element(by.id('field_sentence'));
    verifiedByInput = element(by.id('field_verifiedBy'));
    verifiedDateInput = element(by.id('field_verifiedDate'));
    remarksInput = element(by.id('field_remarks'));

    getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    setOffenceInput(offence): promise.Promise<void> {
        return this.offenceInput.sendKeys(offence);
    }

    getOffenceInput() {
        return this.offenceInput.getAttribute('value');
    }

    setOffenceDateInput(offenceDate): promise.Promise<void> {
        return this.offenceDateInput.sendKeys(offenceDate);
    }

    getOffenceDateInput() {
        return this.offenceDateInput.getAttribute('value');
    }

    setSentenceInput(sentence): promise.Promise<void> {
        return this.sentenceInput.sendKeys(sentence);
    }

    getSentenceInput() {
        return this.sentenceInput.getAttribute('value');
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
