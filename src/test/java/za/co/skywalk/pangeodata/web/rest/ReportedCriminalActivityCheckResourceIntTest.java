package za.co.skywalk.pangeodata.web.rest;

import za.co.skywalk.pangeodata.PangeodataJHipsterApp;

import za.co.skywalk.pangeodata.domain.ReportedCriminalActivityCheck;
import za.co.skywalk.pangeodata.repository.ReportedCriminalActivityCheckRepository;
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
 * Test class for the ReportedCriminalActivityCheckResource REST controller.
 *
 * @see ReportedCriminalActivityCheckResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = PangeodataJHipsterApp.class)
public class ReportedCriminalActivityCheckResourceIntTest {

    private static final String DEFAULT_REPORTED_CRIMINAL_ACTIVITY_RECORD_FOUND = "AAAAAAAAAA";
    private static final String UPDATED_REPORTED_CRIMINAL_ACTIVITY_RECORD_FOUND = "BBBBBBBBBB";

    private static final String DEFAULT_REPORTED_CRIMINAL_ACTIVITY_VERIFIED_BY = "AAAAAAAAAA";
    private static final String UPDATED_REPORTED_CRIMINAL_ACTIVITY_VERIFIED_BY = "BBBBBBBBBB";

    private static final String DEFAULT_REPORTED_CRIMINAL_ACTIVITY_VERIFIED_DATE = "AAAAAAAAAA";
    private static final String UPDATED_REPORTED_CRIMINAL_ACTIVITY_VERIFIED_DATE = "BBBBBBBBBB";

    private static final String DEFAULT_REPORTED_CRIMINAL_ACTIVITY_REMARKS = "AAAAAAAAAA";
    private static final String UPDATED_REPORTED_CRIMINAL_ACTIVITY_REMARKS = "BBBBBBBBBB";

    @Autowired
    private ReportedCriminalActivityCheckRepository reportedCriminalActivityCheckRepository;


    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    private MockMvc restReportedCriminalActivityCheckMockMvc;

    private ReportedCriminalActivityCheck reportedCriminalActivityCheck;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ReportedCriminalActivityCheckResource reportedCriminalActivityCheckResource = new ReportedCriminalActivityCheckResource(reportedCriminalActivityCheckRepository);
        this.restReportedCriminalActivityCheckMockMvc = MockMvcBuilders.standaloneSetup(reportedCriminalActivityCheckResource)
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
    public static ReportedCriminalActivityCheck createEntity() {
        ReportedCriminalActivityCheck reportedCriminalActivityCheck = new ReportedCriminalActivityCheck()
            .reportedCriminalActivityRecordFound(DEFAULT_REPORTED_CRIMINAL_ACTIVITY_RECORD_FOUND)
            .reportedCriminalActivityVerifiedBy(DEFAULT_REPORTED_CRIMINAL_ACTIVITY_VERIFIED_BY)
            .reportedCriminalActivityVerifiedDate(DEFAULT_REPORTED_CRIMINAL_ACTIVITY_VERIFIED_DATE)
            .reportedCriminalActivityRemarks(DEFAULT_REPORTED_CRIMINAL_ACTIVITY_REMARKS);
        return reportedCriminalActivityCheck;
    }

    @Before
    public void initTest() {
        reportedCriminalActivityCheckRepository.deleteAll();
        reportedCriminalActivityCheck = createEntity();
    }

