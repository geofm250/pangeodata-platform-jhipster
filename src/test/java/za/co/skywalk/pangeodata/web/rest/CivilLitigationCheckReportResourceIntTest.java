package za.co.skywalk.pangeodata.web.rest;

import za.co.skywalk.pangeodata.PangeodataJHipsterApp;

import za.co.skywalk.pangeodata.domain.CivilLitigationCheckReport;
import za.co.skywalk.pangeodata.repository.CivilLitigationCheckReportRepository;
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
 * Test class for the CivilLitigationCheckReportResource REST controller.
 *
 * @see CivilLitigationCheckReportResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = PangeodataJHipsterApp.class)
public class CivilLitigationCheckReportResourceIntTest {

    private static final String DEFAULT_CIVIL_RECORD_FOUND = "AAAAAAAAAA";
    private static final String UPDATED_CIVIL_RECORD_FOUND = "BBBBBBBBBB";

    private static final String DEFAULT_CIVIL_FINDINGS = "AAAAAAAAAA";
    private static final String UPDATED_CIVIL_FINDINGS = "BBBBBBBBBB";

    private static final String DEFAULT_CIVIL_VERIFIED_BY = "AAAAAAAAAA";
    private static final String UPDATED_CIVIL_VERIFIED_BY = "BBBBBBBBBB";

    private static final String DEFAULT_CIVIL_VERIFIED_DATE = "AAAAAAAAAA";
    private static final String UPDATED_CIVIL_VERIFIED_DATE = "BBBBBBBBBB";

    private static final String DEFAULT_CIVIL_REMARKS = "AAAAAAAAAA";
    private static final String UPDATED_CIVIL_REMARKS = "BBBBBBBBBB";

    @Autowired
    private CivilLitigationCheckReportRepository civilLitigationCheckReportRepository;


    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    private MockMvc restCivilLitigationCheckReportMockMvc;

    private CivilLitigationCheckReport civilLitigationCheckReport;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CivilLitigationCheckReportResource civilLitigationCheckReportResource = new CivilLitigationCheckReportResource(civilLitigationCheckReportRepository);
        this.restCivilLitigationCheckReportMockMvc = MockMvcBuilders.standaloneSetup(civilLitigationCheckReportResource)
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
    public static CivilLitigationCheckReport createEntity() {
        CivilLitigationCheckReport civilLitigationCheckReport = new CivilLitigationCheckReport()
            .civilRecordFound(DEFAULT_CIVIL_RECORD_FOUND)
            .civilFindings(DEFAULT_CIVIL_FINDINGS)
            .civilVerifiedBy(DEFAULT_CIVIL_VERIFIED_BY)
            .civilVerifiedDate(DEFAULT_CIVIL_VERIFIED_DATE)
            .civilRemarks(DEFAULT_CIVIL_REMARKS);
        return civilLitigationCheckReport;
    }

    @Before
    public void initTest() {
        civilLitigationCheckReportRepository.deleteAll();
        civilLitigationCheckReport = createEntity();
    }

    @Test
    public void createCivilLitigationCheckReport() throws Exception {
        int databaseSizeBeforeCreate = civilLitigationCheckReportRepository.findAll().size();

        // Create the CivilLitigationCheckReport
        restCivilLitigationCheckReportMockMvc.perform(post("/api/civil-litigation-check-reports")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(civilLitigationCheckReport)))
            .andExpect(status().isCreated());

