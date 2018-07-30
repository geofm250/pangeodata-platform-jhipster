import { browser } from 'protractor';
import { NavBarPage } from './../../page-objects/jhi-page-objects';
import { ICoverNameComponentsPage, ICoverNameUpdatePage } from './i-cover-name.page-object';

describe('ICoverName e2e test', () => {
    let navBarPage: NavBarPage;
    let iCoverNameUpdatePage: ICoverNameUpdatePage;
    let iCoverNameComponentsPage: ICoverNameComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load ICoverNames', () => {
        navBarPage.goToEntity('i-cover-name');
        iCoverNameComponentsPage = new ICoverNameComponentsPage();
        expect(iCoverNameComponentsPage.getTitle()).toMatch(/pangeodataJHipsterApp.iCoverName.home.title/);
    });

    it('should load create ICoverName page', () => {
        iCoverNameComponentsPage.clickOnCreateButton();
        iCoverNameUpdatePage = new ICoverNameUpdatePage();
        expect(iCoverNameUpdatePage.getPageTitle()).toMatch(/pangeodataJHipsterApp.iCoverName.home.createOrEditLabel/);
        iCoverNameUpdatePage.cancel();
    });

    it('should create and save ICoverNames', () => {
        iCoverNameComponentsPage.clickOnCreateButton();
        iCoverNameUpdatePage.setNameInput('name');
        expect(iCoverNameUpdatePage.getNameInput()).toMatch('name');
        iCoverNameUpdatePage.setRequirementIdInput('requirementId');
        expect(iCoverNameUpdatePage.getRequirementIdInput()).toMatch('requirementId');
        iCoverNameUpdatePage.save();
        expect(iCoverNameUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});
