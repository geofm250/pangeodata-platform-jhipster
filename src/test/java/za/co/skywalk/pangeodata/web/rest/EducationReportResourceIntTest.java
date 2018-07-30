package za.co.skywalk.pangeodata.web.rest;

import za.co.skywalk.pangeodata.PangeodataJHipsterApp;

import za.co.skywalk.pangeodata.domain.EducationReport;
import za.co.skywalk.pangeodata.repository.EducationReportRepository;
import za.co.skywalk.pangeodata.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.List;


import static za.co.skywalk.pangeodata.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the EducationReportResource REST controller.
 *
 * @see EducationReportResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = PangeodataJHipsterApp.class)
public class EducationReportResourceIntTest {

    private static final String DEFAULT_DEGREE_VERIFIED = "AAAAAAAAAA";
    private static final String UPDATED_DEGREE_VERIFIED = "BBBBBBBBBB";

    private static final String DEFAULT_INSTITUTION_VERIFIED = "AAAAAAAAAA";
    private static final String UPDATED_INSTITUTION_VERIFIED = "BBBBBBBBBB";

    private static final String DEFAULT_ATTENDANCE_START_DATE_VERIFIED = "AAAAAAAAAA";
    private static final String UPDATED_ATTENDANCE_START_DATE_VERIFIED = "BBBBBBBBBB";

    private static final String DEFAULT_ATTENDANCE_END_DATE = "AAAAAAAAAA";
    private static final String UPDATED_ATTENDANCE_END_DATE = "BBBBBBBBBB";

    private static final String DEFAULT_ATTENDANCE_END_DATE_VERIFIED = "AAAAAAAAAA";
    private static final String UPDATED_ATTENDANCE_END_DATE_VERIFIED = "BBBBBBBBBB";

    private static final String DEFAULT_DEGREE_EARNED = "AAAAAAAAAA";
    private static final String UPDATED_DEGREE_EARNED = "BBBBBBBBBB";

    private static final String DEFAULT_MAJOR_VERIFIED = "AAAAAAAAAA";
    private static final String UPDATED_MAJOR_VERIFIED = "BBBBBBBBBB";

    private static final String DEFAULT_GRADUATION_DATE_VERIFIED = "AAAAAAAAAA";
    private static final String UPDATED_GRADUATION_DATE_VERIFIED = "BBBBBBBBBB";

    private static final String DEFAULT_EDUCATION_PERSON_CONTACT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_EDUCATION_PERSON_CONTACT_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_EDUCATION_DESIGNATION_CONTACT = "AAAAAAAAAA";
    private static final String UPDATED_EDUCATION_DESIGNATION_CONTACT = "BBBBBBBBBB";

    private static final String DEFAULT_EDUCATION_VERIFIED_DATE = "AAAAAAAAAA";
    private static final String UPDATED_EDUCATION_VERIFIED_DATE = "BBBBBBBBBB";

    private static final String DEFAULT_EDUCATION_REMARKS = "AAAAAAAAAA";
    private static final String UPDATED_EDUCATION_REMARKS = "BBBBBBBBBB";

    @Autowired
    private EducationReportRepository educationReportRepository;


    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    private MockMvc restEducationReportMockMvc;

