package za.co.skywalk.pangeodata.web.rest;

import za.co.skywalk.pangeodata.PangeodataJHipsterApp;

import za.co.skywalk.pangeodata.domain.EmploymentReport;
import za.co.skywalk.pangeodata.repository.EmploymentReportRepository;
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
 * Test class for the EmploymentReportResource REST controller.
 *
 * @see EmploymentReportResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = PangeodataJHipsterApp.class)
public class EmploymentReportResourceIntTest {

    private static final String DEFAULT_EMPLOYER_VERIFIED = "AAAAAAAAAA";
    private static final String UPDATED_EMPLOYER_VERIFIED = "BBBBBBBBBB";

    private static final String DEFAULT_EMPLOYMENT_START_DATE_VERIFIED = "AAAAAAAAAA";
    private static final String UPDATED_EMPLOYMENT_START_DATE_VERIFIED = "BBBBBBBBBB";

    private static final String DEFAULT_EMPLOYMENT_END_DATE_VERIFIED = "AAAAAAAAAA";
    private static final String UPDATED_EMPLOYMENT_END_DATE_VERIFIED = "BBBBBBBBBB";

    private static final String DEFAULT_TITLE_VERIFIED = "AAAAAAAAAA";
    private static final String UPDATED_TITLE_VERIFIED = "BBBBBBBBBB";

    private static final String DEFAULT_SLARY_VERIFIED = "AAAAAAAAAA";
    private static final String UPDATED_SLARY_VERIFIED = "BBBBBBBBBB";

    private static final String DEFAULT_REASON_FOR_TERMINATION = "AAAAAAAAAA";
    private static final String UPDATED_REASON_FOR_TERMINATION = "BBBBBBBBBB";

    private static final String DEFAULT_EMPLOYMENT_PERSON_CONTACT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_EMPLOYMENT_PERSON_CONTACT_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_EMPLOYMENT_DESIGNATION_CONTACT = "AAAAAAAAAA";
    private static final String UPDATED_EMPLOYMENT_DESIGNATION_CONTACT = "BBBBBBBBBB";

    private static final String DEFAULT_EMPLOYMENT_VERIFIED_DATE = "AAAAAAAAAA";
    private static final String UPDATED_EMPLOYMENT_VERIFIED_DATE = "BBBBBBBBBB";

    private static final String DEFAULT_EMPLOYMENT_REHIRE_ELIGIBILITY = "AAAAAAAAAA";
    private static final String UPDATED_EMPLOYMENT_REHIRE_ELIGIBILITY = "BBBBBBBBBB";

    private static final String DEFAULT_EMPLOYMENT_REHIRE_EXPLANATION = "AAAAAAAAAA";
    private static final String UPDATED_EMPLOYMENT_REHIRE_EXPLANATION = "BBBBBBBBBB";

    private static final String DEFAULT_EMPLOYMENT_REMARKS = "AAAAAAAAAA";
    private static final String UPDATED_EMPLOYMENT_REMARKS = "BBBBBBBBBB";

    @Autowired
    private EmploymentReportRepository employmentReportRepository;


    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    private MockMvc restEmploymentReportMockMvc;

    private EmploymentReport employmentReport;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final EmploymentReportResource employmentReportResource = new EmploymentReportResource(employmentReportRepository);
        this.restEmploymentReportMockMvc = MockMvcBuilders.standaloneSetup(employmentReportResource)
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
    public static EmploymentReport createEntity() {
        EmploymentReport employmentReport = new EmploymentReport()
            .employerVerified(DEFAULT_EMPLOYER_VERIFIED)
            .employmentStartDateVerified(DEFAULT_EMPLOYMENT_START_DATE_VERIFIED)
            .employmentEndDateVerified(DEFAULT_EMPLOYMENT_END_DATE_VERIFIED)
            .titleVerified(DEFAULT_TITLE_VERIFIED)
            .slaryVerified(DEFAULT_SLARY_VERIFIED)
            .reasonForTermination(DEFAULT_REASON_FOR_TERMINATION)
            .employmentPersonContactName(DEFAULT_EMPLOYMENT_PERSON_CONTACT_NAME)
            .employmentDesignationContact(DEFAULT_EMPLOYMENT_DESIGNATION_CONTACT)
            .employmentVerifiedDate(DEFAULT_EMPLOYMENT_VERIFIED_DATE)
            .employmentRehireEligibility(DEFAULT_EMPLOYMENT_REHIRE_ELIGIBILITY)
            .employmentRehireExplanation(DEFAULT_EMPLOYMENT_REHIRE_EXPLANATION)
            .employmentRemarks(DEFAULT_EMPLOYMENT_REMARKS);
        return employmentReport;
    }

