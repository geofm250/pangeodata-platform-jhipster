import { browser } from 'protractor';
import { NavBarPage } from './../../page-objects/jhi-page-objects';
import { FileComponentsPage, FileUpdatePage } from './file.page-object';

describe('File e2e test', () => {
    let navBarPage: NavBarPage;
    let fileUpdatePage: FileUpdatePage;
    let fileComponentsPage: FileComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Files', () => {
        navBarPage.goToEntity('file');
        fileComponentsPage = new FileComponentsPage();
        expect(fileComponentsPage.getTitle()).toMatch(/pangeodataJHipsterApp.file.home.title/);
    });

    it('should load create File page', () => {
        fileComponentsPage.clickOnCreateButton();
        fileUpdatePage = new FileUpdatePage();
        expect(fileUpdatePage.getPageTitle()).toMatch(/pangeodataJHipsterApp.file.home.createOrEditLabel/);
        fileUpdatePage.cancel();
    });

    it('should create and save Files', () => {
        fileComponentsPage.clickOnCreateButton();
        fileUpdatePage.setUrlInput('url');
        expect(fileUpdatePage.getUrlInput()).toMatch('url');
        fileUpdatePage.setOrderFileIdInput('orderFileId');
        expect(fileUpdatePage.getOrderFileIdInput()).toMatch('orderFileId');
        fileUpdatePage.save();
        expect(fileUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});
