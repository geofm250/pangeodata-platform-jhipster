import { element, by, promise, ElementFinder } from 'protractor';

export class MigrationComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    title = element.all(by.css('jhi-migration div h2#page-heading span')).first();

    clickOnCreateButton(): promise.Promise<void> {
        return this.createButton.click();
    }

    getTitle(): any {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class MigrationUpdatePage {
    pageTitle = element(by.id('jhi-migration-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    descriptionInput = element(by.id('field_description'));
    versionInput = element(by.id('field_version'));

    getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    setDescriptionInput(description): promise.Promise<void> {
        return this.descriptionInput.sendKeys(description);
    }

    getDescriptionInput() {
        return this.descriptionInput.getAttribute('value');
    }

    setVersionInput(version): promise.Promise<void> {
        return this.versionInput.sendKeys(version);
    }

    getVersionInput() {
        return this.versionInput.getAttribute('value');
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
