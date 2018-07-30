package za.co.skywalk.pangeodata.web.rest;

import za.co.skywalk.pangeodata.PangeodataJHipsterApp;

import za.co.skywalk.pangeodata.domain.ReferenceCheckReport;
import za.co.skywalk.pangeodata.repository.ReferenceCheckReportRepository;
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
 * Test class for the ReferenceCheckReportResource REST controller.
 *
 * @see ReferenceCheckReportResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = PangeodataJHipsterApp.class)
public class ReferenceCheckReportResourceIntTest {

    private static final String DEFAULT_NAME_OF_REFERENCE = "AAAAAAAAAA";
    private static final String UPDATED_NAME_OF_REFERENCE = "BBBBBBBBBB";

    private static final String DEFAULT_DESIGNATION_OF_REFERENCE = "AAAAAAAAAA";
    private static final String UPDATED_DESIGNATION_OF_REFERENCE = "BBBBBBBBBB";

    private static final String DEFAULT_REFERENCE_RESPONSE = "AAAAAAAAAA";
    private static final String UPDATED_REFERENCE_RESPONSE = "BBBBBBBBBB";

    private static final String DEFAULT_RES_VERIFIED_DATE = "AAAAAAAAAA";
    private static final String UPDATED_RES_VERIFIED_DATE = "BBBBBBBBBB";

    @Autowired
    private ReferenceCheckReportRepository referenceCheckReportRepository;


    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    private MockMvc restReferenceCheckReportMockMvc;

    private ReferenceCheckReport referenceCheckReport;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ReferenceCheckReportResource referenceCheckReportResource = new ReferenceCheckReportResource(referenceCheckReportRepository);
        this.restReferenceCheckReportMockMvc = MockMvcBuilders.standaloneSetup(referenceCheckReportResource)
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
    public static ReferenceCheckReport createEntity() {
        ReferenceCheckReport referenceCheckReport = new ReferenceCheckReport()
            .nameOfReference(DEFAULT_NAME_OF_REFERENCE)
            .designationOfReference(DEFAULT_DESIGNATION_OF_REFERENCE)
            .referenceResponse(DEFAULT_REFERENCE_RESPONSE)
            .resVerifiedDate(DEFAULT_RES_VERIFIED_DATE);
        return referenceCheckReport;
    }

    @Before
    public void initTest() {
        referenceCheckReportRepository.deleteAll();
        referenceCheckReport = createEntity();
    }

    @Test
    public void createReferenceCheckReport() throws Exception {
        int databaseSizeBeforeCreate = referenceCheckReportRepository.findAll().size();

        // Create the ReferenceCheckReport
        restReferenceCheckReportMockMvc.perform(post("/api/reference-check-reports")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(referenceCheckReport)))
            .andExpect(status().isCreated());

