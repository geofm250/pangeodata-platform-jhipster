import { browser } from 'protractor';
import { NavBarPage } from './../../page-objects/jhi-page-objects';
import { EmploymentReportComponentsPage, EmploymentReportUpdatePage } from './employment-report.page-object';

describe('EmploymentReport e2e test', () => {
    let navBarPage: NavBarPage;
    let employmentReportUpdatePage: EmploymentReportUpdatePage;
    let employmentReportComponentsPage: EmploymentReportComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load EmploymentReports', () => {
        navBarPage.goToEntity('employment-report');
        employmentReportComponentsPage = new EmploymentReportComponentsPage();
        expect(employmentReportComponentsPage.getTitle()).toMatch(/pangeodataJHipsterApp.employmentReport.home.title/);
    });

    it('should load create EmploymentReport page', () => {
        employmentReportComponentsPage.clickOnCreateButton();
        employmentReportUpdatePage = new EmploymentReportUpdatePage();
        expect(employmentReportUpdatePage.getPageTitle()).toMatch(/pangeodataJHipsterApp.employmentReport.home.createOrEditLabel/);
        employmentReportUpdatePage.cancel();
    });

    it('should create and save EmploymentReports', () => {
        employmentReportComponentsPage.clickOnCreateButton();
        employmentReportUpdatePage.setEmployerVerifiedInput('employerVerified');
        expect(employmentReportUpdatePage.getEmployerVerifiedInput()).toMatch('employerVerified');
        employmentReportUpdatePage.setEmploymentStartDateVerifiedInput('employmentStartDateVerified');
        expect(employmentReportUpdatePage.getEmploymentStartDateVerifiedInput()).toMatch('employmentStartDateVerified');
        employmentReportUpdatePage.setEmploymentEndDateVerifiedInput('employmentEndDateVerified');
        expect(employmentReportUpdatePage.getEmploymentEndDateVerifiedInput()).toMatch('employmentEndDateVerified');
        employmentReportUpdatePage.setTitleVerifiedInput('titleVerified');
        expect(employmentReportUpdatePage.getTitleVerifiedInput()).toMatch('titleVerified');
        employmentReportUpdatePage.setSlaryVerifiedInput('slaryVerified');
        expect(employmentReportUpdatePage.getSlaryVerifiedInput()).toMatch('slaryVerified');
        employmentReportUpdatePage.setReasonForTerminationInput('reasonForTermination');
        expect(employmentReportUpdatePage.getReasonForTerminationInput()).toMatch('reasonForTermination');
        employmentReportUpdatePage.setEmploymentPersonContactNameInput('employmentPersonContactName');
        expect(employmentReportUpdatePage.getEmploymentPersonContactNameInput()).toMatch('employmentPersonContactName');
        employmentReportUpdatePage.setEmploymentDesignationContactInput('employmentDesignationContact');
        expect(employmentReportUpdatePage.getEmploymentDesignationContactInput()).toMatch('employmentDesignationContact');
        employmentReportUpdatePage.setEmploymentVerifiedDateInput('employmentVerifiedDate');
        expect(employmentReportUpdatePage.getEmploymentVerifiedDateInput()).toMatch('employmentVerifiedDate');
        employmentReportUpdatePage.setEmploymentRehireEligibilityInput('employmentRehireEligibility');
        expect(employmentReportUpdatePage.getEmploymentRehireEligibilityInput()).toMatch('employmentRehireEligibility');
        employmentReportUpdatePage.setEmploymentRehireExplanationInput('employmentRehireExplanation');
        expect(employmentReportUpdatePage.getEmploymentRehireExplanationInput()).toMatch('employmentRehireExplanation');
        employmentReportUpdatePage.setEmploymentRemarksInput('employmentRemarks');
        expect(employmentReportUpdatePage.getEmploymentRemarksInput()).toMatch('employmentRemarks');
        employmentReportUpdatePage.save();
        expect(employmentReportUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});
