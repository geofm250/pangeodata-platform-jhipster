import { browser } from 'protractor';
import { NavBarPage } from './../../page-objects/jhi-page-objects';
import { OffenceComponentsPage, OffenceUpdatePage } from './offence.page-object';

describe('Offence e2e test', () => {
    let navBarPage: NavBarPage;
    let offenceUpdatePage: OffenceUpdatePage;
    let offenceComponentsPage: OffenceComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Offences', () => {
        navBarPage.goToEntity('offence');
        offenceComponentsPage = new OffenceComponentsPage();
        expect(offenceComponentsPage.getTitle()).toMatch(/pangeodataJHipsterApp.offence.home.title/);
    });

    it('should load create Offence page', () => {
        offenceComponentsPage.clickOnCreateButton();
        offenceUpdatePage = new OffenceUpdatePage();
        expect(offenceUpdatePage.getPageTitle()).toMatch(/pangeodataJHipsterApp.offence.home.createOrEditLabel/);
        offenceUpdatePage.cancel();
    });

    it('should create and save Offences', () => {
        offenceComponentsPage.clickOnCreateButton();
        offenceUpdatePage.setOffenceInput('offence');
        expect(offenceUpdatePage.getOffenceInput()).toMatch('offence');
        offenceUpdatePage.setOffenceDateInput('offenceDate');
        expect(offenceUpdatePage.getOffenceDateInput()).toMatch('offenceDate');
        offenceUpdatePage.setSentenceInput('sentence');
        expect(offenceUpdatePage.getSentenceInput()).toMatch('sentence');
        offenceUpdatePage.setVerifiedByInput('verifiedBy');
        expect(offenceUpdatePage.getVerifiedByInput()).toMatch('verifiedBy');
        offenceUpdatePage.setVerifiedDateInput('verifiedDate');
        expect(offenceUpdatePage.getVerifiedDateInput()).toMatch('verifiedDate');
        offenceUpdatePage.setRemarksInput('remarks');
        expect(offenceUpdatePage.getRemarksInput()).toMatch('remarks');
        offenceUpdatePage.save();
        expect(offenceUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});
