import { browser } from 'protractor';
import { NavBarPage } from './../../page-objects/jhi-page-objects';
import { TokenComponentsPage, TokenUpdatePage } from './token.page-object';

describe('Token e2e test', () => {
    let navBarPage: NavBarPage;
    let tokenUpdatePage: TokenUpdatePage;
    let tokenComponentsPage: TokenComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Tokens', () => {
        navBarPage.goToEntity('token');
        tokenComponentsPage = new TokenComponentsPage();
        expect(tokenComponentsPage.getTitle()).toMatch(/pangeodataJHipsterApp.token.home.title/);
    });

    it('should load create Token page', () => {
        tokenComponentsPage.clickOnCreateButton();
        tokenUpdatePage = new TokenUpdatePage();
        expect(tokenUpdatePage.getPageTitle()).toMatch(/pangeodataJHipsterApp.token.home.createOrEditLabel/);
        tokenUpdatePage.cancel();
    });

    it('should create and save Tokens', () => {
        tokenComponentsPage.clickOnCreateButton();
        tokenUpdatePage.setCreatedAtInput('createdAt');
        expect(tokenUpdatePage.getCreatedAtInput()).toMatch('createdAt');
        tokenUpdatePage.setExpiredAtInput('expiredAt');
        expect(tokenUpdatePage.getExpiredAtInput()).toMatch('expiredAt');
        tokenUpdatePage.setUserIdInput('userId');
        expect(tokenUpdatePage.getUserIdInput()).toMatch('userId');
        tokenUpdatePage.setTokenInput('token');
        expect(tokenUpdatePage.getTokenInput()).toMatch('token');
        tokenUpdatePage.save();
        expect(tokenUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});
