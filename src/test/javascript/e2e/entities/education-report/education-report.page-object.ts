import { element, by, promise, ElementFinder } from 'protractor';

export class EducationReportComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    title = element.all(by.css('jhi-education-report div h2#page-heading span')).first();

    clickOnCreateButton(): promise.Promise<void> {
        return this.createButton.click();
    }

    getTitle(): any {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class EducationReportUpdatePage {
    pageTitle = element(by.id('jhi-education-report-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    degreeVerifiedInput = element(by.id('field_degreeVerified'));
    institutionVerifiedInput = element(by.id('field_institutionVerified'));
    attendanceStartDateVerifiedInput = element(by.id('field_attendanceStartDateVerified'));
    attendanceEndDateInput = element(by.id('field_attendanceEndDate'));
    attendanceEndDateVerifiedInput = element(by.id('field_attendanceEndDateVerified'));
    degreeEarnedInput = element(by.id('field_degreeEarned'));
    majorVerifiedInput = element(by.id('field_majorVerified'));
    graduationDateVerifiedInput = element(by.id('field_graduationDateVerified'));
    educationPersonContactNameInput = element(by.id('field_educationPersonContactName'));
    educationDesignationContactInput = element(by.id('field_educationDesignationContact'));
    educationVerifiedDateInput = element(by.id('field_educationVerifiedDate'));
    educationRemarksInput = element(by.id('field_educationRemarks'));

    getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    setDegreeVerifiedInput(degreeVerified): promise.Promise<void> {
        return this.degreeVerifiedInput.sendKeys(degreeVerified);
    }

    getDegreeVerifiedInput() {
        return this.degreeVerifiedInput.getAttribute('value');
    }

    setInstitutionVerifiedInput(institutionVerified): promise.Promise<void> {
        return this.institutionVerifiedInput.sendKeys(institutionVerified);
    }

    getInstitutionVerifiedInput() {
        return this.institutionVerifiedInput.getAttribute('value');
    }

    setAttendanceStartDateVerifiedInput(attendanceStartDateVerified): promise.Promise<void> {
        return this.attendanceStartDateVerifiedInput.sendKeys(attendanceStartDateVerified);
    }

    getAttendanceStartDateVerifiedInput() {
        return this.attendanceStartDateVerifiedInput.getAttribute('value');
    }

    setAttendanceEndDateInput(attendanceEndDate): promise.Promise<void> {
        return this.attendanceEndDateInput.sendKeys(attendanceEndDate);
    }

    getAttendanceEndDateInput() {
        return this.attendanceEndDateInput.getAttribute('value');
    }

    setAttendanceEndDateVerifiedInput(attendanceEndDateVerified): promise.Promise<void> {
        return this.attendanceEndDateVerifiedInput.sendKeys(attendanceEndDateVerified);
    }

    getAttendanceEndDateVerifiedInput() {
        return this.attendanceEndDateVerifiedInput.getAttribute('value');
    }

    setDegreeEarnedInput(degreeEarned): promise.Promise<void> {
        return this.degreeEarnedInput.sendKeys(degreeEarned);
    }

    getDegreeEarnedInput() {
        return this.degreeEarnedInput.getAttribute('value');
    }

    setMajorVerifiedInput(majorVerified): promise.Promise<void> {
        return this.majorVerifiedInput.sendKeys(majorVerified);
    }

    getMajorVerifiedInput() {
        return this.majorVerifiedInput.getAttribute('value');
    }

    setGraduationDateVerifiedInput(graduationDateVerified): promise.Promise<void> {
        return this.graduationDateVerifiedInput.sendKeys(graduationDateVerified);
    }

    getGraduationDateVerifiedInput() {
        return this.graduationDateVerifiedInput.getAttribute('value');
    }

    setEducationPersonContactNameInput(educationPersonContactName): promise.Promise<void> {
        return this.educationPersonContactNameInput.sendKeys(educationPersonContactName);
    }

    getEducationPersonContactNameInput() {
        return this.educationPersonContactNameInput.getAttribute('value');
    }

    setEducationDesignationContactInput(educationDesignationContact): promise.Promise<void> {
        return this.educationDesignationContactInput.sendKeys(educationDesignationContact);
    }

    getEducationDesignationContactInput() {
        return this.educationDesignationContactInput.getAttribute('value');
    }

    setEducationVerifiedDateInput(educationVerifiedDate): promise.Promise<void> {
        return this.educationVerifiedDateInput.sendKeys(educationVerifiedDate);
    }

    getEducationVerifiedDateInput() {
        return this.educationVerifiedDateInput.getAttribute('value');
    }

    setEducationRemarksInput(educationRemarks): promise.Promise<void> {
        return this.educationRemarksInput.sendKeys(educationRemarks);
    }

    getEducationRemarksInput() {
        return this.educationRemarksInput.getAttribute('value');
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
