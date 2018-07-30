import { element, by, promise, ElementFinder } from 'protractor';

export class LocalLanguageMediaCheckReportComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    title = element.all(by.css('jhi-local-language-media-check-report div h2#page-heading span')).first();

    clickOnCreateButton(): promise.Promise<void> {
        return this.createButton.click();
    }

    getTitle(): any {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class LocalLanguageMediaCheckReportUpdatePage {
    pageTitle = element(by.id('jhi-local-language-media-check-report-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    localLanguageMediaFindingsInput = element(by.id('field_localLanguageMediaFindings'));
    localLanguageMediaStatusInput = element(by.id('field_localLanguageMediaStatus'));
    localLanguageMediaVerifiedDateInput = element(by.id('field_localLanguageMediaVerifiedDate'));

    getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    setLocalLanguageMediaFindingsInput(localLanguageMediaFindings): promise.Promise<void> {
        return this.localLanguageMediaFindingsInput.sendKeys(localLanguageMediaFindings);
    }

    getLocalLanguageMediaFindingsInput() {
        return this.localLanguageMediaFindingsInput.getAttribute('value');
    }

    setLocalLanguageMediaStatusInput(localLanguageMediaStatus): promise.Promise<void> {
        return this.localLanguageMediaStatusInput.sendKeys(localLanguageMediaStatus);
    }

    getLocalLanguageMediaStatusInput() {
        return this.localLanguageMediaStatusInput.getAttribute('value');
    }

    setLocalLanguageMediaVerifiedDateInput(localLanguageMediaVerifiedDate): promise.Promise<void> {
        return this.localLanguageMediaVerifiedDateInput.sendKeys(localLanguageMediaVerifiedDate);
    }

    getLocalLanguageMediaVerifiedDateInput() {
        return this.localLanguageMediaVerifiedDateInput.getAttribute('value');
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
