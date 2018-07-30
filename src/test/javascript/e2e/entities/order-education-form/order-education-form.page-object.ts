import { element, by, promise, ElementFinder } from 'protractor';

export class OrderEducationFormComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    title = element.all(by.css('jhi-order-education-form div h2#page-heading span')).first();

    clickOnCreateButton(): promise.Promise<void> {
        return this.createButton.click();
    }

    getTitle(): any {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class OrderEducationFormUpdatePage {
    pageTitle = element(by.id('jhi-order-education-form-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    typeDiplomaInput = element(by.id('field_typeDiploma'));
    nameOfInstitutionInput = element(by.id('field_nameOfInstitution'));
    institutionLocalNameInput = element(by.id('field_institutionLocalName'));
    subjectInput = element(by.id('field_subject'));
    performanceInput = element(by.id('field_performance'));
    typeOfInstitutionInput = element(by.id('field_typeOfInstitution'));
    sourceWebsiteInput = element(by.id('field_sourceWebsite'));
    sourceNameInput = element(by.id('field_sourceName'));
    sourcePhoneInput = element(by.id('field_sourcePhone'));
    sourceEmailInput = element(by.id('field_sourceEmail'));
    presentInput = element(by.id('field_present'));
    attendanceStartDateInput = element(by.id('field_attendanceStartDate'));
    attendanceEndDateInput = element(by.id('field_attendanceEndDate'));
    diplomaAwardDateInput = element(by.id('field_diplomaAwardDate'));
    studentRegistrationNoInput = element(by.id('field_studentRegistrationNo'));
    townInput = element(by.id('field_town'));
    stateInput = element(by.id('field_state'));
    countryInput = element(by.id('field_country'));
    postalCodeInput = element(by.id('field_postalCode'));
    notesInput = element(by.id('field_notes'));

    getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    setTypeDiplomaInput(typeDiploma): promise.Promise<void> {
        return this.typeDiplomaInput.sendKeys(typeDiploma);
    }

    getTypeDiplomaInput() {
        return this.typeDiplomaInput.getAttribute('value');
    }

    setNameOfInstitutionInput(nameOfInstitution): promise.Promise<void> {
        return this.nameOfInstitutionInput.sendKeys(nameOfInstitution);
    }

    getNameOfInstitutionInput() {
        return this.nameOfInstitutionInput.getAttribute('value');
    }

    setInstitutionLocalNameInput(institutionLocalName): promise.Promise<void> {
        return this.institutionLocalNameInput.sendKeys(institutionLocalName);
    }

    getInstitutionLocalNameInput() {
        return this.institutionLocalNameInput.getAttribute('value');
    }

    setSubjectInput(subject): promise.Promise<void> {
        return this.subjectInput.sendKeys(subject);
    }

    getSubjectInput() {
        return this.subjectInput.getAttribute('value');
    }

    setPerformanceInput(performance): promise.Promise<void> {
        return this.performanceInput.sendKeys(performance);
    }

    getPerformanceInput() {
        return this.performanceInput.getAttribute('value');
    }

    setTypeOfInstitutionInput(typeOfInstitution): promise.Promise<void> {
        return this.typeOfInstitutionInput.sendKeys(typeOfInstitution);
    }

    getTypeOfInstitutionInput() {
        return this.typeOfInstitutionInput.getAttribute('value');
    }

    setSourceWebsiteInput(sourceWebsite): promise.Promise<void> {
        return this.sourceWebsiteInput.sendKeys(sourceWebsite);
    }

    getSourceWebsiteInput() {
        return this.sourceWebsiteInput.getAttribute('value');
    }

    setSourceNameInput(sourceName): promise.Promise<void> {
        return this.sourceNameInput.sendKeys(sourceName);
    }

    getSourceNameInput() {
        return this.sourceNameInput.getAttribute('value');
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

    setAttendanceStartDateInput(attendanceStartDate): promise.Promise<void> {
        return this.attendanceStartDateInput.sendKeys(attendanceStartDate);
    }

    getAttendanceStartDateInput() {
        return this.attendanceStartDateInput.getAttribute('value');
    }

    setAttendanceEndDateInput(attendanceEndDate): promise.Promise<void> {
        return this.attendanceEndDateInput.sendKeys(attendanceEndDate);
    }

    getAttendanceEndDateInput() {
        return this.attendanceEndDateInput.getAttribute('value');
    }

    setDiplomaAwardDateInput(diplomaAwardDate): promise.Promise<void> {
        return this.diplomaAwardDateInput.sendKeys(diplomaAwardDate);
    }

    getDiplomaAwardDateInput() {
        return this.diplomaAwardDateInput.getAttribute('value');
    }

    setStudentRegistrationNoInput(studentRegistrationNo): promise.Promise<void> {
        return this.studentRegistrationNoInput.sendKeys(studentRegistrationNo);
    }

    getStudentRegistrationNoInput() {
        return this.studentRegistrationNoInput.getAttribute('value');
    }

    setTownInput(town): promise.Promise<void> {
        return this.townInput.sendKeys(town);
    }

    getTownInput() {
        return this.townInput.getAttribute('value');
    }

    setStateInput(state): promise.Promise<void> {
        return this.stateInput.sendKeys(state);
    }

    getStateInput() {
        return this.stateInput.getAttribute('value');
    }

    setCountryInput(country): promise.Promise<void> {
        return this.countryInput.sendKeys(country);
    }

    getCountryInput() {
        return this.countryInput.getAttribute('value');
    }

    setPostalCodeInput(postalCode): promise.Promise<void> {
        return this.postalCodeInput.sendKeys(postalCode);
    }

    getPostalCodeInput() {
        return this.postalCodeInput.getAttribute('value');
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
