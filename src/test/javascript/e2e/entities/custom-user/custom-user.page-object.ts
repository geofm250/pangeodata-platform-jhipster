import { element, by, promise, ElementFinder } from 'protractor';

export class CustomUserComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    title = element.all(by.css('jhi-custom-user div h2#page-heading span')).first();

    clickOnCreateButton(): promise.Promise<void> {
        return this.createButton.click();
    }

    getTitle(): any {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class CustomUserUpdatePage {
    pageTitle = element(by.id('jhi-custom-user-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    firstnameInput = element(by.id('field_firstname'));
    lastnameInput = element(by.id('field_lastname'));
    usernameInput = element(by.id('field_username'));
    emailInput = element(by.id('field_email'));
    roleInput = element(by.id('field_role'));
    companyInput = element(by.id('field_company'));
    nameInput = element(by.id('field_name'));
    surnameInput = element(by.id('field_surname'));
    passwordInput = element(by.id('field_password'));
    activeInput = element(by.id('field_active'));
    createdAtInput = element(by.id('field_createdAt'));
    updatedAtInput = element(by.id('field_updatedAt'));
    isTokenLoginInput = element(by.id('field_isTokenLogin'));
    orderIdInput = element(by.id('field_orderId'));

    getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    setFirstnameInput(firstname): promise.Promise<void> {
        return this.firstnameInput.sendKeys(firstname);
    }

    getFirstnameInput() {
        return this.firstnameInput.getAttribute('value');
    }

    setLastnameInput(lastname): promise.Promise<void> {
        return this.lastnameInput.sendKeys(lastname);
    }

    getLastnameInput() {
        return this.lastnameInput.getAttribute('value');
    }

    setUsernameInput(username): promise.Promise<void> {
        return this.usernameInput.sendKeys(username);
    }

    getUsernameInput() {
        return this.usernameInput.getAttribute('value');
    }

    setEmailInput(email): promise.Promise<void> {
        return this.emailInput.sendKeys(email);
    }

    getEmailInput() {
        return this.emailInput.getAttribute('value');
    }

    setRoleInput(role): promise.Promise<void> {
        return this.roleInput.sendKeys(role);
    }

    getRoleInput() {
        return this.roleInput.getAttribute('value');
    }

    setCompanyInput(company): promise.Promise<void> {
        return this.companyInput.sendKeys(company);
    }

    getCompanyInput() {
        return this.companyInput.getAttribute('value');
    }

    setNameInput(name): promise.Promise<void> {
        return this.nameInput.sendKeys(name);
    }

    getNameInput() {
        return this.nameInput.getAttribute('value');
    }

    setSurnameInput(surname): promise.Promise<void> {
        return this.surnameInput.sendKeys(surname);
    }

    getSurnameInput() {
        return this.surnameInput.getAttribute('value');
    }

    setPasswordInput(password): promise.Promise<void> {
        return this.passwordInput.sendKeys(password);
    }

    getPasswordInput() {
        return this.passwordInput.getAttribute('value');
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

    setIsTokenLoginInput(isTokenLogin): promise.Promise<void> {
        return this.isTokenLoginInput.sendKeys(isTokenLogin);
    }

    getIsTokenLoginInput() {
        return this.isTokenLoginInput.getAttribute('value');
    }

    setOrderIdInput(orderId): promise.Promise<void> {
        return this.orderIdInput.sendKeys(orderId);
    }

    getOrderIdInput() {
        return this.orderIdInput.getAttribute('value');
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
