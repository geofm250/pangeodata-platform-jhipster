package za.co.skywalk.pangeodata.web.rest;

import za.co.skywalk.pangeodata.PangeodataJHipsterApp;

import za.co.skywalk.pangeodata.domain.LicenseCheckReport;
import za.co.skywalk.pangeodata.repository.LicenseCheckReportRepository;
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
 * Test class for the LicenseCheckReportResource REST controller.
 *
 * @see LicenseCheckReportResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = PangeodataJHipsterApp.class)
public class LicenseCheckReportResourceIntTest {

    private static final String DEFAULT_LICENSE_VERIFIED = "AAAAAAAAAA";
    private static final String UPDATED_LICENSE_VERIFIED = "BBBBBBBBBB";

    private static final String DEFAULT_LIC_REGISTRATION_NUMBER = "AAAAAAAAAA";
    private static final String UPDATED_LIC_REGISTRATION_NUMBER = "BBBBBBBBBB";

    private static final String DEFAULT_LICENSE_STATUS = "AAAAAAAAAA";
    private static final String UPDATED_LICENSE_STATUS = "BBBBBBBBBB";

    private static final String DEFAULT_LIC_VERIFIED_BY = "AAAAAAAAAA";
    private static final String UPDATED_LIC_VERIFIED_BY = "BBBBBBBBBB";

    private static final String DEFAULT_LIC_VERIFIED_DATE = "AAAAAAAAAA";
    private static final String UPDATED_LIC_VERIFIED_DATE = "BBBBBBBBBB";

    private static final String DEFAULT_LIC_REMARKS = "AAAAAAAAAA";
    private static final String UPDATED_LIC_REMARKS = "BBBBBBBBBB";

    @Autowired
    private LicenseCheckReportRepository licenseCheckReportRepository;


    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    private MockMvc restLicenseCheckReportMockMvc;

    private LicenseCheckReport licenseCheckReport;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final LicenseCheckReportResource licenseCheckReportResource = new LicenseCheckReportResource(licenseCheckReportRepository);
        this.restLicenseCheckReportMockMvc = MockMvcBuilders.standaloneSetup(licenseCheckReportResource)
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
    public static LicenseCheckReport createEntity() {
        LicenseCheckReport licenseCheckReport = new LicenseCheckReport()
            .licenseVerified(DEFAULT_LICENSE_VERIFIED)
            .licRegistrationNumber(DEFAULT_LIC_REGISTRATION_NUMBER)
            .licenseStatus(DEFAULT_LICENSE_STATUS)
            .licVerifiedBy(DEFAULT_LIC_VERIFIED_BY)
            .licVerifiedDate(DEFAULT_LIC_VERIFIED_DATE)
            .licRemarks(DEFAULT_LIC_REMARKS);
        return licenseCheckReport;
    }

    @Before
    public void initTest() {
        licenseCheckReportRepository.deleteAll();
        licenseCheckReport = createEntity();
    }

    @Test
    public void createLicenseCheckReport() throws Exception {
        int databaseSizeBeforeCreate = licenseCheckReportRepository.findAll().size();

        // Create the LicenseCheckReport
        restLicenseCheckReportMockMvc.perform(post("/api/license-check-reports")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(licenseCheckReport)))
            .andExpect(status().isCreated());

