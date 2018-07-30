import { element, by, promise, ElementFinder } from 'protractor';

export class DirectorshipVerificationReportComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    title = element.all(by.css('jhi-directorship-verification-report div h2#page-heading span')).first();

    clickOnCreateButton(): promise.Promise<void> {
        return this.createButton.click();
    }

    getTitle(): any {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class DirectorshipVerificationReportUpdatePage {
    pageTitle = element(by.id('jhi-directorship-verification-report-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    directorshipVerifiedInput = element(by.id('field_directorshipVerified'));
    directorshipFindingsInput = element(by.id('field_directorshipFindings'));
    directorshipVerifiedByInput = element(by.id('field_directorshipVerifiedBy'));
    directorshipVerifiedDateInput = element(by.id('field_directorshipVerifiedDate'));

    getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    setDirectorshipVerifiedInput(directorshipVerified): promise.Promise<void> {
        return this.directorshipVerifiedInput.sendKeys(directorshipVerified);
    }

    getDirectorshipVerifiedInput() {
        return this.directorshipVerifiedInput.getAttribute('value');
    }

    setDirectorshipFindingsInput(directorshipFindings): promise.Promise<void> {
        return this.directorshipFindingsInput.sendKeys(directorshipFindings);
    }

    getDirectorshipFindingsInput() {
        return this.directorshipFindingsInput.getAttribute('value');
    }

    setDirectorshipVerifiedByInput(directorshipVerifiedBy): promise.Promise<void> {
        return this.directorshipVerifiedByInput.sendKeys(directorshipVerifiedBy);
    }

    getDirectorshipVerifiedByInput() {
        return this.directorshipVerifiedByInput.getAttribute('value');
    }

    setDirectorshipVerifiedDateInput(directorshipVerifiedDate): promise.Promise<void> {
        return this.directorshipVerifiedDateInput.sendKeys(directorshipVerifiedDate);
    }

    getDirectorshipVerifiedDateInput() {
        return this.directorshipVerifiedDateInput.getAttribute('value');
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
