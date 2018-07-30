import { element, by, promise, ElementFinder } from 'protractor';

export class OrderFileComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    title = element.all(by.css('jhi-order-file div h2#page-heading span')).first();

    clickOnCreateButton(): promise.Promise<void> {
        return this.createButton.click();
    }

    getTitle(): any {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class OrderFileUpdatePage {
    pageTitle = element(by.id('jhi-order-file-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    nameInput = element(by.id('field_name'));
    localFilesInput = element(by.id('field_localFiles'));
    filesInput = element(by.id('field_files'));
    linksInput = element(by.id('field_links'));
    displayLinksInput = element(by.id('field_displayLinks'));
    iCoverNameInput = element(by.id('field_iCoverName'));
    orderIdInput = element(by.id('field_orderId'));

    getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    setNameInput(name): promise.Promise<void> {
        return this.nameInput.sendKeys(name);
    }

    getNameInput() {
        return this.nameInput.getAttribute('value');
    }

    setLocalFilesInput(localFiles): promise.Promise<void> {
        return this.localFilesInput.sendKeys(localFiles);
    }

    getLocalFilesInput() {
        return this.localFilesInput.getAttribute('value');
    }

    setFilesInput(files): promise.Promise<void> {
        return this.filesInput.sendKeys(files);
    }

    getFilesInput() {
        return this.filesInput.getAttribute('value');
    }

    setLinksInput(links): promise.Promise<void> {
        return this.linksInput.sendKeys(links);
    }

    getLinksInput() {
        return this.linksInput.getAttribute('value');
    }

    setDisplayLinksInput(displayLinks): promise.Promise<void> {
        return this.displayLinksInput.sendKeys(displayLinks);
    }

    getDisplayLinksInput() {
        return this.displayLinksInput.getAttribute('value');
    }

    setICoverNameInput(iCoverName): promise.Promise<void> {
        return this.iCoverNameInput.sendKeys(iCoverName);
    }

    getICoverNameInput() {
        return this.iCoverNameInput.getAttribute('value');
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
