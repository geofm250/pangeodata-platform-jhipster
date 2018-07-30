import { element, by, promise, ElementFinder } from 'protractor';

export class OrderEmploymentFormComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    title = element.all(by.css('jhi-order-employment-form div h2#page-heading span')).first();

    clickOnCreateButton(): promise.Promise<void> {
        return this.createButton.click();
    }

    getTitle(): any {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class OrderEmploymentFormUpdatePage {
    pageTitle = element(by.id('jhi-order-employment-form-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    employerNameInput = element(by.id('field_employerName'));
    managerNameInput = element(by.id('field_managerName'));
    endingPayInput = element(by.id('field_endingPay'));
    rehireEligibilityInput = element(by.id('field_rehireEligibility'));
    institutionLocalNameInput = element(by.id('field_institutionLocalName'));
    sourceWebsiteInput = element(by.id('field_sourceWebsite'));
    sourcePhoneInput = element(by.id('field_sourcePhone'));
    sourceEmailInput = element(by.id('field_sourceEmail'));
    presentInput = element(by.id('field_present'));
    employmentStartDateInput = element(by.id('field_employmentStartDate'));
    employmentEndDateInput = element(by.id('field_employmentEndDate'));
    endingPositionInput = element(by.id('field_endingPosition'));
    startingPositionInput = element(by.id('field_startingPosition'));
    startingPayInput = element(by.id('field_startingPay'));
    streetInput = element(by.id('field_street'));
    postalCodeInput = element(by.id('field_postalCode'));
    reasonForLeavingInput = element(by.id('field_reasonForLeaving'));
    notesInput = element(by.id('field_notes'));

    getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    setEmployerNameInput(employerName): promise.Promise<void> {
        return this.employerNameInput.sendKeys(employerName);
    }

    getEmployerNameInput() {
        return this.employerNameInput.getAttribute('value');
    }

    setManagerNameInput(managerName): promise.Promise<void> {
        return this.managerNameInput.sendKeys(managerName);
    }

    getManagerNameInput() {
        return this.managerNameInput.getAttribute('value');
    }

    setEndingPayInput(endingPay): promise.Promise<void> {
        return this.endingPayInput.sendKeys(endingPay);
    }

    getEndingPayInput() {
        return this.endingPayInput.getAttribute('value');
    }

    setRehireEligibilityInput(rehireEligibility): promise.Promise<void> {
        return this.rehireEligibilityInput.sendKeys(rehireEligibility);
    }

    getRehireEligibilityInput() {
        return this.rehireEligibilityInput.getAttribute('value');
    }

    setInstitutionLocalNameInput(institutionLocalName): promise.Promise<void> {
        return this.institutionLocalNameInput.sendKeys(institutionLocalName);
    }

    getInstitutionLocalNameInput() {
        return this.institutionLocalNameInput.getAttribute('value');
    }

    setSourceWebsiteInput(sourceWebsite): promise.Promise<void> {
        return this.sourceWebsiteInput.sendKeys(sourceWebsite);
    }

    getSourceWebsiteInput() {
        return this.sourceWebsiteInput.getAttribute('value');
    }

    setSourcePhoneInput(sourcePhone): promise.Promise<void> {
        return this.sourcePhoneInput.sendKeys(sourcePhone);
    }

    getSourcePhoneInput() {
        return this.sourcePhoneInput.getAttribute('value');
    }

    setSourceEmailInput(sourceEmail): promise.Promise<void> {
        return this.sourceEmailInput.sendKeys(sourceEmail);
    }

    getSourceEmailInput() {
        return this.sourceEmailInput.getAttribute('value');
    }

    setPresentInput(present): promise.Promise<void> {
        return this.presentInput.sendKeys(present);
    }

    getPresentInput() {
        return this.presentInput.getAttribute('value');
    }

    setEmploymentStartDateInput(employmentStartDate): promise.Promise<void> {
        return this.employmentStartDateInput.sendKeys(employmentStartDate);
    }

    getEmploymentStartDateInput() {
        return this.employmentStartDateInput.getAttribute('value');
    }

    setEmploymentEndDateInput(employmentEndDate): promise.Promise<void> {
        return this.employmentEndDateInput.sendKeys(employmentEndDate);
    }

    getEmploymentEndDateInput() {
        return this.employmentEndDateInput.getAttribute('value');
    }

    setEndingPositionInput(endingPosition): promise.Promise<void> {
        return this.endingPositionInput.sendKeys(endingPosition);
    }

    getEndingPositionInput() {
        return this.endingPositionInput.getAttribute('value');
    }

    setStartingPositionInput(startingPosition): promise.Promise<void> {
        return this.startingPositionInput.sendKeys(startingPosition);
    }

    getStartingPositionInput() {
        return this.startingPositionInput.getAttribute('value');
    }

    setStartingPayInput(startingPay): promise.Promise<void> {
        return this.startingPayInput.sendKeys(startingPay);
    }

    getStartingPayInput() {
        return this.startingPayInput.getAttribute('value');
    }

    setStreetInput(street): promise.Promise<void> {
        return this.streetInput.sendKeys(street);
    }

    getStreetInput() {
        return this.streetInput.getAttribute('value');
    }

    setPostalCodeInput(postalCode): promise.Promise<void> {
        return this.postalCodeInput.sendKeys(postalCode);
    }

    getPostalCodeInput() {
        return this.postalCodeInput.getAttribute('value');
    }

    setReasonForLeavingInput(reasonForLeaving): promise.Promise<void> {
        return this.reasonForLeavingInput.sendKeys(reasonForLeaving);
    }

    getReasonForLeavingInput() {
        return this.reasonForLeavingInput.getAttribute('value');
    }

    setNotesInput(notes): promise.Promise<void> {
        return this.notesInput.sendKeys(notes);
    }

    getNotesInput() {
        return this.notesInput.getAttribute('value');
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
