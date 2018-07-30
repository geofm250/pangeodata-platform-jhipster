package za.co.skywalk.pangeodata.web.rest;

import za.co.skywalk.pangeodata.PangeodataJHipsterApp;

import za.co.skywalk.pangeodata.domain.PoliticallyExposedPersonsCheckReport;
import za.co.skywalk.pangeodata.repository.PoliticallyExposedPersonsCheckReportRepository;
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
 * Test class for the PoliticallyExposedPersonsCheckReportResource REST controller.
 *
 * @see PoliticallyExposedPersonsCheckReportResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = PangeodataJHipsterApp.class)
public class PoliticallyExposedPersonsCheckReportResourceIntTest {

    private static final String DEFAULT_PEP_IDENTIFIED = "AAAAAAAAAA";
    private static final String UPDATED_PEP_IDENTIFIED = "BBBBBBBBBB";

    private static final String DEFAULT_PEP_VERIFIED_BY = "AAAAAAAAAA";
    private static final String UPDATED_PEP_VERIFIED_BY = "BBBBBBBBBB";

    private static final String DEFAULT_PEP_VERIFIED_DATE = "AAAAAAAAAA";
    private static final String UPDATED_PEP_VERIFIED_DATE = "BBBBBBBBBB";

    private static final String DEFAULT_PEP_REMARKS = "AAAAAAAAAA";
    private static final String UPDATED_PEP_REMARKS = "BBBBBBBBBB";

    @Autowired
    private PoliticallyExposedPersonsCheckReportRepository politicallyExposedPersonsCheckReportRepository;


    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    private MockMvc restPoliticallyExposedPersonsCheckReportMockMvc;

    private PoliticallyExposedPersonsCheckReport politicallyExposedPersonsCheckReport;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PoliticallyExposedPersonsCheckReportResource politicallyExposedPersonsCheckReportResource = new PoliticallyExposedPersonsCheckReportResource(politicallyExposedPersonsCheckReportRepository);
        this.restPoliticallyExposedPersonsCheckReportMockMvc = MockMvcBuilders.standaloneSetup(politicallyExposedPersonsCheckReportResource)
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
    public static PoliticallyExposedPersonsCheckReport createEntity() {
        PoliticallyExposedPersonsCheckReport politicallyExposedPersonsCheckReport = new PoliticallyExposedPersonsCheckReport()
            .pepIdentified(DEFAULT_PEP_IDENTIFIED)
            .pepVerifiedBy(DEFAULT_PEP_VERIFIED_BY)
            .pepVerifiedDate(DEFAULT_PEP_VERIFIED_DATE)
            .pepRemarks(DEFAULT_PEP_REMARKS);
        return politicallyExposedPersonsCheckReport;
    }

    @Before
    public void initTest() {
        politicallyExposedPersonsCheckReportRepository.deleteAll();
        politicallyExposedPersonsCheckReport = createEntity();
    }

    @Test
    public void createPoliticallyExposedPersonsCheckReport() throws Exception {
        int databaseSizeBeforeCreate = politicallyExposedPersonsCheckReportRepository.findAll().size();

        // Create the PoliticallyExposedPersonsCheckReport
        restPoliticallyExposedPersonsCheckReportMockMvc.perform(post("/api/politically-exposed-persons-check-reports")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(politicallyExposedPersonsCheckReport)))
            .andExpect(status().isCreated());

