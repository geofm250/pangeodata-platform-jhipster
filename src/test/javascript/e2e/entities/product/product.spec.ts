import { browser } from 'protractor';
import { NavBarPage } from './../../page-objects/jhi-page-objects';
import { ProductComponentsPage, ProductUpdatePage } from './product.page-object';

describe('Product e2e test', () => {
    let navBarPage: NavBarPage;
    let productUpdatePage: ProductUpdatePage;
    let productComponentsPage: ProductComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Products', () => {
        navBarPage.goToEntity('product');
        productComponentsPage = new ProductComponentsPage();
        expect(productComponentsPage.getTitle()).toMatch(/pangeodataJHipsterApp.product.home.title/);
    });

    it('should load create Product page', () => {
        productComponentsPage.clickOnCreateButton();
        productUpdatePage = new ProductUpdatePage();
        expect(productUpdatePage.getPageTitle()).toMatch(/pangeodataJHipsterApp.product.home.createOrEditLabel/);
        productUpdatePage.cancel();
    });

    it('should create and save Products', () => {
        productComponentsPage.clickOnCreateButton();
        productUpdatePage.setActiveInput('active');
        expect(productUpdatePage.getActiveInput()).toMatch('active');
        productUpdatePage.setNameInput('name');
        expect(productUpdatePage.getNameInput()).toMatch('name');
        productUpdatePage.setDescriptionInput('description');
        expect(productUpdatePage.getDescriptionInput()).toMatch('description');
        productUpdatePage.setTurnAroundTimeInput('turnAroundTime');
        expect(productUpdatePage.getTurnAroundTimeInput()).toMatch('turnAroundTime');
        productUpdatePage.setCostInput('cost');
        expect(productUpdatePage.getCostInput()).toMatch('cost');
        productUpdatePage.setCountriesInput('countries');
        expect(productUpdatePage.getCountriesInput()).toMatch('countries');
        productUpdatePage.setCreatedAtInput('createdAt');
        expect(productUpdatePage.getCreatedAtInput()).toMatch('createdAt');
        productUpdatePage.setUpdatedAtInput('updatedAt');
        expect(productUpdatePage.getUpdatedAtInput()).toMatch('updatedAt');
        productUpdatePage.save();
        expect(productUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});
