import { element, by, promise, ElementFinder } from 'protractor';

export class ProductComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    title = element.all(by.css('jhi-product div h2#page-heading span')).first();

    clickOnCreateButton(): promise.Promise<void> {
        return this.createButton.click();
    }

    getTitle(): any {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class ProductUpdatePage {
    pageTitle = element(by.id('jhi-product-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    activeInput = element(by.id('field_active'));
    nameInput = element(by.id('field_name'));
    descriptionInput = element(by.id('field_description'));
    turnAroundTimeInput = element(by.id('field_turnAroundTime'));
    costInput = element(by.id('field_cost'));
    countriesInput = element(by.id('field_countries'));
    createdAtInput = element(by.id('field_createdAt'));
    updatedAtInput = element(by.id('field_updatedAt'));

    getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    setActiveInput(active): promise.Promise<void> {
        return this.activeInput.sendKeys(active);
    }

    getActiveInput() {
        return this.activeInput.getAttribute('value');
    }

    setNameInput(name): promise.Promise<void> {
        return this.nameInput.sendKeys(name);
    }

    getNameInput() {
        return this.nameInput.getAttribute('value');
    }

    setDescriptionInput(description): promise.Promise<void> {
        return this.descriptionInput.sendKeys(description);
    }

    getDescriptionInput() {
        return this.descriptionInput.getAttribute('value');
    }

    setTurnAroundTimeInput(turnAroundTime): promise.Promise<void> {
        return this.turnAroundTimeInput.sendKeys(turnAroundTime);
    }

    getTurnAroundTimeInput() {
        return this.turnAroundTimeInput.getAttribute('value');
    }

    setCostInput(cost): promise.Promise<void> {
        return this.costInput.sendKeys(cost);
    }

    getCostInput() {
        return this.costInput.getAttribute('value');
    }

    setCountriesInput(countries): promise.Promise<void> {
        return this.countriesInput.sendKeys(countries);
    }

    getCountriesInput() {
        return this.countriesInput.getAttribute('value');
    }

    setCreatedAtInput(createdAt): promise.Promise<void> {
        return this.createdAtInput.sendKeys(createdAt);
    }

    getCreatedAtInput() {
        return this.createdAtInput.getAttribute('value');
    }

    setUpdatedAtInput(updatedAt): promise.Promise<void> {
        return this.updatedAtInput.sendKeys(updatedAt);
    }

    getUpdatedAtInput() {
        return this.updatedAtInput.getAttribute('value');
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