        // Validate the PoliticallyExposedPersonsCheckReport in the database
        List<PoliticallyExposedPersonsCheckReport> politicallyExposedPersonsCheckReportList = politicallyExposedPersonsCheckReportRepository.findAll();
        assertThat(politicallyExposedPersonsCheckReportList).hasSize(databaseSizeBeforeCreate + 1);
        PoliticallyExposedPersonsCheckReport testPoliticallyExposedPersonsCheckReport = politicallyExposedPersonsCheckReportList.get(politicallyExposedPersonsCheckReportList.size() - 1);
        assertThat(testPoliticallyExposedPersonsCheckReport.getPepIdentified()).isEqualTo(DEFAULT_PEP_IDENTIFIED);
        assertThat(testPoliticallyExposedPersonsCheckReport.getPepVerifiedBy()).isEqualTo(DEFAULT_PEP_VERIFIED_BY);
        assertThat(testPoliticallyExposedPersonsCheckReport.getPepVerifiedDate()).isEqualTo(DEFAULT_PEP_VERIFIED_DATE);
        assertThat(testPoliticallyExposedPersonsCheckReport.getPepRemarks()).isEqualTo(DEFAULT_PEP_REMARKS);
    }

    @Test
    public void createPoliticallyExposedPersonsCheckReportWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = politicallyExposedPersonsCheckReportRepository.findAll().size();

        // Create the PoliticallyExposedPersonsCheckReport with an existing ID
        politicallyExposedPersonsCheckReport.setId("existing_id");

        // An entity with an existing ID cannot be created, so this API call must fail
        restPoliticallyExposedPersonsCheckReportMockMvc.perform(post("/api/politically-exposed-persons-check-reports")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(politicallyExposedPersonsCheckReport)))
            .andExpect(status().isBadRequest());

        // Validate the PoliticallyExposedPersonsCheckReport in the database
        List<PoliticallyExposedPersonsCheckReport> politicallyExposedPersonsCheckReportList = politicallyExposedPersonsCheckReportRepository.findAll();
        assertThat(politicallyExposedPersonsCheckReportList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    public void getAllPoliticallyExposedPersonsCheckReports() throws Exception {
        // Initialize the database
        politicallyExposedPersonsCheckReportRepository.save(politicallyExposedPersonsCheckReport);

        // Get all the politicallyExposedPersonsCheckReportList
        restPoliticallyExposedPersonsCheckReportMockMvc.perform(get("/api/politically-exposed-persons-check-reports?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(politicallyExposedPersonsCheckReport.getId())))
            .andExpect(jsonPath("$.[*].pepIdentified").value(hasItem(DEFAULT_PEP_IDENTIFIED.toString())))
            .andExpect(jsonPath("$.[*].pepVerifiedBy").value(hasItem(DEFAULT_PEP_VERIFIED_BY.toString())))
            .andExpect(jsonPath("$.[*].pepVerifiedDate").value(hasItem(DEFAULT_PEP_VERIFIED_DATE.toString())))
            .andExpect(jsonPath("$.[*].pepRemarks").value(hasItem(DEFAULT_PEP_REMARKS.toString())));
    }
    

    @Test
    public void getPoliticallyExposedPersonsCheckReport() throws Exception {
        // Initialize the database
        politicallyExposedPersonsCheckReportRepository.save(politicallyExposedPersonsCheckReport);

        // Get the politicallyExposedPersonsCheckReport
        restPoliticallyExposedPersonsCheckReportMockMvc.perform(get("/api/politically-exposed-persons-check-reports/{id}", politicallyExposedPersonsCheckReport.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(politicallyExposedPersonsCheckReport.getId()))
            .andExpect(jsonPath("$.pepIdentified").value(DEFAULT_PEP_IDENTIFIED.toString()))
            .andExpect(jsonPath("$.pepVerifiedBy").value(DEFAULT_PEP_VERIFIED_BY.toString()))
            .andExpect(jsonPath("$.pepVerifiedDate").value(DEFAULT_PEP_VERIFIED_DATE.toString()))
            .andExpect(jsonPath("$.pepRemarks").value(DEFAULT_PEP_REMARKS.toString()));
    }
    @Test
    public void getNonExistingPoliticallyExposedPersonsCheckReport() throws Exception {
        // Get the politicallyExposedPersonsCheckReport
        restPoliticallyExposedPersonsCheckReportMockMvc.perform(get("/api/politically-exposed-persons-check-reports/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updatePoliticallyExposedPersonsCheckReport() throws Exception {
        // Initialize the database
        politicallyExposedPersonsCheckReportRepository.save(politicallyExposedPersonsCheckReport);

        int databaseSizeBeforeUpdate = politicallyExposedPersonsCheckReportRepository.findAll().size();

        // Update the politicallyExposedPersonsCheckReport
        PoliticallyExposedPersonsCheckReport updatedPoliticallyExposedPersonsCheckReport = politicallyExposedPersonsCheckReportRepository.findById(politicallyExposedPersonsCheckReport.getId()).get();
        updatedPoliticallyExposedPersonsCheckReport
            .pepIdentified(UPDATED_PEP_IDENTIFIED)
            .pepVerifiedBy(UPDATED_PEP_VERIFIED_BY)
            .pepVerifiedDate(UPDATED_PEP_VERIFIED_DATE)
            .pepRemarks(UPDATED_PEP_REMARKS);

        restPoliticallyExposedPersonsCheckReportMockMvc.perform(put("/api/politically-exposed-persons-check-reports")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedPoliticallyExposedPersonsCheckReport)))
            .andExpect(status().isOk());

        // Validate the PoliticallyExposedPersonsCheckReport in the database
        List<PoliticallyExposedPersonsCheckReport> politicallyExposedPersonsCheckReportList = politicallyExposedPersonsCheckReportRepository.findAll();
        assertThat(politicallyExposedPersonsCheckReportList).hasSize(databaseSizeBeforeUpdate);
        PoliticallyExposedPersonsCheckReport testPoliticallyExposedPersonsCheckReport = politicallyExposedPersonsCheckReportList.get(politicallyExposedPersonsCheckReportList.size() - 1);
        assertThat(testPoliticallyExposedPersonsCheckReport.getPepIdentified()).isEqualTo(UPDATED_PEP_IDENTIFIED);
        assertThat(testPoliticallyExposedPersonsCheckReport.getPepVerifiedBy()).isEqualTo(UPDATED_PEP_VERIFIED_BY);
        assertThat(testPoliticallyExposedPersonsCheckReport.getPepVerifiedDate()).isEqualTo(UPDATED_PEP_VERIFIED_DATE);
        assertThat(testPoliticallyExposedPersonsCheckReport.getPepRemarks()).isEqualTo(UPDATED_PEP_REMARKS);
    }

    @Test
    public void updateNonExistingPoliticallyExposedPersonsCheckReport() throws Exception {
        int databaseSizeBeforeUpdate = politicallyExposedPersonsCheckReportRepository.findAll().size();

        // Create the PoliticallyExposedPersonsCheckReport

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restPoliticallyExposedPersonsCheckReportMockMvc.perform(put("/api/politically-exposed-persons-check-reports")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(politicallyExposedPersonsCheckReport)))
            .andExpect(status().isBadRequest());

        // Validate the PoliticallyExposedPersonsCheckReport in the database
        List<PoliticallyExposedPersonsCheckReport> politicallyExposedPersonsCheckReportList = politicallyExposedPersonsCheckReportRepository.findAll();
        assertThat(politicallyExposedPersonsCheckReportList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    public void deletePoliticallyExposedPersonsCheckReport() throws Exception {
        // Initialize the database
        politicallyExposedPersonsCheckReportRepository.save(politicallyExposedPersonsCheckReport);

        int databaseSizeBeforeDelete = politicallyExposedPersonsCheckReportRepository.findAll().size();

        // Get the politicallyExposedPersonsCheckReport
        restPoliticallyExposedPersonsCheckReportMockMvc.perform(delete("/api/politically-exposed-persons-check-reports/{id}", politicallyExposedPersonsCheckReport.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<PoliticallyExposedPersonsCheckReport> politicallyExposedPersonsCheckReportList = politicallyExposedPersonsCheckReportRepository.findAll();
        assertThat(politicallyExposedPersonsCheckReportList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(PoliticallyExposedPersonsCheckReport.class);
        PoliticallyExposedPersonsCheckReport politicallyExposedPersonsCheckReport1 = new PoliticallyExposedPersonsCheckReport();
        politicallyExposedPersonsCheckReport1.setId("id1");
        PoliticallyExposedPersonsCheckReport politicallyExposedPersonsCheckReport2 = new PoliticallyExposedPersonsCheckReport();
        politicallyExposedPersonsCheckReport2.setId(politicallyExposedPersonsCheckReport1.getId());
        assertThat(politicallyExposedPersonsCheckReport1).isEqualTo(politicallyExposedPersonsCheckReport2);
        politicallyExposedPersonsCheckReport2.setId("id2");
        assertThat(politicallyExposedPersonsCheckReport1).isNotEqualTo(politicallyExposedPersonsCheckReport2);
        politicallyExposedPersonsCheckReport1.setId(null);
        assertThat(politicallyExposedPersonsCheckReport1).isNotEqualTo(politicallyExposedPersonsCheckReport2);
    }
}
