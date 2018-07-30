import { element, by, promise, ElementFinder } from 'protractor';

export class RequirementComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    title = element.all(by.css('jhi-requirement div h2#page-heading span')).first();

    clickOnCreateButton(): promise.Promise<void> {
        return this.createButton.click();
    }

    getTitle(): any {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class RequirementUpdatePage {
    pageTitle = element(by.id('jhi-requirement-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    nameInput = element(by.id('field_name'));
    linksInput = element(by.id('field_links'));
    countryInput = element(by.id('field_country'));
    productInput = element(by.id('field_product'));
    typeInput = element(by.id('field_type'));
    inputInput = element(by.id('field_input'));
    formInput = element(by.id('field_form'));
    activeInput = element(by.id('field_active'));
    createdAtInput = element(by.id('field_createdAt'));
    updatedAtInput = element(by.id('field_updatedAt'));
    displayOrderInput = element(by.id('field_displayOrder'));
    displayDownloadLinkInput = element(by.id('field_displayDownloadLink'));
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

    setLinksInput(links): promise.Promise<void> {
        return this.linksInput.sendKeys(links);
    }

    getLinksInput() {
        return this.linksInput.getAttribute('value');
    }

    setCountryInput(country): promise.Promise<void> {
        return this.countryInput.sendKeys(country);
    }

    getCountryInput() {
        return this.countryInput.getAttribute('value');
    }

    setProductInput(product): promise.Promise<void> {
        return this.productInput.sendKeys(product);
    }

    getProductInput() {
        return this.productInput.getAttribute('value');
    }

    setTypeInput(type): promise.Promise<void> {
        return this.typeInput.sendKeys(type);
    }

    getTypeInput() {
        return this.typeInput.getAttribute('value');
    }

    setInputInput(input): promise.Promise<void> {
        return this.inputInput.sendKeys(input);
    }

    getInputInput() {
        return this.inputInput.getAttribute('value');
    }

    setFormInput(form): promise.Promise<void> {
        return this.formInput.sendKeys(form);
    }

    getFormInput() {
        return this.formInput.getAttribute('value');
    }

    setActiveInput(active): promise.Promise<void> {
        return this.activeInput.sendKeys(active);
    }

    getActiveInput() {
        return this.activeInput.getAttribute('value');
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

    setDisplayOrderInput(displayOrder): promise.Promise<void> {
        return this.displayOrderInput.sendKeys(displayOrder);
    }

    getDisplayOrderInput() {
        return this.displayOrderInput.getAttribute('value');
    }

    setDisplayDownloadLinkInput(displayDownloadLink): promise.Promise<void> {
        return this.displayDownloadLinkInput.sendKeys(displayDownloadLink);
    }

    getDisplayDownloadLinkInput() {
        return this.displayDownloadLinkInput.getAttribute('value');
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
