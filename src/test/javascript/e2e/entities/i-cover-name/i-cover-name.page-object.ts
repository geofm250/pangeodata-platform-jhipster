import { element, by, promise, ElementFinder } from 'protractor';

export class ICoverNameComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    title = element.all(by.css('jhi-i-cover-name div h2#page-heading span')).first();

    clickOnCreateButton(): promise.Promise<void> {
        return this.createButton.click();
    }

    getTitle(): any {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class ICoverNameUpdatePage {
    pageTitle = element(by.id('jhi-i-cover-name-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    nameInput = element(by.id('field_name'));
    requirementIdInput = element(by.id('field_requirementId'));

    getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    setNameInput(name): promise.Promise<void> {
        return this.nameInput.sendKeys(name);
    }

    getNameInput() {
        return this.nameInput.getAttribute('value');
    }

    setRequirementIdInput(requirementId): promise.Promise<void> {
        return this.requirementIdInput.sendKeys(requirementId);
    }

    getRequirementIdInput() {
        return this.requirementIdInput.getAttribute('value');
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
