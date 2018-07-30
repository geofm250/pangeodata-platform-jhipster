package za.co.skywalk.pangeodata.web.rest;

import za.co.skywalk.pangeodata.PangeodataJHipsterApp;

import za.co.skywalk.pangeodata.domain.Offence;
import za.co.skywalk.pangeodata.repository.OffenceRepository;
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
 * Test class for the OffenceResource REST controller.
 *
 * @see OffenceResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = PangeodataJHipsterApp.class)
public class OffenceResourceIntTest {

    private static final String DEFAULT_OFFENCE = "AAAAAAAAAA";
    private static final String UPDATED_OFFENCE = "BBBBBBBBBB";

    private static final String DEFAULT_OFFENCE_DATE = "AAAAAAAAAA";
    private static final String UPDATED_OFFENCE_DATE = "BBBBBBBBBB";

    private static final String DEFAULT_SENTENCE = "AAAAAAAAAA";
    private static final String UPDATED_SENTENCE = "BBBBBBBBBB";

    private static final String DEFAULT_VERIFIED_BY = "AAAAAAAAAA";
    private static final String UPDATED_VERIFIED_BY = "BBBBBBBBBB";

    private static final String DEFAULT_VERIFIED_DATE = "AAAAAAAAAA";
    private static final String UPDATED_VERIFIED_DATE = "BBBBBBBBBB";

    private static final String DEFAULT_REMARKS = "AAAAAAAAAA";
    private static final String UPDATED_REMARKS = "BBBBBBBBBB";

    @Autowired
    private OffenceRepository offenceRepository;


    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    private MockMvc restOffenceMockMvc;

    private Offence offence;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final OffenceResource offenceResource = new OffenceResource(offenceRepository);
        this.restOffenceMockMvc = MockMvcBuilders.standaloneSetup(offenceResource)
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
    public static Offence createEntity() {
        Offence offence = new Offence()
            .offence(DEFAULT_OFFENCE)
            .offenceDate(DEFAULT_OFFENCE_DATE)
            .sentence(DEFAULT_SENTENCE)
            .verifiedBy(DEFAULT_VERIFIED_BY)
            .verifiedDate(DEFAULT_VERIFIED_DATE)
            .remarks(DEFAULT_REMARKS);
        return offence;
    }

    @Before
    public void initTest() {
        offenceRepository.deleteAll();
        offence = createEntity();
    }

    @Test
    public void createOffence() throws Exception {
        int databaseSizeBeforeCreate = offenceRepository.findAll().size();

        // Create the Offence
        restOffenceMockMvc.perform(post("/api/offences")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(offence)))
            .andExpect(status().isCreated());

