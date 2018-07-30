import { element, by, promise, ElementFinder } from 'protractor';

export class LinkComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    title = element.all(by.css('jhi-link div h2#page-heading span')).first();

    clickOnCreateButton(): promise.Promise<void> {
        return this.createButton.click();
    }

    getTitle(): any {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class LinkUpdatePage {
    pageTitle = element(by.id('jhi-link-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    requirementIdInput = element(by.id('field_requirementId'));
    urlInput = element(by.id('field_url'));

    getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    setRequirementIdInput(requirementId): promise.Promise<void> {
        return this.requirementIdInput.sendKeys(requirementId);
    }

    getRequirementIdInput() {
        return this.requirementIdInput.getAttribute('value');
    }

    setUrlInput(url): promise.Promise<void> {
        return this.urlInput.sendKeys(url);
    }

    getUrlInput() {
        return this.urlInput.getAttribute('value');
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
