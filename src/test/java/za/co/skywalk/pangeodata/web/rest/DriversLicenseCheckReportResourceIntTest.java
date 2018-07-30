package za.co.skywalk.pangeodata.web.rest;

import za.co.skywalk.pangeodata.PangeodataJHipsterApp;

import za.co.skywalk.pangeodata.domain.DriversLicenseCheckReport;
import za.co.skywalk.pangeodata.repository.DriversLicenseCheckReportRepository;
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
 * Test class for the DriversLicenseCheckReportResource REST controller.
 *
 * @see DriversLicenseCheckReportResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = PangeodataJHipsterApp.class)
public class DriversLicenseCheckReportResourceIntTest {

    private static final String DEFAULT_DRIVERS_LICENSE_VERIFIED = "AAAAAAAAAA";
    private static final String UPDATED_DRIVERS_LICENSE_VERIFIED = "BBBBBBBBBB";

    private static final String DEFAULT_DRIVERS_LICENSE_NUMBER = "AAAAAAAAAA";
    private static final String UPDATED_DRIVERS_LICENSE_NUMBER = "BBBBBBBBBB";

    private static final String DEFAULT_DRIVERS_LICENSE_STATUS = "AAAAAAAAAA";
    private static final String UPDATED_DRIVERS_LICENSE_STATUS = "BBBBBBBBBB";

    private static final String DEFAULT_DRIVER_LICENSE_VERIFIED_BY = "AAAAAAAAAA";
    private static final String UPDATED_DRIVER_LICENSE_VERIFIED_BY = "BBBBBBBBBB";

    private static final String DEFAULT_DRIVERS_LICENSE_VERIFIED_DATE = "AAAAAAAAAA";
    private static final String UPDATED_DRIVERS_LICENSE_VERIFIED_DATE = "BBBBBBBBBB";

    private static final String DEFAULT_DRIVERS_LICENSE_REMARKS = "AAAAAAAAAA";
    private static final String UPDATED_DRIVERS_LICENSE_REMARKS = "BBBBBBBBBB";

    @Autowired
    private DriversLicenseCheckReportRepository driversLicenseCheckReportRepository;


    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    private MockMvc restDriversLicenseCheckReportMockMvc;

    private DriversLicenseCheckReport driversLicenseCheckReport;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final DriversLicenseCheckReportResource driversLicenseCheckReportResource = new DriversLicenseCheckReportResource(driversLicenseCheckReportRepository);
        this.restDriversLicenseCheckReportMockMvc = MockMvcBuilders.standaloneSetup(driversLicenseCheckReportResource)
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
    public static DriversLicenseCheckReport createEntity() {
        DriversLicenseCheckReport driversLicenseCheckReport = new DriversLicenseCheckReport()
            .driversLicenseVerified(DEFAULT_DRIVERS_LICENSE_VERIFIED)
            .driversLicenseNumber(DEFAULT_DRIVERS_LICENSE_NUMBER)
            .driversLicenseStatus(DEFAULT_DRIVERS_LICENSE_STATUS)
            .driverLicenseVerifiedBy(DEFAULT_DRIVER_LICENSE_VERIFIED_BY)
            .driversLicenseVerifiedDate(DEFAULT_DRIVERS_LICENSE_VERIFIED_DATE)
            .driversLicenseRemarks(DEFAULT_DRIVERS_LICENSE_REMARKS);
        return driversLicenseCheckReport;
    }

    @Before
    public void initTest() {
        driversLicenseCheckReportRepository.deleteAll();
        driversLicenseCheckReport = createEntity();
    }

    @Test
    public void createDriversLicenseCheckReport() throws Exception {
        int databaseSizeBeforeCreate = driversLicenseCheckReportRepository.findAll().size();

        // Create the DriversLicenseCheckReport
        restDriversLicenseCheckReportMockMvc.perform(post("/api/drivers-license-check-reports")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(driversLicenseCheckReport)))
            .andExpect(status().isCreated());

