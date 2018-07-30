import { element, by, promise, ElementFinder } from 'protractor';

export class ApplicationServiceComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    title = element.all(by.css('jhi-application-service div h2#page-heading span')).first();

    clickOnCreateButton(): promise.Promise<void> {
        return this.createButton.click();
    }

    getTitle(): any {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class ApplicationServiceUpdatePage {
    pageTitle = element(by.id('jhi-application-service-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    applicationServiceIdInput = element(by.id('field_applicationServiceId'));
    orderIdInput = element(by.id('field_orderId'));

    getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    setApplicationServiceIdInput(applicationServiceId): promise.Promise<void> {
        return this.applicationServiceIdInput.sendKeys(applicationServiceId);
    }

    getApplicationServiceIdInput() {
        return this.applicationServiceIdInput.getAttribute('value');
    }

    setOrderIdInput(orderId): promise.Promise<void> {
        return this.orderIdInput.sendKeys(orderId);
    }

    getOrderIdInput() {
        return this.orderIdInput.getAttribute('value');
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
