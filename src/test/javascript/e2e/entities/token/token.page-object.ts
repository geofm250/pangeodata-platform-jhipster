import { element, by, promise, ElementFinder } from 'protractor';

export class TokenComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    title = element.all(by.css('jhi-token div h2#page-heading span')).first();

    clickOnCreateButton(): promise.Promise<void> {
        return this.createButton.click();
    }

    getTitle(): any {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class TokenUpdatePage {
    pageTitle = element(by.id('jhi-token-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    createdAtInput = element(by.id('field_createdAt'));
    expiredAtInput = element(by.id('field_expiredAt'));
    userIdInput = element(by.id('field_userId'));
    tokenInput = element(by.id('field_token'));

    getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    setCreatedAtInput(createdAt): promise.Promise<void> {
        return this.createdAtInput.sendKeys(createdAt);
    }

    getCreatedAtInput() {
        return this.createdAtInput.getAttribute('value');
    }

    setExpiredAtInput(expiredAt): promise.Promise<void> {
        return this.expiredAtInput.sendKeys(expiredAt);
    }

    getExpiredAtInput() {
        return this.expiredAtInput.getAttribute('value');
    }

    setUserIdInput(userId): promise.Promise<void> {
        return this.userIdInput.sendKeys(userId);
    }

    getUserIdInput() {
        return this.userIdInput.getAttribute('value');
    }

    setTokenInput(token): promise.Promise<void> {
        return this.tokenInput.sendKeys(token);
    }

    getTokenInput() {
        return this.tokenInput.getAttribute('value');
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
