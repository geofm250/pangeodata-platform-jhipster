import { element, by, promise, ElementFinder } from 'protractor';

export class ReportedCriminalActivityCheckComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    title = element.all(by.css('jhi-reported-criminal-activity-check div h2#page-heading span')).first();

    clickOnCreateButton(): promise.Promise<void> {
        return this.createButton.click();
    }

    getTitle(): any {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class ReportedCriminalActivityCheckUpdatePage {
    pageTitle = element(by.id('jhi-reported-criminal-activity-check-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    reportedCriminalActivityRecordFoundInput = element(by.id('field_reportedCriminalActivityRecordFound'));
    reportedCriminalActivityVerifiedByInput = element(by.id('field_reportedCriminalActivityVerifiedBy'));
    reportedCriminalActivityVerifiedDateInput = element(by.id('field_reportedCriminalActivityVerifiedDate'));
    reportedCriminalActivityRemarksInput = element(by.id('field_reportedCriminalActivityRemarks'));

    getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    setReportedCriminalActivityRecordFoundInput(reportedCriminalActivityRecordFound): promise.Promise<void> {
        return this.reportedCriminalActivityRecordFoundInput.sendKeys(reportedCriminalActivityRecordFound);
    }

    getReportedCriminalActivityRecordFoundInput() {
        return this.reportedCriminalActivityRecordFoundInput.getAttribute('value');
    }

    setReportedCriminalActivityVerifiedByInput(reportedCriminalActivityVerifiedBy): promise.Promise<void> {
        return this.reportedCriminalActivityVerifiedByInput.sendKeys(reportedCriminalActivityVerifiedBy);
    }

    getReportedCriminalActivityVerifiedByInput() {
        return this.reportedCriminalActivityVerifiedByInput.getAttribute('value');
    }

    setReportedCriminalActivityVerifiedDateInput(reportedCriminalActivityVerifiedDate): promise.Promise<void> {
        return this.reportedCriminalActivityVerifiedDateInput.sendKeys(reportedCriminalActivityVerifiedDate);
    }

    getReportedCriminalActivityVerifiedDateInput() {
        return this.reportedCriminalActivityVerifiedDateInput.getAttribute('value');
    }

    setReportedCriminalActivityRemarksInput(reportedCriminalActivityRemarks): promise.Promise<void> {
        return this.reportedCriminalActivityRemarksInput.sendKeys(reportedCriminalActivityRemarks);
    }

    getReportedCriminalActivityRemarksInput() {
        return this.reportedCriminalActivityRemarksInput.getAttribute('value');
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