        // Validate the DriversLicenseCheckReport in the database
        List<DriversLicenseCheckReport> driversLicenseCheckReportList = driversLicenseCheckReportRepository.findAll();
        assertThat(driversLicenseCheckReportList).hasSize(databaseSizeBeforeCreate + 1);
        DriversLicenseCheckReport testDriversLicenseCheckReport = driversLicenseCheckReportList.get(driversLicenseCheckReportList.size() - 1);
        assertThat(testDriversLicenseCheckReport.getDriversLicenseVerified()).isEqualTo(DEFAULT_DRIVERS_LICENSE_VERIFIED);
        assertThat(testDriversLicenseCheckReport.getDriversLicenseNumber()).isEqualTo(DEFAULT_DRIVERS_LICENSE_NUMBER);
        assertThat(testDriversLicenseCheckReport.getDriversLicenseStatus()).isEqualTo(DEFAULT_DRIVERS_LICENSE_STATUS);
        assertThat(testDriversLicenseCheckReport.getDriverLicenseVerifiedBy()).isEqualTo(DEFAULT_DRIVER_LICENSE_VERIFIED_BY);
        assertThat(testDriversLicenseCheckReport.getDriversLicenseVerifiedDate()).isEqualTo(DEFAULT_DRIVERS_LICENSE_VERIFIED_DATE);
        assertThat(testDriversLicenseCheckReport.getDriversLicenseRemarks()).isEqualTo(DEFAULT_DRIVERS_LICENSE_REMARKS);
    }

    @Test
    public void createDriversLicenseCheckReportWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = driversLicenseCheckReportRepository.findAll().size();

        // Create the DriversLicenseCheckReport with an existing ID
        driversLicenseCheckReport.setId("existing_id");

        // An entity with an existing ID cannot be created, so this API call must fail
        restDriversLicenseCheckReportMockMvc.perform(post("/api/drivers-license-check-reports")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(driversLicenseCheckReport)))
            .andExpect(status().isBadRequest());

        // Validate the DriversLicenseCheckReport in the database
        List<DriversLicenseCheckReport> driversLicenseCheckReportList = driversLicenseCheckReportRepository.findAll();
        assertThat(driversLicenseCheckReportList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    public void getAllDriversLicenseCheckReports() throws Exception {
        // Initialize the database
        driversLicenseCheckReportRepository.save(driversLicenseCheckReport);

        // Get all the driversLicenseCheckReportList
        restDriversLicenseCheckReportMockMvc.perform(get("/api/drivers-license-check-reports?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(driversLicenseCheckReport.getId())))
            .andExpect(jsonPath("$.[*].driversLicenseVerified").value(hasItem(DEFAULT_DRIVERS_LICENSE_VERIFIED.toString())))
            .andExpect(jsonPath("$.[*].driversLicenseNumber").value(hasItem(DEFAULT_DRIVERS_LICENSE_NUMBER.toString())))
            .andExpect(jsonPath("$.[*].driversLicenseStatus").value(hasItem(DEFAULT_DRIVERS_LICENSE_STATUS.toString())))
            .andExpect(jsonPath("$.[*].driverLicenseVerifiedBy").value(hasItem(DEFAULT_DRIVER_LICENSE_VERIFIED_BY.toString())))
            .andExpect(jsonPath("$.[*].driversLicenseVerifiedDate").value(hasItem(DEFAULT_DRIVERS_LICENSE_VERIFIED_DATE.toString())))
            .andExpect(jsonPath("$.[*].driversLicenseRemarks").value(hasItem(DEFAULT_DRIVERS_LICENSE_REMARKS.toString())));
    }
    

    @Test
    public void getDriversLicenseCheckReport() throws Exception {
        // Initialize the database
        driversLicenseCheckReportRepository.save(driversLicenseCheckReport);

        // Get the driversLicenseCheckReport
        restDriversLicenseCheckReportMockMvc.perform(get("/api/drivers-license-check-reports/{id}", driversLicenseCheckReport.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(driversLicenseCheckReport.getId()))
            .andExpect(jsonPath("$.driversLicenseVerified").value(DEFAULT_DRIVERS_LICENSE_VERIFIED.toString()))
            .andExpect(jsonPath("$.driversLicenseNumber").value(DEFAULT_DRIVERS_LICENSE_NUMBER.toString()))
            .andExpect(jsonPath("$.driversLicenseStatus").value(DEFAULT_DRIVERS_LICENSE_STATUS.toString()))
            .andExpect(jsonPath("$.driverLicenseVerifiedBy").value(DEFAULT_DRIVER_LICENSE_VERIFIED_BY.toString()))
            .andExpect(jsonPath("$.driversLicenseVerifiedDate").value(DEFAULT_DRIVERS_LICENSE_VERIFIED_DATE.toString()))
            .andExpect(jsonPath("$.driversLicenseRemarks").value(DEFAULT_DRIVERS_LICENSE_REMARKS.toString()));
    }
    @Test
    public void getNonExistingDriversLicenseCheckReport() throws Exception {
        // Get the driversLicenseCheckReport
        restDriversLicenseCheckReportMockMvc.perform(get("/api/drivers-license-check-reports/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateDriversLicenseCheckReport() throws Exception {
        // Initialize the database
        driversLicenseCheckReportRepository.save(driversLicenseCheckReport);

        int databaseSizeBeforeUpdate = driversLicenseCheckReportRepository.findAll().size();

        // Update the driversLicenseCheckReport
        DriversLicenseCheckReport updatedDriversLicenseCheckReport = driversLicenseCheckReportRepository.findById(driversLicenseCheckReport.getId()).get();
        updatedDriversLicenseCheckReport
            .driversLicenseVerified(UPDATED_DRIVERS_LICENSE_VERIFIED)
            .driversLicenseNumber(UPDATED_DRIVERS_LICENSE_NUMBER)
            .driversLicenseStatus(UPDATED_DRIVERS_LICENSE_STATUS)
            .driverLicenseVerifiedBy(UPDATED_DRIVER_LICENSE_VERIFIED_BY)
            .driversLicenseVerifiedDate(UPDATED_DRIVERS_LICENSE_VERIFIED_DATE)
            .driversLicenseRemarks(UPDATED_DRIVERS_LICENSE_REMARKS);

        restDriversLicenseCheckReportMockMvc.perform(put("/api/drivers-license-check-reports")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedDriversLicenseCheckReport)))
            .andExpect(status().isOk());

        // Validate the DriversLicenseCheckReport in the database
        List<DriversLicenseCheckReport> driversLicenseCheckReportList = driversLicenseCheckReportRepository.findAll();
        assertThat(driversLicenseCheckReportList).hasSize(databaseSizeBeforeUpdate);
        DriversLicenseCheckReport testDriversLicenseCheckReport = driversLicenseCheckReportList.get(driversLicenseCheckReportList.size() - 1);
        assertThat(testDriversLicenseCheckReport.getDriversLicenseVerified()).isEqualTo(UPDATED_DRIVERS_LICENSE_VERIFIED);
        assertThat(testDriversLicenseCheckReport.getDriversLicenseNumber()).isEqualTo(UPDATED_DRIVERS_LICENSE_NUMBER);
        assertThat(testDriversLicenseCheckReport.getDriversLicenseStatus()).isEqualTo(UPDATED_DRIVERS_LICENSE_STATUS);
        assertThat(testDriversLicenseCheckReport.getDriverLicenseVerifiedBy()).isEqualTo(UPDATED_DRIVER_LICENSE_VERIFIED_BY);
        assertThat(testDriversLicenseCheckReport.getDriversLicenseVerifiedDate()).isEqualTo(UPDATED_DRIVERS_LICENSE_VERIFIED_DATE);
        assertThat(testDriversLicenseCheckReport.getDriversLicenseRemarks()).isEqualTo(UPDATED_DRIVERS_LICENSE_REMARKS);
    }

    @Test
    public void updateNonExistingDriversLicenseCheckReport() throws Exception {
        int databaseSizeBeforeUpdate = driversLicenseCheckReportRepository.findAll().size();

        // Create the DriversLicenseCheckReport

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restDriversLicenseCheckReportMockMvc.perform(put("/api/drivers-license-check-reports")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(driversLicenseCheckReport)))
            .andExpect(status().isBadRequest());

        // Validate the DriversLicenseCheckReport in the database
        List<DriversLicenseCheckReport> driversLicenseCheckReportList = driversLicenseCheckReportRepository.findAll();
        assertThat(driversLicenseCheckReportList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    public void deleteDriversLicenseCheckReport() throws Exception {
        // Initialize the database
        driversLicenseCheckReportRepository.save(driversLicenseCheckReport);

        int databaseSizeBeforeDelete = driversLicenseCheckReportRepository.findAll().size();

        // Get the driversLicenseCheckReport
        restDriversLicenseCheckReportMockMvc.perform(delete("/api/drivers-license-check-reports/{id}", driversLicenseCheckReport.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<DriversLicenseCheckReport> driversLicenseCheckReportList = driversLicenseCheckReportRepository.findAll();
        assertThat(driversLicenseCheckReportList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(DriversLicenseCheckReport.class);
        DriversLicenseCheckReport driversLicenseCheckReport1 = new DriversLicenseCheckReport();
        driversLicenseCheckReport1.setId("id1");
        DriversLicenseCheckReport driversLicenseCheckReport2 = new DriversLicenseCheckReport();
        driversLicenseCheckReport2.setId(driversLicenseCheckReport1.getId());
        assertThat(driversLicenseCheckReport1).isEqualTo(driversLicenseCheckReport2);
        driversLicenseCheckReport2.setId("id2");
        assertThat(driversLicenseCheckReport1).isNotEqualTo(driversLicenseCheckReport2);
        driversLicenseCheckReport1.setId(null);
        assertThat(driversLicenseCheckReport1).isNotEqualTo(driversLicenseCheckReport2);
    }
}
