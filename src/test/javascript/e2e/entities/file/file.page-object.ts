import { element, by, promise, ElementFinder } from 'protractor';

export class FileComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    title = element.all(by.css('jhi-file div h2#page-heading span')).first();

    clickOnCreateButton(): promise.Promise<void> {
        return this.createButton.click();
    }

    getTitle(): any {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class FileUpdatePage {
    pageTitle = element(by.id('jhi-file-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    urlInput = element(by.id('field_url'));
    orderFileIdInput = element(by.id('field_orderFileId'));

    getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    setUrlInput(url): promise.Promise<void> {
        return this.urlInput.sendKeys(url);
    }

    getUrlInput() {
        return this.urlInput.getAttribute('value');
    }

    setOrderFileIdInput(orderFileId): promise.Promise<void> {
        return this.orderFileIdInput.sendKeys(orderFileId);
    }

    getOrderFileIdInput() {
        return this.orderFileIdInput.getAttribute('value');
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
