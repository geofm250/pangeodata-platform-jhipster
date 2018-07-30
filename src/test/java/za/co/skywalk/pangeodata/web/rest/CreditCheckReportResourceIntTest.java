package za.co.skywalk.pangeodata.web.rest;

import za.co.skywalk.pangeodata.PangeodataJHipsterApp;

import za.co.skywalk.pangeodata.domain.CreditCheckReport;
import za.co.skywalk.pangeodata.repository.CreditCheckReportRepository;
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
 * Test class for the CreditCheckReportResource REST controller.
 *
 * @see CreditCheckReportResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = PangeodataJHipsterApp.class)
public class CreditCheckReportResourceIntTest {

    private static final String DEFAULT_CREDIT_FINDINGS = "AAAAAAAAAA";
    private static final String UPDATED_CREDIT_FINDINGS = "BBBBBBBBBB";

    private static final String DEFAULT_CREDIT_VERIFIED_BY = "AAAAAAAAAA";
    private static final String UPDATED_CREDIT_VERIFIED_BY = "BBBBBBBBBB";

    private static final String DEFAULT_CREDIT_VERIFIED_DATE = "AAAAAAAAAA";
    private static final String UPDATED_CREDIT_VERIFIED_DATE = "BBBBBBBBBB";

    private static final String DEFAULT_CREDIT_REMARKS = "AAAAAAAAAA";
    private static final String UPDATED_CREDIT_REMARKS = "BBBBBBBBBB";

    @Autowired
    private CreditCheckReportRepository creditCheckReportRepository;


    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    private MockMvc restCreditCheckReportMockMvc;

    private CreditCheckReport creditCheckReport;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CreditCheckReportResource creditCheckReportResource = new CreditCheckReportResource(creditCheckReportRepository);
        this.restCreditCheckReportMockMvc = MockMvcBuilders.standaloneSetup(creditCheckReportResource)
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
    public static CreditCheckReport createEntity() {
        CreditCheckReport creditCheckReport = new CreditCheckReport()
            .creditFindings(DEFAULT_CREDIT_FINDINGS)
            .creditVerifiedBy(DEFAULT_CREDIT_VERIFIED_BY)
            .creditVerifiedDate(DEFAULT_CREDIT_VERIFIED_DATE)
            .creditRemarks(DEFAULT_CREDIT_REMARKS);
        return creditCheckReport;
    }

    @Before
    public void initTest() {
        creditCheckReportRepository.deleteAll();
        creditCheckReport = createEntity();
    }

    @Test
    public void createCreditCheckReport() throws Exception {
        int databaseSizeBeforeCreate = creditCheckReportRepository.findAll().size();

        // Create the CreditCheckReport
        restCreditCheckReportMockMvc.perform(post("/api/credit-check-reports")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(creditCheckReport)))
            .andExpect(status().isCreated());

