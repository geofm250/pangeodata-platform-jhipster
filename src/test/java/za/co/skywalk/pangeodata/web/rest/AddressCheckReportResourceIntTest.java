package za.co.skywalk.pangeodata.web.rest;

import za.co.skywalk.pangeodata.PangeodataJHipsterApp;

import za.co.skywalk.pangeodata.domain.AddressCheckReport;
import za.co.skywalk.pangeodata.repository.AddressCheckReportRepository;
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
 * Test class for the AddressCheckReportResource REST controller.
 *
 * @see AddressCheckReportResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = PangeodataJHipsterApp.class)
public class AddressCheckReportResourceIntTest {

    private static final String DEFAULT_ADDRESS_VERIFIED = "AAAAAAAAAA";
    private static final String UPDATED_ADDRESS_VERIFIED = "BBBBBBBBBB";

    private static final String DEFAULT_ID_AUTH_VERIFIED_BY = "AAAAAAAAAA";
    private static final String UPDATED_ID_AUTH_VERIFIED_BY = "BBBBBBBBBB";

    private static final String DEFAULT_ADDRESS_VERIFIED_BY = "AAAAAAAAAA";
    private static final String UPDATED_ADDRESS_VERIFIED_BY = "BBBBBBBBBB";

    private static final String DEFAULT_ADDRESS_VERIFIED_DATE = "AAAAAAAAAA";
    private static final String UPDATED_ADDRESS_VERIFIED_DATE = "BBBBBBBBBB";

    private static final String DEFAULT_ADDRESS_REMARKS = "AAAAAAAAAA";
    private static final String UPDATED_ADDRESS_REMARKS = "BBBBBBBBBB";

    @Autowired
    private AddressCheckReportRepository addressCheckReportRepository;


    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    private MockMvc restAddressCheckReportMockMvc;

    private AddressCheckReport addressCheckReport;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final AddressCheckReportResource addressCheckReportResource = new AddressCheckReportResource(addressCheckReportRepository);
        this.restAddressCheckReportMockMvc = MockMvcBuilders.standaloneSetup(addressCheckReportResource)
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
    public static AddressCheckReport createEntity() {
        AddressCheckReport addressCheckReport = new AddressCheckReport()
            .addressVerified(DEFAULT_ADDRESS_VERIFIED)
            .idAuthVerifiedBy(DEFAULT_ID_AUTH_VERIFIED_BY)
            .addressVerifiedBy(DEFAULT_ADDRESS_VERIFIED_BY)
            .addressVerifiedDate(DEFAULT_ADDRESS_VERIFIED_DATE)
            .addressRemarks(DEFAULT_ADDRESS_REMARKS);
        return addressCheckReport;
    }

    @Before
    public void initTest() {
        addressCheckReportRepository.deleteAll();
        addressCheckReport = createEntity();
    }

    @Test
    public void createAddressCheckReport() throws Exception {
        int databaseSizeBeforeCreate = addressCheckReportRepository.findAll().size();

        // Create the AddressCheckReport
        restAddressCheckReportMockMvc.perform(post("/api/address-check-reports")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(addressCheckReport)))
            .andExpect(status().isCreated());

