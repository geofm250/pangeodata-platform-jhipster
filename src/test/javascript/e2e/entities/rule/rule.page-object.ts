import { element, by, promise, ElementFinder } from 'protractor';

export class RuleComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    title = element.all(by.css('jhi-rule div h2#page-heading span')).first();

    clickOnCreateButton(): promise.Promise<void> {
        return this.createButton.click();
    }

    getTitle(): any {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class RuleUpdatePage {
    pageTitle = element(by.id('jhi-rule-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    countryInput = element(by.id('field_country'));
    ruleInput = element(by.id('field_rule'));

    getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    setCountryInput(country): promise.Promise<void> {
        return this.countryInput.sendKeys(country);
    }

    getCountryInput() {
        return this.countryInput.getAttribute('value');
    }

    setRuleInput(rule): promise.Promise<void> {
        return this.ruleInput.sendKeys(rule);
    }

    getRuleInput() {
        return this.ruleInput.getAttribute('value');
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
