import { browser } from 'protractor';
import { NavBarPage } from './../../page-objects/jhi-page-objects';
import { RequirementComponentsPage, RequirementUpdatePage } from './requirement.page-object';

describe('Requirement e2e test', () => {
    let navBarPage: NavBarPage;
    let requirementUpdatePage: RequirementUpdatePage;
    let requirementComponentsPage: RequirementComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Requirements', () => {
        navBarPage.goToEntity('requirement');
        requirementComponentsPage = new RequirementComponentsPage();
        expect(requirementComponentsPage.getTitle()).toMatch(/pangeodataJHipsterApp.requirement.home.title/);
    });

    it('should load create Requirement page', () => {
        requirementComponentsPage.clickOnCreateButton();
        requirementUpdatePage = new RequirementUpdatePage();
        expect(requirementUpdatePage.getPageTitle()).toMatch(/pangeodataJHipsterApp.requirement.home.createOrEditLabel/);
        requirementUpdatePage.cancel();
    });

    it('should create and save Requirements', () => {
        requirementComponentsPage.clickOnCreateButton();
        requirementUpdatePage.setNameInput('name');
        expect(requirementUpdatePage.getNameInput()).toMatch('name');
        requirementUpdatePage.setLinksInput('links');
        expect(requirementUpdatePage.getLinksInput()).toMatch('links');
        requirementUpdatePage.setCountryInput('country');
        expect(requirementUpdatePage.getCountryInput()).toMatch('country');
        requirementUpdatePage.setProductInput('product');
        expect(requirementUpdatePage.getProductInput()).toMatch('product');
        requirementUpdatePage.setTypeInput('type');
        expect(requirementUpdatePage.getTypeInput()).toMatch('type');
        requirementUpdatePage.setInputInput('input');
        expect(requirementUpdatePage.getInputInput()).toMatch('input');
        requirementUpdatePage.setFormInput('form');
        expect(requirementUpdatePage.getFormInput()).toMatch('form');
        requirementUpdatePage.setActiveInput('active');
        expect(requirementUpdatePage.getActiveInput()).toMatch('active');
        requirementUpdatePage.setCreatedAtInput('createdAt');
        expect(requirementUpdatePage.getCreatedAtInput()).toMatch('createdAt');
        requirementUpdatePage.setUpdatedAtInput('updatedAt');
        expect(requirementUpdatePage.getUpdatedAtInput()).toMatch('updatedAt');
        requirementUpdatePage.setDisplayOrderInput('displayOrder');
        expect(requirementUpdatePage.getDisplayOrderInput()).toMatch('displayOrder');
        requirementUpdatePage.setDisplayDownloadLinkInput('displayDownloadLink');
        expect(requirementUpdatePage.getDisplayDownloadLinkInput()).toMatch('displayDownloadLink');
        requirementUpdatePage.setICoverNameInput('iCoverName');
        expect(requirementUpdatePage.getICoverNameInput()).toMatch('iCoverName');
        requirementUpdatePage.save();
        expect(requirementUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});
