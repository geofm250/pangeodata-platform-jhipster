import { element, by, promise, ElementFinder } from 'protractor';

export class EmploymentReportComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    title = element.all(by.css('jhi-employment-report div h2#page-heading span')).first();

    clickOnCreateButton(): promise.Promise<void> {
        return this.createButton.click();
    }

    getTitle(): any {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class EmploymentReportUpdatePage {
    pageTitle = element(by.id('jhi-employment-report-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    employerVerifiedInput = element(by.id('field_employerVerified'));
    employmentStartDateVerifiedInput = element(by.id('field_employmentStartDateVerified'));
    employmentEndDateVerifiedInput = element(by.id('field_employmentEndDateVerified'));
    titleVerifiedInput = element(by.id('field_titleVerified'));
    slaryVerifiedInput = element(by.id('field_slaryVerified'));
    reasonForTerminationInput = element(by.id('field_reasonForTermination'));
    employmentPersonContactNameInput = element(by.id('field_employmentPersonContactName'));
    employmentDesignationContactInput = element(by.id('field_employmentDesignationContact'));
    employmentVerifiedDateInput = element(by.id('field_employmentVerifiedDate'));
    employmentRehireEligibilityInput = element(by.id('field_employmentRehireEligibility'));
    employmentRehireExplanationInput = element(by.id('field_employmentRehireExplanation'));
    employmentRemarksInput = element(by.id('field_employmentRemarks'));

    getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    setEmployerVerifiedInput(employerVerified): promise.Promise<void> {
        return this.employerVerifiedInput.sendKeys(employerVerified);
    }

    getEmployerVerifiedInput() {
        return this.employerVerifiedInput.getAttribute('value');
    }

    setEmploymentStartDateVerifiedInput(employmentStartDateVerified): promise.Promise<void> {
        return this.employmentStartDateVerifiedInput.sendKeys(employmentStartDateVerified);
    }

    getEmploymentStartDateVerifiedInput() {
        return this.employmentStartDateVerifiedInput.getAttribute('value');
    }

    setEmploymentEndDateVerifiedInput(employmentEndDateVerified): promise.Promise<void> {
        return this.employmentEndDateVerifiedInput.sendKeys(employmentEndDateVerified);
    }

    getEmploymentEndDateVerifiedInput() {
        return this.employmentEndDateVerifiedInput.getAttribute('value');
    }

    setTitleVerifiedInput(titleVerified): promise.Promise<void> {
        return this.titleVerifiedInput.sendKeys(titleVerified);
    }

    getTitleVerifiedInput() {
        return this.titleVerifiedInput.getAttribute('value');
    }

    setSlaryVerifiedInput(slaryVerified): promise.Promise<void> {
        return this.slaryVerifiedInput.sendKeys(slaryVerified);
    }

    getSlaryVerifiedInput() {
        return this.slaryVerifiedInput.getAttribute('value');
    }

    setReasonForTerminationInput(reasonForTermination): promise.Promise<void> {
        return this.reasonForTerminationInput.sendKeys(reasonForTermination);
    }

    getReasonForTerminationInput() {
        return this.reasonForTerminationInput.getAttribute('value');
    }

    setEmploymentPersonContactNameInput(employmentPersonContactName): promise.Promise<void> {
        return this.employmentPersonContactNameInput.sendKeys(employmentPersonContactName);
    }

    getEmploymentPersonContactNameInput() {
        return this.employmentPersonContactNameInput.getAttribute('value');
    }

    setEmploymentDesignationContactInput(employmentDesignationContact): promise.Promise<void> {
        return this.employmentDesignationContactInput.sendKeys(employmentDesignationContact);
    }

    getEmploymentDesignationContactInput() {
        return this.employmentDesignationContactInput.getAttribute('value');
    }

    setEmploymentVerifiedDateInput(employmentVerifiedDate): promise.Promise<void> {
        return this.employmentVerifiedDateInput.sendKeys(employmentVerifiedDate);
    }

    getEmploymentVerifiedDateInput() {
        return this.employmentVerifiedDateInput.getAttribute('value');
    }

    setEmploymentRehireEligibilityInput(employmentRehireEligibility): promise.Promise<void> {
        return this.employmentRehireEligibilityInput.sendKeys(employmentRehireEligibility);
    }

    getEmploymentRehireEligibilityInput() {
        return this.employmentRehireEligibilityInput.getAttribute('value');
    }

    setEmploymentRehireExplanationInput(employmentRehireExplanation): promise.Promise<void> {
        return this.employmentRehireExplanationInput.sendKeys(employmentRehireExplanation);
    }

    getEmploymentRehireExplanationInput() {
        return this.employmentRehireExplanationInput.getAttribute('value');
    }

    setEmploymentRemarksInput(employmentRemarks): promise.Promise<void> {
        return this.employmentRemarksInput.sendKeys(employmentRemarks);
    }

    getEmploymentRemarksInput() {
        return this.employmentRemarksInput.getAttribute('value');
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