    private EducationReport educationReport;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final EducationReportResource educationReportResource = new EducationReportResource(educationReportRepository);
        this.restEducationReportMockMvc = MockMvcBuilders.standaloneSetup(educationReportResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static EducationReport createEntity() {
        EducationReport educationReport = new EducationReport()
            .degreeVerified(DEFAULT_DEGREE_VERIFIED)
            .institutionVerified(DEFAULT_INSTITUTION_VERIFIED)
            .attendanceStartDateVerified(DEFAULT_ATTENDANCE_START_DATE_VERIFIED)
            .attendanceEndDate(DEFAULT_ATTENDANCE_END_DATE)
            .attendanceEndDateVerified(DEFAULT_ATTENDANCE_END_DATE_VERIFIED)
            .degreeEarned(DEFAULT_DEGREE_EARNED)
            .majorVerified(DEFAULT_MAJOR_VERIFIED)
            .graduationDateVerified(DEFAULT_GRADUATION_DATE_VERIFIED)
            .educationPersonContactName(DEFAULT_EDUCATION_PERSON_CONTACT_NAME)
            .educationDesignationContact(DEFAULT_EDUCATION_DESIGNATION_CONTACT)
            .educationVerifiedDate(DEFAULT_EDUCATION_VERIFIED_DATE)
            .educationRemarks(DEFAULT_EDUCATION_REMARKS);
        return educationReport;
    }

    @Before
    public void initTest() {
        educationReportRepository.deleteAll();
        educationReport = createEntity();
    }

    @Test
    public void createEducationReport() throws Exception {
        int databaseSizeBeforeCreate = educationReportRepository.findAll().size();

        // Create the EducationReport
        restEducationReportMockMvc.perform(post("/api/education-reports")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(educationReport)))
            .andExpect(status().isCreated());

        // Validate the EducationReport in the database
        List<EducationReport> educationReportList = educationReportRepository.findAll();
        assertThat(educationReportList).hasSize(databaseSizeBeforeCreate + 1);
        EducationReport testEducationReport = educationReportList.get(educationReportList.size() - 1);
        assertThat(testEducationReport.getDegreeVerified()).isEqualTo(DEFAULT_DEGREE_VERIFIED);
        assertThat(testEducationReport.getInstitutionVerified()).isEqualTo(DEFAULT_INSTITUTION_VERIFIED);
        assertThat(testEducationReport.getAttendanceStartDateVerified()).isEqualTo(DEFAULT_ATTENDANCE_START_DATE_VERIFIED);
        assertThat(testEducationReport.getAttendanceEndDate()).isEqualTo(DEFAULT_ATTENDANCE_END_DATE);
        assertThat(testEducationReport.getAttendanceEndDateVerified()).isEqualTo(DEFAULT_ATTENDANCE_END_DATE_VERIFIED);
        assertThat(testEducationReport.getDegreeEarned()).isEqualTo(DEFAULT_DEGREE_EARNED);
        assertThat(testEducationReport.getMajorVerified()).isEqualTo(DEFAULT_MAJOR_VERIFIED);
        assertThat(testEducationReport.getGraduationDateVerified()).isEqualTo(DEFAULT_GRADUATION_DATE_VERIFIED);
        assertThat(testEducationReport.getEducationPersonContactName()).isEqualTo(DEFAULT_EDUCATION_PERSON_CONTACT_NAME);
        assertThat(testEducationReport.getEducationDesignationContact()).isEqualTo(DEFAULT_EDUCATION_DESIGNATION_CONTACT);
        assertThat(testEducationReport.getEducationVerifiedDate()).isEqualTo(DEFAULT_EDUCATION_VERIFIED_DATE);
        assertThat(testEducationReport.getEducationRemarks()).isEqualTo(DEFAULT_EDUCATION_REMARKS);
    }

    @Test
    public void createEducationReportWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = educationReportRepository.findAll().size();

        // Create the EducationReport with an existing ID
        educationReport.setId("existing_id");

