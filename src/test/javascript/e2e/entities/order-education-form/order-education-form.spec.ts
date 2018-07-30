import { browser } from 'protractor';
import { NavBarPage } from './../../page-objects/jhi-page-objects';
import { OrderEducationFormComponentsPage, OrderEducationFormUpdatePage } from './order-education-form.page-object';

describe('OrderEducationForm e2e test', () => {
    let navBarPage: NavBarPage;
    let orderEducationFormUpdatePage: OrderEducationFormUpdatePage;
    let orderEducationFormComponentsPage: OrderEducationFormComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load OrderEducationForms', () => {
        navBarPage.goToEntity('order-education-form');
        orderEducationFormComponentsPage = new OrderEducationFormComponentsPage();
        expect(orderEducationFormComponentsPage.getTitle()).toMatch(/pangeodataJHipsterApp.orderEducationForm.home.title/);
    });

    it('should load create OrderEducationForm page', () => {
        orderEducationFormComponentsPage.clickOnCreateButton();
        orderEducationFormUpdatePage = new OrderEducationFormUpdatePage();
        expect(orderEducationFormUpdatePage.getPageTitle()).toMatch(/pangeodataJHipsterApp.orderEducationForm.home.createOrEditLabel/);
        orderEducationFormUpdatePage.cancel();
    });

    it('should create and save OrderEducationForms', () => {
        orderEducationFormComponentsPage.clickOnCreateButton();
        orderEducationFormUpdatePage.setTypeDiplomaInput('typeDiploma');
        expect(orderEducationFormUpdatePage.getTypeDiplomaInput()).toMatch('typeDiploma');
        orderEducationFormUpdatePage.setNameOfInstitutionInput('nameOfInstitution');
        expect(orderEducationFormUpdatePage.getNameOfInstitutionInput()).toMatch('nameOfInstitution');
        orderEducationFormUpdatePage.setInstitutionLocalNameInput('institutionLocalName');
        expect(orderEducationFormUpdatePage.getInstitutionLocalNameInput()).toMatch('institutionLocalName');
        orderEducationFormUpdatePage.setSubjectInput('subject');
        expect(orderEducationFormUpdatePage.getSubjectInput()).toMatch('subject');
        orderEducationFormUpdatePage.setPerformanceInput('performance');
        expect(orderEducationFormUpdatePage.getPerformanceInput()).toMatch('performance');
        orderEducationFormUpdatePage.setTypeOfInstitutionInput('typeOfInstitution');
        expect(orderEducationFormUpdatePage.getTypeOfInstitutionInput()).toMatch('typeOfInstitution');
        orderEducationFormUpdatePage.setSourceWebsiteInput('sourceWebsite');
        expect(orderEducationFormUpdatePage.getSourceWebsiteInput()).toMatch('sourceWebsite');
        orderEducationFormUpdatePage.setSourceNameInput('sourceName');
        expect(orderEducationFormUpdatePage.getSourceNameInput()).toMatch('sourceName');
        orderEducationFormUpdatePage.setSourcePhoneInput('sourcePhone');
        expect(orderEducationFormUpdatePage.getSourcePhoneInput()).toMatch('sourcePhone');
        orderEducationFormUpdatePage.setSourceEmailInput('sourceEmail');
        expect(orderEducationFormUpdatePage.getSourceEmailInput()).toMatch('sourceEmail');
        orderEducationFormUpdatePage.setPresentInput('present');
        expect(orderEducationFormUpdatePage.getPresentInput()).toMatch('present');
        orderEducationFormUpdatePage.setAttendanceStartDateInput('attendanceStartDate');
        expect(orderEducationFormUpdatePage.getAttendanceStartDateInput()).toMatch('attendanceStartDate');
        orderEducationFormUpdatePage.setAttendanceEndDateInput('attendanceEndDate');
        expect(orderEducationFormUpdatePage.getAttendanceEndDateInput()).toMatch('attendanceEndDate');
        orderEducationFormUpdatePage.setDiplomaAwardDateInput('diplomaAwardDate');
        expect(orderEducationFormUpdatePage.getDiplomaAwardDateInput()).toMatch('diplomaAwardDate');
        orderEducationFormUpdatePage.setStudentRegistrationNoInput('studentRegistrationNo');
        expect(orderEducationFormUpdatePage.getStudentRegistrationNoInput()).toMatch('studentRegistrationNo');
        orderEducationFormUpdatePage.setTownInput('town');
        expect(orderEducationFormUpdatePage.getTownInput()).toMatch('town');
        orderEducationFormUpdatePage.setStateInput('state');
        expect(orderEducationFormUpdatePage.getStateInput()).toMatch('state');
        orderEducationFormUpdatePage.setCountryInput('country');
        expect(orderEducationFormUpdatePage.getCountryInput()).toMatch('country');
        orderEducationFormUpdatePage.setPostalCodeInput('postalCode');
        expect(orderEducationFormUpdatePage.getPostalCodeInput()).toMatch('postalCode');
        orderEducationFormUpdatePage.setNotesInput('notes');
        expect(orderEducationFormUpdatePage.getNotesInput()).toMatch('notes');
        orderEducationFormUpdatePage.save();
        expect(orderEducationFormUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});
