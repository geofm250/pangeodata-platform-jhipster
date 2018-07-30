import { browser } from 'protractor';
import { NavBarPage } from './../../page-objects/jhi-page-objects';
import { OrderComponentsPage, OrderUpdatePage } from './order.page-object';

describe('Order e2e test', () => {
    let navBarPage: NavBarPage;
    let orderUpdatePage: OrderUpdatePage;
    let orderComponentsPage: OrderComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Orders', () => {
        navBarPage.goToEntity('order');
        orderComponentsPage = new OrderComponentsPage();
        expect(orderComponentsPage.getTitle()).toMatch(/pangeodataJHipsterApp.order.home.title/);
    });

    it('should load create Order page', () => {
        orderComponentsPage.clickOnCreateButton();
        orderUpdatePage = new OrderUpdatePage();
        expect(orderUpdatePage.getPageTitle()).toMatch(/pangeodataJHipsterApp.order.home.createOrEditLabel/);
        orderUpdatePage.cancel();
    });

    it('should create and save Orders', () => {
        orderComponentsPage.clickOnCreateButton();
        orderUpdatePage.setFilesInput('files');
        expect(orderUpdatePage.getFilesInput()).toMatch('files');
        orderUpdatePage.setReqInputsInput('reqInputs');
        expect(orderUpdatePage.getReqInputsInput()).toMatch('reqInputs');
        orderUpdatePage.setReqFormInputsInput('reqFormInputs');
        expect(orderUpdatePage.getReqFormInputsInput()).toMatch('reqFormInputs');
        orderUpdatePage.setProductInput('product');
        expect(orderUpdatePage.getProductInput()).toMatch('product');
        orderUpdatePage.setTransactionInput('transaction');
        expect(orderUpdatePage.getTransactionInput()).toMatch('transaction');
        orderUpdatePage.setUserInput('user');
        expect(orderUpdatePage.getUserInput()).toMatch('user');
        orderUpdatePage.setStatusInput('status');
        expect(orderUpdatePage.getStatusInput()).toMatch('status');
        orderUpdatePage.setRejectReasonInput('rejectReason');
        expect(orderUpdatePage.getRejectReasonInput()).toMatch('rejectReason');
        orderUpdatePage.setCompanyInput('company');
        expect(orderUpdatePage.getCompanyInput()).toMatch('company');
        orderUpdatePage.setPartnerInput('partner');
        expect(orderUpdatePage.getPartnerInput()).toMatch('partner');
        orderUpdatePage.setCountryInput('country');
        expect(orderUpdatePage.getCountryInput()).toMatch('country');
        orderUpdatePage.setCreatedAtInput('createdAt');
        expect(orderUpdatePage.getCreatedAtInput()).toMatch('createdAt');
        orderUpdatePage.setUpdatedAtInput('updatedAt');
        expect(orderUpdatePage.getUpdatedAtInput()).toMatch('updatedAt');
        orderUpdatePage.setExpectedDateInput('expectedDate');
        expect(orderUpdatePage.getExpectedDateInput()).toMatch('expectedDate');
        orderUpdatePage.setDayTillCompleteInput('dayTillComplete');
        expect(orderUpdatePage.getDayTillCompleteInput()).toMatch('dayTillComplete');
        orderUpdatePage.setCostInput('cost');
        expect(orderUpdatePage.getCostInput()).toMatch('cost');
        orderUpdatePage.setTurnAroundTimeInput('turnAroundTime');
        expect(orderUpdatePage.getTurnAroundTimeInput()).toMatch('turnAroundTime');
        orderUpdatePage.setReportInput('report');
        expect(orderUpdatePage.getReportInput()).toMatch('report');
        orderUpdatePage.setRefereneceIdInput('refereneceId');
        expect(orderUpdatePage.getRefereneceIdInput()).toMatch('refereneceId');
        orderUpdatePage.setCancellationReasonInput('cancellationReason');
        expect(orderUpdatePage.getCancellationReasonInput()).toMatch('cancellationReason');
        orderUpdatePage.setClientIdInput('clientId');
        expect(orderUpdatePage.getClientIdInput()).toMatch('clientId');
        orderUpdatePage.setActiveInput('active');
        expect(orderUpdatePage.getActiveInput()).toMatch('active');
        orderUpdatePage.setSelectedInput('selected');
        expect(orderUpdatePage.getSelectedInput()).toMatch('selected');
        orderUpdatePage.setApplicationIdInput('applicationId');
        expect(orderUpdatePage.getApplicationIdInput()).toMatch('applicationId');
        orderUpdatePage.setApplicationServiceIdsInput('applicationServiceIds');
        expect(orderUpdatePage.getApplicationServiceIdsInput()).toMatch('applicationServiceIds');
        orderUpdatePage.setICoverReportInput('iCoverReport');
        expect(orderUpdatePage.getICoverReportInput()).toMatch('iCoverReport');
        orderUpdatePage.save();
        expect(orderUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});
