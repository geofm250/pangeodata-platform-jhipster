import { browser } from 'protractor';
import { NavBarPage } from './../../page-objects/jhi-page-objects';
import { SessionComponentsPage, SessionUpdatePage } from './session.page-object';

describe('Session e2e test', () => {
    let navBarPage: NavBarPage;
    let sessionUpdatePage: SessionUpdatePage;
    let sessionComponentsPage: SessionComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Sessions', () => {
        navBarPage.goToEntity('session');
        sessionComponentsPage = new SessionComponentsPage();
        expect(sessionComponentsPage.getTitle()).toMatch(/pangeodataJHipsterApp.session.home.title/);
    });

    it('should load create Session page', () => {
        sessionComponentsPage.clickOnCreateButton();
        sessionUpdatePage = new SessionUpdatePage();
        expect(sessionUpdatePage.getPageTitle()).toMatch(/pangeodataJHipsterApp.session.home.createOrEditLabel/);
        sessionUpdatePage.cancel();
    });

    it('should create and save Sessions', () => {
        sessionComponentsPage.clickOnCreateButton();
        sessionUpdatePage.setUserInput('user');
        expect(sessionUpdatePage.getUserInput()).toMatch('user');
        sessionUpdatePage.setPasswordTokenInput('passwordToken');
        expect(sessionUpdatePage.getPasswordTokenInput()).toMatch('passwordToken');
        sessionUpdatePage.save();
        expect(sessionUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});