        // Validate the CivilLitigationCheckReport in the database
        List<CivilLitigationCheckReport> civilLitigationCheckReportList = civilLitigationCheckReportRepository.findAll();
        assertThat(civilLitigationCheckReportList).hasSize(databaseSizeBeforeCreate + 1);
        CivilLitigationCheckReport testCivilLitigationCheckReport = civilLitigationCheckReportList.get(civilLitigationCheckReportList.size() - 1);
        assertThat(testCivilLitigationCheckReport.getCivilRecordFound()).isEqualTo(DEFAULT_CIVIL_RECORD_FOUND);
        assertThat(testCivilLitigationCheckReport.getCivilFindings()).isEqualTo(DEFAULT_CIVIL_FINDINGS);
        assertThat(testCivilLitigationCheckReport.getCivilVerifiedBy()).isEqualTo(DEFAULT_CIVIL_VERIFIED_BY);
        assertThat(testCivilLitigationCheckReport.getCivilVerifiedDate()).isEqualTo(DEFAULT_CIVIL_VERIFIED_DATE);
        assertThat(testCivilLitigationCheckReport.getCivilRemarks()).isEqualTo(DEFAULT_CIVIL_REMARKS);
    }

    @Test
    public void createCivilLitigationCheckReportWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = civilLitigationCheckReportRepository.findAll().size();

        // Create the CivilLitigationCheckReport with an existing ID
        civilLitigationCheckReport.setId("existing_id");

        // An entity with an existing ID cannot be created, so this API call must fail
        restCivilLitigationCheckReportMockMvc.perform(post("/api/civil-litigation-check-reports")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(civilLitigationCheckReport)))
            .andExpect(status().isBadRequest());

        // Validate the CivilLitigationCheckReport in the database
        List<CivilLitigationCheckReport> civilLitigationCheckReportList = civilLitigationCheckReportRepository.findAll();
        assertThat(civilLitigationCheckReportList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    public void getAllCivilLitigationCheckReports() throws Exception {
        // Initialize the database
        civilLitigationCheckReportRepository.save(civilLitigationCheckReport);

        // Get all the civilLitigationCheckReportList
        restCivilLitigationCheckReportMockMvc.perform(get("/api/civil-litigation-check-reports?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(civilLitigationCheckReport.getId())))
            .andExpect(jsonPath("$.[*].civilRecordFound").value(hasItem(DEFAULT_CIVIL_RECORD_FOUND.toString())))
            .andExpect(jsonPath("$.[*].civilFindings").value(hasItem(DEFAULT_CIVIL_FINDINGS.toString())))
            .andExpect(jsonPath("$.[*].civilVerifiedBy").value(hasItem(DEFAULT_CIVIL_VERIFIED_BY.toString())))
            .andExpect(jsonPath("$.[*].civilVerifiedDate").value(hasItem(DEFAULT_CIVIL_VERIFIED_DATE.toString())))
            .andExpect(jsonPath("$.[*].civilRemarks").value(hasItem(DEFAULT_CIVIL_REMARKS.toString())));
    }
    

    @Test
    public void getCivilLitigationCheckReport() throws Exception {
        // Initialize the database
        civilLitigationCheckReportRepository.save(civilLitigationCheckReport);

        // Get the civilLitigationCheckReport
        restCivilLitigationCheckReportMockMvc.perform(get("/api/civil-litigation-check-reports/{id}", civilLitigationCheckReport.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(civilLitigationCheckReport.getId()))
            .andExpect(jsonPath("$.civilRecordFound").value(DEFAULT_CIVIL_RECORD_FOUND.toString()))
            .andExpect(jsonPath("$.civilFindings").value(DEFAULT_CIVIL_FINDINGS.toString()))
            .andExpect(jsonPath("$.civilVerifiedBy").value(DEFAULT_CIVIL_VERIFIED_BY.toString()))
            .andExpect(jsonPath("$.civilVerifiedDate").value(DEFAULT_CIVIL_VERIFIED_DATE.toString()))
            .andExpect(jsonPath("$.civilRemarks").value(DEFAULT_CIVIL_REMARKS.toString()));
    }
    @Test
    public void getNonExistingCivilLitigationCheckReport() throws Exception {
        // Get the civilLitigationCheckReport
        restCivilLitigationCheckReportMockMvc.perform(get("/api/civil-litigation-check-reports/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateCivilLitigationCheckReport() throws Exception {
        // Initialize the database
        civilLitigationCheckReportRepository.save(civilLitigationCheckReport);

        int databaseSizeBeforeUpdate = civilLitigationCheckReportRepository.findAll().size();

        // Update the civilLitigationCheckReport
        CivilLitigationCheckReport updatedCivilLitigationCheckReport = civilLitigationCheckReportRepository.findById(civilLitigationCheckReport.getId()).get();
        updatedCivilLitigationCheckReport
            .civilRecordFound(UPDATED_CIVIL_RECORD_FOUND)
            .civilFindings(UPDATED_CIVIL_FINDINGS)
            .civilVerifiedBy(UPDATED_CIVIL_VERIFIED_BY)
            .civilVerifiedDate(UPDATED_CIVIL_VERIFIED_DATE)
            .civilRemarks(UPDATED_CIVIL_REMARKS);

        restCivilLitigationCheckReportMockMvc.perform(put("/api/civil-litigation-check-reports")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedCivilLitigationCheckReport)))
            .andExpect(status().isOk());

        // Validate the CivilLitigationCheckReport in the database
        List<CivilLitigationCheckReport> civilLitigationCheckReportList = civilLitigationCheckReportRepository.findAll();
        assertThat(civilLitigationCheckReportList).hasSize(databaseSizeBeforeUpdate);
        CivilLitigationCheckReport testCivilLitigationCheckReport = civilLitigationCheckReportList.get(civilLitigationCheckReportList.size() - 1);
        assertThat(testCivilLitigationCheckReport.getCivilRecordFound()).isEqualTo(UPDATED_CIVIL_RECORD_FOUND);
        assertThat(testCivilLitigationCheckReport.getCivilFindings()).isEqualTo(UPDATED_CIVIL_FINDINGS);
        assertThat(testCivilLitigationCheckReport.getCivilVerifiedBy()).isEqualTo(UPDATED_CIVIL_VERIFIED_BY);
        assertThat(testCivilLitigationCheckReport.getCivilVerifiedDate()).isEqualTo(UPDATED_CIVIL_VERIFIED_DATE);
        assertThat(testCivilLitigationCheckReport.getCivilRemarks()).isEqualTo(UPDATED_CIVIL_REMARKS);
    }

    @Test
    public void updateNonExistingCivilLitigationCheckReport() throws Exception {
        int databaseSizeBeforeUpdate = civilLitigationCheckReportRepository.findAll().size();

        // Create the CivilLitigationCheckReport

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restCivilLitigationCheckReportMockMvc.perform(put("/api/civil-litigation-check-reports")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(civilLitigationCheckReport)))
            .andExpect(status().isBadRequest());

        // Validate the CivilLitigationCheckReport in the database
        List<CivilLitigationCheckReport> civilLitigationCheckReportList = civilLitigationCheckReportRepository.findAll();
        assertThat(civilLitigationCheckReportList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    public void deleteCivilLitigationCheckReport() throws Exception {
        // Initialize the database
        civilLitigationCheckReportRepository.save(civilLitigationCheckReport);

        int databaseSizeBeforeDelete = civilLitigationCheckReportRepository.findAll().size();

        // Get the civilLitigationCheckReport
        restCivilLitigationCheckReportMockMvc.perform(delete("/api/civil-litigation-check-reports/{id}", civilLitigationCheckReport.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<CivilLitigationCheckReport> civilLitigationCheckReportList = civilLitigationCheckReportRepository.findAll();
        assertThat(civilLitigationCheckReportList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CivilLitigationCheckReport.class);
        CivilLitigationCheckReport civilLitigationCheckReport1 = new CivilLitigationCheckReport();
        civilLitigationCheckReport1.setId("id1");
        CivilLitigationCheckReport civilLitigationCheckReport2 = new CivilLitigationCheckReport();
        civilLitigationCheckReport2.setId(civilLitigationCheckReport1.getId());
        assertThat(civilLitigationCheckReport1).isEqualTo(civilLitigationCheckReport2);
        civilLitigationCheckReport2.setId("id2");
        assertThat(civilLitigationCheckReport1).isNotEqualTo(civilLitigationCheckReport2);
        civilLitigationCheckReport1.setId(null);
        assertThat(civilLitigationCheckReport1).isNotEqualTo(civilLitigationCheckReport2);
    }
}
