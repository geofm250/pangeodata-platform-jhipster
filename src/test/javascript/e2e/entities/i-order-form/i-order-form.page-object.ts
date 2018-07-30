import { element, by, promise, ElementFinder } from 'protractor';

export class IOrderFormComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    title = element.all(by.css('jhi-i-order-form div h2#page-heading span')).first();

    clickOnCreateButton(): promise.Promise<void> {
        return this.createButton.click();
    }

    getTitle(): any {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class IOrderFormUpdatePage {
    pageTitle = element(by.id('jhi-i-order-form-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));

    getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
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
