package za.co.skywalk.pangeodata.web.rest;

import za.co.skywalk.pangeodata.PangeodataJHipsterApp;

import za.co.skywalk.pangeodata.domain.CriminalRecordReport;
import za.co.skywalk.pangeodata.repository.CriminalRecordReportRepository;
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
 * Test class for the CriminalRecordReportResource REST controller.
 *
 * @see CriminalRecordReportResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = PangeodataJHipsterApp.class)
public class CriminalRecordReportResourceIntTest {

    private static final String DEFAULT_RECORD_FOUND = "AAAAAAAAAA";
    private static final String UPDATED_RECORD_FOUND = "BBBBBBBBBB";

    private static final String DEFAULT_OFFENCES = "AAAAAAAAAA";
    private static final String UPDATED_OFFENCES = "BBBBBBBBBB";

    private static final String DEFAULT_VERIFIED_BY = "AAAAAAAAAA";
    private static final String UPDATED_VERIFIED_BY = "BBBBBBBBBB";

    private static final String DEFAULT_VERIFIED_DATE = "AAAAAAAAAA";
    private static final String UPDATED_VERIFIED_DATE = "BBBBBBBBBB";

    @Autowired
    private CriminalRecordReportRepository criminalRecordReportRepository;


    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    private MockMvc restCriminalRecordReportMockMvc;

    private CriminalRecordReport criminalRecordReport;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CriminalRecordReportResource criminalRecordReportResource = new CriminalRecordReportResource(criminalRecordReportRepository);
        this.restCriminalRecordReportMockMvc = MockMvcBuilders.standaloneSetup(criminalRecordReportResource)
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
    public static CriminalRecordReport createEntity() {
        CriminalRecordReport criminalRecordReport = new CriminalRecordReport()
            .recordFound(DEFAULT_RECORD_FOUND)
            .offences(DEFAULT_OFFENCES)
            .verifiedBy(DEFAULT_VERIFIED_BY)
            .verifiedDate(DEFAULT_VERIFIED_DATE);
        return criminalRecordReport;
    }

    @Before
    public void initTest() {
        criminalRecordReportRepository.deleteAll();
        criminalRecordReport = createEntity();
    }

    @Test
    public void createCriminalRecordReport() throws Exception {
        int databaseSizeBeforeCreate = criminalRecordReportRepository.findAll().size();

        // Create the CriminalRecordReport
        restCriminalRecordReportMockMvc.perform(post("/api/criminal-record-reports")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(criminalRecordReport)))
            .andExpect(status().isCreated());

