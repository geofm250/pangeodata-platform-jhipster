package za.co.skywalk.pangeodata.web.rest;

import za.co.skywalk.pangeodata.PangeodataJHipsterApp;

import za.co.skywalk.pangeodata.domain.DirectorshipVerificationReport;
import za.co.skywalk.pangeodata.repository.DirectorshipVerificationReportRepository;
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
 * Test class for the DirectorshipVerificationReportResource REST controller.
 *
 * @see DirectorshipVerificationReportResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = PangeodataJHipsterApp.class)
public class DirectorshipVerificationReportResourceIntTest {

    private static final String DEFAULT_DIRECTORSHIP_VERIFIED = "AAAAAAAAAA";
    private static final String UPDATED_DIRECTORSHIP_VERIFIED = "BBBBBBBBBB";

    private static final String DEFAULT_DIRECTORSHIP_FINDINGS = "AAAAAAAAAA";
    private static final String UPDATED_DIRECTORSHIP_FINDINGS = "BBBBBBBBBB";

    private static final String DEFAULT_DIRECTORSHIP_VERIFIED_BY = "AAAAAAAAAA";
    private static final String UPDATED_DIRECTORSHIP_VERIFIED_BY = "BBBBBBBBBB";

    private static final String DEFAULT_DIRECTORSHIP_VERIFIED_DATE = "AAAAAAAAAA";
    private static final String UPDATED_DIRECTORSHIP_VERIFIED_DATE = "BBBBBBBBBB";

    @Autowired
    private DirectorshipVerificationReportRepository directorshipVerificationReportRepository;


    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    private MockMvc restDirectorshipVerificationReportMockMvc;

    private DirectorshipVerificationReport directorshipVerificationReport;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final DirectorshipVerificationReportResource directorshipVerificationReportResource = new DirectorshipVerificationReportResource(directorshipVerificationReportRepository);
        this.restDirectorshipVerificationReportMockMvc = MockMvcBuilders.standaloneSetup(directorshipVerificationReportResource)
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
    public static DirectorshipVerificationReport createEntity() {
        DirectorshipVerificationReport directorshipVerificationReport = new DirectorshipVerificationReport()
            .directorshipVerified(DEFAULT_DIRECTORSHIP_VERIFIED)
            .directorshipFindings(DEFAULT_DIRECTORSHIP_FINDINGS)
            .directorshipVerifiedBy(DEFAULT_DIRECTORSHIP_VERIFIED_BY)
            .directorshipVerifiedDate(DEFAULT_DIRECTORSHIP_VERIFIED_DATE);
        return directorshipVerificationReport;
    }

    @Before
    public void initTest() {
        directorshipVerificationReportRepository.deleteAll();
        directorshipVerificationReport = createEntity();
    }

    @Test
    public void createDirectorshipVerificationReport() throws Exception {
        int databaseSizeBeforeCreate = directorshipVerificationReportRepository.findAll().size();

        // Create the DirectorshipVerificationReport
        restDirectorshipVerificationReportMockMvc.perform(post("/api/directorship-verification-reports")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(directorshipVerificationReport)))
            .andExpect(status().isCreated());

