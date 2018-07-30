import { browser } from 'protractor';
import { NavBarPage } from './../../page-objects/jhi-page-objects';
import { EducationReportComponentsPage, EducationReportUpdatePage } from './education-report.page-object';

describe('EducationReport e2e test', () => {
    let navBarPage: NavBarPage;
    let educationReportUpdatePage: EducationReportUpdatePage;
    let educationReportComponentsPage: EducationReportComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load EducationReports', () => {
        navBarPage.goToEntity('education-report');
        educationReportComponentsPage = new EducationReportComponentsPage();
        expect(educationReportComponentsPage.getTitle()).toMatch(/pangeodataJHipsterApp.educationReport.home.title/);
    });

    it('should load create EducationReport page', () => {
        educationReportComponentsPage.clickOnCreateButton();
        educationReportUpdatePage = new EducationReportUpdatePage();
        expect(educationReportUpdatePage.getPageTitle()).toMatch(/pangeodataJHipsterApp.educationReport.home.createOrEditLabel/);
        educationReportUpdatePage.cancel();
    });

    it('should create and save EducationReports', () => {
        educationReportComponentsPage.clickOnCreateButton();
        educationReportUpdatePage.setDegreeVerifiedInput('degreeVerified');
        expect(educationReportUpdatePage.getDegreeVerifiedInput()).toMatch('degreeVerified');
        educationReportUpdatePage.setInstitutionVerifiedInput('institutionVerified');
        expect(educationReportUpdatePage.getInstitutionVerifiedInput()).toMatch('institutionVerified');
        educationReportUpdatePage.setAttendanceStartDateVerifiedInput('attendanceStartDateVerified');
        expect(educationReportUpdatePage.getAttendanceStartDateVerifiedInput()).toMatch('attendanceStartDateVerified');
        educationReportUpdatePage.setAttendanceEndDateInput('attendanceEndDate');
        expect(educationReportUpdatePage.getAttendanceEndDateInput()).toMatch('attendanceEndDate');
        educationReportUpdatePage.setAttendanceEndDateVerifiedInput('attendanceEndDateVerified');
        expect(educationReportUpdatePage.getAttendanceEndDateVerifiedInput()).toMatch('attendanceEndDateVerified');
        educationReportUpdatePage.setDegreeEarnedInput('degreeEarned');
        expect(educationReportUpdatePage.getDegreeEarnedInput()).toMatch('degreeEarned');
        educationReportUpdatePage.setMajorVerifiedInput('majorVerified');
        expect(educationReportUpdatePage.getMajorVerifiedInput()).toMatch('majorVerified');
        educationReportUpdatePage.setGraduationDateVerifiedInput('graduationDateVerified');
        expect(educationReportUpdatePage.getGraduationDateVerifiedInput()).toMatch('graduationDateVerified');
        educationReportUpdatePage.setEducationPersonContactNameInput('educationPersonContactName');
        expect(educationReportUpdatePage.getEducationPersonContactNameInput()).toMatch('educationPersonContactName');
        educationReportUpdatePage.setEducationDesignationContactInput('educationDesignationContact');
        expect(educationReportUpdatePage.getEducationDesignationContactInput()).toMatch('educationDesignationContact');
        educationReportUpdatePage.setEducationVerifiedDateInput('educationVerifiedDate');
        expect(educationReportUpdatePage.getEducationVerifiedDateInput()).toMatch('educationVerifiedDate');
        educationReportUpdatePage.setEducationRemarksInput('educationRemarks');
        expect(educationReportUpdatePage.getEducationRemarksInput()).toMatch('educationRemarks');
        educationReportUpdatePage.save();
        expect(educationReportUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});
