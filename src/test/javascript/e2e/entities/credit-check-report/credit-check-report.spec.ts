import { browser } from 'protractor';
import { NavBarPage } from './../../page-objects/jhi-page-objects';
import { CreditCheckReportComponentsPage, CreditCheckReportUpdatePage } from './credit-check-report.page-object';

describe('CreditCheckReport e2e test', () => {
    let navBarPage: NavBarPage;
    let creditCheckReportUpdatePage: CreditCheckReportUpdatePage;
    let creditCheckReportComponentsPage: CreditCheckReportComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load CreditCheckReports', () => {
        navBarPage.goToEntity('credit-check-report');
        creditCheckReportComponentsPage = new CreditCheckReportComponentsPage();
        expect(creditCheckReportComponentsPage.getTitle()).toMatch(/pangeodataJHipsterApp.creditCheckReport.home.title/);
    });

    it('should load create CreditCheckReport page', () => {
        creditCheckReportComponentsPage.clickOnCreateButton();
        creditCheckReportUpdatePage = new CreditCheckReportUpdatePage();
        expect(creditCheckReportUpdatePage.getPageTitle()).toMatch(/pangeodataJHipsterApp.creditCheckReport.home.createOrEditLabel/);
        creditCheckReportUpdatePage.cancel();
    });

    it('should create and save CreditCheckReports', () => {
        creditCheckReportComponentsPage.clickOnCreateButton();
        creditCheckReportUpdatePage.setCreditFindingsInput('creditFindings');
        expect(creditCheckReportUpdatePage.getCreditFindingsInput()).toMatch('creditFindings');
        creditCheckReportUpdatePage.setCreditVerifiedByInput('creditVerifiedBy');
        expect(creditCheckReportUpdatePage.getCreditVerifiedByInput()).toMatch('creditVerifiedBy');
        creditCheckReportUpdatePage.setCreditVerifiedDateInput('creditVerifiedDate');
        expect(creditCheckReportUpdatePage.getCreditVerifiedDateInput()).toMatch('creditVerifiedDate');
        creditCheckReportUpdatePage.setCreditRemarksInput('creditRemarks');
        expect(creditCheckReportUpdatePage.getCreditRemarksInput()).toMatch('creditRemarks');
        creditCheckReportUpdatePage.save();
        expect(creditCheckReportUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});
