package za.co.skywalk.pangeodata.web.rest;

import za.co.skywalk.pangeodata.PangeodataJHipsterApp;

import za.co.skywalk.pangeodata.domain.IdentityCheckReport;
import za.co.skywalk.pangeodata.repository.IdentityCheckReportRepository;
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
 * Test class for the IdentityCheckReportResource REST controller.
 *
 * @see IdentityCheckReportResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = PangeodataJHipsterApp.class)
public class IdentityCheckReportResourceIntTest {

    private static final String DEFAULT_ID_VERIFIED = "AAAAAAAAAA";
    private static final String UPDATED_ID_VERIFIED = "BBBBBBBBBB";

    private static final String DEFAULT_ID_AUTH_VERIFIED_BY = "AAAAAAAAAA";
    private static final String UPDATED_ID_AUTH_VERIFIED_BY = "BBBBBBBBBB";

    private static final String DEFAULT_ID_VERIFIED_DATE = "AAAAAAAAAA";
    private static final String UPDATED_ID_VERIFIED_DATE = "BBBBBBBBBB";

    private static final String DEFAULT_ID_REMARKS = "AAAAAAAAAA";
    private static final String UPDATED_ID_REMARKS = "BBBBBBBBBB";

    @Autowired
    private IdentityCheckReportRepository identityCheckReportRepository;


    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    private MockMvc restIdentityCheckReportMockMvc;

    private IdentityCheckReport identityCheckReport;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final IdentityCheckReportResource identityCheckReportResource = new IdentityCheckReportResource(identityCheckReportRepository);
        this.restIdentityCheckReportMockMvc = MockMvcBuilders.standaloneSetup(identityCheckReportResource)
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
    public static IdentityCheckReport createEntity() {
        IdentityCheckReport identityCheckReport = new IdentityCheckReport()
            .idVerified(DEFAULT_ID_VERIFIED)
            .idAuthVerifiedBy(DEFAULT_ID_AUTH_VERIFIED_BY)
            .idVerifiedDate(DEFAULT_ID_VERIFIED_DATE)
            .idRemarks(DEFAULT_ID_REMARKS);
        return identityCheckReport;
    }

    @Before
    public void initTest() {
        identityCheckReportRepository.deleteAll();
        identityCheckReport = createEntity();
    }

    @Test
    public void createIdentityCheckReport() throws Exception {
        int databaseSizeBeforeCreate = identityCheckReportRepository.findAll().size();

        // Create the IdentityCheckReport
        restIdentityCheckReportMockMvc.perform(post("/api/identity-check-reports")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(identityCheckReport)))
            .andExpect(status().isCreated());

