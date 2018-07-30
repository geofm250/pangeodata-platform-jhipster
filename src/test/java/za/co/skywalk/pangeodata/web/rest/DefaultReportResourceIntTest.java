package za.co.skywalk.pangeodata.web.rest;

import za.co.skywalk.pangeodata.PangeodataJHipsterApp;

import za.co.skywalk.pangeodata.domain.DefaultReport;
import za.co.skywalk.pangeodata.repository.DefaultReportRepository;
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
 * Test class for the DefaultReportResource REST controller.
 *
 * @see DefaultReportResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = PangeodataJHipsterApp.class)
public class DefaultReportResourceIntTest {

    private static final String DEFAULT_VERIFIED_BY = "AAAAAAAAAA";
    private static final String UPDATED_VERIFIED_BY = "BBBBBBBBBB";

    private static final String DEFAULT_FINDINGS = "AAAAAAAAAA";
    private static final String UPDATED_FINDINGS = "BBBBBBBBBB";

    private static final String DEFAULT_VERIFIED_DATE = "AAAAAAAAAA";
    private static final String UPDATED_VERIFIED_DATE = "BBBBBBBBBB";

    private static final String DEFAULT_REMARKS = "AAAAAAAAAA";
    private static final String UPDATED_REMARKS = "BBBBBBBBBB";

    @Autowired
    private DefaultReportRepository defaultReportRepository;


    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    private MockMvc restDefaultReportMockMvc;

    private DefaultReport defaultReport;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final DefaultReportResource defaultReportResource = new DefaultReportResource(defaultReportRepository);
        this.restDefaultReportMockMvc = MockMvcBuilders.standaloneSetup(defaultReportResource)
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
    public static DefaultReport createEntity() {
        DefaultReport defaultReport = new DefaultReport()
            .verifiedBy(DEFAULT_VERIFIED_BY)
            .findings(DEFAULT_FINDINGS)
            .verifiedDate(DEFAULT_VERIFIED_DATE)
            .remarks(DEFAULT_REMARKS);
        return defaultReport;
    }

    @Before
    public void initTest() {
        defaultReportRepository.deleteAll();
        defaultReport = createEntity();
    }

    @Test
    public void createDefaultReport() throws Exception {
        int databaseSizeBeforeCreate = defaultReportRepository.findAll().size();

        // Create the DefaultReport
        restDefaultReportMockMvc.perform(post("/api/default-reports")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(defaultReport)))
            .andExpect(status().isCreated());

