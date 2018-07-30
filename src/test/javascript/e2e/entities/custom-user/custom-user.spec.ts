import { browser } from 'protractor';
import { NavBarPage } from './../../page-objects/jhi-page-objects';
import { CustomUserComponentsPage, CustomUserUpdatePage } from './custom-user.page-object';

describe('CustomUser e2e test', () => {
    let navBarPage: NavBarPage;
    let customUserUpdatePage: CustomUserUpdatePage;
    let customUserComponentsPage: CustomUserComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load CustomUsers', () => {
        navBarPage.goToEntity('custom-user');
        customUserComponentsPage = new CustomUserComponentsPage();
        expect(customUserComponentsPage.getTitle()).toMatch(/pangeodataJHipsterApp.customUser.home.title/);
    });

    it('should load create CustomUser page', () => {
        customUserComponentsPage.clickOnCreateButton();
        customUserUpdatePage = new CustomUserUpdatePage();
        expect(customUserUpdatePage.getPageTitle()).toMatch(/pangeodataJHipsterApp.customUser.home.createOrEditLabel/);
        customUserUpdatePage.cancel();
    });

    it('should create and save CustomUsers', () => {
        customUserComponentsPage.clickOnCreateButton();
        customUserUpdatePage.setFirstnameInput('firstname');
        expect(customUserUpdatePage.getFirstnameInput()).toMatch('firstname');
        customUserUpdatePage.setLastnameInput('lastname');
        expect(customUserUpdatePage.getLastnameInput()).toMatch('lastname');
        customUserUpdatePage.setUsernameInput('username');
        expect(customUserUpdatePage.getUsernameInput()).toMatch('username');
        customUserUpdatePage.setEmailInput('email');
        expect(customUserUpdatePage.getEmailInput()).toMatch('email');
        customUserUpdatePage.setRoleInput('role');
        expect(customUserUpdatePage.getRoleInput()).toMatch('role');
        customUserUpdatePage.setCompanyInput('company');
        expect(customUserUpdatePage.getCompanyInput()).toMatch('company');
        customUserUpdatePage.setNameInput('name');
        expect(customUserUpdatePage.getNameInput()).toMatch('name');
        customUserUpdatePage.setSurnameInput('surname');
        expect(customUserUpdatePage.getSurnameInput()).toMatch('surname');
        customUserUpdatePage.setPasswordInput('password');
        expect(customUserUpdatePage.getPasswordInput()).toMatch('password');
        customUserUpdatePage.setActiveInput('active');
        expect(customUserUpdatePage.getActiveInput()).toMatch('active');
        customUserUpdatePage.setCreatedAtInput('createdAt');
        expect(customUserUpdatePage.getCreatedAtInput()).toMatch('createdAt');
        customUserUpdatePage.setUpdatedAtInput('updatedAt');
        expect(customUserUpdatePage.getUpdatedAtInput()).toMatch('updatedAt');
        customUserUpdatePage.setIsTokenLoginInput('isTokenLogin');
        expect(customUserUpdatePage.getIsTokenLoginInput()).toMatch('isTokenLogin');
        customUserUpdatePage.setOrderIdInput('orderId');
        expect(customUserUpdatePage.getOrderIdInput()).toMatch('orderId');
        customUserUpdatePage.save();
        expect(customUserUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});