        // An entity with an existing ID cannot be created, so this API call must fail
        restEducationReportMockMvc.perform(post("/api/education-reports")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(educationReport)))
            .andExpect(status().isBadRequest());

        // Validate the EducationReport in the database
        List<EducationReport> educationReportList = educationReportRepository.findAll();
        assertThat(educationReportList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    public void getAllEducationReports() throws Exception {
        // Initialize the database
        educationReportRepository.save(educationReport);

        // Get all the educationReportList
        restEducationReportMockMvc.perform(get("/api/education-reports?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(educationReport.getId())))
            .andExpect(jsonPath("$.[*].degreeVerified").value(hasItem(DEFAULT_DEGREE_VERIFIED.toString())))
            .andExpect(jsonPath("$.[*].institutionVerified").value(hasItem(DEFAULT_INSTITUTION_VERIFIED.toString())))
            .andExpect(jsonPath("$.[*].attendanceStartDateVerified").value(hasItem(DEFAULT_ATTENDANCE_START_DATE_VERIFIED.toString())))
            .andExpect(jsonPath("$.[*].attendanceEndDate").value(hasItem(DEFAULT_ATTENDANCE_END_DATE.toString())))
            .andExpect(jsonPath("$.[*].attendanceEndDateVerified").value(hasItem(DEFAULT_ATTENDANCE_END_DATE_VERIFIED.toString())))
            .andExpect(jsonPath("$.[*].degreeEarned").value(hasItem(DEFAULT_DEGREE_EARNED.toString())))
            .andExpect(jsonPath("$.[*].majorVerified").value(hasItem(DEFAULT_MAJOR_VERIFIED.toString())))
            .andExpect(jsonPath("$.[*].graduationDateVerified").value(hasItem(DEFAULT_GRADUATION_DATE_VERIFIED.toString())))
            .andExpect(jsonPath("$.[*].educationPersonContactName").value(hasItem(DEFAULT_EDUCATION_PERSON_CONTACT_NAME.toString())))
            .andExpect(jsonPath("$.[*].educationDesignationContact").value(hasItem(DEFAULT_EDUCATION_DESIGNATION_CONTACT.toString())))
            .andExpect(jsonPath("$.[*].educationVerifiedDate").value(hasItem(DEFAULT_EDUCATION_VERIFIED_DATE.toString())))
            .andExpect(jsonPath("$.[*].educationRemarks").value(hasItem(DEFAULT_EDUCATION_REMARKS.toString())));
    }
    

    @Test
    public void getEducationReport() throws Exception {
        // Initialize the database
        educationReportRepository.save(educationReport);

        // Get the educationReport
        restEducationReportMockMvc.perform(get("/api/education-reports/{id}", educationReport.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(educationReport.getId()))
            .andExpect(jsonPath("$.degreeVerified").value(DEFAULT_DEGREE_VERIFIED.toString()))
            .andExpect(jsonPath("$.institutionVerified").value(DEFAULT_INSTITUTION_VERIFIED.toString()))
            .andExpect(jsonPath("$.attendanceStartDateVerified").value(DEFAULT_ATTENDANCE_START_DATE_VERIFIED.toString()))
            .andExpect(jsonPath("$.attendanceEndDate").value(DEFAULT_ATTENDANCE_END_DATE.toString()))
            .andExpect(jsonPath("$.attendanceEndDateVerified").value(DEFAULT_ATTENDANCE_END_DATE_VERIFIED.toString()))
            .andExpect(jsonPath("$.degreeEarned").value(DEFAULT_DEGREE_EARNED.toString()))
            .andExpect(jsonPath("$.majorVerified").value(DEFAULT_MAJOR_VERIFIED.toString()))
            .andExpect(jsonPath("$.graduationDateVerified").value(DEFAULT_GRADUATION_DATE_VERIFIED.toString()))
            .andExpect(jsonPath("$.educationPersonContactName").value(DEFAULT_EDUCATION_PERSON_CONTACT_NAME.toString()))
            .andExpect(jsonPath("$.educationDesignationContact").value(DEFAULT_EDUCATION_DESIGNATION_CONTACT.toString()))
            .andExpect(jsonPath("$.educationVerifiedDate").value(DEFAULT_EDUCATION_VERIFIED_DATE.toString()))
            .andExpect(jsonPath("$.educationRemarks").value(DEFAULT_EDUCATION_REMARKS.toString()));
    }
    @Test
    public void getNonExistingEducationReport() throws Exception {
        // Get the educationReport
        restEducationReportMockMvc.perform(get("/api/education-reports/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateEducationReport() throws Exception {
        // Initialize the database
        educationReportRepository.save(educationReport);

        int databaseSizeBeforeUpdate = educationReportRepository.findAll().size();

        // Update the educationReport
        EducationReport updatedEducationReport = educationReportRepository.findById(educationReport.getId()).get();
        updatedEducationReport
            .degreeVerified(UPDATED_DEGREE_VERIFIED)
            .institutionVerified(UPDATED_INSTITUTION_VERIFIED)
            .attendanceStartDateVerified(UPDATED_ATTENDANCE_START_DATE_VERIFIED)
            .attendanceEndDate(UPDATED_ATTENDANCE_END_DATE)
            .attendanceEndDateVerified(UPDATED_ATTENDANCE_END_DATE_VERIFIED)
            .degreeEarned(UPDATED_DEGREE_EARNED)
            .majorVerified(UPDATED_MAJOR_VERIFIED)
            .graduationDateVerified(UPDATED_GRADUATION_DATE_VERIFIED)
            .educationPersonContactName(UPDATED_EDUCATION_PERSON_CONTACT_NAME)
            .educationDesignationContact(UPDATED_EDUCATION_DESIGNATION_CONTACT)
            .educationVerifiedDate(UPDATED_EDUCATION_VERIFIED_DATE)
            .educationRemarks(UPDATED_EDUCATION_REMARKS);

        restEducationReportMockMvc.perform(put("/api/education-reports")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedEducationReport)))
            .andExpect(status().isOk());

        // Validate the EducationReport in the database
        List<EducationReport> educationReportList = educationReportRepository.findAll();
        assertThat(educationReportList).hasSize(databaseSizeBeforeUpdate);
        EducationReport testEducationReport = educationReportList.get(educationReportList.size() - 1);
        assertThat(testEducationReport.getDegreeVerified()).isEqualTo(UPDATED_DEGREE_VERIFIED);
        assertThat(testEducationReport.getInstitutionVerified()).isEqualTo(UPDATED_INSTITUTION_VERIFIED);
        assertThat(testEducationReport.getAttendanceStartDateVerified()).isEqualTo(UPDATED_ATTENDANCE_START_DATE_VERIFIED);
        assertThat(testEducationReport.getAttendanceEndDate()).isEqualTo(UPDATED_ATTENDANCE_END_DATE);
        assertThat(testEducationReport.getAttendanceEndDateVerified()).isEqualTo(UPDATED_ATTENDANCE_END_DATE_VERIFIED);
        assertThat(testEducationReport.getDegreeEarned()).isEqualTo(UPDATED_DEGREE_EARNED);
        assertThat(testEducationReport.getMajorVerified()).isEqualTo(UPDATED_MAJOR_VERIFIED);
        assertThat(testEducationReport.getGraduationDateVerified()).isEqualTo(UPDATED_GRADUATION_DATE_VERIFIED);
        assertThat(testEducationReport.getEducationPersonContactName()).isEqualTo(UPDATED_EDUCATION_PERSON_CONTACT_NAME);
        assertThat(testEducationReport.getEducationDesignationContact()).isEqualTo(UPDATED_EDUCATION_DESIGNATION_CONTACT);
        assertThat(testEducationReport.getEducationVerifiedDate()).isEqualTo(UPDATED_EDUCATION_VERIFIED_DATE);
        assertThat(testEducationReport.getEducationRemarks()).isEqualTo(UPDATED_EDUCATION_REMARKS);
    }

    @Test
    public void updateNonExistingEducationReport() throws Exception {
        int databaseSizeBeforeUpdate = educationReportRepository.findAll().size();

        // Create the EducationReport

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restEducationReportMockMvc.perform(put("/api/education-reports")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(educationReport)))
            .andExpect(status().isBadRequest());

        // Validate the EducationReport in the database
        List<EducationReport> educationReportList = educationReportRepository.findAll();
        assertThat(educationReportList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    public void deleteEducationReport() throws Exception {
        // Initialize the database
        educationReportRepository.save(educationReport);

        int databaseSizeBeforeDelete = educationReportRepository.findAll().size();

        // Get the educationReport
        restEducationReportMockMvc.perform(delete("/api/education-reports/{id}", educationReport.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<EducationReport> educationReportList = educationReportRepository.findAll();
        assertThat(educationReportList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(EducationReport.class);
        EducationReport educationReport1 = new EducationReport();
        educationReport1.setId("id1");
        EducationReport educationReport2 = new EducationReport();
        educationReport2.setId(educationReport1.getId());
        assertThat(educationReport1).isEqualTo(educationReport2);
        educationReport2.setId("id2");
        assertThat(educationReport1).isNotEqualTo(educationReport2);
        educationReport1.setId(null);
        assertThat(educationReport1).isNotEqualTo(educationReport2);
    }
}
