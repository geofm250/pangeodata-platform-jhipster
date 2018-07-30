import { browser } from 'protractor';
import { NavBarPage } from './../../page-objects/jhi-page-objects';
import {
    LocalLanguageMediaCheckReportComponentsPage,
    LocalLanguageMediaCheckReportUpdatePage
} from './local-language-media-check-report.page-object';

describe('LocalLanguageMediaCheckReport e2e test', () => {
    let navBarPage: NavBarPage;
    let localLanguageMediaCheckReportUpdatePage: LocalLanguageMediaCheckReportUpdatePage;
    let localLanguageMediaCheckReportComponentsPage: LocalLanguageMediaCheckReportComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load LocalLanguageMediaCheckReports', () => {
        navBarPage.goToEntity('local-language-media-check-report');
        localLanguageMediaCheckReportComponentsPage = new LocalLanguageMediaCheckReportComponentsPage();
        expect(localLanguageMediaCheckReportComponentsPage.getTitle()).toMatch(
            /pangeodataJHipsterApp.localLanguageMediaCheckReport.home.title/
        );
    });

    it('should load create LocalLanguageMediaCheckReport page', () => {
        localLanguageMediaCheckReportComponentsPage.clickOnCreateButton();
        localLanguageMediaCheckReportUpdatePage = new LocalLanguageMediaCheckReportUpdatePage();
        expect(localLanguageMediaCheckReportUpdatePage.getPageTitle()).toMatch(
            /pangeodataJHipsterApp.localLanguageMediaCheckReport.home.createOrEditLabel/
        );
        localLanguageMediaCheckReportUpdatePage.cancel();
    });

    it('should create and save LocalLanguageMediaCheckReports', () => {
        localLanguageMediaCheckReportComponentsPage.clickOnCreateButton();
        localLanguageMediaCheckReportUpdatePage.setLocalLanguageMediaFindingsInput('localLanguageMediaFindings');
        expect(localLanguageMediaCheckReportUpdatePage.getLocalLanguageMediaFindingsInput()).toMatch('localLanguageMediaFindings');
        localLanguageMediaCheckReportUpdatePage.setLocalLanguageMediaStatusInput('localLanguageMediaStatus');
        expect(localLanguageMediaCheckReportUpdatePage.getLocalLanguageMediaStatusInput()).toMatch('localLanguageMediaStatus');
        localLanguageMediaCheckReportUpdatePage.setLocalLanguageMediaVerifiedDateInput('localLanguageMediaVerifiedDate');
        expect(localLanguageMediaCheckReportUpdatePage.getLocalLanguageMediaVerifiedDateInput()).toMatch('localLanguageMediaVerifiedDate');
        localLanguageMediaCheckReportUpdatePage.save();
        expect(localLanguageMediaCheckReportUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});
