import { element, by, promise, ElementFinder } from 'protractor';

export class ProductCountryComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    title = element.all(by.css('jhi-product-country div h2#page-heading span')).first();

    clickOnCreateButton(): promise.Promise<void> {
        return this.createButton.click();
    }

    getTitle(): any {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class ProductCountryUpdatePage {
    pageTitle = element(by.id('jhi-product-country-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    turnAroundTimeInput = element(by.id('field_turnAroundTime'));
    countryInput = element(by.id('field_country'));
    costInput = element(by.id('field_cost'));

    getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    setTurnAroundTimeInput(turnAroundTime): promise.Promise<void> {
        return this.turnAroundTimeInput.sendKeys(turnAroundTime);
    }

    getTurnAroundTimeInput() {
        return this.turnAroundTimeInput.getAttribute('value');
    }

    setCountryInput(country): promise.Promise<void> {
        return this.countryInput.sendKeys(country);
    }

    getCountryInput() {
        return this.countryInput.getAttribute('value');
    }

    setCostInput(cost): promise.Promise<void> {
        return this.costInput.sendKeys(cost);
    }

    getCostInput() {
        return this.costInput.getAttribute('value');
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
