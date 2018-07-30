import { element, by, promise, ElementFinder } from 'protractor';

export class AddressComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    title = element.all(by.css('jhi-address div h2#page-heading span')).first();

    clickOnCreateButton(): promise.Promise<void> {
        return this.createButton.click();
    }

    getTitle(): any {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class AddressUpdatePage {
    pageTitle = element(by.id('jhi-address-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    currentInput = element(by.id('field_current'));
    startDateInput = element(by.id('field_startDate'));
    countryInput = element(by.id('field_country'));
    endDateInput = element(by.id('field_endDate'));
    townInput = element(by.id('field_town'));
    address1Input = element(by.id('field_address1'));
    address2Input = element(by.id('field_address2'));
    postalCodeInput = element(by.id('field_postalCode'));
    provinceInput = element(by.id('field_province'));

    getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    setCurrentInput(current): promise.Promise<void> {
        return this.currentInput.sendKeys(current);
    }

    getCurrentInput() {
        return this.currentInput.getAttribute('value');
    }

    setStartDateInput(startDate): promise.Promise<void> {
        return this.startDateInput.sendKeys(startDate);
    }

    getStartDateInput() {
        return this.startDateInput.getAttribute('value');
    }

    setCountryInput(country): promise.Promise<void> {
        return this.countryInput.sendKeys(country);
    }

    getCountryInput() {
        return this.countryInput.getAttribute('value');
    }

    setEndDateInput(endDate): promise.Promise<void> {
        return this.endDateInput.sendKeys(endDate);
    }

    getEndDateInput() {
        return this.endDateInput.getAttribute('value');
    }

    setTownInput(town): promise.Promise<void> {
        return this.townInput.sendKeys(town);
    }

    getTownInput() {
        return this.townInput.getAttribute('value');
    }

    setAddress1Input(address1): promise.Promise<void> {
        return this.address1Input.sendKeys(address1);
    }

    getAddress1Input() {
        return this.address1Input.getAttribute('value');
    }

    setAddress2Input(address2): promise.Promise<void> {
        return this.address2Input.sendKeys(address2);
    }

    getAddress2Input() {
        return this.address2Input.getAttribute('value');
    }

    setPostalCodeInput(postalCode): promise.Promise<void> {
        return this.postalCodeInput.sendKeys(postalCode);
    }

    getPostalCodeInput() {
        return this.postalCodeInput.getAttribute('value');
    }

    setProvinceInput(province): promise.Promise<void> {
        return this.provinceInput.sendKeys(province);
    }

    getProvinceInput() {
        return this.provinceInput.getAttribute('value');
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
