package za.co.skywalk.pangeodata.web.rest;

import za.co.skywalk.pangeodata.PangeodataJHipsterApp;

import za.co.skywalk.pangeodata.domain.GeneralInformation;
import za.co.skywalk.pangeodata.repository.GeneralInformationRepository;
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
 * Test class for the GeneralInformationResource REST controller.
 *
 * @see GeneralInformationResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = PangeodataJHipsterApp.class)
public class GeneralInformationResourceIntTest {

    private static final String DEFAULT_FIRST_NAME = "AAAAAAAAAA";
    private static final String UPDATED_FIRST_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_MIDDLE_NAME = "AAAAAAAAAA";
    private static final String UPDATED_MIDDLE_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_LAST_NAME = "AAAAAAAAAA";
    private static final String UPDATED_LAST_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_MAIDEN_NAME = "AAAAAAAAAA";
    private static final String UPDATED_MAIDEN_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_TITLE = "AAAAAAAAAA";
    private static final String UPDATED_TITLE = "BBBBBBBBBB";

    private static final String DEFAULT_BIRTH_DATE = "AAAAAAAAAA";
    private static final String UPDATED_BIRTH_DATE = "BBBBBBBBBB";

    private static final String DEFAULT_REFERENCE_ID = "AAAAAAAAAA";
    private static final String UPDATED_REFERENCE_ID = "BBBBBBBBBB";

    @Autowired
    private GeneralInformationRepository generalInformationRepository;


    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    private MockMvc restGeneralInformationMockMvc;

    private GeneralInformation generalInformation;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final GeneralInformationResource generalInformationResource = new GeneralInformationResource(generalInformationRepository);
        this.restGeneralInformationMockMvc = MockMvcBuilders.standaloneSetup(generalInformationResource)
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
    public static GeneralInformation createEntity() {
        GeneralInformation generalInformation = new GeneralInformation()
            .firstName(DEFAULT_FIRST_NAME)
            .middleName(DEFAULT_MIDDLE_NAME)
            .lastName(DEFAULT_LAST_NAME)
            .maidenName(DEFAULT_MAIDEN_NAME)
            .title(DEFAULT_TITLE)
            .birthDate(DEFAULT_BIRTH_DATE)
            .referenceId(DEFAULT_REFERENCE_ID);
        return generalInformation;
    }

    @Before
    public void initTest() {
        generalInformationRepository.deleteAll();
        generalInformation = createEntity();
    }