        // Validate the DefaultReport in the database
        List<DefaultReport> defaultReportList = defaultReportRepository.findAll();
        assertThat(defaultReportList).hasSize(databaseSizeBeforeCreate + 1);
        DefaultReport testDefaultReport = defaultReportList.get(defaultReportList.size() - 1);
        assertThat(testDefaultReport.getVerifiedBy()).isEqualTo(DEFAULT_VERIFIED_BY);
        assertThat(testDefaultReport.getFindings()).isEqualTo(DEFAULT_FINDINGS);
        assertThat(testDefaultReport.getVerifiedDate()).isEqualTo(DEFAULT_VERIFIED_DATE);
        assertThat(testDefaultReport.getRemarks()).isEqualTo(DEFAULT_REMARKS);
    }

    @Test
    public void createDefaultReportWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = defaultReportRepository.findAll().size();

        // Create the DefaultReport with an existing ID
        defaultReport.setId("existing_id");

        // An entity with an existing ID cannot be created, so this API call must fail
        restDefaultReportMockMvc.perform(post("/api/default-reports")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(defaultReport)))
            .andExpect(status().isBadRequest());

        // Validate the DefaultReport in the database
        List<DefaultReport> defaultReportList = defaultReportRepository.findAll();
        assertThat(defaultReportList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    public void getAllDefaultReports() throws Exception {
        // Initialize the database
        defaultReportRepository.save(defaultReport);

        // Get all the defaultReportList
        restDefaultReportMockMvc.perform(get("/api/default-reports?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(defaultReport.getId())))
            .andExpect(jsonPath("$.[*].verifiedBy").value(hasItem(DEFAULT_VERIFIED_BY.toString())))
            .andExpect(jsonPath("$.[*].findings").value(hasItem(DEFAULT_FINDINGS.toString())))
            .andExpect(jsonPath("$.[*].verifiedDate").value(hasItem(DEFAULT_VERIFIED_DATE.toString())))
            .andExpect(jsonPath("$.[*].remarks").value(hasItem(DEFAULT_REMARKS.toString())));
    }
    

    @Test
    public void getDefaultReport() throws Exception {
        // Initialize the database
        defaultReportRepository.save(defaultReport);

        // Get the defaultReport
        restDefaultReportMockMvc.perform(get("/api/default-reports/{id}", defaultReport.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(defaultReport.getId()))
            .andExpect(jsonPath("$.verifiedBy").value(DEFAULT_VERIFIED_BY.toString()))
            .andExpect(jsonPath("$.findings").value(DEFAULT_FINDINGS.toString()))
            .andExpect(jsonPath("$.verifiedDate").value(DEFAULT_VERIFIED_DATE.toString()))
            .andExpect(jsonPath("$.remarks").value(DEFAULT_REMARKS.toString()));
    }
    @Test
    public void getNonExistingDefaultReport() throws Exception {
        // Get the defaultReport
        restDefaultReportMockMvc.perform(get("/api/default-reports/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateDefaultReport() throws Exception {
        // Initialize the database
        defaultReportRepository.save(defaultReport);

        int databaseSizeBeforeUpdate = defaultReportRepository.findAll().size();

        // Update the defaultReport
        DefaultReport updatedDefaultReport = defaultReportRepository.findById(defaultReport.getId()).get();
        updatedDefaultReport
            .verifiedBy(UPDATED_VERIFIED_BY)
            .findings(UPDATED_FINDINGS)
            .verifiedDate(UPDATED_VERIFIED_DATE)
            .remarks(UPDATED_REMARKS);

        restDefaultReportMockMvc.perform(put("/api/default-reports")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedDefaultReport)))
            .andExpect(status().isOk());

        // Validate the DefaultReport in the database
        List<DefaultReport> defaultReportList = defaultReportRepository.findAll();
        assertThat(defaultReportList).hasSize(databaseSizeBeforeUpdate);
        DefaultReport testDefaultReport = defaultReportList.get(defaultReportList.size() - 1);
        assertThat(testDefaultReport.getVerifiedBy()).isEqualTo(UPDATED_VERIFIED_BY);
        assertThat(testDefaultReport.getFindings()).isEqualTo(UPDATED_FINDINGS);
        assertThat(testDefaultReport.getVerifiedDate()).isEqualTo(UPDATED_VERIFIED_DATE);
        assertThat(testDefaultReport.getRemarks()).isEqualTo(UPDATED_REMARKS);
    }

    @Test
    public void updateNonExistingDefaultReport() throws Exception {
        int databaseSizeBeforeUpdate = defaultReportRepository.findAll().size();

        // Create the DefaultReport

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restDefaultReportMockMvc.perform(put("/api/default-reports")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(defaultReport)))
            .andExpect(status().isBadRequest());

        // Validate the DefaultReport in the database
        List<DefaultReport> defaultReportList = defaultReportRepository.findAll();
        assertThat(defaultReportList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    public void deleteDefaultReport() throws Exception {
        // Initialize the database
        defaultReportRepository.save(defaultReport);

        int databaseSizeBeforeDelete = defaultReportRepository.findAll().size();

        // Get the defaultReport
        restDefaultReportMockMvc.perform(delete("/api/default-reports/{id}", defaultReport.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<DefaultReport> defaultReportList = defaultReportRepository.findAll();
        assertThat(defaultReportList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(DefaultReport.class);
        DefaultReport defaultReport1 = new DefaultReport();
        defaultReport1.setId("id1");
        DefaultReport defaultReport2 = new DefaultReport();
        defaultReport2.setId(defaultReport1.getId());
        assertThat(defaultReport1).isEqualTo(defaultReport2);
        defaultReport2.setId("id2");
        assertThat(defaultReport1).isNotEqualTo(defaultReport2);
        defaultReport1.setId(null);
        assertThat(defaultReport1).isNotEqualTo(defaultReport2);
    }
}