        // Validate the CriminalRecordReport in the database
        List<CriminalRecordReport> criminalRecordReportList = criminalRecordReportRepository.findAll();
        assertThat(criminalRecordReportList).hasSize(databaseSizeBeforeCreate + 1);
        CriminalRecordReport testCriminalRecordReport = criminalRecordReportList.get(criminalRecordReportList.size() - 1);
        assertThat(testCriminalRecordReport.getRecordFound()).isEqualTo(DEFAULT_RECORD_FOUND);
        assertThat(testCriminalRecordReport.getOffences()).isEqualTo(DEFAULT_OFFENCES);
        assertThat(testCriminalRecordReport.getVerifiedBy()).isEqualTo(DEFAULT_VERIFIED_BY);
        assertThat(testCriminalRecordReport.getVerifiedDate()).isEqualTo(DEFAULT_VERIFIED_DATE);
    }

    @Test
    public void createCriminalRecordReportWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = criminalRecordReportRepository.findAll().size();

        // Create the CriminalRecordReport with an existing ID
        criminalRecordReport.setId("existing_id");

        // An entity with an existing ID cannot be created, so this API call must fail
        restCriminalRecordReportMockMvc.perform(post("/api/criminal-record-reports")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(criminalRecordReport)))
            .andExpect(status().isBadRequest());

        // Validate the CriminalRecordReport in the database
        List<CriminalRecordReport> criminalRecordReportList = criminalRecordReportRepository.findAll();
        assertThat(criminalRecordReportList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    public void getAllCriminalRecordReports() throws Exception {
        // Initialize the database
        criminalRecordReportRepository.save(criminalRecordReport);

        // Get all the criminalRecordReportList
        restCriminalRecordReportMockMvc.perform(get("/api/criminal-record-reports?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(criminalRecordReport.getId())))
            .andExpect(jsonPath("$.[*].recordFound").value(hasItem(DEFAULT_RECORD_FOUND.toString())))
            .andExpect(jsonPath("$.[*].offences").value(hasItem(DEFAULT_OFFENCES.toString())))
            .andExpect(jsonPath("$.[*].verifiedBy").value(hasItem(DEFAULT_VERIFIED_BY.toString())))
            .andExpect(jsonPath("$.[*].verifiedDate").value(hasItem(DEFAULT_VERIFIED_DATE.toString())));
    }
    

    @Test
    public void getCriminalRecordReport() throws Exception {
        // Initialize the database
        criminalRecordReportRepository.save(criminalRecordReport);

        // Get the criminalRecordReport
        restCriminalRecordReportMockMvc.perform(get("/api/criminal-record-reports/{id}", criminalRecordReport.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(criminalRecordReport.getId()))
            .andExpect(jsonPath("$.recordFound").value(DEFAULT_RECORD_FOUND.toString()))
            .andExpect(jsonPath("$.offences").value(DEFAULT_OFFENCES.toString()))
            .andExpect(jsonPath("$.verifiedBy").value(DEFAULT_VERIFIED_BY.toString()))
            .andExpect(jsonPath("$.verifiedDate").value(DEFAULT_VERIFIED_DATE.toString()));
    }
    @Test
    public void getNonExistingCriminalRecordReport() throws Exception {
        // Get the criminalRecordReport
        restCriminalRecordReportMockMvc.perform(get("/api/criminal-record-reports/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateCriminalRecordReport() throws Exception {
        // Initialize the database
        criminalRecordReportRepository.save(criminalRecordReport);

        int databaseSizeBeforeUpdate = criminalRecordReportRepository.findAll().size();

        // Update the criminalRecordReport
        CriminalRecordReport updatedCriminalRecordReport = criminalRecordReportRepository.findById(criminalRecordReport.getId()).get();
        updatedCriminalRecordReport
            .recordFound(UPDATED_RECORD_FOUND)
            .offences(UPDATED_OFFENCES)
            .verifiedBy(UPDATED_VERIFIED_BY)
            .verifiedDate(UPDATED_VERIFIED_DATE);

        restCriminalRecordReportMockMvc.perform(put("/api/criminal-record-reports")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedCriminalRecordReport)))
            .andExpect(status().isOk());

        // Validate the CriminalRecordReport in the database
        List<CriminalRecordReport> criminalRecordReportList = criminalRecordReportRepository.findAll();
        assertThat(criminalRecordReportList).hasSize(databaseSizeBeforeUpdate);
        CriminalRecordReport testCriminalRecordReport = criminalRecordReportList.get(criminalRecordReportList.size() - 1);
        assertThat(testCriminalRecordReport.getRecordFound()).isEqualTo(UPDATED_RECORD_FOUND);
        assertThat(testCriminalRecordReport.getOffences()).isEqualTo(UPDATED_OFFENCES);
        assertThat(testCriminalRecordReport.getVerifiedBy()).isEqualTo(UPDATED_VERIFIED_BY);
        assertThat(testCriminalRecordReport.getVerifiedDate()).isEqualTo(UPDATED_VERIFIED_DATE);
    }

    @Test
    public void updateNonExistingCriminalRecordReport() throws Exception {
        int databaseSizeBeforeUpdate = criminalRecordReportRepository.findAll().size();

        // Create the CriminalRecordReport

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restCriminalRecordReportMockMvc.perform(put("/api/criminal-record-reports")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(criminalRecordReport)))
            .andExpect(status().isBadRequest());

        // Validate the CriminalRecordReport in the database
        List<CriminalRecordReport> criminalRecordReportList = criminalRecordReportRepository.findAll();
        assertThat(criminalRecordReportList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    public void deleteCriminalRecordReport() throws Exception {
        // Initialize the database
        criminalRecordReportRepository.save(criminalRecordReport);

        int databaseSizeBeforeDelete = criminalRecordReportRepository.findAll().size();

        // Get the criminalRecordReport
        restCriminalRecordReportMockMvc.perform(delete("/api/criminal-record-reports/{id}", criminalRecordReport.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<CriminalRecordReport> criminalRecordReportList = criminalRecordReportRepository.findAll();
        assertThat(criminalRecordReportList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CriminalRecordReport.class);
        CriminalRecordReport criminalRecordReport1 = new CriminalRecordReport();
        criminalRecordReport1.setId("id1");
        CriminalRecordReport criminalRecordReport2 = new CriminalRecordReport();
        criminalRecordReport2.setId(criminalRecordReport1.getId());
        assertThat(criminalRecordReport1).isEqualTo(criminalRecordReport2);
        criminalRecordReport2.setId("id2");
        assertThat(criminalRecordReport1).isNotEqualTo(criminalRecordReport2);
        criminalRecordReport1.setId(null);
        assertThat(criminalRecordReport1).isNotEqualTo(criminalRecordReport2);
    }
}