        // Validate the Offence in the database
        List<Offence> offenceList = offenceRepository.findAll();
        assertThat(offenceList).hasSize(databaseSizeBeforeCreate + 1);
        Offence testOffence = offenceList.get(offenceList.size() - 1);
        assertThat(testOffence.getOffence()).isEqualTo(DEFAULT_OFFENCE);
        assertThat(testOffence.getOffenceDate()).isEqualTo(DEFAULT_OFFENCE_DATE);
        assertThat(testOffence.getSentence()).isEqualTo(DEFAULT_SENTENCE);
        assertThat(testOffence.getVerifiedBy()).isEqualTo(DEFAULT_VERIFIED_BY);
        assertThat(testOffence.getVerifiedDate()).isEqualTo(DEFAULT_VERIFIED_DATE);
        assertThat(testOffence.getRemarks()).isEqualTo(DEFAULT_REMARKS);
    }

    @Test
    public void createOffenceWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = offenceRepository.findAll().size();

        // Create the Offence with an existing ID
        offence.setId("existing_id");

        // An entity with an existing ID cannot be created, so this API call must fail
        restOffenceMockMvc.perform(post("/api/offences")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(offence)))
            .andExpect(status().isBadRequest());

        // Validate the Offence in the database
        List<Offence> offenceList = offenceRepository.findAll();
        assertThat(offenceList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    public void getAllOffences() throws Exception {
        // Initialize the database
        offenceRepository.save(offence);

        // Get all the offenceList
        restOffenceMockMvc.perform(get("/api/offences?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(offence.getId())))
            .andExpect(jsonPath("$.[*].offence").value(hasItem(DEFAULT_OFFENCE.toString())))
            .andExpect(jsonPath("$.[*].offenceDate").value(hasItem(DEFAULT_OFFENCE_DATE.toString())))
            .andExpect(jsonPath("$.[*].sentence").value(hasItem(DEFAULT_SENTENCE.toString())))
            .andExpect(jsonPath("$.[*].verifiedBy").value(hasItem(DEFAULT_VERIFIED_BY.toString())))
            .andExpect(jsonPath("$.[*].verifiedDate").value(hasItem(DEFAULT_VERIFIED_DATE.toString())))
            .andExpect(jsonPath("$.[*].remarks").value(hasItem(DEFAULT_REMARKS.toString())));
    }
    

    @Test
    public void getOffence() throws Exception {
        // Initialize the database
        offenceRepository.save(offence);

        // Get the offence
        restOffenceMockMvc.perform(get("/api/offences/{id}", offence.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(offence.getId()))
            .andExpect(jsonPath("$.offence").value(DEFAULT_OFFENCE.toString()))
            .andExpect(jsonPath("$.offenceDate").value(DEFAULT_OFFENCE_DATE.toString()))
            .andExpect(jsonPath("$.sentence").value(DEFAULT_SENTENCE.toString()))
            .andExpect(jsonPath("$.verifiedBy").value(DEFAULT_VERIFIED_BY.toString()))
            .andExpect(jsonPath("$.verifiedDate").value(DEFAULT_VERIFIED_DATE.toString()))
            .andExpect(jsonPath("$.remarks").value(DEFAULT_REMARKS.toString()));
    }
    @Test
    public void getNonExistingOffence() throws Exception {
        // Get the offence
        restOffenceMockMvc.perform(get("/api/offences/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateOffence() throws Exception {
        // Initialize the database
        offenceRepository.save(offence);

        int databaseSizeBeforeUpdate = offenceRepository.findAll().size();

        // Update the offence
        Offence updatedOffence = offenceRepository.findById(offence.getId()).get();
        updatedOffence
            .offence(UPDATED_OFFENCE)
            .offenceDate(UPDATED_OFFENCE_DATE)
            .sentence(UPDATED_SENTENCE)
            .verifiedBy(UPDATED_VERIFIED_BY)
            .verifiedDate(UPDATED_VERIFIED_DATE)
            .remarks(UPDATED_REMARKS);

        restOffenceMockMvc.perform(put("/api/offences")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedOffence)))
            .andExpect(status().isOk());

        // Validate the Offence in the database
        List<Offence> offenceList = offenceRepository.findAll();
        assertThat(offenceList).hasSize(databaseSizeBeforeUpdate);
        Offence testOffence = offenceList.get(offenceList.size() - 1);
        assertThat(testOffence.getOffence()).isEqualTo(UPDATED_OFFENCE);
        assertThat(testOffence.getOffenceDate()).isEqualTo(UPDATED_OFFENCE_DATE);
        assertThat(testOffence.getSentence()).isEqualTo(UPDATED_SENTENCE);
        assertThat(testOffence.getVerifiedBy()).isEqualTo(UPDATED_VERIFIED_BY);
        assertThat(testOffence.getVerifiedDate()).isEqualTo(UPDATED_VERIFIED_DATE);
        assertThat(testOffence.getRemarks()).isEqualTo(UPDATED_REMARKS);
    }

    @Test
    public void updateNonExistingOffence() throws Exception {
        int databaseSizeBeforeUpdate = offenceRepository.findAll().size();

        // Create the Offence

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restOffenceMockMvc.perform(put("/api/offences")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(offence)))
            .andExpect(status().isBadRequest());

        // Validate the Offence in the database
        List<Offence> offenceList = offenceRepository.findAll();
        assertThat(offenceList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    public void deleteOffence() throws Exception {
        // Initialize the database
        offenceRepository.save(offence);

        int databaseSizeBeforeDelete = offenceRepository.findAll().size();

        // Get the offence
        restOffenceMockMvc.perform(delete("/api/offences/{id}", offence.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Offence> offenceList = offenceRepository.findAll();
        assertThat(offenceList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Offence.class);
        Offence offence1 = new Offence();
        offence1.setId("id1");
        Offence offence2 = new Offence();
        offence2.setId(offence1.getId());
        assertThat(offence1).isEqualTo(offence2);
        offence2.setId("id2");
        assertThat(offence1).isNotEqualTo(offence2);
        offence1.setId(null);
        assertThat(offence1).isNotEqualTo(offence2);
    }
}
