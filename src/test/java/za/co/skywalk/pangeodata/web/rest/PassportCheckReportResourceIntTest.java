package za.co.skywalk.pangeodata.web.rest;

import za.co.skywalk.pangeodata.PangeodataJHipsterApp;

import za.co.skywalk.pangeodata.domain.PassportCheckReport;
import za.co.skywalk.pangeodata.repository.PassportCheckReportRepository;
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
 * Test class for the PassportCheckReportResource REST controller.
 *
 * @see PassportCheckReportResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = PangeodataJHipsterApp.class)
public class PassportCheckReportResourceIntTest {

    private static final String DEFAULT_PASSPORT_VERIFIED = "AAAAAAAAAA";
    private static final String UPDATED_PASSPORT_VERIFIED = "BBBBBBBBBB";

    private static final String DEFAULT_DOCUMENT_AUTHENTICITY_VERIFIED_BY = "AAAAAAAAAA";
    private static final String UPDATED_DOCUMENT_AUTHENTICITY_VERIFIED_BY = "BBBBBBBBBB";

    private static final String DEFAULT_DOCUMENT_AUTHENTICITY_VERIFIED_DATE = "AAAAAAAAAA";
    private static final String UPDATED_DOCUMENT_AUTHENTICITY_VERIFIED_DATE = "BBBBBBBBBB";

    private static final String DEFAULT_DOCUMENT_AUTHENTICITY_REMARKS = "AAAAAAAAAA";
    private static final String UPDATED_DOCUMENT_AUTHENTICITY_REMARKS = "BBBBBBBBBB";

    @Autowired
    private PassportCheckReportRepository passportCheckReportRepository;


    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    private MockMvc restPassportCheckReportMockMvc;

    private PassportCheckReport passportCheckReport;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PassportCheckReportResource passportCheckReportResource = new PassportCheckReportResource(passportCheckReportRepository);
        this.restPassportCheckReportMockMvc = MockMvcBuilders.standaloneSetup(passportCheckReportResource)
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
    public static PassportCheckReport createEntity() {
        PassportCheckReport passportCheckReport = new PassportCheckReport()
            .passportVerified(DEFAULT_PASSPORT_VERIFIED)
            .documentAuthenticityVerifiedBy(DEFAULT_DOCUMENT_AUTHENTICITY_VERIFIED_BY)
            .documentAuthenticityVerifiedDate(DEFAULT_DOCUMENT_AUTHENTICITY_VERIFIED_DATE)
            .documentAuthenticityRemarks(DEFAULT_DOCUMENT_AUTHENTICITY_REMARKS);
        return passportCheckReport;
    }

    @Before
    public void initTest() {
        passportCheckReportRepository.deleteAll();
        passportCheckReport = createEntity();
    }

    @Test
    public void createPassportCheckReport() throws Exception {
        int databaseSizeBeforeCreate = passportCheckReportRepository.findAll().size();

        // Create the PassportCheckReport
        restPassportCheckReportMockMvc.perform(post("/api/passport-check-reports")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(passportCheckReport)))
            .andExpect(status().isCreated());