        // Validate the DirectorshipVerificationReport in the database
        List<DirectorshipVerificationReport> directorshipVerificationReportList = directorshipVerificationReportRepository.findAll();
        assertThat(directorshipVerificationReportList).hasSize(databaseSizeBeforeCreate + 1);
        DirectorshipVerificationReport testDirectorshipVerificationReport = directorshipVerificationReportList.get(directorshipVerificationReportList.size() - 1);
        assertThat(testDirectorshipVerificationReport.getDirectorshipVerified()).isEqualTo(DEFAULT_DIRECTORSHIP_VERIFIED);
        assertThat(testDirectorshipVerificationReport.getDirectorshipFindings()).isEqualTo(DEFAULT_DIRECTORSHIP_FINDINGS);
        assertThat(testDirectorshipVerificationReport.getDirectorshipVerifiedBy()).isEqualTo(DEFAULT_DIRECTORSHIP_VERIFIED_BY);
        assertThat(testDirectorshipVerificationReport.getDirectorshipVerifiedDate()).isEqualTo(DEFAULT_DIRECTORSHIP_VERIFIED_DATE);
    }

    @Test
    public void createDirectorshipVerificationReportWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = directorshipVerificationReportRepository.findAll().size();

        // Create the DirectorshipVerificationReport with an existing ID
        directorshipVerificationReport.setId("existing_id");

        // An entity with an existing ID cannot be created, so this API call must fail
        restDirectorshipVerificationReportMockMvc.perform(post("/api/directorship-verification-reports")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(directorshipVerificationReport)))
            .andExpect(status().isBadRequest());

        // Validate the DirectorshipVerificationReport in the database
        List<DirectorshipVerificationReport> directorshipVerificationReportList = directorshipVerificationReportRepository.findAll();
        assertThat(directorshipVerificationReportList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    public void getAllDirectorshipVerificationReports() throws Exception {
        // Initialize the database
        directorshipVerificationReportRepository.save(directorshipVerificationReport);

        // Get all the directorshipVerificationReportList
        restDirectorshipVerificationReportMockMvc.perform(get("/api/directorship-verification-reports?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(directorshipVerificationReport.getId())))
            .andExpect(jsonPath("$.[*].directorshipVerified").value(hasItem(DEFAULT_DIRECTORSHIP_VERIFIED.toString())))
            .andExpect(jsonPath("$.[*].directorshipFindings").value(hasItem(DEFAULT_DIRECTORSHIP_FINDINGS.toString())))
            .andExpect(jsonPath("$.[*].directorshipVerifiedBy").value(hasItem(DEFAULT_DIRECTORSHIP_VERIFIED_BY.toString())))
            .andExpect(jsonPath("$.[*].directorshipVerifiedDate").value(hasItem(DEFAULT_DIRECTORSHIP_VERIFIED_DATE.toString())));
    }
    

    @Test
    public void getDirectorshipVerificationReport() throws Exception {
        // Initialize the database
        directorshipVerificationReportRepository.save(directorshipVerificationReport);

        // Get the directorshipVerificationReport
        restDirectorshipVerificationReportMockMvc.perform(get("/api/directorship-verification-reports/{id}", directorshipVerificationReport.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(directorshipVerificationReport.getId()))
            .andExpect(jsonPath("$.directorshipVerified").value(DEFAULT_DIRECTORSHIP_VERIFIED.toString()))
            .andExpect(jsonPath("$.directorshipFindings").value(DEFAULT_DIRECTORSHIP_FINDINGS.toString()))
            .andExpect(jsonPath("$.directorshipVerifiedBy").value(DEFAULT_DIRECTORSHIP_VERIFIED_BY.toString()))
            .andExpect(jsonPath("$.directorshipVerifiedDate").value(DEFAULT_DIRECTORSHIP_VERIFIED_DATE.toString()));
    }
    @Test
    public void getNonExistingDirectorshipVerificationReport() throws Exception {
        // Get the directorshipVerificationReport
        restDirectorshipVerificationReportMockMvc.perform(get("/api/directorship-verification-reports/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateDirectorshipVerificationReport() throws Exception {
        // Initialize the database
        directorshipVerificationReportRepository.save(directorshipVerificationReport);

        int databaseSizeBeforeUpdate = directorshipVerificationReportRepository.findAll().size();

        // Update the directorshipVerificationReport
        DirectorshipVerificationReport updatedDirectorshipVerificationReport = directorshipVerificationReportRepository.findById(directorshipVerificationReport.getId()).get();
        updatedDirectorshipVerificationReport
            .directorshipVerified(UPDATED_DIRECTORSHIP_VERIFIED)
            .directorshipFindings(UPDATED_DIRECTORSHIP_FINDINGS)
            .directorshipVerifiedBy(UPDATED_DIRECTORSHIP_VERIFIED_BY)
            .directorshipVerifiedDate(UPDATED_DIRECTORSHIP_VERIFIED_DATE);

        restDirectorshipVerificationReportMockMvc.perform(put("/api/directorship-verification-reports")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedDirectorshipVerificationReport)))
            .andExpect(status().isOk());

        // Validate the DirectorshipVerificationReport in the database
        List<DirectorshipVerificationReport> directorshipVerificationReportList = directorshipVerificationReportRepository.findAll();
        assertThat(directorshipVerificationReportList).hasSize(databaseSizeBeforeUpdate);
        DirectorshipVerificationReport testDirectorshipVerificationReport = directorshipVerificationReportList.get(directorshipVerificationReportList.size() - 1);
        assertThat(testDirectorshipVerificationReport.getDirectorshipVerified()).isEqualTo(UPDATED_DIRECTORSHIP_VERIFIED);
        assertThat(testDirectorshipVerificationReport.getDirectorshipFindings()).isEqualTo(UPDATED_DIRECTORSHIP_FINDINGS);
        assertThat(testDirectorshipVerificationReport.getDirectorshipVerifiedBy()).isEqualTo(UPDATED_DIRECTORSHIP_VERIFIED_BY);
        assertThat(testDirectorshipVerificationReport.getDirectorshipVerifiedDate()).isEqualTo(UPDATED_DIRECTORSHIP_VERIFIED_DATE);
    }

    @Test
    public void updateNonExistingDirectorshipVerificationReport() throws Exception {
        int databaseSizeBeforeUpdate = directorshipVerificationReportRepository.findAll().size();

        // Create the DirectorshipVerificationReport

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restDirectorshipVerificationReportMockMvc.perform(put("/api/directorship-verification-reports")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(directorshipVerificationReport)))
            .andExpect(status().isBadRequest());

        // Validate the DirectorshipVerificationReport in the database
        List<DirectorshipVerificationReport> directorshipVerificationReportList = directorshipVerificationReportRepository.findAll();
        assertThat(directorshipVerificationReportList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    public void deleteDirectorshipVerificationReport() throws Exception {
        // Initialize the database
        directorshipVerificationReportRepository.save(directorshipVerificationReport);

        int databaseSizeBeforeDelete = directorshipVerificationReportRepository.findAll().size();

        // Get the directorshipVerificationReport
        restDirectorshipVerificationReportMockMvc.perform(delete("/api/directorship-verification-reports/{id}", directorshipVerificationReport.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<DirectorshipVerificationReport> directorshipVerificationReportList = directorshipVerificationReportRepository.findAll();
        assertThat(directorshipVerificationReportList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(DirectorshipVerificationReport.class);
        DirectorshipVerificationReport directorshipVerificationReport1 = new DirectorshipVerificationReport();
        directorshipVerificationReport1.setId("id1");
        DirectorshipVerificationReport directorshipVerificationReport2 = new DirectorshipVerificationReport();
        directorshipVerificationReport2.setId(directorshipVerificationReport1.getId());
        assertThat(directorshipVerificationReport1).isEqualTo(directorshipVerificationReport2);
        directorshipVerificationReport2.setId("id2");
        assertThat(directorshipVerificationReport1).isNotEqualTo(directorshipVerificationReport2);
        directorshipVerificationReport1.setId(null);
        assertThat(directorshipVerificationReport1).isNotEqualTo(directorshipVerificationReport2);
    }
}
