import { element, by, promise, ElementFinder } from 'protractor';

export class GeneralInformationComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    title = element.all(by.css('jhi-general-information div h2#page-heading span')).first();

    clickOnCreateButton(): promise.Promise<void> {
        return this.createButton.click();
    }

    getTitle(): any {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class GeneralInformationUpdatePage {
    pageTitle = element(by.id('jhi-general-information-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    firstNameInput = element(by.id('field_firstName'));
    middleNameInput = element(by.id('field_middleName'));
    lastNameInput = element(by.id('field_lastName'));
    maidenNameInput = element(by.id('field_maidenName'));
    titleInput = element(by.id('field_title'));
    birthDateInput = element(by.id('field_birthDate'));
    referenceIdInput = element(by.id('field_referenceId'));

    getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    setFirstNameInput(firstName): promise.Promise<void> {
        return this.firstNameInput.sendKeys(firstName);
    }

    getFirstNameInput() {
        return this.firstNameInput.getAttribute('value');
    }

    setMiddleNameInput(middleName): promise.Promise<void> {
        return this.middleNameInput.sendKeys(middleName);
    }

    getMiddleNameInput() {
        return this.middleNameInput.getAttribute('value');
    }

    setLastNameInput(lastName): promise.Promise<void> {
        return this.lastNameInput.sendKeys(lastName);
    }

    getLastNameInput() {
        return this.lastNameInput.getAttribute('value');
    }

    setMaidenNameInput(maidenName): promise.Promise<void> {
        return this.maidenNameInput.sendKeys(maidenName);
    }

    getMaidenNameInput() {
        return this.maidenNameInput.getAttribute('value');
    }

    setTitleInput(title): promise.Promise<void> {
        return this.titleInput.sendKeys(title);
    }

    getTitleInput() {
        return this.titleInput.getAttribute('value');
    }

    setBirthDateInput(birthDate): promise.Promise<void> {
        return this.birthDateInput.sendKeys(birthDate);
    }

    getBirthDateInput() {
        return this.birthDateInput.getAttribute('value');
    }

    setReferenceIdInput(referenceId): promise.Promise<void> {
        return this.referenceIdInput.sendKeys(referenceId);
    }

    getReferenceIdInput() {
        return this.referenceIdInput.getAttribute('value');
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
