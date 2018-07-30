import { browser } from 'protractor';
import { NavBarPage } from './../../page-objects/jhi-page-objects';
import { CountryComponentsPage, CountryUpdatePage } from './country.page-object';

describe('Country e2e test', () => {
    let navBarPage: NavBarPage;
    let countryUpdatePage: CountryUpdatePage;
    let countryComponentsPage: CountryComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Countries', () => {
        navBarPage.goToEntity('country');
        countryComponentsPage = new CountryComponentsPage();
        expect(countryComponentsPage.getTitle()).toMatch(/pangeodataJHipsterApp.country.home.title/);
    });

    it('should load create Country page', () => {
        countryComponentsPage.clickOnCreateButton();
        countryUpdatePage = new CountryUpdatePage();
        expect(countryUpdatePage.getPageTitle()).toMatch(/pangeodataJHipsterApp.country.home.createOrEditLabel/);
        countryUpdatePage.cancel();
    });

    it('should create and save Countries', () => {
        countryComponentsPage.clickOnCreateButton();
        countryUpdatePage.setNameInput('name');
        expect(countryUpdatePage.getNameInput()).toMatch('name');
        countryUpdatePage.setCodeInput('code');
        expect(countryUpdatePage.getCodeInput()).toMatch('code');
        countryUpdatePage.setLocalCheckInput('localCheck');
        expect(countryUpdatePage.getLocalCheckInput()).toMatch('localCheck');
        countryUpdatePage.save();
        expect(countryUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});
