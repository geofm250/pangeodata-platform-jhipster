package za.co.skywalk.pangeodata.web.rest;

import za.co.skywalk.pangeodata.PangeodataJHipsterApp;

import za.co.skywalk.pangeodata.domain.LocalLanguageMediaCheckReport;
import za.co.skywalk.pangeodata.repository.LocalLanguageMediaCheckReportRepository;
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
 * Test class for the LocalLanguageMediaCheckReportResource REST controller.
 *
 * @see LocalLanguageMediaCheckReportResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = PangeodataJHipsterApp.class)
public class LocalLanguageMediaCheckReportResourceIntTest {

    private static final String DEFAULT_LOCAL_LANGUAGE_MEDIA_FINDINGS = "AAAAAAAAAA";
    private static final String UPDATED_LOCAL_LANGUAGE_MEDIA_FINDINGS = "BBBBBBBBBB";

    private static final String DEFAULT_LOCAL_LANGUAGE_MEDIA_STATUS = "AAAAAAAAAA";
    private static final String UPDATED_LOCAL_LANGUAGE_MEDIA_STATUS = "BBBBBBBBBB";

    private static final String DEFAULT_LOCAL_LANGUAGE_MEDIA_VERIFIED_DATE = "AAAAAAAAAA";
    private static final String UPDATED_LOCAL_LANGUAGE_MEDIA_VERIFIED_DATE = "BBBBBBBBBB";

    @Autowired
    private LocalLanguageMediaCheckReportRepository localLanguageMediaCheckReportRepository;


    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    private MockMvc restLocalLanguageMediaCheckReportMockMvc;

    private LocalLanguageMediaCheckReport localLanguageMediaCheckReport;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final LocalLanguageMediaCheckReportResource localLanguageMediaCheckReportResource = new LocalLanguageMediaCheckReportResource(localLanguageMediaCheckReportRepository);
        this.restLocalLanguageMediaCheckReportMockMvc = MockMvcBuilders.standaloneSetup(localLanguageMediaCheckReportResource)
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
    public static LocalLanguageMediaCheckReport createEntity() {
        LocalLanguageMediaCheckReport localLanguageMediaCheckReport = new LocalLanguageMediaCheckReport()
            .localLanguageMediaFindings(DEFAULT_LOCAL_LANGUAGE_MEDIA_FINDINGS)
            .localLanguageMediaStatus(DEFAULT_LOCAL_LANGUAGE_MEDIA_STATUS)
            .localLanguageMediaVerifiedDate(DEFAULT_LOCAL_LANGUAGE_MEDIA_VERIFIED_DATE);
        return localLanguageMediaCheckReport;
    }

    @Before
    public void initTest() {
        localLanguageMediaCheckReportRepository.deleteAll();
        localLanguageMediaCheckReport = createEntity();
    }

    @Test
    public void createLocalLanguageMediaCheckReport() throws Exception {
        int databaseSizeBeforeCreate = localLanguageMediaCheckReportRepository.findAll().size();

        // Create the LocalLanguageMediaCheckReport
        restLocalLanguageMediaCheckReportMockMvc.perform(post("/api/local-language-media-check-reports")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(localLanguageMediaCheckReport)))
            .andExpect(status().isCreated());