        // Validate the ReferenceCheckReport in the database
        List<ReferenceCheckReport> referenceCheckReportList = referenceCheckReportRepository.findAll();
        assertThat(referenceCheckReportList).hasSize(databaseSizeBeforeCreate + 1);
        ReferenceCheckReport testReferenceCheckReport = referenceCheckReportList.get(referenceCheckReportList.size() - 1);
        assertThat(testReferenceCheckReport.getNameOfReference()).isEqualTo(DEFAULT_NAME_OF_REFERENCE);
        assertThat(testReferenceCheckReport.getDesignationOfReference()).isEqualTo(DEFAULT_DESIGNATION_OF_REFERENCE);
        assertThat(testReferenceCheckReport.getReferenceResponse()).isEqualTo(DEFAULT_REFERENCE_RESPONSE);
        assertThat(testReferenceCheckReport.getResVerifiedDate()).isEqualTo(DEFAULT_RES_VERIFIED_DATE);
    }

    @Test
    public void createReferenceCheckReportWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = referenceCheckReportRepository.findAll().size();

        // Create the ReferenceCheckReport with an existing ID
        referenceCheckReport.setId("existing_id");

        // An entity with an existing ID cannot be created, so this API call must fail
        restReferenceCheckReportMockMvc.perform(post("/api/reference-check-reports")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(referenceCheckReport)))
            .andExpect(status().isBadRequest());

        // Validate the ReferenceCheckReport in the database
        List<ReferenceCheckReport> referenceCheckReportList = referenceCheckReportRepository.findAll();
        assertThat(referenceCheckReportList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    public void getAllReferenceCheckReports() throws Exception {
        // Initialize the database
        referenceCheckReportRepository.save(referenceCheckReport);

        // Get all the referenceCheckReportList
        restReferenceCheckReportMockMvc.perform(get("/api/reference-check-reports?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(referenceCheckReport.getId())))
            .andExpect(jsonPath("$.[*].nameOfReference").value(hasItem(DEFAULT_NAME_OF_REFERENCE.toString())))
            .andExpect(jsonPath("$.[*].designationOfReference").value(hasItem(DEFAULT_DESIGNATION_OF_REFERENCE.toString())))
            .andExpect(jsonPath("$.[*].referenceResponse").value(hasItem(DEFAULT_REFERENCE_RESPONSE.toString())))
            .andExpect(jsonPath("$.[*].resVerifiedDate").value(hasItem(DEFAULT_RES_VERIFIED_DATE.toString())));
    }
    

    @Test
    public void getReferenceCheckReport() throws Exception {
        // Initialize the database
        referenceCheckReportRepository.save(referenceCheckReport);

        // Get the referenceCheckReport
        restReferenceCheckReportMockMvc.perform(get("/api/reference-check-reports/{id}", referenceCheckReport.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(referenceCheckReport.getId()))
            .andExpect(jsonPath("$.nameOfReference").value(DEFAULT_NAME_OF_REFERENCE.toString()))
            .andExpect(jsonPath("$.designationOfReference").value(DEFAULT_DESIGNATION_OF_REFERENCE.toString()))
            .andExpect(jsonPath("$.referenceResponse").value(DEFAULT_REFERENCE_RESPONSE.toString()))
            .andExpect(jsonPath("$.resVerifiedDate").value(DEFAULT_RES_VERIFIED_DATE.toString()));
    }
    @Test
    public void getNonExistingReferenceCheckReport() throws Exception {
        // Get the referenceCheckReport
        restReferenceCheckReportMockMvc.perform(get("/api/reference-check-reports/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateReferenceCheckReport() throws Exception {
        // Initialize the database
        referenceCheckReportRepository.save(referenceCheckReport);

        int databaseSizeBeforeUpdate = referenceCheckReportRepository.findAll().size();

        // Update the referenceCheckReport
        ReferenceCheckReport updatedReferenceCheckReport = referenceCheckReportRepository.findById(referenceCheckReport.getId()).get();
        updatedReferenceCheckReport
            .nameOfReference(UPDATED_NAME_OF_REFERENCE)
            .designationOfReference(UPDATED_DESIGNATION_OF_REFERENCE)
            .referenceResponse(UPDATED_REFERENCE_RESPONSE)
            .resVerifiedDate(UPDATED_RES_VERIFIED_DATE);

        restReferenceCheckReportMockMvc.perform(put("/api/reference-check-reports")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedReferenceCheckReport)))
            .andExpect(status().isOk());

        // Validate the ReferenceCheckReport in the database
        List<ReferenceCheckReport> referenceCheckReportList = referenceCheckReportRepository.findAll();
        assertThat(referenceCheckReportList).hasSize(databaseSizeBeforeUpdate);
        ReferenceCheckReport testReferenceCheckReport = referenceCheckReportList.get(referenceCheckReportList.size() - 1);
        assertThat(testReferenceCheckReport.getNameOfReference()).isEqualTo(UPDATED_NAME_OF_REFERENCE);
        assertThat(testReferenceCheckReport.getDesignationOfReference()).isEqualTo(UPDATED_DESIGNATION_OF_REFERENCE);
        assertThat(testReferenceCheckReport.getReferenceResponse()).isEqualTo(UPDATED_REFERENCE_RESPONSE);
        assertThat(testReferenceCheckReport.getResVerifiedDate()).isEqualTo(UPDATED_RES_VERIFIED_DATE);
    }

    @Test
    public void updateNonExistingReferenceCheckReport() throws Exception {
        int databaseSizeBeforeUpdate = referenceCheckReportRepository.findAll().size();

        // Create the ReferenceCheckReport

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restReferenceCheckReportMockMvc.perform(put("/api/reference-check-reports")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(referenceCheckReport)))
            .andExpect(status().isBadRequest());

        // Validate the ReferenceCheckReport in the database
        List<ReferenceCheckReport> referenceCheckReportList = referenceCheckReportRepository.findAll();
        assertThat(referenceCheckReportList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    public void deleteReferenceCheckReport() throws Exception {
        // Initialize the database
        referenceCheckReportRepository.save(referenceCheckReport);

        int databaseSizeBeforeDelete = referenceCheckReportRepository.findAll().size();

        // Get the referenceCheckReport
        restReferenceCheckReportMockMvc.perform(delete("/api/reference-check-reports/{id}", referenceCheckReport.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<ReferenceCheckReport> referenceCheckReportList = referenceCheckReportRepository.findAll();
        assertThat(referenceCheckReportList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ReferenceCheckReport.class);
        ReferenceCheckReport referenceCheckReport1 = new ReferenceCheckReport();
        referenceCheckReport1.setId("id1");
        ReferenceCheckReport referenceCheckReport2 = new ReferenceCheckReport();
        referenceCheckReport2.setId(referenceCheckReport1.getId());
        assertThat(referenceCheckReport1).isEqualTo(referenceCheckReport2);
        referenceCheckReport2.setId("id2");
        assertThat(referenceCheckReport1).isNotEqualTo(referenceCheckReport2);
        referenceCheckReport1.setId(null);
        assertThat(referenceCheckReport1).isNotEqualTo(referenceCheckReport2);
    }
}