        // Validate the AddressCheckReport in the database
        List<AddressCheckReport> addressCheckReportList = addressCheckReportRepository.findAll();
        assertThat(addressCheckReportList).hasSize(databaseSizeBeforeCreate + 1);
        AddressCheckReport testAddressCheckReport = addressCheckReportList.get(addressCheckReportList.size() - 1);
        assertThat(testAddressCheckReport.getAddressVerified()).isEqualTo(DEFAULT_ADDRESS_VERIFIED);
        assertThat(testAddressCheckReport.getIdAuthVerifiedBy()).isEqualTo(DEFAULT_ID_AUTH_VERIFIED_BY);
        assertThat(testAddressCheckReport.getAddressVerifiedBy()).isEqualTo(DEFAULT_ADDRESS_VERIFIED_BY);
        assertThat(testAddressCheckReport.getAddressVerifiedDate()).isEqualTo(DEFAULT_ADDRESS_VERIFIED_DATE);
        assertThat(testAddressCheckReport.getAddressRemarks()).isEqualTo(DEFAULT_ADDRESS_REMARKS);
    }

    @Test
    public void createAddressCheckReportWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = addressCheckReportRepository.findAll().size();

        // Create the AddressCheckReport with an existing ID
        addressCheckReport.setId("existing_id");

        // An entity with an existing ID cannot be created, so this API call must fail
        restAddressCheckReportMockMvc.perform(post("/api/address-check-reports")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(addressCheckReport)))
            .andExpect(status().isBadRequest());

        // Validate the AddressCheckReport in the database
        List<AddressCheckReport> addressCheckReportList = addressCheckReportRepository.findAll();
        assertThat(addressCheckReportList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    public void getAllAddressCheckReports() throws Exception {
        // Initialize the database
        addressCheckReportRepository.save(addressCheckReport);

        // Get all the addressCheckReportList
        restAddressCheckReportMockMvc.perform(get("/api/address-check-reports?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(addressCheckReport.getId())))
            .andExpect(jsonPath("$.[*].addressVerified").value(hasItem(DEFAULT_ADDRESS_VERIFIED.toString())))
            .andExpect(jsonPath("$.[*].idAuthVerifiedBy").value(hasItem(DEFAULT_ID_AUTH_VERIFIED_BY.toString())))
            .andExpect(jsonPath("$.[*].addressVerifiedBy").value(hasItem(DEFAULT_ADDRESS_VERIFIED_BY.toString())))
            .andExpect(jsonPath("$.[*].addressVerifiedDate").value(hasItem(DEFAULT_ADDRESS_VERIFIED_DATE.toString())))
            .andExpect(jsonPath("$.[*].addressRemarks").value(hasItem(DEFAULT_ADDRESS_REMARKS.toString())));
    }
    

    @Test
    public void getAddressCheckReport() throws Exception {
        // Initialize the database
        addressCheckReportRepository.save(addressCheckReport);

        // Get the addressCheckReport
        restAddressCheckReportMockMvc.perform(get("/api/address-check-reports/{id}", addressCheckReport.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(addressCheckReport.getId()))
            .andExpect(jsonPath("$.addressVerified").value(DEFAULT_ADDRESS_VERIFIED.toString()))
            .andExpect(jsonPath("$.idAuthVerifiedBy").value(DEFAULT_ID_AUTH_VERIFIED_BY.toString()))
            .andExpect(jsonPath("$.addressVerifiedBy").value(DEFAULT_ADDRESS_VERIFIED_BY.toString()))
            .andExpect(jsonPath("$.addressVerifiedDate").value(DEFAULT_ADDRESS_VERIFIED_DATE.toString()))
            .andExpect(jsonPath("$.addressRemarks").value(DEFAULT_ADDRESS_REMARKS.toString()));
    }
    @Test
    public void getNonExistingAddressCheckReport() throws Exception {
        // Get the addressCheckReport
        restAddressCheckReportMockMvc.perform(get("/api/address-check-reports/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateAddressCheckReport() throws Exception {
        // Initialize the database
        addressCheckReportRepository.save(addressCheckReport);

        int databaseSizeBeforeUpdate = addressCheckReportRepository.findAll().size();

        // Update the addressCheckReport
        AddressCheckReport updatedAddressCheckReport = addressCheckReportRepository.findById(addressCheckReport.getId()).get();
        updatedAddressCheckReport
            .addressVerified(UPDATED_ADDRESS_VERIFIED)
            .idAuthVerifiedBy(UPDATED_ID_AUTH_VERIFIED_BY)
            .addressVerifiedBy(UPDATED_ADDRESS_VERIFIED_BY)
            .addressVerifiedDate(UPDATED_ADDRESS_VERIFIED_DATE)
            .addressRemarks(UPDATED_ADDRESS_REMARKS);

        restAddressCheckReportMockMvc.perform(put("/api/address-check-reports")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedAddressCheckReport)))
            .andExpect(status().isOk());

        // Validate the AddressCheckReport in the database
        List<AddressCheckReport> addressCheckReportList = addressCheckReportRepository.findAll();
        assertThat(addressCheckReportList).hasSize(databaseSizeBeforeUpdate);
        AddressCheckReport testAddressCheckReport = addressCheckReportList.get(addressCheckReportList.size() - 1);
        assertThat(testAddressCheckReport.getAddressVerified()).isEqualTo(UPDATED_ADDRESS_VERIFIED);
        assertThat(testAddressCheckReport.getIdAuthVerifiedBy()).isEqualTo(UPDATED_ID_AUTH_VERIFIED_BY);
        assertThat(testAddressCheckReport.getAddressVerifiedBy()).isEqualTo(UPDATED_ADDRESS_VERIFIED_BY);
        assertThat(testAddressCheckReport.getAddressVerifiedDate()).isEqualTo(UPDATED_ADDRESS_VERIFIED_DATE);
        assertThat(testAddressCheckReport.getAddressRemarks()).isEqualTo(UPDATED_ADDRESS_REMARKS);
    }

    @Test
    public void updateNonExistingAddressCheckReport() throws Exception {
        int databaseSizeBeforeUpdate = addressCheckReportRepository.findAll().size();

        // Create the AddressCheckReport

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restAddressCheckReportMockMvc.perform(put("/api/address-check-reports")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(addressCheckReport)))
            .andExpect(status().isBadRequest());

        // Validate the AddressCheckReport in the database
        List<AddressCheckReport> addressCheckReportList = addressCheckReportRepository.findAll();
        assertThat(addressCheckReportList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    public void deleteAddressCheckReport() throws Exception {
        // Initialize the database
        addressCheckReportRepository.save(addressCheckReport);

        int databaseSizeBeforeDelete = addressCheckReportRepository.findAll().size();

        // Get the addressCheckReport
        restAddressCheckReportMockMvc.perform(delete("/api/address-check-reports/{id}", addressCheckReport.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<AddressCheckReport> addressCheckReportList = addressCheckReportRepository.findAll();
        assertThat(addressCheckReportList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(AddressCheckReport.class);
        AddressCheckReport addressCheckReport1 = new AddressCheckReport();
        addressCheckReport1.setId("id1");
        AddressCheckReport addressCheckReport2 = new AddressCheckReport();
        addressCheckReport2.setId(addressCheckReport1.getId());
        assertThat(addressCheckReport1).isEqualTo(addressCheckReport2);
        addressCheckReport2.setId("id2");
        assertThat(addressCheckReport1).isNotEqualTo(addressCheckReport2);
        addressCheckReport1.setId(null);
        assertThat(addressCheckReport1).isNotEqualTo(addressCheckReport2);
    }
}