        // Validate the LocalLanguageMediaCheckReport in the database
        List<LocalLanguageMediaCheckReport> localLanguageMediaCheckReportList = localLanguageMediaCheckReportRepository.findAll();
        assertThat(localLanguageMediaCheckReportList).hasSize(databaseSizeBeforeCreate + 1);
        LocalLanguageMediaCheckReport testLocalLanguageMediaCheckReport = localLanguageMediaCheckReportList.get(localLanguageMediaCheckReportList.size() - 1);
        assertThat(testLocalLanguageMediaCheckReport.getLocalLanguageMediaFindings()).isEqualTo(DEFAULT_LOCAL_LANGUAGE_MEDIA_FINDINGS);
        assertThat(testLocalLanguageMediaCheckReport.getLocalLanguageMediaStatus()).isEqualTo(DEFAULT_LOCAL_LANGUAGE_MEDIA_STATUS);
        assertThat(testLocalLanguageMediaCheckReport.getLocalLanguageMediaVerifiedDate()).isEqualTo(DEFAULT_LOCAL_LANGUAGE_MEDIA_VERIFIED_DATE);
    }

    @Test
    public void createLocalLanguageMediaCheckReportWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = localLanguageMediaCheckReportRepository.findAll().size();

        // Create the LocalLanguageMediaCheckReport with an existing ID
        localLanguageMediaCheckReport.setId("existing_id");

        // An entity with an existing ID cannot be created, so this API call must fail
        restLocalLanguageMediaCheckReportMockMvc.perform(post("/api/local-language-media-check-reports")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(localLanguageMediaCheckReport)))
            .andExpect(status().isBadRequest());

        // Validate the LocalLanguageMediaCheckReport in the database
        List<LocalLanguageMediaCheckReport> localLanguageMediaCheckReportList = localLanguageMediaCheckReportRepository.findAll();
        assertThat(localLanguageMediaCheckReportList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    public void getAllLocalLanguageMediaCheckReports() throws Exception {
        // Initialize the database
        localLanguageMediaCheckReportRepository.save(localLanguageMediaCheckReport);

        // Get all the localLanguageMediaCheckReportList
        restLocalLanguageMediaCheckReportMockMvc.perform(get("/api/local-language-media-check-reports?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(localLanguageMediaCheckReport.getId())))
            .andExpect(jsonPath("$.[*].localLanguageMediaFindings").value(hasItem(DEFAULT_LOCAL_LANGUAGE_MEDIA_FINDINGS.toString())))
            .andExpect(jsonPath("$.[*].localLanguageMediaStatus").value(hasItem(DEFAULT_LOCAL_LANGUAGE_MEDIA_STATUS.toString())))
            .andExpect(jsonPath("$.[*].localLanguageMediaVerifiedDate").value(hasItem(DEFAULT_LOCAL_LANGUAGE_MEDIA_VERIFIED_DATE.toString())));
    }
    

    @Test
    public void getLocalLanguageMediaCheckReport() throws Exception {
        // Initialize the database
        localLanguageMediaCheckReportRepository.save(localLanguageMediaCheckReport);

        // Get the localLanguageMediaCheckReport
        restLocalLanguageMediaCheckReportMockMvc.perform(get("/api/local-language-media-check-reports/{id}", localLanguageMediaCheckReport.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(localLanguageMediaCheckReport.getId()))
            .andExpect(jsonPath("$.localLanguageMediaFindings").value(DEFAULT_LOCAL_LANGUAGE_MEDIA_FINDINGS.toString()))
            .andExpect(jsonPath("$.localLanguageMediaStatus").value(DEFAULT_LOCAL_LANGUAGE_MEDIA_STATUS.toString()))
            .andExpect(jsonPath("$.localLanguageMediaVerifiedDate").value(DEFAULT_LOCAL_LANGUAGE_MEDIA_VERIFIED_DATE.toString()));
    }
    @Test
    public void getNonExistingLocalLanguageMediaCheckReport() throws Exception {
        // Get the localLanguageMediaCheckReport
        restLocalLanguageMediaCheckReportMockMvc.perform(get("/api/local-language-media-check-reports/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateLocalLanguageMediaCheckReport() throws Exception {
        // Initialize the database
        localLanguageMediaCheckReportRepository.save(localLanguageMediaCheckReport);

        int databaseSizeBeforeUpdate = localLanguageMediaCheckReportRepository.findAll().size();

        // Update the localLanguageMediaCheckReport
        LocalLanguageMediaCheckReport updatedLocalLanguageMediaCheckReport = localLanguageMediaCheckReportRepository.findById(localLanguageMediaCheckReport.getId()).get();
        updatedLocalLanguageMediaCheckReport
            .localLanguageMediaFindings(UPDATED_LOCAL_LANGUAGE_MEDIA_FINDINGS)
            .localLanguageMediaStatus(UPDATED_LOCAL_LANGUAGE_MEDIA_STATUS)
            .localLanguageMediaVerifiedDate(UPDATED_LOCAL_LANGUAGE_MEDIA_VERIFIED_DATE);

        restLocalLanguageMediaCheckReportMockMvc.perform(put("/api/local-language-media-check-reports")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedLocalLanguageMediaCheckReport)))
            .andExpect(status().isOk());

        // Validate the LocalLanguageMediaCheckReport in the database
        List<LocalLanguageMediaCheckReport> localLanguageMediaCheckReportList = localLanguageMediaCheckReportRepository.findAll();
        assertThat(localLanguageMediaCheckReportList).hasSize(databaseSizeBeforeUpdate);
        LocalLanguageMediaCheckReport testLocalLanguageMediaCheckReport = localLanguageMediaCheckReportList.get(localLanguageMediaCheckReportList.size() - 1);
        assertThat(testLocalLanguageMediaCheckReport.getLocalLanguageMediaFindings()).isEqualTo(UPDATED_LOCAL_LANGUAGE_MEDIA_FINDINGS);
        assertThat(testLocalLanguageMediaCheckReport.getLocalLanguageMediaStatus()).isEqualTo(UPDATED_LOCAL_LANGUAGE_MEDIA_STATUS);
        assertThat(testLocalLanguageMediaCheckReport.getLocalLanguageMediaVerifiedDate()).isEqualTo(UPDATED_LOCAL_LANGUAGE_MEDIA_VERIFIED_DATE);
    }

    @Test
    public void updateNonExistingLocalLanguageMediaCheckReport() throws Exception {
        int databaseSizeBeforeUpdate = localLanguageMediaCheckReportRepository.findAll().size();

        // Create the LocalLanguageMediaCheckReport

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restLocalLanguageMediaCheckReportMockMvc.perform(put("/api/local-language-media-check-reports")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(localLanguageMediaCheckReport)))
            .andExpect(status().isBadRequest());

        // Validate the LocalLanguageMediaCheckReport in the database
        List<LocalLanguageMediaCheckReport> localLanguageMediaCheckReportList = localLanguageMediaCheckReportRepository.findAll();
        assertThat(localLanguageMediaCheckReportList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    public void deleteLocalLanguageMediaCheckReport() throws Exception {
        // Initialize the database
        localLanguageMediaCheckReportRepository.save(localLanguageMediaCheckReport);

        int databaseSizeBeforeDelete = localLanguageMediaCheckReportRepository.findAll().size();

        // Get the localLanguageMediaCheckReport
        restLocalLanguageMediaCheckReportMockMvc.perform(delete("/api/local-language-media-check-reports/{id}", localLanguageMediaCheckReport.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<LocalLanguageMediaCheckReport> localLanguageMediaCheckReportList = localLanguageMediaCheckReportRepository.findAll();
        assertThat(localLanguageMediaCheckReportList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(LocalLanguageMediaCheckReport.class);
        LocalLanguageMediaCheckReport localLanguageMediaCheckReport1 = new LocalLanguageMediaCheckReport();
        localLanguageMediaCheckReport1.setId("id1");
        LocalLanguageMediaCheckReport localLanguageMediaCheckReport2 = new LocalLanguageMediaCheckReport();
        localLanguageMediaCheckReport2.setId(localLanguageMediaCheckReport1.getId());
        assertThat(localLanguageMediaCheckReport1).isEqualTo(localLanguageMediaCheckReport2);
        localLanguageMediaCheckReport2.setId("id2");
        assertThat(localLanguageMediaCheckReport1).isNotEqualTo(localLanguageMediaCheckReport2);
        localLanguageMediaCheckReport1.setId(null);
        assertThat(localLanguageMediaCheckReport1).isNotEqualTo(localLanguageMediaCheckReport2);
    }
}
