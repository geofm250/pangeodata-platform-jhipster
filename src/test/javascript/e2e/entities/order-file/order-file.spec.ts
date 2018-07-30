import { browser } from 'protractor';
import { NavBarPage } from './../../page-objects/jhi-page-objects';
import { OrderFileComponentsPage, OrderFileUpdatePage } from './order-file.page-object';

describe('OrderFile e2e test', () => {
    let navBarPage: NavBarPage;
    let orderFileUpdatePage: OrderFileUpdatePage;
    let orderFileComponentsPage: OrderFileComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load OrderFiles', () => {
        navBarPage.goToEntity('order-file');
        orderFileComponentsPage = new OrderFileComponentsPage();
        expect(orderFileComponentsPage.getTitle()).toMatch(/pangeodataJHipsterApp.orderFile.home.title/);
    });

    it('should load create OrderFile page', () => {
        orderFileComponentsPage.clickOnCreateButton();
        orderFileUpdatePage = new OrderFileUpdatePage();
        expect(orderFileUpdatePage.getPageTitle()).toMatch(/pangeodataJHipsterApp.orderFile.home.createOrEditLabel/);
        orderFileUpdatePage.cancel();
    });

    it('should create and save OrderFiles', () => {
        orderFileComponentsPage.clickOnCreateButton();
        orderFileUpdatePage.setNameInput('name');
        expect(orderFileUpdatePage.getNameInput()).toMatch('name');
        orderFileUpdatePage.setLocalFilesInput('localFiles');
        expect(orderFileUpdatePage.getLocalFilesInput()).toMatch('localFiles');
        orderFileUpdatePage.setFilesInput('files');
        expect(orderFileUpdatePage.getFilesInput()).toMatch('files');
        orderFileUpdatePage.setLinksInput('links');
        expect(orderFileUpdatePage.getLinksInput()).toMatch('links');
        orderFileUpdatePage.setDisplayLinksInput('displayLinks');
        expect(orderFileUpdatePage.getDisplayLinksInput()).toMatch('displayLinks');
        orderFileUpdatePage.setICoverNameInput('iCoverName');
        expect(orderFileUpdatePage.getICoverNameInput()).toMatch('iCoverName');
        orderFileUpdatePage.setOrderIdInput('orderId');
        expect(orderFileUpdatePage.getOrderIdInput()).toMatch('orderId');
        orderFileUpdatePage.save();
        expect(orderFileUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});
