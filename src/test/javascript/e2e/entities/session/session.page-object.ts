import { element, by, promise, ElementFinder } from 'protractor';

export class SessionComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    title = element.all(by.css('jhi-session div h2#page-heading span')).first();

    clickOnCreateButton(): promise.Promise<void> {
        return this.createButton.click();
    }

    getTitle(): any {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class SessionUpdatePage {
    pageTitle = element(by.id('jhi-session-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    userInput = element(by.id('field_user'));
    passwordTokenInput = element(by.id('field_passwordToken'));

    getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    setUserInput(user): promise.Promise<void> {
        return this.userInput.sendKeys(user);
    }

    getUserInput() {
        return this.userInput.getAttribute('value');
    }

    setPasswordTokenInput(passwordToken): promise.Promise<void> {
        return this.passwordTokenInput.sendKeys(passwordToken);
    }

    getPasswordTokenInput() {
        return this.passwordTokenInput.getAttribute('value');
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
