import { browser } from 'protractor';
import { NavBarPage } from './../../page-objects/jhi-page-objects';
import { CompanyComponentsPage, CompanyUpdatePage } from './company.page-object';

describe('Company e2e test', () => {
    let navBarPage: NavBarPage;
    let companyUpdatePage: CompanyUpdatePage;
    let companyComponentsPage: CompanyComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Companies', () => {
        navBarPage.goToEntity('company');
        companyComponentsPage = new CompanyComponentsPage();
        expect(companyComponentsPage.getTitle()).toMatch(/pangeodataJHipsterApp.company.home.title/);
    });

    it('should load create Company page', () => {
        companyComponentsPage.clickOnCreateButton();
        companyUpdatePage = new CompanyUpdatePage();
        expect(companyUpdatePage.getPageTitle()).toMatch(/pangeodataJHipsterApp.company.home.createOrEditLabel/);
        companyUpdatePage.cancel();
    });

    it('should create and save Companies', () => {
        companyComponentsPage.clickOnCreateButton();
        companyUpdatePage.setNameInput('name');
        expect(companyUpdatePage.getNameInput()).toMatch('name');
        companyUpdatePage.setRoleInput('role');
        expect(companyUpdatePage.getRoleInput()).toMatch('role');
        companyUpdatePage.setUserInput('user');
        expect(companyUpdatePage.getUserInput()).toMatch('user');
        companyUpdatePage.setCreatedAtInput('createdAt');
        expect(companyUpdatePage.getCreatedAtInput()).toMatch('createdAt');
        companyUpdatePage.setUpdatedAtInput('updatedAt');
        expect(companyUpdatePage.getUpdatedAtInput()).toMatch('updatedAt');
        companyUpdatePage.setActiveInput('active');
        expect(companyUpdatePage.getActiveInput()).toMatch('active');
        companyUpdatePage.setAutomatedInput('automated');
        expect(companyUpdatePage.getAutomatedInput()).toMatch('automated');
        companyUpdatePage.save();
        expect(companyUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});
