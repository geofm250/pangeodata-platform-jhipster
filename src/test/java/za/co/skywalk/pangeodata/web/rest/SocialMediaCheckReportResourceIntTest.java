package za.co.skywalk.pangeodata.web.rest;

import za.co.skywalk.pangeodata.PangeodataJHipsterApp;

import za.co.skywalk.pangeodata.domain.SocialMediaCheckReport;
import za.co.skywalk.pangeodata.repository.SocialMediaCheckReportRepository;
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
 * Test class for the SocialMediaCheckReportResource REST controller.
 *
 * @see SocialMediaCheckReportResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = PangeodataJHipsterApp.class)
public class SocialMediaCheckReportResourceIntTest {

    private static final String DEFAULT_SOCIAL_MEDIA_SOURCES_CHECKED = "AAAAAAAAAA";
    private static final String UPDATED_SOCIAL_MEDIA_SOURCES_CHECKED = "BBBBBBBBBB";

    private static final String DEFAULT_SOCIAL_MEDIA_FINDINGS = "AAAAAAAAAA";
    private static final String UPDATED_SOCIAL_MEDIA_FINDINGS = "BBBBBBBBBB";

    private static final String DEFAULT_SOCIAL_MEDIA_VERIFIED_DATE = "AAAAAAAAAA";
    private static final String UPDATED_SOCIAL_MEDIA_VERIFIED_DATE = "BBBBBBBBBB";

    @Autowired
    private SocialMediaCheckReportRepository socialMediaCheckReportRepository;


    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    private MockMvc restSocialMediaCheckReportMockMvc;

    private SocialMediaCheckReport socialMediaCheckReport;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final SocialMediaCheckReportResource socialMediaCheckReportResource = new SocialMediaCheckReportResource(socialMediaCheckReportRepository);
        this.restSocialMediaCheckReportMockMvc = MockMvcBuilders.standaloneSetup(socialMediaCheckReportResource)
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
    public static SocialMediaCheckReport createEntity() {
        SocialMediaCheckReport socialMediaCheckReport = new SocialMediaCheckReport()
            .socialMediaSourcesChecked(DEFAULT_SOCIAL_MEDIA_SOURCES_CHECKED)
            .socialMediaFindings(DEFAULT_SOCIAL_MEDIA_FINDINGS)
            .socialMediaVerifiedDate(DEFAULT_SOCIAL_MEDIA_VERIFIED_DATE);
        return socialMediaCheckReport;
    }

    @Before
    public void initTest() {
        socialMediaCheckReportRepository.deleteAll();
        socialMediaCheckReport = createEntity();
    }

    @Test
    public void createSocialMediaCheckReport() throws Exception {
        int databaseSizeBeforeCreate = socialMediaCheckReportRepository.findAll().size();

        // Create the SocialMediaCheckReport
        restSocialMediaCheckReportMockMvc.perform(post("/api/social-media-check-reports")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(socialMediaCheckReport)))
            .andExpect(status().isCreated());