        // Validate the IdentityCheckReport in the database
        List<IdentityCheckReport> identityCheckReportList = identityCheckReportRepository.findAll();
        assertThat(identityCheckReportList).hasSize(databaseSizeBeforeCreate + 1);
        IdentityCheckReport testIdentityCheckReport = identityCheckReportList.get(identityCheckReportList.size() - 1);
        assertThat(testIdentityCheckReport.getIdVerified()).isEqualTo(DEFAULT_ID_VERIFIED);
        assertThat(testIdentityCheckReport.getIdAuthVerifiedBy()).isEqualTo(DEFAULT_ID_AUTH_VERIFIED_BY);
        assertThat(testIdentityCheckReport.getIdVerifiedDate()).isEqualTo(DEFAULT_ID_VERIFIED_DATE);
        assertThat(testIdentityCheckReport.getIdRemarks()).isEqualTo(DEFAULT_ID_REMARKS);
    }

    @Test
    public void createIdentityCheckReportWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = identityCheckReportRepository.findAll().size();

        // Create the IdentityCheckReport with an existing ID
        identityCheckReport.setId("existing_id");

        // An entity with an existing ID cannot be created, so this API call must fail
        restIdentityCheckReportMockMvc.perform(post("/api/identity-check-reports")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(identityCheckReport)))
            .andExpect(status().isBadRequest());

        // Validate the IdentityCheckReport in the database
        List<IdentityCheckReport> identityCheckReportList = identityCheckReportRepository.findAll();
        assertThat(identityCheckReportList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    public void getAllIdentityCheckReports() throws Exception {
        // Initialize the database
        identityCheckReportRepository.save(identityCheckReport);

        // Get all the identityCheckReportList
        restIdentityCheckReportMockMvc.perform(get("/api/identity-check-reports?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(identityCheckReport.getId())))
            .andExpect(jsonPath("$.[*].idVerified").value(hasItem(DEFAULT_ID_VERIFIED.toString())))
            .andExpect(jsonPath("$.[*].idAuthVerifiedBy").value(hasItem(DEFAULT_ID_AUTH_VERIFIED_BY.toString())))
            .andExpect(jsonPath("$.[*].idVerifiedDate").value(hasItem(DEFAULT_ID_VERIFIED_DATE.toString())))
            .andExpect(jsonPath("$.[*].idRemarks").value(hasItem(DEFAULT_ID_REMARKS.toString())));
    }
    

    @Test
    public void getIdentityCheckReport() throws Exception {
        // Initialize the database
        identityCheckReportRepository.save(identityCheckReport);

        // Get the identityCheckReport
        restIdentityCheckReportMockMvc.perform(get("/api/identity-check-reports/{id}", identityCheckReport.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(identityCheckReport.getId()))
            .andExpect(jsonPath("$.idVerified").value(DEFAULT_ID_VERIFIED.toString()))
            .andExpect(jsonPath("$.idAuthVerifiedBy").value(DEFAULT_ID_AUTH_VERIFIED_BY.toString()))
            .andExpect(jsonPath("$.idVerifiedDate").value(DEFAULT_ID_VERIFIED_DATE.toString()))
            .andExpect(jsonPath("$.idRemarks").value(DEFAULT_ID_REMARKS.toString()));
    }
    @Test
    public void getNonExistingIdentityCheckReport() throws Exception {
        // Get the identityCheckReport
        restIdentityCheckReportMockMvc.perform(get("/api/identity-check-reports/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateIdentityCheckReport() throws Exception {
        // Initialize the database
        identityCheckReportRepository.save(identityCheckReport);

        int databaseSizeBeforeUpdate = identityCheckReportRepository.findAll().size();

        // Update the identityCheckReport
        IdentityCheckReport updatedIdentityCheckReport = identityCheckReportRepository.findById(identityCheckReport.getId()).get();
        updatedIdentityCheckReport
            .idVerified(UPDATED_ID_VERIFIED)
            .idAuthVerifiedBy(UPDATED_ID_AUTH_VERIFIED_BY)
            .idVerifiedDate(UPDATED_ID_VERIFIED_DATE)
            .idRemarks(UPDATED_ID_REMARKS);

        restIdentityCheckReportMockMvc.perform(put("/api/identity-check-reports")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedIdentityCheckReport)))
            .andExpect(status().isOk());

        // Validate the IdentityCheckReport in the database
        List<IdentityCheckReport> identityCheckReportList = identityCheckReportRepository.findAll();
        assertThat(identityCheckReportList).hasSize(databaseSizeBeforeUpdate);
        IdentityCheckReport testIdentityCheckReport = identityCheckReportList.get(identityCheckReportList.size() - 1);
        assertThat(testIdentityCheckReport.getIdVerified()).isEqualTo(UPDATED_ID_VERIFIED);
        assertThat(testIdentityCheckReport.getIdAuthVerifiedBy()).isEqualTo(UPDATED_ID_AUTH_VERIFIED_BY);
        assertThat(testIdentityCheckReport.getIdVerifiedDate()).isEqualTo(UPDATED_ID_VERIFIED_DATE);
        assertThat(testIdentityCheckReport.getIdRemarks()).isEqualTo(UPDATED_ID_REMARKS);
    }

    @Test
    public void updateNonExistingIdentityCheckReport() throws Exception {
        int databaseSizeBeforeUpdate = identityCheckReportRepository.findAll().size();

        // Create the IdentityCheckReport

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restIdentityCheckReportMockMvc.perform(put("/api/identity-check-reports")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(identityCheckReport)))
            .andExpect(status().isBadRequest());

        // Validate the IdentityCheckReport in the database
        List<IdentityCheckReport> identityCheckReportList = identityCheckReportRepository.findAll();
        assertThat(identityCheckReportList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    public void deleteIdentityCheckReport() throws Exception {
        // Initialize the database
        identityCheckReportRepository.save(identityCheckReport);

        int databaseSizeBeforeDelete = identityCheckReportRepository.findAll().size();

        // Get the identityCheckReport
        restIdentityCheckReportMockMvc.perform(delete("/api/identity-check-reports/{id}", identityCheckReport.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<IdentityCheckReport> identityCheckReportList = identityCheckReportRepository.findAll();
        assertThat(identityCheckReportList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(IdentityCheckReport.class);
        IdentityCheckReport identityCheckReport1 = new IdentityCheckReport();
        identityCheckReport1.setId("id1");
        IdentityCheckReport identityCheckReport2 = new IdentityCheckReport();
        identityCheckReport2.setId(identityCheckReport1.getId());
        assertThat(identityCheckReport1).isEqualTo(identityCheckReport2);
        identityCheckReport2.setId("id2");
        assertThat(identityCheckReport1).isNotEqualTo(identityCheckReport2);
        identityCheckReport1.setId(null);
        assertThat(identityCheckReport1).isNotEqualTo(identityCheckReport2);
    }
}
