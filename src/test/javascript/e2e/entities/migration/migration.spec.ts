import { browser } from 'protractor';
import { NavBarPage } from './../../page-objects/jhi-page-objects';
import { MigrationComponentsPage, MigrationUpdatePage } from './migration.page-object';

describe('Migration e2e test', () => {
    let navBarPage: NavBarPage;
    let migrationUpdatePage: MigrationUpdatePage;
    let migrationComponentsPage: MigrationComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Migrations', () => {
        navBarPage.goToEntity('migration');
        migrationComponentsPage = new MigrationComponentsPage();
        expect(migrationComponentsPage.getTitle()).toMatch(/pangeodataJHipsterApp.migration.home.title/);
    });

    it('should load create Migration page', () => {
        migrationComponentsPage.clickOnCreateButton();
        migrationUpdatePage = new MigrationUpdatePage();
        expect(migrationUpdatePage.getPageTitle()).toMatch(/pangeodataJHipsterApp.migration.home.createOrEditLabel/);
        migrationUpdatePage.cancel();
    });

    it('should create and save Migrations', () => {
        migrationComponentsPage.clickOnCreateButton();
        migrationUpdatePage.setDescriptionInput('description');
        expect(migrationUpdatePage.getDescriptionInput()).toMatch('description');
        migrationUpdatePage.setVersionInput('version');
        expect(migrationUpdatePage.getVersionInput()).toMatch('version');
        migrationUpdatePage.save();
        expect(migrationUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});
