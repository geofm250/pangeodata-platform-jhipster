import { browser } from 'protractor';
import { NavBarPage } from './../../page-objects/jhi-page-objects';
import { LinkComponentsPage, LinkUpdatePage } from './link.page-object';

describe('Link e2e test', () => {
    let navBarPage: NavBarPage;
    let linkUpdatePage: LinkUpdatePage;
    let linkComponentsPage: LinkComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Links', () => {
        navBarPage.goToEntity('link');
        linkComponentsPage = new LinkComponentsPage();
        expect(linkComponentsPage.getTitle()).toMatch(/pangeodataJHipsterApp.link.home.title/);
    });

    it('should load create Link page', () => {
        linkComponentsPage.clickOnCreateButton();
        linkUpdatePage = new LinkUpdatePage();
        expect(linkUpdatePage.getPageTitle()).toMatch(/pangeodataJHipsterApp.link.home.createOrEditLabel/);
        linkUpdatePage.cancel();
    });

    it('should create and save Links', () => {
        linkComponentsPage.clickOnCreateButton();
        linkUpdatePage.setRequirementIdInput('requirementId');
        expect(linkUpdatePage.getRequirementIdInput()).toMatch('requirementId');
        linkUpdatePage.setUrlInput('url');
        expect(linkUpdatePage.getUrlInput()).toMatch('url');
        linkUpdatePage.save();
        expect(linkUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});