    @Test
    public void createReportedCriminalActivityCheck() throws Exception {
        int databaseSizeBeforeCreate = reportedCriminalActivityCheckRepository.findAll().size();

        // Create the ReportedCriminalActivityCheck
        restReportedCriminalActivityCheckMockMvc.perform(post("/api/reported-criminal-activity-checks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(reportedCriminalActivityCheck)))
            .andExpect(status().isCreated());

        // Validate the ReportedCriminalActivityCheck in the database
        List<ReportedCriminalActivityCheck> reportedCriminalActivityCheckList = reportedCriminalActivityCheckRepository.findAll();
        assertThat(reportedCriminalActivityCheckList).hasSize(databaseSizeBeforeCreate + 1);
        ReportedCriminalActivityCheck testReportedCriminalActivityCheck = reportedCriminalActivityCheckList.get(reportedCriminalActivityCheckList.size() - 1);
        assertThat(testReportedCriminalActivityCheck.getReportedCriminalActivityRecordFound()).isEqualTo(DEFAULT_REPORTED_CRIMINAL_ACTIVITY_RECORD_FOUND);
        assertThat(testReportedCriminalActivityCheck.getReportedCriminalActivityVerifiedBy()).isEqualTo(DEFAULT_REPORTED_CRIMINAL_ACTIVITY_VERIFIED_BY);
        assertThat(testReportedCriminalActivityCheck.getReportedCriminalActivityVerifiedDate()).isEqualTo(DEFAULT_REPORTED_CRIMINAL_ACTIVITY_VERIFIED_DATE);
        assertThat(testReportedCriminalActivityCheck.getReportedCriminalActivityRemarks()).isEqualTo(DEFAULT_REPORTED_CRIMINAL_ACTIVITY_REMARKS);
    }

    @Test
    public void createReportedCriminalActivityCheckWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = reportedCriminalActivityCheckRepository.findAll().size();

        // Create the ReportedCriminalActivityCheck with an existing ID
        reportedCriminalActivityCheck.setId("existing_id");

        // An entity with an existing ID cannot be created, so this API call must fail
        restReportedCriminalActivityCheckMockMvc.perform(post("/api/reported-criminal-activity-checks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(reportedCriminalActivityCheck)))
            .andExpect(status().isBadRequest());

        // Validate the ReportedCriminalActivityCheck in the database
        List<ReportedCriminalActivityCheck> reportedCriminalActivityCheckList = reportedCriminalActivityCheckRepository.findAll();
        assertThat(reportedCriminalActivityCheckList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    public void getAllReportedCriminalActivityChecks() throws Exception {
        // Initialize the database
        reportedCriminalActivityCheckRepository.save(reportedCriminalActivityCheck);

        // Get all the reportedCriminalActivityCheckList
        restReportedCriminalActivityCheckMockMvc.perform(get("/api/reported-criminal-activity-checks?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(reportedCriminalActivityCheck.getId())))
            .andExpect(jsonPath("$.[*].reportedCriminalActivityRecordFound").value(hasItem(DEFAULT_REPORTED_CRIMINAL_ACTIVITY_RECORD_FOUND.toString())))
            .andExpect(jsonPath("$.[*].reportedCriminalActivityVerifiedBy").value(hasItem(DEFAULT_REPORTED_CRIMINAL_ACTIVITY_VERIFIED_BY.toString())))
            .andExpect(jsonPath("$.[*].reportedCriminalActivityVerifiedDate").value(hasItem(DEFAULT_REPORTED_CRIMINAL_ACTIVITY_VERIFIED_DATE.toString())))
            .andExpect(jsonPath("$.[*].reportedCriminalActivityRemarks").value(hasItem(DEFAULT_REPORTED_CRIMINAL_ACTIVITY_REMARKS.toString())));
    }
    

    @Test
    public void getReportedCriminalActivityCheck() throws Exception {
        // Initialize the database
        reportedCriminalActivityCheckRepository.save(reportedCriminalActivityCheck);

        // Get the reportedCriminalActivityCheck
        restReportedCriminalActivityCheckMockMvc.perform(get("/api/reported-criminal-activity-checks/{id}", reportedCriminalActivityCheck.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(reportedCriminalActivityCheck.getId()))
            .andExpect(jsonPath("$.reportedCriminalActivityRecordFound").value(DEFAULT_REPORTED_CRIMINAL_ACTIVITY_RECORD_FOUND.toString()))
            .andExpect(jsonPath("$.reportedCriminalActivityVerifiedBy").value(DEFAULT_REPORTED_CRIMINAL_ACTIVITY_VERIFIED_BY.toString()))
            .andExpect(jsonPath("$.reportedCriminalActivityVerifiedDate").value(DEFAULT_REPORTED_CRIMINAL_ACTIVITY_VERIFIED_DATE.toString()))
            .andExpect(jsonPath("$.reportedCriminalActivityRemarks").value(DEFAULT_REPORTED_CRIMINAL_ACTIVITY_REMARKS.toString()));
    }
    @Test
    public void getNonExistingReportedCriminalActivityCheck() throws Exception {
        // Get the reportedCriminalActivityCheck
        restReportedCriminalActivityCheckMockMvc.perform(get("/api/reported-criminal-activity-checks/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateReportedCriminalActivityCheck() throws Exception {
        // Initialize the database
        reportedCriminalActivityCheckRepository.save(reportedCriminalActivityCheck);

        int databaseSizeBeforeUpdate = reportedCriminalActivityCheckRepository.findAll().size();

        // Update the reportedCriminalActivityCheck
        ReportedCriminalActivityCheck updatedReportedCriminalActivityCheck = reportedCriminalActivityCheckRepository.findById(reportedCriminalActivityCheck.getId()).get();
        updatedReportedCriminalActivityCheck
            .reportedCriminalActivityRecordFound(UPDATED_REPORTED_CRIMINAL_ACTIVITY_RECORD_FOUND)
            .reportedCriminalActivityVerifiedBy(UPDATED_REPORTED_CRIMINAL_ACTIVITY_VERIFIED_BY)
            .reportedCriminalActivityVerifiedDate(UPDATED_REPORTED_CRIMINAL_ACTIVITY_VERIFIED_DATE)
            .reportedCriminalActivityRemarks(UPDATED_REPORTED_CRIMINAL_ACTIVITY_REMARKS);

        restReportedCriminalActivityCheckMockMvc.perform(put("/api/reported-criminal-activity-checks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedReportedCriminalActivityCheck)))
            .andExpect(status().isOk());

        // Validate the ReportedCriminalActivityCheck in the database
        List<ReportedCriminalActivityCheck> reportedCriminalActivityCheckList = reportedCriminalActivityCheckRepository.findAll();
        assertThat(reportedCriminalActivityCheckList).hasSize(databaseSizeBeforeUpdate);
        ReportedCriminalActivityCheck testReportedCriminalActivityCheck = reportedCriminalActivityCheckList.get(reportedCriminalActivityCheckList.size() - 1);
        assertThat(testReportedCriminalActivityCheck.getReportedCriminalActivityRecordFound()).isEqualTo(UPDATED_REPORTED_CRIMINAL_ACTIVITY_RECORD_FOUND);
        assertThat(testReportedCriminalActivityCheck.getReportedCriminalActivityVerifiedBy()).isEqualTo(UPDATED_REPORTED_CRIMINAL_ACTIVITY_VERIFIED_BY);
        assertThat(testReportedCriminalActivityCheck.getReportedCriminalActivityVerifiedDate()).isEqualTo(UPDATED_REPORTED_CRIMINAL_ACTIVITY_VERIFIED_DATE);
        assertThat(testReportedCriminalActivityCheck.getReportedCriminalActivityRemarks()).isEqualTo(UPDATED_REPORTED_CRIMINAL_ACTIVITY_REMARKS);
    }

    @Test
    public void updateNonExistingReportedCriminalActivityCheck() throws Exception {
        int databaseSizeBeforeUpdate = reportedCriminalActivityCheckRepository.findAll().size();

        // Create the ReportedCriminalActivityCheck

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restReportedCriminalActivityCheckMockMvc.perform(put("/api/reported-criminal-activity-checks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(reportedCriminalActivityCheck)))
            .andExpect(status().isBadRequest());

        // Validate the ReportedCriminalActivityCheck in the database
        List<ReportedCriminalActivityCheck> reportedCriminalActivityCheckList = reportedCriminalActivityCheckRepository.findAll();
        assertThat(reportedCriminalActivityCheckList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    public void deleteReportedCriminalActivityCheck() throws Exception {
        // Initialize the database
        reportedCriminalActivityCheckRepository.save(reportedCriminalActivityCheck);

        int databaseSizeBeforeDelete = reportedCriminalActivityCheckRepository.findAll().size();

        // Get the reportedCriminalActivityCheck
        restReportedCriminalActivityCheckMockMvc.perform(delete("/api/reported-criminal-activity-checks/{id}", reportedCriminalActivityCheck.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<ReportedCriminalActivityCheck> reportedCriminalActivityCheckList = reportedCriminalActivityCheckRepository.findAll();
        assertThat(reportedCriminalActivityCheckList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ReportedCriminalActivityCheck.class);
        ReportedCriminalActivityCheck reportedCriminalActivityCheck1 = new ReportedCriminalActivityCheck();
        reportedCriminalActivityCheck1.setId("id1");
        ReportedCriminalActivityCheck reportedCriminalActivityCheck2 = new ReportedCriminalActivityCheck();
        reportedCriminalActivityCheck2.setId(reportedCriminalActivityCheck1.getId());
        assertThat(reportedCriminalActivityCheck1).isEqualTo(reportedCriminalActivityCheck2);
        reportedCriminalActivityCheck2.setId("id2");
        assertThat(reportedCriminalActivityCheck1).isNotEqualTo(reportedCriminalActivityCheck2);
        reportedCriminalActivityCheck1.setId(null);
        assertThat(reportedCriminalActivityCheck1).isNotEqualTo(reportedCriminalActivityCheck2);
    }
}