        // Validate the CreditCheckReport in the database
        List<CreditCheckReport> creditCheckReportList = creditCheckReportRepository.findAll();
        assertThat(creditCheckReportList).hasSize(databaseSizeBeforeCreate + 1);
        CreditCheckReport testCreditCheckReport = creditCheckReportList.get(creditCheckReportList.size() - 1);
        assertThat(testCreditCheckReport.getCreditFindings()).isEqualTo(DEFAULT_CREDIT_FINDINGS);
        assertThat(testCreditCheckReport.getCreditVerifiedBy()).isEqualTo(DEFAULT_CREDIT_VERIFIED_BY);
        assertThat(testCreditCheckReport.getCreditVerifiedDate()).isEqualTo(DEFAULT_CREDIT_VERIFIED_DATE);
        assertThat(testCreditCheckReport.getCreditRemarks()).isEqualTo(DEFAULT_CREDIT_REMARKS);
    }

    @Test
    public void createCreditCheckReportWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = creditCheckReportRepository.findAll().size();

        // Create the CreditCheckReport with an existing ID
        creditCheckReport.setId("existing_id");

        // An entity with an existing ID cannot be created, so this API call must fail
        restCreditCheckReportMockMvc.perform(post("/api/credit-check-reports")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(creditCheckReport)))
            .andExpect(status().isBadRequest());

        // Validate the CreditCheckReport in the database
        List<CreditCheckReport> creditCheckReportList = creditCheckReportRepository.findAll();
        assertThat(creditCheckReportList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    public void getAllCreditCheckReports() throws Exception {
        // Initialize the database
        creditCheckReportRepository.save(creditCheckReport);

        // Get all the creditCheckReportList
        restCreditCheckReportMockMvc.perform(get("/api/credit-check-reports?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(creditCheckReport.getId())))
            .andExpect(jsonPath("$.[*].creditFindings").value(hasItem(DEFAULT_CREDIT_FINDINGS.toString())))
            .andExpect(jsonPath("$.[*].creditVerifiedBy").value(hasItem(DEFAULT_CREDIT_VERIFIED_BY.toString())))
            .andExpect(jsonPath("$.[*].creditVerifiedDate").value(hasItem(DEFAULT_CREDIT_VERIFIED_DATE.toString())))
            .andExpect(jsonPath("$.[*].creditRemarks").value(hasItem(DEFAULT_CREDIT_REMARKS.toString())));
    }
    

    @Test
    public void getCreditCheckReport() throws Exception {
        // Initialize the database
        creditCheckReportRepository.save(creditCheckReport);

        // Get the creditCheckReport
        restCreditCheckReportMockMvc.perform(get("/api/credit-check-reports/{id}", creditCheckReport.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(creditCheckReport.getId()))
            .andExpect(jsonPath("$.creditFindings").value(DEFAULT_CREDIT_FINDINGS.toString()))
            .andExpect(jsonPath("$.creditVerifiedBy").value(DEFAULT_CREDIT_VERIFIED_BY.toString()))
            .andExpect(jsonPath("$.creditVerifiedDate").value(DEFAULT_CREDIT_VERIFIED_DATE.toString()))
            .andExpect(jsonPath("$.creditRemarks").value(DEFAULT_CREDIT_REMARKS.toString()));
    }
    @Test
    public void getNonExistingCreditCheckReport() throws Exception {
        // Get the creditCheckReport
        restCreditCheckReportMockMvc.perform(get("/api/credit-check-reports/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateCreditCheckReport() throws Exception {
        // Initialize the database
        creditCheckReportRepository.save(creditCheckReport);

        int databaseSizeBeforeUpdate = creditCheckReportRepository.findAll().size();

        // Update the creditCheckReport
        CreditCheckReport updatedCreditCheckReport = creditCheckReportRepository.findById(creditCheckReport.getId()).get();
        updatedCreditCheckReport
            .creditFindings(UPDATED_CREDIT_FINDINGS)
            .creditVerifiedBy(UPDATED_CREDIT_VERIFIED_BY)
            .creditVerifiedDate(UPDATED_CREDIT_VERIFIED_DATE)
            .creditRemarks(UPDATED_CREDIT_REMARKS);

        restCreditCheckReportMockMvc.perform(put("/api/credit-check-reports")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedCreditCheckReport)))
            .andExpect(status().isOk());

        // Validate the CreditCheckReport in the database
        List<CreditCheckReport> creditCheckReportList = creditCheckReportRepository.findAll();
        assertThat(creditCheckReportList).hasSize(databaseSizeBeforeUpdate);
        CreditCheckReport testCreditCheckReport = creditCheckReportList.get(creditCheckReportList.size() - 1);
        assertThat(testCreditCheckReport.getCreditFindings()).isEqualTo(UPDATED_CREDIT_FINDINGS);
        assertThat(testCreditCheckReport.getCreditVerifiedBy()).isEqualTo(UPDATED_CREDIT_VERIFIED_BY);
        assertThat(testCreditCheckReport.getCreditVerifiedDate()).isEqualTo(UPDATED_CREDIT_VERIFIED_DATE);
        assertThat(testCreditCheckReport.getCreditRemarks()).isEqualTo(UPDATED_CREDIT_REMARKS);
    }

    @Test
    public void updateNonExistingCreditCheckReport() throws Exception {
        int databaseSizeBeforeUpdate = creditCheckReportRepository.findAll().size();

        // Create the CreditCheckReport

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restCreditCheckReportMockMvc.perform(put("/api/credit-check-reports")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(creditCheckReport)))
            .andExpect(status().isBadRequest());

        // Validate the CreditCheckReport in the database
        List<CreditCheckReport> creditCheckReportList = creditCheckReportRepository.findAll();
        assertThat(creditCheckReportList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    public void deleteCreditCheckReport() throws Exception {
        // Initialize the database
        creditCheckReportRepository.save(creditCheckReport);

        int databaseSizeBeforeDelete = creditCheckReportRepository.findAll().size();

        // Get the creditCheckReport
        restCreditCheckReportMockMvc.perform(delete("/api/credit-check-reports/{id}", creditCheckReport.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<CreditCheckReport> creditCheckReportList = creditCheckReportRepository.findAll();
        assertThat(creditCheckReportList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CreditCheckReport.class);
        CreditCheckReport creditCheckReport1 = new CreditCheckReport();
        creditCheckReport1.setId("id1");
        CreditCheckReport creditCheckReport2 = new CreditCheckReport();
        creditCheckReport2.setId(creditCheckReport1.getId());
        assertThat(creditCheckReport1).isEqualTo(creditCheckReport2);
        creditCheckReport2.setId("id2");
        assertThat(creditCheckReport1).isNotEqualTo(creditCheckReport2);
        creditCheckReport1.setId(null);
        assertThat(creditCheckReport1).isNotEqualTo(creditCheckReport2);
    }
}