        // Validate the PassportCheckReport in the database
        List<PassportCheckReport> passportCheckReportList = passportCheckReportRepository.findAll();
        assertThat(passportCheckReportList).hasSize(databaseSizeBeforeCreate + 1);
        PassportCheckReport testPassportCheckReport = passportCheckReportList.get(passportCheckReportList.size() - 1);
        assertThat(testPassportCheckReport.getPassportVerified()).isEqualTo(DEFAULT_PASSPORT_VERIFIED);
        assertThat(testPassportCheckReport.getDocumentAuthenticityVerifiedBy()).isEqualTo(DEFAULT_DOCUMENT_AUTHENTICITY_VERIFIED_BY);
        assertThat(testPassportCheckReport.getDocumentAuthenticityVerifiedDate()).isEqualTo(DEFAULT_DOCUMENT_AUTHENTICITY_VERIFIED_DATE);
        assertThat(testPassportCheckReport.getDocumentAuthenticityRemarks()).isEqualTo(DEFAULT_DOCUMENT_AUTHENTICITY_REMARKS);
    }

    @Test
    public void createPassportCheckReportWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = passportCheckReportRepository.findAll().size();

        // Create the PassportCheckReport with an existing ID
        passportCheckReport.setId("existing_id");

        // An entity with an existing ID cannot be created, so this API call must fail
        restPassportCheckReportMockMvc.perform(post("/api/passport-check-reports")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(passportCheckReport)))
            .andExpect(status().isBadRequest());

        // Validate the PassportCheckReport in the database
        List<PassportCheckReport> passportCheckReportList = passportCheckReportRepository.findAll();
        assertThat(passportCheckReportList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    public void getAllPassportCheckReports() throws Exception {
        // Initialize the database
        passportCheckReportRepository.save(passportCheckReport);

        // Get all the passportCheckReportList
        restPassportCheckReportMockMvc.perform(get("/api/passport-check-reports?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(passportCheckReport.getId())))
            .andExpect(jsonPath("$.[*].passportVerified").value(hasItem(DEFAULT_PASSPORT_VERIFIED.toString())))
            .andExpect(jsonPath("$.[*].documentAuthenticityVerifiedBy").value(hasItem(DEFAULT_DOCUMENT_AUTHENTICITY_VERIFIED_BY.toString())))
            .andExpect(jsonPath("$.[*].documentAuthenticityVerifiedDate").value(hasItem(DEFAULT_DOCUMENT_AUTHENTICITY_VERIFIED_DATE.toString())))
            .andExpect(jsonPath("$.[*].documentAuthenticityRemarks").value(hasItem(DEFAULT_DOCUMENT_AUTHENTICITY_REMARKS.toString())));
    }
    

    @Test
    public void getPassportCheckReport() throws Exception {
        // Initialize the database
        passportCheckReportRepository.save(passportCheckReport);

        // Get the passportCheckReport
        restPassportCheckReportMockMvc.perform(get("/api/passport-check-reports/{id}", passportCheckReport.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(passportCheckReport.getId()))
            .andExpect(jsonPath("$.passportVerified").value(DEFAULT_PASSPORT_VERIFIED.toString()))
            .andExpect(jsonPath("$.documentAuthenticityVerifiedBy").value(DEFAULT_DOCUMENT_AUTHENTICITY_VERIFIED_BY.toString()))
            .andExpect(jsonPath("$.documentAuthenticityVerifiedDate").value(DEFAULT_DOCUMENT_AUTHENTICITY_VERIFIED_DATE.toString()))
            .andExpect(jsonPath("$.documentAuthenticityRemarks").value(DEFAULT_DOCUMENT_AUTHENTICITY_REMARKS.toString()));
    }
    @Test
    public void getNonExistingPassportCheckReport() throws Exception {
        // Get the passportCheckReport
        restPassportCheckReportMockMvc.perform(get("/api/passport-check-reports/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updatePassportCheckReport() throws Exception {
        // Initialize the database
        passportCheckReportRepository.save(passportCheckReport);

        int databaseSizeBeforeUpdate = passportCheckReportRepository.findAll().size();

        // Update the passportCheckReport
        PassportCheckReport updatedPassportCheckReport = passportCheckReportRepository.findById(passportCheckReport.getId()).get();
        updatedPassportCheckReport
            .passportVerified(UPDATED_PASSPORT_VERIFIED)
            .documentAuthenticityVerifiedBy(UPDATED_DOCUMENT_AUTHENTICITY_VERIFIED_BY)
            .documentAuthenticityVerifiedDate(UPDATED_DOCUMENT_AUTHENTICITY_VERIFIED_DATE)
            .documentAuthenticityRemarks(UPDATED_DOCUMENT_AUTHENTICITY_REMARKS);

        restPassportCheckReportMockMvc.perform(put("/api/passport-check-reports")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedPassportCheckReport)))
            .andExpect(status().isOk());

        // Validate the PassportCheckReport in the database
        List<PassportCheckReport> passportCheckReportList = passportCheckReportRepository.findAll();
        assertThat(passportCheckReportList).hasSize(databaseSizeBeforeUpdate);
        PassportCheckReport testPassportCheckReport = passportCheckReportList.get(passportCheckReportList.size() - 1);
        assertThat(testPassportCheckReport.getPassportVerified()).isEqualTo(UPDATED_PASSPORT_VERIFIED);
        assertThat(testPassportCheckReport.getDocumentAuthenticityVerifiedBy()).isEqualTo(UPDATED_DOCUMENT_AUTHENTICITY_VERIFIED_BY);
        assertThat(testPassportCheckReport.getDocumentAuthenticityVerifiedDate()).isEqualTo(UPDATED_DOCUMENT_AUTHENTICITY_VERIFIED_DATE);
        assertThat(testPassportCheckReport.getDocumentAuthenticityRemarks()).isEqualTo(UPDATED_DOCUMENT_AUTHENTICITY_REMARKS);
    }

    @Test
    public void updateNonExistingPassportCheckReport() throws Exception {
        int databaseSizeBeforeUpdate = passportCheckReportRepository.findAll().size();

        // Create the PassportCheckReport

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restPassportCheckReportMockMvc.perform(put("/api/passport-check-reports")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(passportCheckReport)))
            .andExpect(status().isBadRequest());

        // Validate the PassportCheckReport in the database
        List<PassportCheckReport> passportCheckReportList = passportCheckReportRepository.findAll();
        assertThat(passportCheckReportList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    public void deletePassportCheckReport() throws Exception {
        // Initialize the database
        passportCheckReportRepository.save(passportCheckReport);

        int databaseSizeBeforeDelete = passportCheckReportRepository.findAll().size();

        // Get the passportCheckReport
        restPassportCheckReportMockMvc.perform(delete("/api/passport-check-reports/{id}", passportCheckReport.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<PassportCheckReport> passportCheckReportList = passportCheckReportRepository.findAll();
        assertThat(passportCheckReportList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(PassportCheckReport.class);
        PassportCheckReport passportCheckReport1 = new PassportCheckReport();
        passportCheckReport1.setId("id1");
        PassportCheckReport passportCheckReport2 = new PassportCheckReport();
        passportCheckReport2.setId(passportCheckReport1.getId());
        assertThat(passportCheckReport1).isEqualTo(passportCheckReport2);
        passportCheckReport2.setId("id2");
        assertThat(passportCheckReport1).isNotEqualTo(passportCheckReport2);
        passportCheckReport1.setId(null);
        assertThat(passportCheckReport1).isNotEqualTo(passportCheckReport2);
    }
}
