import { browser } from 'protractor';
import { NavBarPage } from './../../page-objects/jhi-page-objects';
import { IOrderReportComponentsPage, IOrderReportUpdatePage } from './i-order-report.page-object';

describe('IOrderReport e2e test', () => {
    let navBarPage: NavBarPage;
    let iOrderReportUpdatePage: IOrderReportUpdatePage;
    let iOrderReportComponentsPage: IOrderReportComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load IOrderReports', () => {
        navBarPage.goToEntity('i-order-report');
        iOrderReportComponentsPage = new IOrderReportComponentsPage();
        expect(iOrderReportComponentsPage.getTitle()).toMatch(/pangeodataJHipsterApp.iOrderReport.home.title/);
    });

    it('should load create IOrderReport page', () => {
        iOrderReportComponentsPage.clickOnCreateButton();
        iOrderReportUpdatePage = new IOrderReportUpdatePage();
        expect(iOrderReportUpdatePage.getPageTitle()).toMatch(/pangeodataJHipsterApp.iOrderReport.home.createOrEditLabel/);
        iOrderReportUpdatePage.cancel();
    });

    it('should create and save IOrderReports', () => {
        iOrderReportComponentsPage.clickOnCreateButton();
        iOrderReportUpdatePage.save();
        expect(iOrderReportUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});
