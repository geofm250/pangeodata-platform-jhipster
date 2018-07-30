import { browser } from 'protractor';
import { NavBarPage } from './../../page-objects/jhi-page-objects';
import { OrderInputComponentsPage, OrderInputUpdatePage } from './order-input.page-object';

describe('OrderInput e2e test', () => {
    let navBarPage: NavBarPage;
    let orderInputUpdatePage: OrderInputUpdatePage;
    let orderInputComponentsPage: OrderInputComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load OrderInputs', () => {
        navBarPage.goToEntity('order-input');
        orderInputComponentsPage = new OrderInputComponentsPage();
        expect(orderInputComponentsPage.getTitle()).toMatch(/pangeodataJHipsterApp.orderInput.home.title/);
    });

    it('should load create OrderInput page', () => {
        orderInputComponentsPage.clickOnCreateButton();
        orderInputUpdatePage = new OrderInputUpdatePage();
        expect(orderInputUpdatePage.getPageTitle()).toMatch(/pangeodataJHipsterApp.orderInput.home.createOrEditLabel/);
        orderInputUpdatePage.cancel();
    });

    it('should create and save OrderInputs', () => {
        orderInputComponentsPage.clickOnCreateButton();
        orderInputUpdatePage.setNameInput('name');
        expect(orderInputUpdatePage.getNameInput()).toMatch('name');
        orderInputUpdatePage.setOrderIdInput('orderId');
        expect(orderInputUpdatePage.getOrderIdInput()).toMatch('orderId');
        orderInputUpdatePage.setLabelInput('label');
        expect(orderInputUpdatePage.getLabelInput()).toMatch('label');
        orderInputUpdatePage.setInputInput('input');
        expect(orderInputUpdatePage.getInputInput()).toMatch('input');
        orderInputUpdatePage.setICoverNameInput('iCoverName');
        expect(orderInputUpdatePage.getICoverNameInput()).toMatch('iCoverName');
        orderInputUpdatePage.save();
        expect(orderInputUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});