    @Before
    public void initTest() {
        employmentReportRepository.deleteAll();
        employmentReport = createEntity();
    }

    @Test
    public void createEmploymentReport() throws Exception {
        int databaseSizeBeforeCreate = employmentReportRepository.findAll().size();

        // Create the EmploymentReport
        restEmploymentReportMockMvc.perform(post("/api/employment-reports")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(employmentReport)))
            .andExpect(status().isCreated());

        // Validate the EmploymentReport in the database
        List<EmploymentReport> employmentReportList = employmentReportRepository.findAll();
        assertThat(employmentReportList).hasSize(databaseSizeBeforeCreate + 1);
        EmploymentReport testEmploymentReport = employmentReportList.get(employmentReportList.size() - 1);
        assertThat(testEmploymentReport.getEmployerVerified()).isEqualTo(DEFAULT_EMPLOYER_VERIFIED);
        assertThat(testEmploymentReport.getEmploymentStartDateVerified()).isEqualTo(DEFAULT_EMPLOYMENT_START_DATE_VERIFIED);
        assertThat(testEmploymentReport.getEmploymentEndDateVerified()).isEqualTo(DEFAULT_EMPLOYMENT_END_DATE_VERIFIED);
        assertThat(testEmploymentReport.getTitleVerified()).isEqualTo(DEFAULT_TITLE_VERIFIED);
        assertThat(testEmploymentReport.getSlaryVerified()).isEqualTo(DEFAULT_SLARY_VERIFIED);
        assertThat(testEmploymentReport.getReasonForTermination()).isEqualTo(DEFAULT_REASON_FOR_TERMINATION);
        assertThat(testEmploymentReport.getEmploymentPersonContactName()).isEqualTo(DEFAULT_EMPLOYMENT_PERSON_CONTACT_NAME);
        assertThat(testEmploymentReport.getEmploymentDesignationContact()).isEqualTo(DEFAULT_EMPLOYMENT_DESIGNATION_CONTACT);
        assertThat(testEmploymentReport.getEmploymentVerifiedDate()).isEqualTo(DEFAULT_EMPLOYMENT_VERIFIED_DATE);
        assertThat(testEmploymentReport.getEmploymentRehireEligibility()).isEqualTo(DEFAULT_EMPLOYMENT_REHIRE_ELIGIBILITY);
        assertThat(testEmploymentReport.getEmploymentRehireExplanation()).isEqualTo(DEFAULT_EMPLOYMENT_REHIRE_EXPLANATION);
        assertThat(testEmploymentReport.getEmploymentRemarks()).isEqualTo(DEFAULT_EMPLOYMENT_REMARKS);
    }

    @Test
    public void createEmploymentReportWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = employmentReportRepository.findAll().size();

        // Create the EmploymentReport with an existing ID
        employmentReport.setId("existing_id");

        // An entity with an existing ID cannot be created, so this API call must fail
        restEmploymentReportMockMvc.perform(post("/api/employment-reports")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(employmentReport)))
            .andExpect(status().isBadRequest());

        // Validate the EmploymentReport in the database
        List<EmploymentReport> employmentReportList = employmentReportRepository.findAll();
        assertThat(employmentReportList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    public void getAllEmploymentReports() throws Exception {
        // Initialize the database
        employmentReportRepository.save(employmentReport);

        // Get all the employmentReportList
        restEmploymentReportMockMvc.perform(get("/api/employment-reports?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(employmentReport.getId())))
            .andExpect(jsonPath("$.[*].employerVerified").value(hasItem(DEFAULT_EMPLOYER_VERIFIED.toString())))
            .andExpect(jsonPath("$.[*].employmentStartDateVerified").value(hasItem(DEFAULT_EMPLOYMENT_START_DATE_VERIFIED.toString())))
            .andExpect(jsonPath("$.[*].employmentEndDateVerified").value(hasItem(DEFAULT_EMPLOYMENT_END_DATE_VERIFIED.toString())))
            .andExpect(jsonPath("$.[*].titleVerified").value(hasItem(DEFAULT_TITLE_VERIFIED.toString())))
            .andExpect(jsonPath("$.[*].slaryVerified").value(hasItem(DEFAULT_SLARY_VERIFIED.toString())))
            .andExpect(jsonPath("$.[*].reasonForTermination").value(hasItem(DEFAULT_REASON_FOR_TERMINATION.toString())))
            .andExpect(jsonPath("$.[*].employmentPersonContactName").value(hasItem(DEFAULT_EMPLOYMENT_PERSON_CONTACT_NAME.toString())))
            .andExpect(jsonPath("$.[*].employmentDesignationContact").value(hasItem(DEFAULT_EMPLOYMENT_DESIGNATION_CONTACT.toString())))
            .andExpect(jsonPath("$.[*].employmentVerifiedDate").value(hasItem(DEFAULT_EMPLOYMENT_VERIFIED_DATE.toString())))
            .andExpect(jsonPath("$.[*].employmentRehireEligibility").value(hasItem(DEFAULT_EMPLOYMENT_REHIRE_ELIGIBILITY.toString())))
            .andExpect(jsonPath("$.[*].employmentRehireExplanation").value(hasItem(DEFAULT_EMPLOYMENT_REHIRE_EXPLANATION.toString())))
            .andExpect(jsonPath("$.[*].employmentRemarks").value(hasItem(DEFAULT_EMPLOYMENT_REMARKS.toString())));
    }
    

    @Test
    public void getEmploymentReport() throws Exception {
        // Initialize the database
        employmentReportRepository.save(employmentReport);

        // Get the employmentReport
        restEmploymentReportMockMvc.perform(get("/api/employment-reports/{id}", employmentReport.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(employmentReport.getId()))
            .andExpect(jsonPath("$.employerVerified").value(DEFAULT_EMPLOYER_VERIFIED.toString()))
            .andExpect(jsonPath("$.employmentStartDateVerified").value(DEFAULT_EMPLOYMENT_START_DATE_VERIFIED.toString()))
            .andExpect(jsonPath("$.employmentEndDateVerified").value(DEFAULT_EMPLOYMENT_END_DATE_VERIFIED.toString()))
            .andExpect(jsonPath("$.titleVerified").value(DEFAULT_TITLE_VERIFIED.toString()))
            .andExpect(jsonPath("$.slaryVerified").value(DEFAULT_SLARY_VERIFIED.toString()))
            .andExpect(jsonPath("$.reasonForTermination").value(DEFAULT_REASON_FOR_TERMINATION.toString()))
            .andExpect(jsonPath("$.employmentPersonContactName").value(DEFAULT_EMPLOYMENT_PERSON_CONTACT_NAME.toString()))
            .andExpect(jsonPath("$.employmentDesignationContact").value(DEFAULT_EMPLOYMENT_DESIGNATION_CONTACT.toString()))
            .andExpect(jsonPath("$.employmentVerifiedDate").value(DEFAULT_EMPLOYMENT_VERIFIED_DATE.toString()))
            .andExpect(jsonPath("$.employmentRehireEligibility").value(DEFAULT_EMPLOYMENT_REHIRE_ELIGIBILITY.toString()))
            .andExpect(jsonPath("$.employmentRehireExplanation").value(DEFAULT_EMPLOYMENT_REHIRE_EXPLANATION.toString()))
            .andExpect(jsonPath("$.employmentRemarks").value(DEFAULT_EMPLOYMENT_REMARKS.toString()));
    }
    @Test
    public void getNonExistingEmploymentReport() throws Exception {
        // Get the employmentReport
        restEmploymentReportMockMvc.perform(get("/api/employment-reports/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateEmploymentReport() throws Exception {
        // Initialize the database
        employmentReportRepository.save(employmentReport);

        int databaseSizeBeforeUpdate = employmentReportRepository.findAll().size();

        // Update the employmentReport
        EmploymentReport updatedEmploymentReport = employmentReportRepository.findById(employmentReport.getId()).get();
        updatedEmploymentReport
            .employerVerified(UPDATED_EMPLOYER_VERIFIED)
            .employmentStartDateVerified(UPDATED_EMPLOYMENT_START_DATE_VERIFIED)
            .employmentEndDateVerified(UPDATED_EMPLOYMENT_END_DATE_VERIFIED)
            .titleVerified(UPDATED_TITLE_VERIFIED)
            .slaryVerified(UPDATED_SLARY_VERIFIED)
            .reasonForTermination(UPDATED_REASON_FOR_TERMINATION)
            .employmentPersonContactName(UPDATED_EMPLOYMENT_PERSON_CONTACT_NAME)
            .employmentDesignationContact(UPDATED_EMPLOYMENT_DESIGNATION_CONTACT)
            .employmentVerifiedDate(UPDATED_EMPLOYMENT_VERIFIED_DATE)
            .employmentRehireEligibility(UPDATED_EMPLOYMENT_REHIRE_ELIGIBILITY)
            .employmentRehireExplanation(UPDATED_EMPLOYMENT_REHIRE_EXPLANATION)
            .employmentRemarks(UPDATED_EMPLOYMENT_REMARKS);

        restEmploymentReportMockMvc.perform(put("/api/employment-reports")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedEmploymentReport)))
            .andExpect(status().isOk());

        // Validate the EmploymentReport in the database
        List<EmploymentReport> employmentReportList = employmentReportRepository.findAll();
        assertThat(employmentReportList).hasSize(databaseSizeBeforeUpdate);
        EmploymentReport testEmploymentReport = employmentReportList.get(employmentReportList.size() - 1);
        assertThat(testEmploymentReport.getEmployerVerified()).isEqualTo(UPDATED_EMPLOYER_VERIFIED);
        assertThat(testEmploymentReport.getEmploymentStartDateVerified()).isEqualTo(UPDATED_EMPLOYMENT_START_DATE_VERIFIED);
        assertThat(testEmploymentReport.getEmploymentEndDateVerified()).isEqualTo(UPDATED_EMPLOYMENT_END_DATE_VERIFIED);
        assertThat(testEmploymentReport.getTitleVerified()).isEqualTo(UPDATED_TITLE_VERIFIED);
        assertThat(testEmploymentReport.getSlaryVerified()).isEqualTo(UPDATED_SLARY_VERIFIED);
        assertThat(testEmploymentReport.getReasonForTermination()).isEqualTo(UPDATED_REASON_FOR_TERMINATION);
        assertThat(testEmploymentReport.getEmploymentPersonContactName()).isEqualTo(UPDATED_EMPLOYMENT_PERSON_CONTACT_NAME);
        assertThat(testEmploymentReport.getEmploymentDesignationContact()).isEqualTo(UPDATED_EMPLOYMENT_DESIGNATION_CONTACT);
        assertThat(testEmploymentReport.getEmploymentVerifiedDate()).isEqualTo(UPDATED_EMPLOYMENT_VERIFIED_DATE);
        assertThat(testEmploymentReport.getEmploymentRehireEligibility()).isEqualTo(UPDATED_EMPLOYMENT_REHIRE_ELIGIBILITY);
        assertThat(testEmploymentReport.getEmploymentRehireExplanation()).isEqualTo(UPDATED_EMPLOYMENT_REHIRE_EXPLANATION);
        assertThat(testEmploymentReport.getEmploymentRemarks()).isEqualTo(UPDATED_EMPLOYMENT_REMARKS);
    }

    @Test
    public void updateNonExistingEmploymentReport() throws Exception {
        int databaseSizeBeforeUpdate = employmentReportRepository.findAll().size();

        // Create the EmploymentReport

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restEmploymentReportMockMvc.perform(put("/api/employment-reports")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(employmentReport)))
            .andExpect(status().isBadRequest());

        // Validate the EmploymentReport in the database
        List<EmploymentReport> employmentReportList = employmentReportRepository.findAll();
        assertThat(employmentReportList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    public void deleteEmploymentReport() throws Exception {
        // Initialize the database
        employmentReportRepository.save(employmentReport);

        int databaseSizeBeforeDelete = employmentReportRepository.findAll().size();

        // Get the employmentReport
        restEmploymentReportMockMvc.perform(delete("/api/employment-reports/{id}", employmentReport.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<EmploymentReport> employmentReportList = employmentReportRepository.findAll();
        assertThat(employmentReportList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(EmploymentReport.class);
        EmploymentReport employmentReport1 = new EmploymentReport();
        employmentReport1.setId("id1");
        EmploymentReport employmentReport2 = new EmploymentReport();
        employmentReport2.setId(employmentReport1.getId());
        assertThat(employmentReport1).isEqualTo(employmentReport2);
        employmentReport2.setId("id2");
        assertThat(employmentReport1).isNotEqualTo(employmentReport2);
        employmentReport1.setId(null);
        assertThat(employmentReport1).isNotEqualTo(employmentReport2);
    }
}
