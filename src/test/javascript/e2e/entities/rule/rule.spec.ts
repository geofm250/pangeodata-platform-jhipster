import { browser } from 'protractor';
import { NavBarPage } from './../../page-objects/jhi-page-objects';
import { RuleComponentsPage, RuleUpdatePage } from './rule.page-object';

describe('Rule e2e test', () => {
    let navBarPage: NavBarPage;
    let ruleUpdatePage: RuleUpdatePage;
    let ruleComponentsPage: RuleComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Rules', () => {
        navBarPage.goToEntity('rule');
        ruleComponentsPage = new RuleComponentsPage();
        expect(ruleComponentsPage.getTitle()).toMatch(/pangeodataJHipsterApp.rule.home.title/);
    });

    it('should load create Rule page', () => {
        ruleComponentsPage.clickOnCreateButton();
        ruleUpdatePage = new RuleUpdatePage();
        expect(ruleUpdatePage.getPageTitle()).toMatch(/pangeodataJHipsterApp.rule.home.createOrEditLabel/);
        ruleUpdatePage.cancel();
    });

    it('should create and save Rules', () => {
        ruleComponentsPage.clickOnCreateButton();
        ruleUpdatePage.setCountryInput('country');
        expect(ruleUpdatePage.getCountryInput()).toMatch('country');
        ruleUpdatePage.setRuleInput('rule');
        expect(ruleUpdatePage.getRuleInput()).toMatch('rule');
        ruleUpdatePage.save();
        expect(ruleUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});