        // Validate the LicenseCheckReport in the database
        List<LicenseCheckReport> licenseCheckReportList = licenseCheckReportRepository.findAll();
        assertThat(licenseCheckReportList).hasSize(databaseSizeBeforeCreate + 1);
        LicenseCheckReport testLicenseCheckReport = licenseCheckReportList.get(licenseCheckReportList.size() - 1);
        assertThat(testLicenseCheckReport.getLicenseVerified()).isEqualTo(DEFAULT_LICENSE_VERIFIED);
        assertThat(testLicenseCheckReport.getLicRegistrationNumber()).isEqualTo(DEFAULT_LIC_REGISTRATION_NUMBER);
        assertThat(testLicenseCheckReport.getLicenseStatus()).isEqualTo(DEFAULT_LICENSE_STATUS);
        assertThat(testLicenseCheckReport.getLicVerifiedBy()).isEqualTo(DEFAULT_LIC_VERIFIED_BY);
        assertThat(testLicenseCheckReport.getLicVerifiedDate()).isEqualTo(DEFAULT_LIC_VERIFIED_DATE);
        assertThat(testLicenseCheckReport.getLicRemarks()).isEqualTo(DEFAULT_LIC_REMARKS);
    }

    @Test
    public void createLicenseCheckReportWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = licenseCheckReportRepository.findAll().size();

        // Create the LicenseCheckReport with an existing ID
        licenseCheckReport.setId("existing_id");

        // An entity with an existing ID cannot be created, so this API call must fail
        restLicenseCheckReportMockMvc.perform(post("/api/license-check-reports")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(licenseCheckReport)))
            .andExpect(status().isBadRequest());

        // Validate the LicenseCheckReport in the database
        List<LicenseCheckReport> licenseCheckReportList = licenseCheckReportRepository.findAll();
        assertThat(licenseCheckReportList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    public void getAllLicenseCheckReports() throws Exception {
        // Initialize the database
        licenseCheckReportRepository.save(licenseCheckReport);

        // Get all the licenseCheckReportList
        restLicenseCheckReportMockMvc.perform(get("/api/license-check-reports?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(licenseCheckReport.getId())))
            .andExpect(jsonPath("$.[*].licenseVerified").value(hasItem(DEFAULT_LICENSE_VERIFIED.toString())))
            .andExpect(jsonPath("$.[*].licRegistrationNumber").value(hasItem(DEFAULT_LIC_REGISTRATION_NUMBER.toString())))
            .andExpect(jsonPath("$.[*].licenseStatus").value(hasItem(DEFAULT_LICENSE_STATUS.toString())))
            .andExpect(jsonPath("$.[*].licVerifiedBy").value(hasItem(DEFAULT_LIC_VERIFIED_BY.toString())))
            .andExpect(jsonPath("$.[*].licVerifiedDate").value(hasItem(DEFAULT_LIC_VERIFIED_DATE.toString())))
            .andExpect(jsonPath("$.[*].licRemarks").value(hasItem(DEFAULT_LIC_REMARKS.toString())));
    }
    

    @Test
    public void getLicenseCheckReport() throws Exception {
        // Initialize the database
        licenseCheckReportRepository.save(licenseCheckReport);

        // Get the licenseCheckReport
        restLicenseCheckReportMockMvc.perform(get("/api/license-check-reports/{id}", licenseCheckReport.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(licenseCheckReport.getId()))
            .andExpect(jsonPath("$.licenseVerified").value(DEFAULT_LICENSE_VERIFIED.toString()))
            .andExpect(jsonPath("$.licRegistrationNumber").value(DEFAULT_LIC_REGISTRATION_NUMBER.toString()))
            .andExpect(jsonPath("$.licenseStatus").value(DEFAULT_LICENSE_STATUS.toString()))
            .andExpect(jsonPath("$.licVerifiedBy").value(DEFAULT_LIC_VERIFIED_BY.toString()))
            .andExpect(jsonPath("$.licVerifiedDate").value(DEFAULT_LIC_VERIFIED_DATE.toString()))
            .andExpect(jsonPath("$.licRemarks").value(DEFAULT_LIC_REMARKS.toString()));
    }
    @Test
    public void getNonExistingLicenseCheckReport() throws Exception {
        // Get the licenseCheckReport
        restLicenseCheckReportMockMvc.perform(get("/api/license-check-reports/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateLicenseCheckReport() throws Exception {
        // Initialize the database
        licenseCheckReportRepository.save(licenseCheckReport);

        int databaseSizeBeforeUpdate = licenseCheckReportRepository.findAll().size();

        // Update the licenseCheckReport
        LicenseCheckReport updatedLicenseCheckReport = licenseCheckReportRepository.findById(licenseCheckReport.getId()).get();
        updatedLicenseCheckReport
            .licenseVerified(UPDATED_LICENSE_VERIFIED)
            .licRegistrationNumber(UPDATED_LIC_REGISTRATION_NUMBER)
            .licenseStatus(UPDATED_LICENSE_STATUS)
            .licVerifiedBy(UPDATED_LIC_VERIFIED_BY)
            .licVerifiedDate(UPDATED_LIC_VERIFIED_DATE)
            .licRemarks(UPDATED_LIC_REMARKS);

        restLicenseCheckReportMockMvc.perform(put("/api/license-check-reports")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedLicenseCheckReport)))
            .andExpect(status().isOk());

        // Validate the LicenseCheckReport in the database
        List<LicenseCheckReport> licenseCheckReportList = licenseCheckReportRepository.findAll();
        assertThat(licenseCheckReportList).hasSize(databaseSizeBeforeUpdate);
        LicenseCheckReport testLicenseCheckReport = licenseCheckReportList.get(licenseCheckReportList.size() - 1);
        assertThat(testLicenseCheckReport.getLicenseVerified()).isEqualTo(UPDATED_LICENSE_VERIFIED);
        assertThat(testLicenseCheckReport.getLicRegistrationNumber()).isEqualTo(UPDATED_LIC_REGISTRATION_NUMBER);
        assertThat(testLicenseCheckReport.getLicenseStatus()).isEqualTo(UPDATED_LICENSE_STATUS);
        assertThat(testLicenseCheckReport.getLicVerifiedBy()).isEqualTo(UPDATED_LIC_VERIFIED_BY);
        assertThat(testLicenseCheckReport.getLicVerifiedDate()).isEqualTo(UPDATED_LIC_VERIFIED_DATE);
        assertThat(testLicenseCheckReport.getLicRemarks()).isEqualTo(UPDATED_LIC_REMARKS);
    }

    @Test
    public void updateNonExistingLicenseCheckReport() throws Exception {
        int databaseSizeBeforeUpdate = licenseCheckReportRepository.findAll().size();

        // Create the LicenseCheckReport

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restLicenseCheckReportMockMvc.perform(put("/api/license-check-reports")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(licenseCheckReport)))
            .andExpect(status().isBadRequest());

        // Validate the LicenseCheckReport in the database
        List<LicenseCheckReport> licenseCheckReportList = licenseCheckReportRepository.findAll();
        assertThat(licenseCheckReportList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    public void deleteLicenseCheckReport() throws Exception {
        // Initialize the database
        licenseCheckReportRepository.save(licenseCheckReport);

        int databaseSizeBeforeDelete = licenseCheckReportRepository.findAll().size();

        // Get the licenseCheckReport
        restLicenseCheckReportMockMvc.perform(delete("/api/license-check-reports/{id}", licenseCheckReport.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<LicenseCheckReport> licenseCheckReportList = licenseCheckReportRepository.findAll();
        assertThat(licenseCheckReportList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(LicenseCheckReport.class);
        LicenseCheckReport licenseCheckReport1 = new LicenseCheckReport();
        licenseCheckReport1.setId("id1");
        LicenseCheckReport licenseCheckReport2 = new LicenseCheckReport();
        licenseCheckReport2.setId(licenseCheckReport1.getId());
        assertThat(licenseCheckReport1).isEqualTo(licenseCheckReport2);
        licenseCheckReport2.setId("id2");
        assertThat(licenseCheckReport1).isNotEqualTo(licenseCheckReport2);
        licenseCheckReport1.setId(null);
        assertThat(licenseCheckReport1).isNotEqualTo(licenseCheckReport2);
    }
}
