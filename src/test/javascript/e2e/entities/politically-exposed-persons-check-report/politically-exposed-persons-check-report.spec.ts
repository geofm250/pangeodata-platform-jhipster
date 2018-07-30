import { browser } from 'protractor';
import { NavBarPage } from './../../page-objects/jhi-page-objects';
import {
    PoliticallyExposedPersonsCheckReportComponentsPage,
    PoliticallyExposedPersonsCheckReportUpdatePage
} from './politically-exposed-persons-check-report.page-object';

describe('PoliticallyExposedPersonsCheckReport e2e test', () => {
    let navBarPage: NavBarPage;
    let politicallyExposedPersonsCheckReportUpdatePage: PoliticallyExposedPersonsCheckReportUpdatePage;
    let politicallyExposedPersonsCheckReportComponentsPage: PoliticallyExposedPersonsCheckReportComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load PoliticallyExposedPersonsCheckReports', () => {
        navBarPage.goToEntity('politically-exposed-persons-check-report');
        politicallyExposedPersonsCheckReportComponentsPage = new PoliticallyExposedPersonsCheckReportComponentsPage();
        expect(politicallyExposedPersonsCheckReportComponentsPage.getTitle()).toMatch(
            /pangeodataJHipsterApp.politicallyExposedPersonsCheckReport.home.title/
        );
    });

    it('should load create PoliticallyExposedPersonsCheckReport page', () => {
        politicallyExposedPersonsCheckReportComponentsPage.clickOnCreateButton();
        politicallyExposedPersonsCheckReportUpdatePage = new PoliticallyExposedPersonsCheckReportUpdatePage();
        expect(politicallyExposedPersonsCheckReportUpdatePage.getPageTitle()).toMatch(
            /pangeodataJHipsterApp.politicallyExposedPersonsCheckReport.home.createOrEditLabel/
        );
        politicallyExposedPersonsCheckReportUpdatePage.cancel();
    });

    it('should create and save PoliticallyExposedPersonsCheckReports', () => {
        politicallyExposedPersonsCheckReportComponentsPage.clickOnCreateButton();
        politicallyExposedPersonsCheckReportUpdatePage.setPepIdentifiedInput('pepIdentified');
        expect(politicallyExposedPersonsCheckReportUpdatePage.getPepIdentifiedInput()).toMatch('pepIdentified');
        politicallyExposedPersonsCheckReportUpdatePage.setPepVerifiedByInput('pepVerifiedBy');
        expect(politicallyExposedPersonsCheckReportUpdatePage.getPepVerifiedByInput()).toMatch('pepVerifiedBy');
        politicallyExposedPersonsCheckReportUpdatePage.setPepVerifiedDateInput('pepVerifiedDate');
        expect(politicallyExposedPersonsCheckReportUpdatePage.getPepVerifiedDateInput()).toMatch('pepVerifiedDate');
        politicallyExposedPersonsCheckReportUpdatePage.setPepRemarksInput('pepRemarks');
        expect(politicallyExposedPersonsCheckReportUpdatePage.getPepRemarksInput()).toMatch('pepRemarks');
        politicallyExposedPersonsCheckReportUpdatePage.save();
        expect(politicallyExposedPersonsCheckReportUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});
