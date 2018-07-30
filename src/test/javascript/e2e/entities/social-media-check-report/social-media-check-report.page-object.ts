import { element, by, promise, ElementFinder } from 'protractor';

export class SocialMediaCheckReportComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    title = element.all(by.css('jhi-social-media-check-report div h2#page-heading span')).first();

    clickOnCreateButton(): promise.Promise<void> {
        return this.createButton.click();
    }

    getTitle(): any {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class SocialMediaCheckReportUpdatePage {
    pageTitle = element(by.id('jhi-social-media-check-report-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    socialMediaSourcesCheckedInput = element(by.id('field_socialMediaSourcesChecked'));
    socialMediaFindingsInput = element(by.id('field_socialMediaFindings'));
    socialMediaVerifiedDateInput = element(by.id('field_socialMediaVerifiedDate'));

    getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    setSocialMediaSourcesCheckedInput(socialMediaSourcesChecked): promise.Promise<void> {
        return this.socialMediaSourcesCheckedInput.sendKeys(socialMediaSourcesChecked);
    }

    getSocialMediaSourcesCheckedInput() {
        return this.socialMediaSourcesCheckedInput.getAttribute('value');
    }

    setSocialMediaFindingsInput(socialMediaFindings): promise.Promise<void> {
        return this.socialMediaFindingsInput.sendKeys(socialMediaFindings);
    }

    getSocialMediaFindingsInput() {
        return this.socialMediaFindingsInput.getAttribute('value');
    }

    setSocialMediaVerifiedDateInput(socialMediaVerifiedDate): promise.Promise<void> {
        return this.socialMediaVerifiedDateInput.sendKeys(socialMediaVerifiedDate);
    }

    getSocialMediaVerifiedDateInput() {
        return this.socialMediaVerifiedDateInput.getAttribute('value');
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
