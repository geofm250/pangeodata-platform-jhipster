import { browser } from 'protractor';
import { NavBarPage } from './../../page-objects/jhi-page-objects';
import { TransactionComponentsPage, TransactionUpdatePage } from './transaction.page-object';

describe('Transaction e2e test', () => {
    let navBarPage: NavBarPage;
    let transactionUpdatePage: TransactionUpdatePage;
    let transactionComponentsPage: TransactionComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Transactions', () => {
        navBarPage.goToEntity('transaction');
        transactionComponentsPage = new TransactionComponentsPage();
        expect(transactionComponentsPage.getTitle()).toMatch(/pangeodataJHipsterApp.transaction.home.title/);
    });

    it('should load create Transaction page', () => {
        transactionComponentsPage.clickOnCreateButton();
        transactionUpdatePage = new TransactionUpdatePage();
        expect(transactionUpdatePage.getPageTitle()).toMatch(/pangeodataJHipsterApp.transaction.home.createOrEditLabel/);
        transactionUpdatePage.cancel();
    });

    it('should create and save Transactions', () => {
        transactionComponentsPage.clickOnCreateButton();
        transactionUpdatePage.setGeneralnformationInput('generalnformation');
        expect(transactionUpdatePage.getGeneralnformationInput()).toMatch('generalnformation');
        transactionUpdatePage.setAddessesInput('addesses');
        expect(transactionUpdatePage.getAddessesInput()).toMatch('addesses');
        transactionUpdatePage.setStatusInput('status');
        expect(transactionUpdatePage.getStatusInput()).toMatch('status');
        transactionUpdatePage.setStatusDisplayInput('statusDisplay');
        expect(transactionUpdatePage.getStatusDisplayInput()).toMatch('statusDisplay');
        transactionUpdatePage.setEditableInput('editable');
        expect(transactionUpdatePage.getEditableInput()).toMatch('editable');
        transactionUpdatePage.setEditModeInput('editMode');
        expect(transactionUpdatePage.getEditModeInput()).toMatch('editMode');
        transactionUpdatePage.setActiveInput('active');
        expect(transactionUpdatePage.getActiveInput()).toMatch('active');
        transactionUpdatePage.setCostInput('cost');
        expect(transactionUpdatePage.getCostInput()).toMatch('cost');
        transactionUpdatePage.setReferenceIdInput('referenceId');
        expect(transactionUpdatePage.getReferenceIdInput()).toMatch('referenceId');
        transactionUpdatePage.setUserInput('user');
        expect(transactionUpdatePage.getUserInput()).toMatch('user');
        transactionUpdatePage.setCompanyInput('company');
        expect(transactionUpdatePage.getCompanyInput()).toMatch('company');
        transactionUpdatePage.setCreatedAtInput('createdAt');
        expect(transactionUpdatePage.getCreatedAtInput()).toMatch('createdAt');
        transactionUpdatePage.setStatusNrInput('statusNr');
        expect(transactionUpdatePage.getStatusNrInput()).toMatch('statusNr');
        transactionUpdatePage.setRedirectUrlInput('redirectUrl');
        expect(transactionUpdatePage.getRedirectUrlInput()).toMatch('redirectUrl');
        transactionUpdatePage.setConsentFormInput('consentForm');
        expect(transactionUpdatePage.getConsentFormInput()).toMatch('consentForm');
        transactionUpdatePage.setLocalConsentFormInput('localConsentForm');
        expect(transactionUpdatePage.getLocalConsentFormInput()).toMatch('localConsentForm');
        transactionUpdatePage.setValidInput('valid');
        expect(transactionUpdatePage.getValidInput()).toMatch('valid');
        transactionUpdatePage.setUpdatedAtInput('updatedAt');
        expect(transactionUpdatePage.getUpdatedAtInput()).toMatch('updatedAt');
        transactionUpdatePage.setOrdersInput('orders');
        expect(transactionUpdatePage.getOrdersInput()).toMatch('orders');
        transactionUpdatePage.save();
        expect(transactionUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});