    @Test
    public void createGeneralInformation() throws Exception {
        int databaseSizeBeforeCreate = generalInformationRepository.findAll().size();

        // Create the GeneralInformation
        restGeneralInformationMockMvc.perform(post("/api/general-informations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(generalInformation)))
            .andExpect(status().isCreated());

        // Validate the GeneralInformation in the database
        List<GeneralInformation> generalInformationList = generalInformationRepository.findAll();
        assertThat(generalInformationList).hasSize(databaseSizeBeforeCreate + 1);
        GeneralInformation testGeneralInformation = generalInformationList.get(generalInformationList.size() - 1);
        assertThat(testGeneralInformation.getFirstName()).isEqualTo(DEFAULT_FIRST_NAME);
        assertThat(testGeneralInformation.getMiddleName()).isEqualTo(DEFAULT_MIDDLE_NAME);
        assertThat(testGeneralInformation.getLastName()).isEqualTo(DEFAULT_LAST_NAME);
        assertThat(testGeneralInformation.getMaidenName()).isEqualTo(DEFAULT_MAIDEN_NAME);
        assertThat(testGeneralInformation.getTitle()).isEqualTo(DEFAULT_TITLE);
        assertThat(testGeneralInformation.getBirthDate()).isEqualTo(DEFAULT_BIRTH_DATE);
        assertThat(testGeneralInformation.getReferenceId()).isEqualTo(DEFAULT_REFERENCE_ID);
    }

    @Test
    public void createGeneralInformationWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = generalInformationRepository.findAll().size();

        // Create the GeneralInformation with an existing ID
        generalInformation.setId("existing_id");

        // An entity with an existing ID cannot be created, so this API call must fail
        restGeneralInformationMockMvc.perform(post("/api/general-informations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(generalInformation)))
            .andExpect(status().isBadRequest());

        // Validate the GeneralInformation in the database
        List<GeneralInformation> generalInformationList = generalInformationRepository.findAll();
        assertThat(generalInformationList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    public void getAllGeneralInformations() throws Exception {
        // Initialize the database
        generalInformationRepository.save(generalInformation);

        // Get all the generalInformationList
        restGeneralInformationMockMvc.perform(get("/api/general-informations?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(generalInformation.getId())))
            .andExpect(jsonPath("$.[*].firstName").value(hasItem(DEFAULT_FIRST_NAME.toString())))
            .andExpect(jsonPath("$.[*].middleName").value(hasItem(DEFAULT_MIDDLE_NAME.toString())))
            .andExpect(jsonPath("$.[*].lastName").value(hasItem(DEFAULT_LAST_NAME.toString())))
            .andExpect(jsonPath("$.[*].maidenName").value(hasItem(DEFAULT_MAIDEN_NAME.toString())))
            .andExpect(jsonPath("$.[*].title").value(hasItem(DEFAULT_TITLE.toString())))
            .andExpect(jsonPath("$.[*].birthDate").value(hasItem(DEFAULT_BIRTH_DATE.toString())))
            .andExpect(jsonPath("$.[*].referenceId").value(hasItem(DEFAULT_REFERENCE_ID.toString())));
    }
    

    @Test
    public void getGeneralInformation() throws Exception {
        // Initialize the database
        generalInformationRepository.save(generalInformation);

        // Get the generalInformation
        restGeneralInformationMockMvc.perform(get("/api/general-informations/{id}", generalInformation.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(generalInformation.getId()))
            .andExpect(jsonPath("$.firstName").value(DEFAULT_FIRST_NAME.toString()))
            .andExpect(jsonPath("$.middleName").value(DEFAULT_MIDDLE_NAME.toString()))
            .andExpect(jsonPath("$.lastName").value(DEFAULT_LAST_NAME.toString()))
            .andExpect(jsonPath("$.maidenName").value(DEFAULT_MAIDEN_NAME.toString()))
            .andExpect(jsonPath("$.title").value(DEFAULT_TITLE.toString()))
            .andExpect(jsonPath("$.birthDate").value(DEFAULT_BIRTH_DATE.toString()))
            .andExpect(jsonPath("$.referenceId").value(DEFAULT_REFERENCE_ID.toString()));
    }
    @Test
    public void getNonExistingGeneralInformation() throws Exception {
        // Get the generalInformation
        restGeneralInformationMockMvc.perform(get("/api/general-informations/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateGeneralInformation() throws Exception {
        // Initialize the database
        generalInformationRepository.save(generalInformation);

        int databaseSizeBeforeUpdate = generalInformationRepository.findAll().size();

        // Update the generalInformation
        GeneralInformation updatedGeneralInformation = generalInformationRepository.findById(generalInformation.getId()).get();
        updatedGeneralInformation
            .firstName(UPDATED_FIRST_NAME)
            .middleName(UPDATED_MIDDLE_NAME)
            .lastName(UPDATED_LAST_NAME)
            .maidenName(UPDATED_MAIDEN_NAME)
            .title(UPDATED_TITLE)
            .birthDate(UPDATED_BIRTH_DATE)
            .referenceId(UPDATED_REFERENCE_ID);

        restGeneralInformationMockMvc.perform(put("/api/general-informations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedGeneralInformation)))
            .andExpect(status().isOk());

        // Validate the GeneralInformation in the database
        List<GeneralInformation> generalInformationList = generalInformationRepository.findAll();
        assertThat(generalInformationList).hasSize(databaseSizeBeforeUpdate);
        GeneralInformation testGeneralInformation = generalInformationList.get(generalInformationList.size() - 1);
        assertThat(testGeneralInformation.getFirstName()).isEqualTo(UPDATED_FIRST_NAME);
        assertThat(testGeneralInformation.getMiddleName()).isEqualTo(UPDATED_MIDDLE_NAME);
        assertThat(testGeneralInformation.getLastName()).isEqualTo(UPDATED_LAST_NAME);
        assertThat(testGeneralInformation.getMaidenName()).isEqualTo(UPDATED_MAIDEN_NAME);
        assertThat(testGeneralInformation.getTitle()).isEqualTo(UPDATED_TITLE);
        assertThat(testGeneralInformation.getBirthDate()).isEqualTo(UPDATED_BIRTH_DATE);
        assertThat(testGeneralInformation.getReferenceId()).isEqualTo(UPDATED_REFERENCE_ID);
    }

    @Test
    public void updateNonExistingGeneralInformation() throws Exception {
        int databaseSizeBeforeUpdate = generalInformationRepository.findAll().size();

        // Create the GeneralInformation

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restGeneralInformationMockMvc.perform(put("/api/general-informations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(generalInformation)))
            .andExpect(status().isBadRequest());

        // Validate the GeneralInformation in the database
        List<GeneralInformation> generalInformationList = generalInformationRepository.findAll();
        assertThat(generalInformationList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    public void deleteGeneralInformation() throws Exception {
        // Initialize the database
        generalInformationRepository.save(generalInformation);

        int databaseSizeBeforeDelete = generalInformationRepository.findAll().size();

        // Get the generalInformation
        restGeneralInformationMockMvc.perform(delete("/api/general-informations/{id}", generalInformation.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<GeneralInformation> generalInformationList = generalInformationRepository.findAll();
        assertThat(generalInformationList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(GeneralInformation.class);
        GeneralInformation generalInformation1 = new GeneralInformation();
        generalInformation1.setId("id1");
        GeneralInformation generalInformation2 = new GeneralInformation();
        generalInformation2.setId(generalInformation1.getId());
        assertThat(generalInformation1).isEqualTo(generalInformation2);
        generalInformation2.setId("id2");
        assertThat(generalInformation1).isNotEqualTo(generalInformation2);
        generalInformation1.setId(null);
        assertThat(generalInformation1).isNotEqualTo(generalInformation2);
    }
}
