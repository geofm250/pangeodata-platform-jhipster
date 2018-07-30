import { browser } from 'protractor';
import { NavBarPage } from './../../page-objects/jhi-page-objects';
import { ProductCountryComponentsPage, ProductCountryUpdatePage } from './product-country.page-object';

describe('ProductCountry e2e test', () => {
    let navBarPage: NavBarPage;
    let productCountryUpdatePage: ProductCountryUpdatePage;
    let productCountryComponentsPage: ProductCountryComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load ProductCountries', () => {
        navBarPage.goToEntity('product-country');
        productCountryComponentsPage = new ProductCountryComponentsPage();
        expect(productCountryComponentsPage.getTitle()).toMatch(/pangeodataJHipsterApp.productCountry.home.title/);
    });

    it('should load create ProductCountry page', () => {
        productCountryComponentsPage.clickOnCreateButton();
        productCountryUpdatePage = new ProductCountryUpdatePage();
        expect(productCountryUpdatePage.getPageTitle()).toMatch(/pangeodataJHipsterApp.productCountry.home.createOrEditLabel/);
        productCountryUpdatePage.cancel();
    });

    it('should create and save ProductCountries', () => {
        productCountryComponentsPage.clickOnCreateButton();
        productCountryUpdatePage.setTurnAroundTimeInput('turnAroundTime');
        expect(productCountryUpdatePage.getTurnAroundTimeInput()).toMatch('turnAroundTime');
        productCountryUpdatePage.setCountryInput('country');
        expect(productCountryUpdatePage.getCountryInput()).toMatch('country');
        productCountryUpdatePage.setCostInput('cost');
        expect(productCountryUpdatePage.getCostInput()).toMatch('cost');
        productCountryUpdatePage.save();
        expect(productCountryUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});
