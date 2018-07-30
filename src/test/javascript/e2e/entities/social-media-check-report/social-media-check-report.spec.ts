import { browser } from 'protractor';
import { NavBarPage } from './../../page-objects/jhi-page-objects';
import { SocialMediaCheckReportComponentsPage, SocialMediaCheckReportUpdatePage } from './social-media-check-report.page-object';

describe('SocialMediaCheckReport e2e test', () => {
    let navBarPage: NavBarPage;
    let socialMediaCheckReportUpdatePage: SocialMediaCheckReportUpdatePage;
    let socialMediaCheckReportComponentsPage: SocialMediaCheckReportComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load SocialMediaCheckReports', () => {
        navBarPage.goToEntity('social-media-check-report');
        socialMediaCheckReportComponentsPage = new SocialMediaCheckReportComponentsPage();
        expect(socialMediaCheckReportComponentsPage.getTitle()).toMatch(/pangeodataJHipsterApp.socialMediaCheckReport.home.title/);
    });

    it('should load create SocialMediaCheckReport page', () => {
        socialMediaCheckReportComponentsPage.clickOnCreateButton();
        socialMediaCheckReportUpdatePage = new SocialMediaCheckReportUpdatePage();
        expect(socialMediaCheckReportUpdatePage.getPageTitle()).toMatch(
            /pangeodataJHipsterApp.socialMediaCheckReport.home.createOrEditLabel/
        );
        socialMediaCheckReportUpdatePage.cancel();
    });

    it('should create and save SocialMediaCheckReports', () => {
        socialMediaCheckReportComponentsPage.clickOnCreateButton();
        socialMediaCheckReportUpdatePage.setSocialMediaSourcesCheckedInput('socialMediaSourcesChecked');
        expect(socialMediaCheckReportUpdatePage.getSocialMediaSourcesCheckedInput()).toMatch('socialMediaSourcesChecked');
        socialMediaCheckReportUpdatePage.setSocialMediaFindingsInput('socialMediaFindings');
        expect(socialMediaCheckReportUpdatePage.getSocialMediaFindingsInput()).toMatch('socialMediaFindings');
        socialMediaCheckReportUpdatePage.setSocialMediaVerifiedDateInput('socialMediaVerifiedDate');
        expect(socialMediaCheckReportUpdatePage.getSocialMediaVerifiedDateInput()).toMatch('socialMediaVerifiedDate');
        socialMediaCheckReportUpdatePage.save();
        expect(socialMediaCheckReportUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});
