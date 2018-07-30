import { element, by, promise, ElementFinder } from 'protractor';

export class OrderInputComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    title = element.all(by.css('jhi-order-input div h2#page-heading span')).first();

    clickOnCreateButton(): promise.Promise<void> {
        return this.createButton.click();
    }

    getTitle(): any {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class OrderInputUpdatePage {
    pageTitle = element(by.id('jhi-order-input-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    nameInput = element(by.id('field_name'));
    orderIdInput = element(by.id('field_orderId'));
    labelInput = element(by.id('field_label'));
    inputInput = element(by.id('field_input'));
    iCoverNameInput = element(by.id('field_iCoverName'));

    getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    setNameInput(name): promise.Promise<void> {
        return this.nameInput.sendKeys(name);
    }

    getNameInput() {
        return this.nameInput.getAttribute('value');
    }

    setOrderIdInput(orderId): promise.Promise<void> {
        return this.orderIdInput.sendKeys(orderId);
    }

    getOrderIdInput() {
        return this.orderIdInput.getAttribute('value');
    }

    setLabelInput(label): promise.Promise<void> {
        return this.labelInput.sendKeys(label);
    }

    getLabelInput() {
        return this.labelInput.getAttribute('value');
    }

    setInputInput(input): promise.Promise<void> {
        return this.inputInput.sendKeys(input);
    }

    getInputInput() {
        return this.inputInput.getAttribute('value');
    }

    setICoverNameInput(iCoverName): promise.Promise<void> {
        return this.iCoverNameInput.sendKeys(iCoverName);
    }

    getICoverNameInput() {
        return this.iCoverNameInput.getAttribute('value');
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
