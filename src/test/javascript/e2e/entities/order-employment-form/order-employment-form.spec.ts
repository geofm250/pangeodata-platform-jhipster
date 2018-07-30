import { browser } from 'protractor';
import { NavBarPage } from './../../page-objects/jhi-page-objects';
import { OrderEmploymentFormComponentsPage, OrderEmploymentFormUpdatePage } from './order-employment-form.page-object';

describe('OrderEmploymentForm e2e test', () => {
    let navBarPage: NavBarPage;
    let orderEmploymentFormUpdatePage: OrderEmploymentFormUpdatePage;
    let orderEmploymentFormComponentsPage: OrderEmploymentFormComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load OrderEmploymentForms', () => {
        navBarPage.goToEntity('order-employment-form');
        orderEmploymentFormComponentsPage = new OrderEmploymentFormComponentsPage();
        expect(orderEmploymentFormComponentsPage.getTitle()).toMatch(/pangeodataJHipsterApp.orderEmploymentForm.home.title/);
    });

    it('should load create OrderEmploymentForm page', () => {
        orderEmploymentFormComponentsPage.clickOnCreateButton();
        orderEmploymentFormUpdatePage = new OrderEmploymentFormUpdatePage();
        expect(orderEmploymentFormUpdatePage.getPageTitle()).toMatch(/pangeodataJHipsterApp.orderEmploymentForm.home.createOrEditLabel/);
        orderEmploymentFormUpdatePage.cancel();
    });

    it('should create and save OrderEmploymentForms', () => {
        orderEmploymentFormComponentsPage.clickOnCreateButton();
        orderEmploymentFormUpdatePage.setEmployerNameInput('employerName');
        expect(orderEmploymentFormUpdatePage.getEmployerNameInput()).toMatch('employerName');
        orderEmploymentFormUpdatePage.setManagerNameInput('managerName');
        expect(orderEmploymentFormUpdatePage.getManagerNameInput()).toMatch('managerName');
        orderEmploymentFormUpdatePage.setEndingPayInput('endingPay');
        expect(orderEmploymentFormUpdatePage.getEndingPayInput()).toMatch('endingPay');
        orderEmploymentFormUpdatePage.setRehireEligibilityInput('rehireEligibility');
        expect(orderEmploymentFormUpdatePage.getRehireEligibilityInput()).toMatch('rehireEligibility');
        orderEmploymentFormUpdatePage.setInstitutionLocalNameInput('institutionLocalName');
        expect(orderEmploymentFormUpdatePage.getInstitutionLocalNameInput()).toMatch('institutionLocalName');
        orderEmploymentFormUpdatePage.setSourceWebsiteInput('sourceWebsite');
        expect(orderEmploymentFormUpdatePage.getSourceWebsiteInput()).toMatch('sourceWebsite');
        orderEmploymentFormUpdatePage.setSourcePhoneInput('sourcePhone');
        expect(orderEmploymentFormUpdatePage.getSourcePhoneInput()).toMatch('sourcePhone');
        orderEmploymentFormUpdatePage.setSourceEmailInput('sourceEmail');
        expect(orderEmploymentFormUpdatePage.getSourceEmailInput()).toMatch('sourceEmail');
        orderEmploymentFormUpdatePage.setPresentInput('present');
        expect(orderEmploymentFormUpdatePage.getPresentInput()).toMatch('present');
        orderEmploymentFormUpdatePage.setEmploymentStartDateInput('employmentStartDate');
        expect(orderEmploymentFormUpdatePage.getEmploymentStartDateInput()).toMatch('employmentStartDate');
        orderEmploymentFormUpdatePage.setEmploymentEndDateInput('employmentEndDate');
        expect(orderEmploymentFormUpdatePage.getEmploymentEndDateInput()).toMatch('employmentEndDate');
        orderEmploymentFormUpdatePage.setEndingPositionInput('endingPosition');
        expect(orderEmploymentFormUpdatePage.getEndingPositionInput()).toMatch('endingPosition');
        orderEmploymentFormUpdatePage.setStartingPositionInput('startingPosition');
        expect(orderEmploymentFormUpdatePage.getStartingPositionInput()).toMatch('startingPosition');
        orderEmploymentFormUpdatePage.setStartingPayInput('startingPay');
        expect(orderEmploymentFormUpdatePage.getStartingPayInput()).toMatch('startingPay');
        orderEmploymentFormUpdatePage.setStreetInput('street');
        expect(orderEmploymentFormUpdatePage.getStreetInput()).toMatch('street');
        orderEmploymentFormUpdatePage.setPostalCodeInput('postalCode');
        expect(orderEmploymentFormUpdatePage.getPostalCodeInput()).toMatch('postalCode');
        orderEmploymentFormUpdatePage.setReasonForLeavingInput('reasonForLeaving');
        expect(orderEmploymentFormUpdatePage.getReasonForLeavingInput()).toMatch('reasonForLeaving');
        orderEmploymentFormUpdatePage.setNotesInput('notes');
        expect(orderEmploymentFormUpdatePage.getNotesInput()).toMatch('notes');
        orderEmploymentFormUpdatePage.save();
        expect(orderEmploymentFormUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});
