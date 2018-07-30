package za.co.skywalk.pangeodata.web.rest;

import za.co.skywalk.pangeodata.PangeodataJHipsterApp;

import za.co.skywalk.pangeodata.domain.BankruptcyCheckReport;
import za.co.skywalk.pangeodata.repository.BankruptcyCheckReportRepository;
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
 * Test class for the BankruptcyCheckReportResource REST controller.
 *
 * @see BankruptcyCheckReportResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = PangeodataJHipsterApp.class)
public class BankruptcyCheckReportResourceIntTest {

    private static final String DEFAULT_BANKRUPTCY_FINDINGS = "AAAAAAAAAA";
    private static final String UPDATED_BANKRUPTCY_FINDINGS = "BBBBBBBBBB";

    private static final String DEFAULT_BANKRUPTCY_VERIFIED_BY = "AAAAAAAAAA";
    private static final String UPDATED_BANKRUPTCY_VERIFIED_BY = "BBBBBBBBBB";

    private static final String DEFAULT_BANKRUPTCY_VERIFIED_DATE = "AAAAAAAAAA";
    private static final String UPDATED_BANKRUPTCY_VERIFIED_DATE = "BBBBBBBBBB";

    private static final String DEFAULT_BANKRUPTCY_REMARKS = "AAAAAAAAAA";
    private static final String UPDATED_BANKRUPTCY_REMARKS = "BBBBBBBBBB";

    @Autowired
    private BankruptcyCheckReportRepository bankruptcyCheckReportRepository;


    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    private MockMvc restBankruptcyCheckReportMockMvc;

    private BankruptcyCheckReport bankruptcyCheckReport;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final BankruptcyCheckReportResource bankruptcyCheckReportResource = new BankruptcyCheckReportResource(bankruptcyCheckReportRepository);
        this.restBankruptcyCheckReportMockMvc = MockMvcBuilders.standaloneSetup(bankruptcyCheckReportResource)
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
    public static BankruptcyCheckReport createEntity() {
        BankruptcyCheckReport bankruptcyCheckReport = new BankruptcyCheckReport()
            .bankruptcyFindings(DEFAULT_BANKRUPTCY_FINDINGS)
            .bankruptcyVerifiedBy(DEFAULT_BANKRUPTCY_VERIFIED_BY)
            .bankruptcyVerifiedDate(DEFAULT_BANKRUPTCY_VERIFIED_DATE)
            .bankruptcyRemarks(DEFAULT_BANKRUPTCY_REMARKS);
        return bankruptcyCheckReport;
    }

    @Before
    public void initTest() {
        bankruptcyCheckReportRepository.deleteAll();
        bankruptcyCheckReport = createEntity();
    }

    @Test
    public void createBankruptcyCheckReport() throws Exception {
        int databaseSizeBeforeCreate = bankruptcyCheckReportRepository.findAll().size();

        // Create the BankruptcyCheckReport
        restBankruptcyCheckReportMockMvc.perform(post("/api/bankruptcy-check-reports")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(bankruptcyCheckReport)))
            .andExpect(status().isCreated());

