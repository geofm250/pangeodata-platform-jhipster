import { browser } from 'protractor';
import { NavBarPage } from './../../page-objects/jhi-page-objects';
import { ApplicationServiceComponentsPage, ApplicationServiceUpdatePage } from './application-service.page-object';

describe('ApplicationService e2e test', () => {
    let navBarPage: NavBarPage;
    let applicationServiceUpdatePage: ApplicationServiceUpdatePage;
    let applicationServiceComponentsPage: ApplicationServiceComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load ApplicationServices', () => {
        navBarPage.goToEntity('application-service');
        applicationServiceComponentsPage = new ApplicationServiceComponentsPage();
        expect(applicationServiceComponentsPage.getTitle()).toMatch(/pangeodataJHipsterApp.applicationService.home.title/);
    });

    it('should load create ApplicationService page', () => {
        applicationServiceComponentsPage.clickOnCreateButton();
        applicationServiceUpdatePage = new ApplicationServiceUpdatePage();
        expect(applicationServiceUpdatePage.getPageTitle()).toMatch(/pangeodataJHipsterApp.applicationService.home.createOrEditLabel/);
        applicationServiceUpdatePage.cancel();
    });

    it('should create and save ApplicationServices', () => {
        applicationServiceComponentsPage.clickOnCreateButton();
        applicationServiceUpdatePage.setApplicationServiceIdInput('applicationServiceId');
        expect(applicationServiceUpdatePage.getApplicationServiceIdInput()).toMatch('applicationServiceId');
        applicationServiceUpdatePage.setOrderIdInput('orderId');
        expect(applicationServiceUpdatePage.getOrderIdInput()).toMatch('orderId');
        applicationServiceUpdatePage.save();
        expect(applicationServiceUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});
