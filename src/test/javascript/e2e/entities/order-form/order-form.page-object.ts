import { element, by, promise, ElementFinder } from 'protractor';

export class OrderFormComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    title = element.all(by.css('jhi-order-form div h2#page-heading span')).first();

    clickOnCreateButton(): promise.Promise<void> {
        return this.createButton.click();
    }

    getTitle(): any {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class OrderFormUpdatePage {
    pageTitle = element(by.id('jhi-order-form-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    formTypeInput = element(by.id('field_formType'));
    inputInput = element(by.id('field_input'));
    validInput = element(by.id('field_valid'));
    nameInput = element(by.id('field_name'));

    getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    setFormTypeInput(formType): promise.Promise<void> {
        return this.formTypeInput.sendKeys(formType);
    }

    getFormTypeInput() {
        return this.formTypeInput.getAttribute('value');
    }

    setInputInput(input): promise.Promise<void> {
        return this.inputInput.sendKeys(input);
    }

    getInputInput() {
        return this.inputInput.getAttribute('value');
    }

    setValidInput(valid): promise.Promise<void> {
        return this.validInput.sendKeys(valid);
    }

    getValidInput() {
        return this.validInput.getAttribute('value');
    }

    setNameInput(name): promise.Promise<void> {
        return this.nameInput.sendKeys(name);
    }

    getNameInput() {
        return this.nameInput.getAttribute('value');
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