        // Validate the BankruptcyCheckReport in the database
        List<BankruptcyCheckReport> bankruptcyCheckReportList = bankruptcyCheckReportRepository.findAll();
        assertThat(bankruptcyCheckReportList).hasSize(databaseSizeBeforeCreate + 1);
        BankruptcyCheckReport testBankruptcyCheckReport = bankruptcyCheckReportList.get(bankruptcyCheckReportList.size() - 1);
        assertThat(testBankruptcyCheckReport.getBankruptcyFindings()).isEqualTo(DEFAULT_BANKRUPTCY_FINDINGS);
        assertThat(testBankruptcyCheckReport.getBankruptcyVerifiedBy()).isEqualTo(DEFAULT_BANKRUPTCY_VERIFIED_BY);
        assertThat(testBankruptcyCheckReport.getBankruptcyVerifiedDate()).isEqualTo(DEFAULT_BANKRUPTCY_VERIFIED_DATE);
        assertThat(testBankruptcyCheckReport.getBankruptcyRemarks()).isEqualTo(DEFAULT_BANKRUPTCY_REMARKS);
    }

    @Test
    public void createBankruptcyCheckReportWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = bankruptcyCheckReportRepository.findAll().size();

        // Create the BankruptcyCheckReport with an existing ID
        bankruptcyCheckReport.setId("existing_id");

        // An entity with an existing ID cannot be created, so this API call must fail
        restBankruptcyCheckReportMockMvc.perform(post("/api/bankruptcy-check-reports")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(bankruptcyCheckReport)))
            .andExpect(status().isBadRequest());

        // Validate the BankruptcyCheckReport in the database
        List<BankruptcyCheckReport> bankruptcyCheckReportList = bankruptcyCheckReportRepository.findAll();
        assertThat(bankruptcyCheckReportList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    public void getAllBankruptcyCheckReports() throws Exception {
        // Initialize the database
        bankruptcyCheckReportRepository.save(bankruptcyCheckReport);

        // Get all the bankruptcyCheckReportList
        restBankruptcyCheckReportMockMvc.perform(get("/api/bankruptcy-check-reports?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(bankruptcyCheckReport.getId())))
            .andExpect(jsonPath("$.[*].bankruptcyFindings").value(hasItem(DEFAULT_BANKRUPTCY_FINDINGS.toString())))
            .andExpect(jsonPath("$.[*].bankruptcyVerifiedBy").value(hasItem(DEFAULT_BANKRUPTCY_VERIFIED_BY.toString())))
            .andExpect(jsonPath("$.[*].bankruptcyVerifiedDate").value(hasItem(DEFAULT_BANKRUPTCY_VERIFIED_DATE.toString())))
            .andExpect(jsonPath("$.[*].bankruptcyRemarks").value(hasItem(DEFAULT_BANKRUPTCY_REMARKS.toString())));
    }
    

    @Test
    public void getBankruptcyCheckReport() throws Exception {
        // Initialize the database
        bankruptcyCheckReportRepository.save(bankruptcyCheckReport);

        // Get the bankruptcyCheckReport
        restBankruptcyCheckReportMockMvc.perform(get("/api/bankruptcy-check-reports/{id}", bankruptcyCheckReport.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(bankruptcyCheckReport.getId()))
            .andExpect(jsonPath("$.bankruptcyFindings").value(DEFAULT_BANKRUPTCY_FINDINGS.toString()))
            .andExpect(jsonPath("$.bankruptcyVerifiedBy").value(DEFAULT_BANKRUPTCY_VERIFIED_BY.toString()))
            .andExpect(jsonPath("$.bankruptcyVerifiedDate").value(DEFAULT_BANKRUPTCY_VERIFIED_DATE.toString()))
            .andExpect(jsonPath("$.bankruptcyRemarks").value(DEFAULT_BANKRUPTCY_REMARKS.toString()));
    }
    @Test
    public void getNonExistingBankruptcyCheckReport() throws Exception {
        // Get the bankruptcyCheckReport
        restBankruptcyCheckReportMockMvc.perform(get("/api/bankruptcy-check-reports/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateBankruptcyCheckReport() throws Exception {
        // Initialize the database
        bankruptcyCheckReportRepository.save(bankruptcyCheckReport);

        int databaseSizeBeforeUpdate = bankruptcyCheckReportRepository.findAll().size();

        // Update the bankruptcyCheckReport
        BankruptcyCheckReport updatedBankruptcyCheckReport = bankruptcyCheckReportRepository.findById(bankruptcyCheckReport.getId()).get();
        updatedBankruptcyCheckReport
            .bankruptcyFindings(UPDATED_BANKRUPTCY_FINDINGS)
            .bankruptcyVerifiedBy(UPDATED_BANKRUPTCY_VERIFIED_BY)
            .bankruptcyVerifiedDate(UPDATED_BANKRUPTCY_VERIFIED_DATE)
            .bankruptcyRemarks(UPDATED_BANKRUPTCY_REMARKS);

        restBankruptcyCheckReportMockMvc.perform(put("/api/bankruptcy-check-reports")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedBankruptcyCheckReport)))
            .andExpect(status().isOk());

        // Validate the BankruptcyCheckReport in the database
        List<BankruptcyCheckReport> bankruptcyCheckReportList = bankruptcyCheckReportRepository.findAll();
        assertThat(bankruptcyCheckReportList).hasSize(databaseSizeBeforeUpdate);
        BankruptcyCheckReport testBankruptcyCheckReport = bankruptcyCheckReportList.get(bankruptcyCheckReportList.size() - 1);
        assertThat(testBankruptcyCheckReport.getBankruptcyFindings()).isEqualTo(UPDATED_BANKRUPTCY_FINDINGS);
        assertThat(testBankruptcyCheckReport.getBankruptcyVerifiedBy()).isEqualTo(UPDATED_BANKRUPTCY_VERIFIED_BY);
        assertThat(testBankruptcyCheckReport.getBankruptcyVerifiedDate()).isEqualTo(UPDATED_BANKRUPTCY_VERIFIED_DATE);
        assertThat(testBankruptcyCheckReport.getBankruptcyRemarks()).isEqualTo(UPDATED_BANKRUPTCY_REMARKS);
    }

    @Test
    public void updateNonExistingBankruptcyCheckReport() throws Exception {
        int databaseSizeBeforeUpdate = bankruptcyCheckReportRepository.findAll().size();

        // Create the BankruptcyCheckReport

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restBankruptcyCheckReportMockMvc.perform(put("/api/bankruptcy-check-reports")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(bankruptcyCheckReport)))
            .andExpect(status().isBadRequest());

        // Validate the BankruptcyCheckReport in the database
        List<BankruptcyCheckReport> bankruptcyCheckReportList = bankruptcyCheckReportRepository.findAll();
        assertThat(bankruptcyCheckReportList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    public void deleteBankruptcyCheckReport() throws Exception {
        // Initialize the database
        bankruptcyCheckReportRepository.save(bankruptcyCheckReport);

        int databaseSizeBeforeDelete = bankruptcyCheckReportRepository.findAll().size();

        // Get the bankruptcyCheckReport
        restBankruptcyCheckReportMockMvc.perform(delete("/api/bankruptcy-check-reports/{id}", bankruptcyCheckReport.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<BankruptcyCheckReport> bankruptcyCheckReportList = bankruptcyCheckReportRepository.findAll();
        assertThat(bankruptcyCheckReportList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(BankruptcyCheckReport.class);
        BankruptcyCheckReport bankruptcyCheckReport1 = new BankruptcyCheckReport();
        bankruptcyCheckReport1.setId("id1");
        BankruptcyCheckReport bankruptcyCheckReport2 = new BankruptcyCheckReport();
        bankruptcyCheckReport2.setId(bankruptcyCheckReport1.getId());
        assertThat(bankruptcyCheckReport1).isEqualTo(bankruptcyCheckReport2);
        bankruptcyCheckReport2.setId("id2");
        assertThat(bankruptcyCheckReport1).isNotEqualTo(bankruptcyCheckReport2);
        bankruptcyCheckReport1.setId(null);
        assertThat(bankruptcyCheckReport1).isNotEqualTo(bankruptcyCheckReport2);
    }
}