        // Validate the SocialMediaCheckReport in the database
        List<SocialMediaCheckReport> socialMediaCheckReportList = socialMediaCheckReportRepository.findAll();
        assertThat(socialMediaCheckReportList).hasSize(databaseSizeBeforeCreate + 1);
        SocialMediaCheckReport testSocialMediaCheckReport = socialMediaCheckReportList.get(socialMediaCheckReportList.size() - 1);
        assertThat(testSocialMediaCheckReport.getSocialMediaSourcesChecked()).isEqualTo(DEFAULT_SOCIAL_MEDIA_SOURCES_CHECKED);
        assertThat(testSocialMediaCheckReport.getSocialMediaFindings()).isEqualTo(DEFAULT_SOCIAL_MEDIA_FINDINGS);
        assertThat(testSocialMediaCheckReport.getSocialMediaVerifiedDate()).isEqualTo(DEFAULT_SOCIAL_MEDIA_VERIFIED_DATE);
    }

    @Test
    public void createSocialMediaCheckReportWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = socialMediaCheckReportRepository.findAll().size();

        // Create the SocialMediaCheckReport with an existing ID
        socialMediaCheckReport.setId("existing_id");

        // An entity with an existing ID cannot be created, so this API call must fail
        restSocialMediaCheckReportMockMvc.perform(post("/api/social-media-check-reports")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(socialMediaCheckReport)))
            .andExpect(status().isBadRequest());

        // Validate the SocialMediaCheckReport in the database
        List<SocialMediaCheckReport> socialMediaCheckReportList = socialMediaCheckReportRepository.findAll();
        assertThat(socialMediaCheckReportList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    public void getAllSocialMediaCheckReports() throws Exception {
        // Initialize the database
        socialMediaCheckReportRepository.save(socialMediaCheckReport);

        // Get all the socialMediaCheckReportList
        restSocialMediaCheckReportMockMvc.perform(get("/api/social-media-check-reports?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(socialMediaCheckReport.getId())))
            .andExpect(jsonPath("$.[*].socialMediaSourcesChecked").value(hasItem(DEFAULT_SOCIAL_MEDIA_SOURCES_CHECKED.toString())))
            .andExpect(jsonPath("$.[*].socialMediaFindings").value(hasItem(DEFAULT_SOCIAL_MEDIA_FINDINGS.toString())))
            .andExpect(jsonPath("$.[*].socialMediaVerifiedDate").value(hasItem(DEFAULT_SOCIAL_MEDIA_VERIFIED_DATE.toString())));
    }
    

    @Test
    public void getSocialMediaCheckReport() throws Exception {
        // Initialize the database
        socialMediaCheckReportRepository.save(socialMediaCheckReport);

        // Get the socialMediaCheckReport
        restSocialMediaCheckReportMockMvc.perform(get("/api/social-media-check-reports/{id}", socialMediaCheckReport.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(socialMediaCheckReport.getId()))
            .andExpect(jsonPath("$.socialMediaSourcesChecked").value(DEFAULT_SOCIAL_MEDIA_SOURCES_CHECKED.toString()))
            .andExpect(jsonPath("$.socialMediaFindings").value(DEFAULT_SOCIAL_MEDIA_FINDINGS.toString()))
            .andExpect(jsonPath("$.socialMediaVerifiedDate").value(DEFAULT_SOCIAL_MEDIA_VERIFIED_DATE.toString()));
    }
    @Test
    public void getNonExistingSocialMediaCheckReport() throws Exception {
        // Get the socialMediaCheckReport
        restSocialMediaCheckReportMockMvc.perform(get("/api/social-media-check-reports/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateSocialMediaCheckReport() throws Exception {
        // Initialize the database
        socialMediaCheckReportRepository.save(socialMediaCheckReport);

        int databaseSizeBeforeUpdate = socialMediaCheckReportRepository.findAll().size();

        // Update the socialMediaCheckReport
        SocialMediaCheckReport updatedSocialMediaCheckReport = socialMediaCheckReportRepository.findById(socialMediaCheckReport.getId()).get();
        updatedSocialMediaCheckReport
            .socialMediaSourcesChecked(UPDATED_SOCIAL_MEDIA_SOURCES_CHECKED)
            .socialMediaFindings(UPDATED_SOCIAL_MEDIA_FINDINGS)
            .socialMediaVerifiedDate(UPDATED_SOCIAL_MEDIA_VERIFIED_DATE);

        restSocialMediaCheckReportMockMvc.perform(put("/api/social-media-check-reports")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedSocialMediaCheckReport)))
            .andExpect(status().isOk());

        // Validate the SocialMediaCheckReport in the database
        List<SocialMediaCheckReport> socialMediaCheckReportList = socialMediaCheckReportRepository.findAll();
        assertThat(socialMediaCheckReportList).hasSize(databaseSizeBeforeUpdate);
        SocialMediaCheckReport testSocialMediaCheckReport = socialMediaCheckReportList.get(socialMediaCheckReportList.size() - 1);
        assertThat(testSocialMediaCheckReport.getSocialMediaSourcesChecked()).isEqualTo(UPDATED_SOCIAL_MEDIA_SOURCES_CHECKED);
        assertThat(testSocialMediaCheckReport.getSocialMediaFindings()).isEqualTo(UPDATED_SOCIAL_MEDIA_FINDINGS);
        assertThat(testSocialMediaCheckReport.getSocialMediaVerifiedDate()).isEqualTo(UPDATED_SOCIAL_MEDIA_VERIFIED_DATE);
    }

    @Test
    public void updateNonExistingSocialMediaCheckReport() throws Exception {
        int databaseSizeBeforeUpdate = socialMediaCheckReportRepository.findAll().size();

        // Create the SocialMediaCheckReport

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restSocialMediaCheckReportMockMvc.perform(put("/api/social-media-check-reports")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(socialMediaCheckReport)))
            .andExpect(status().isBadRequest());

        // Validate the SocialMediaCheckReport in the database
        List<SocialMediaCheckReport> socialMediaCheckReportList = socialMediaCheckReportRepository.findAll();
        assertThat(socialMediaCheckReportList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    public void deleteSocialMediaCheckReport() throws Exception {
        // Initialize the database
        socialMediaCheckReportRepository.save(socialMediaCheckReport);

        int databaseSizeBeforeDelete = socialMediaCheckReportRepository.findAll().size();

        // Get the socialMediaCheckReport
        restSocialMediaCheckReportMockMvc.perform(delete("/api/social-media-check-reports/{id}", socialMediaCheckReport.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<SocialMediaCheckReport> socialMediaCheckReportList = socialMediaCheckReportRepository.findAll();
        assertThat(socialMediaCheckReportList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(SocialMediaCheckReport.class);
        SocialMediaCheckReport socialMediaCheckReport1 = new SocialMediaCheckReport();
        socialMediaCheckReport1.setId("id1");
        SocialMediaCheckReport socialMediaCheckReport2 = new SocialMediaCheckReport();
        socialMediaCheckReport2.setId(socialMediaCheckReport1.getId());
        assertThat(socialMediaCheckReport1).isEqualTo(socialMediaCheckReport2);
        socialMediaCheckReport2.setId("id2");
        assertThat(socialMediaCheckReport1).isNotEqualTo(socialMediaCheckReport2);
        socialMediaCheckReport1.setId(null);
        assertThat(socialMediaCheckReport1).isNotEqualTo(socialMediaCheckReport2);
    }
}
