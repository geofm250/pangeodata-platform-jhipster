import { browser } from 'protractor';
import { NavBarPage } from './../../page-objects/jhi-page-objects';
import { BankruptcyCheckReportComponentsPage, BankruptcyCheckReportUpdatePage } from './bankruptcy-check-report.page-object';

describe('BankruptcyCheckReport e2e test', () => {
    let navBarPage: NavBarPage;
    let bankruptcyCheckReportUpdatePage: BankruptcyCheckReportUpdatePage;
    let bankruptcyCheckReportComponentsPage: BankruptcyCheckReportComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load BankruptcyCheckReports', () => {
        navBarPage.goToEntity('bankruptcy-check-report');
        bankruptcyCheckReportComponentsPage = new BankruptcyCheckReportComponentsPage();
        expect(bankruptcyCheckReportComponentsPage.getTitle()).toMatch(/pangeodataJHipsterApp.bankruptcyCheckReport.home.title/);
    });

    it('should load create BankruptcyCheckReport page', () => {
        bankruptcyCheckReportComponentsPage.clickOnCreateButton();
        bankruptcyCheckReportUpdatePage = new BankruptcyCheckReportUpdatePage();
        expect(bankruptcyCheckReportUpdatePage.getPageTitle()).toMatch(
            /pangeodataJHipsterApp.bankruptcyCheckReport.home.createOrEditLabel/
        );
        bankruptcyCheckReportUpdatePage.cancel();
    });

    it('should create and save BankruptcyCheckReports', () => {
        bankruptcyCheckReportComponentsPage.clickOnCreateButton();
        bankruptcyCheckReportUpdatePage.setBankruptcyFindingsInput('bankruptcyFindings');
        expect(bankruptcyCheckReportUpdatePage.getBankruptcyFindingsInput()).toMatch('bankruptcyFindings');
        bankruptcyCheckReportUpdatePage.setBankruptcyVerifiedByInput('bankruptcyVerifiedBy');
        expect(bankruptcyCheckReportUpdatePage.getBankruptcyVerifiedByInput()).toMatch('bankruptcyVerifiedBy');
        bankruptcyCheckReportUpdatePage.setBankruptcyVerifiedDateInput('bankruptcyVerifiedDate');
        expect(bankruptcyCheckReportUpdatePage.getBankruptcyVerifiedDateInput()).toMatch('bankruptcyVerifiedDate');
        bankruptcyCheckReportUpdatePage.setBankruptcyRemarksInput('bankruptcyRemarks');
        expect(bankruptcyCheckReportUpdatePage.getBankruptcyRemarksInput()).toMatch('bankruptcyRemarks');
        bankruptcyCheckReportUpdatePage.save();
        expect(bankruptcyCheckReportUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});
