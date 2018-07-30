import { element, by, promise, ElementFinder } from 'protractor';

export class OrderComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    title = element.all(by.css('jhi-order div h2#page-heading span')).first();

    clickOnCreateButton(): promise.Promise<void> {
        return this.createButton.click();
    }

    getTitle(): any {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class OrderUpdatePage {
    pageTitle = element(by.id('jhi-order-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    filesInput = element(by.id('field_files'));
    reqInputsInput = element(by.id('field_reqInputs'));
    reqFormInputsInput = element(by.id('field_reqFormInputs'));
    productInput = element(by.id('field_product'));
    transactionInput = element(by.id('field_transaction'));
    userInput = element(by.id('field_user'));
    statusInput = element(by.id('field_status'));
    rejectReasonInput = element(by.id('field_rejectReason'));
    companyInput = element(by.id('field_company'));
    partnerInput = element(by.id('field_partner'));
    countryInput = element(by.id('field_country'));
    createdAtInput = element(by.id('field_createdAt'));
    updatedAtInput = element(by.id('field_updatedAt'));
    expectedDateInput = element(by.id('field_expectedDate'));
    dayTillCompleteInput = element(by.id('field_dayTillComplete'));
    costInput = element(by.id('field_cost'));
    turnAroundTimeInput = element(by.id('field_turnAroundTime'));
    reportInput = element(by.id('field_report'));
    refereneceIdInput = element(by.id('field_refereneceId'));
    cancellationReasonInput = element(by.id('field_cancellationReason'));
    clientIdInput = element(by.id('field_clientId'));
    activeInput = element(by.id('field_active'));
    selectedInput = element(by.id('field_selected'));
    applicationIdInput = element(by.id('field_applicationId'));
    applicationServiceIdsInput = element(by.id('field_applicationServiceIds'));
    iCoverReportInput = element(by.id('field_iCoverReport'));

    getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    setFilesInput(files): promise.Promise<void> {
        return this.filesInput.sendKeys(files);
    }

    getFilesInput() {
        return this.filesInput.getAttribute('value');
    }

    setReqInputsInput(reqInputs): promise.Promise<void> {
        return this.reqInputsInput.sendKeys(reqInputs);
    }

    getReqInputsInput() {
        return this.reqInputsInput.getAttribute('value');
    }

    setReqFormInputsInput(reqFormInputs): promise.Promise<void> {
        return this.reqFormInputsInput.sendKeys(reqFormInputs);
    }

    getReqFormInputsInput() {
        return this.reqFormInputsInput.getAttribute('value');
    }

    setProductInput(product): promise.Promise<void> {
        return this.productInput.sendKeys(product);
    }

    getProductInput() {
        return this.productInput.getAttribute('value');
    }

    setTransactionInput(transaction): promise.Promise<void> {
        return this.transactionInput.sendKeys(transaction);
    }

    getTransactionInput() {
        return this.transactionInput.getAttribute('value');
    }

    setUserInput(user): promise.Promise<void> {
        return this.userInput.sendKeys(user);
    }

    getUserInput() {
        return this.userInput.getAttribute('value');
    }

    setStatusInput(status): promise.Promise<void> {
        return this.statusInput.sendKeys(status);
    }

    getStatusInput() {
        return this.statusInput.getAttribute('value');
    }

    setRejectReasonInput(rejectReason): promise.Promise<void> {
        return this.rejectReasonInput.sendKeys(rejectReason);
    }

    getRejectReasonInput() {
        return this.rejectReasonInput.getAttribute('value');
    }

    setCompanyInput(company): promise.Promise<void> {
        return this.companyInput.sendKeys(company);
    }

    getCompanyInput() {
        return this.companyInput.getAttribute('value');
    }

    setPartnerInput(partner): promise.Promise<void> {
        return this.partnerInput.sendKeys(partner);
    }

    getPartnerInput() {
        return this.partnerInput.getAttribute('value');
    }

    setCountryInput(country): promise.Promise<void> {
        return this.countryInput.sendKeys(country);
    }

    getCountryInput() {
        return this.countryInput.getAttribute('value');
    }

    setCreatedAtInput(createdAt): promise.Promise<void> {
        return this.createdAtInput.sendKeys(createdAt);
    }

    getCreatedAtInput() {
        return this.createdAtInput.getAttribute('value');
    }

    setUpdatedAtInput(updatedAt): promise.Promise<void> {
        return this.updatedAtInput.sendKeys(updatedAt);
    }

    getUpdatedAtInput() {
        return this.updatedAtInput.getAttribute('value');
    }

    setExpectedDateInput(expectedDate): promise.Promise<void> {
        return this.expectedDateInput.sendKeys(expectedDate);
    }

    getExpectedDateInput() {
        return this.expectedDateInput.getAttribute('value');
    }

    setDayTillCompleteInput(dayTillComplete): promise.Promise<void> {
        return this.dayTillCompleteInput.sendKeys(dayTillComplete);
    }

    getDayTillCompleteInput() {
        return this.dayTillCompleteInput.getAttribute('value');
    }

    setCostInput(cost): promise.Promise<void> {
        return this.costInput.sendKeys(cost);
    }

    getCostInput() {
        return this.costInput.getAttribute('value');
    }

    setTurnAroundTimeInput(turnAroundTime): promise.Promise<void> {
        return this.turnAroundTimeInput.sendKeys(turnAroundTime);
    }

    getTurnAroundTimeInput() {
        return this.turnAroundTimeInput.getAttribute('value');
    }

    setReportInput(report): promise.Promise<void> {
        return this.reportInput.sendKeys(report);
    }

    getReportInput() {
        return this.reportInput.getAttribute('value');
    }

    setRefereneceIdInput(refereneceId): promise.Promise<void> {
        return this.refereneceIdInput.sendKeys(refereneceId);
    }

    getRefereneceIdInput() {
        return this.refereneceIdInput.getAttribute('value');
    }

    setCancellationReasonInput(cancellationReason): promise.Promise<void> {
        return this.cancellationReasonInput.sendKeys(cancellationReason);
    }

    getCancellationReasonInput() {
        return this.cancellationReasonInput.getAttribute('value');
    }

    setClientIdInput(clientId): promise.Promise<void> {
        return this.clientIdInput.sendKeys(clientId);
    }

    getClientIdInput() {
        return this.clientIdInput.getAttribute('value');
    }

    setActiveInput(active): promise.Promise<void> {
        return this.activeInput.sendKeys(active);
    }

    getActiveInput() {
        return this.activeInput.getAttribute('value');
    }

    setSelectedInput(selected): promise.Promise<void> {
        return this.selectedInput.sendKeys(selected);
    }

    getSelectedInput() {
        return this.selectedInput.getAttribute('value');
    }

    setApplicationIdInput(applicationId): promise.Promise<void> {
        return this.applicationIdInput.sendKeys(applicationId);
    }

    getApplicationIdInput() {
        return this.applicationIdInput.getAttribute('value');
    }

    setApplicationServiceIdsInput(applicationServiceIds): promise.Promise<void> {
        return this.applicationServiceIdsInput.sendKeys(applicationServiceIds);
    }

    getApplicationServiceIdsInput() {
        return this.applicationServiceIdsInput.getAttribute('value');
    }

    setICoverReportInput(iCoverReport): promise.Promise<void> {
        return this.iCoverReportInput.sendKeys(iCoverReport);
    }

    getICoverReportInput() {
        return this.iCoverReportInput.getAttribute('value');
    }

    save(): promise.Promise<void> {
        return this.saveButton.click();
    }

    cancel(): promise.Promise<void> {
        return this.cancelButton.click();
    }

    getSaveButton(): ElementFinder {
        return this.saveButton;
    }
}
