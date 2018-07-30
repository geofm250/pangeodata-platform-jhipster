import { element, by, promise, ElementFinder } from 'protractor';

export class TransactionComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    title = element.all(by.css('jhi-transaction div h2#page-heading span')).first();

    clickOnCreateButton(): promise.Promise<void> {
        return this.createButton.click();
    }

    getTitle(): any {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class TransactionUpdatePage {
    pageTitle = element(by.id('jhi-transaction-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    generalnformationInput = element(by.id('field_generalnformation'));
    addessesInput = element(by.id('field_addesses'));
    statusInput = element(by.id('field_status'));
    statusDisplayInput = element(by.id('field_statusDisplay'));
    editableInput = element(by.id('field_editable'));
    editModeInput = element(by.id('field_editMode'));
    activeInput = element(by.id('field_active'));
    costInput = element(by.id('field_cost'));
    referenceIdInput = element(by.id('field_referenceId'));
    userInput = element(by.id('field_user'));
    companyInput = element(by.id('field_company'));
    createdAtInput = element(by.id('field_createdAt'));
    statusNrInput = element(by.id('field_statusNr'));
    redirectUrlInput = element(by.id('field_redirectUrl'));
    consentFormInput = element(by.id('field_consentForm'));
    localConsentFormInput = element(by.id('field_localConsentForm'));
    validInput = element(by.id('field_valid'));
    updatedAtInput = element(by.id('field_updatedAt'));
    ordersInput = element(by.id('field_orders'));

    getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    setGeneralnformationInput(generalnformation): promise.Promise<void> {
        return this.generalnformationInput.sendKeys(generalnformation);
    }

    getGeneralnformationInput() {
        return this.generalnformationInput.getAttribute('value');
    }

    setAddessesInput(addesses): promise.Promise<void> {
        return this.addessesInput.sendKeys(addesses);
    }

    getAddessesInput() {
        return this.addessesInput.getAttribute('value');
    }

    setStatusInput(status): promise.Promise<void> {
        return this.statusInput.sendKeys(status);
    }

    getStatusInput() {
        return this.statusInput.getAttribute('value');
    }

    setStatusDisplayInput(statusDisplay): promise.Promise<void> {
        return this.statusDisplayInput.sendKeys(statusDisplay);
    }

    getStatusDisplayInput() {
        return this.statusDisplayInput.getAttribute('value');
    }

    setEditableInput(editable): promise.Promise<void> {
        return this.editableInput.sendKeys(editable);
    }

    getEditableInput() {
        return this.editableInput.getAttribute('value');
    }

    setEditModeInput(editMode): promise.Promise<void> {
        return this.editModeInput.sendKeys(editMode);
    }

    getEditModeInput() {
        return this.editModeInput.getAttribute('value');
    }

    setActiveInput(active): promise.Promise<void> {
        return this.activeInput.sendKeys(active);
    }

    getActiveInput() {
        return this.activeInput.getAttribute('value');
    }

    setCostInput(cost): promise.Promise<void> {
        return this.costInput.sendKeys(cost);
    }

    getCostInput() {
        return this.costInput.getAttribute('value');
    }

    setReferenceIdInput(referenceId): promise.Promise<void> {
        return this.referenceIdInput.sendKeys(referenceId);
    }

    getReferenceIdInput() {
        return this.referenceIdInput.getAttribute('value');
    }

    setUserInput(user): promise.Promise<void> {
        return this.userInput.sendKeys(user);
    }

    getUserInput() {
        return this.userInput.getAttribute('value');
    }

    setCompanyInput(company): promise.Promise<void> {
        return this.companyInput.sendKeys(company);
    }

    getCompanyInput() {
        return this.companyInput.getAttribute('value');
    }

    setCreatedAtInput(createdAt): promise.Promise<void> {
        return this.createdAtInput.sendKeys(createdAt);
    }

    getCreatedAtInput() {
        return this.createdAtInput.getAttribute('value');
    }

    setStatusNrInput(statusNr): promise.Promise<void> {
        return this.statusNrInput.sendKeys(statusNr);
    }

    getStatusNrInput() {
        return this.statusNrInput.getAttribute('value');
    }

    setRedirectUrlInput(redirectUrl): promise.Promise<void> {
        return this.redirectUrlInput.sendKeys(redirectUrl);
    }

    getRedirectUrlInput() {
        return this.redirectUrlInput.getAttribute('value');
    }

    setConsentFormInput(consentForm): promise.Promise<void> {
        return this.consentFormInput.sendKeys(consentForm);
    }

    getConsentFormInput() {
        return this.consentFormInput.getAttribute('value');
    }

    setLocalConsentFormInput(localConsentForm): promise.Promise<void> {
        return this.localConsentFormInput.sendKeys(localConsentForm);
    }

    getLocalConsentFormInput() {
        return this.localConsentFormInput.getAttribute('value');
    }

    setValidInput(valid): promise.Promise<void> {
        return this.validInput.sendKeys(valid);
    }

    getValidInput() {
        return this.validInput.getAttribute('value');
    }

    setUpdatedAtInput(updatedAt): promise.Promise<void> {
        return this.updatedAtInput.sendKeys(updatedAt);
    }

    getUpdatedAtInput() {
        return this.updatedAtInput.getAttribute('value');
    }

    setOrdersInput(orders): promise.Promise<void> {
        return this.ordersInput.sendKeys(orders);
    }

    getOrdersInput() {
        return this.ordersInput.getAttribute('value');
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
