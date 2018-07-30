import { browser } from 'protractor';
import { NavBarPage } from './../../page-objects/jhi-page-objects';
import { GeneralInformationComponentsPage, GeneralInformationUpdatePage } from './general-information.page-object';

describe('GeneralInformation e2e test', () => {
    let navBarPage: NavBarPage;
    let generalInformationUpdatePage: GeneralInformationUpdatePage;
    let generalInformationComponentsPage: GeneralInformationComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load GeneralInformations', () => {
        navBarPage.goToEntity('general-information');
        generalInformationComponentsPage = new GeneralInformationComponentsPage();
        expect(generalInformationComponentsPage.getTitle()).toMatch(/pangeodataJHipsterApp.generalInformation.home.title/);
    });

    it('should load create GeneralInformation page', () => {
        generalInformationComponentsPage.clickOnCreateButton();
        generalInformationUpdatePage = new GeneralInformationUpdatePage();
        expect(generalInformationUpdatePage.getPageTitle()).toMatch(/pangeodataJHipsterApp.generalInformation.home.createOrEditLabel/);
        generalInformationUpdatePage.cancel();
    });

    it('should create and save GeneralInformations', () => {
        generalInformationComponentsPage.clickOnCreateButton();
        generalInformationUpdatePage.setFirstNameInput('firstName');
        expect(generalInformationUpdatePage.getFirstNameInput()).toMatch('firstName');
        generalInformationUpdatePage.setMiddleNameInput('middleName');
        expect(generalInformationUpdatePage.getMiddleNameInput()).toMatch('middleName');
        generalInformationUpdatePage.setLastNameInput('lastName');
        expect(generalInformationUpdatePage.getLastNameInput()).toMatch('lastName');
        generalInformationUpdatePage.setMaidenNameInput('maidenName');
        expect(generalInformationUpdatePage.getMaidenNameInput()).toMatch('maidenName');
        generalInformationUpdatePage.setTitleInput('title');
        expect(generalInformationUpdatePage.getTitleInput()).toMatch('title');
        generalInformationUpdatePage.setBirthDateInput('birthDate');
        expect(generalInformationUpdatePage.getBirthDateInput()).toMatch('birthDate');
        generalInformationUpdatePage.setReferenceIdInput('referenceId');
        expect(generalInformationUpdatePage.getReferenceIdInput()).toMatch('referenceId');
        generalInformationUpdatePage.save();
        expect(generalInformationUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});
