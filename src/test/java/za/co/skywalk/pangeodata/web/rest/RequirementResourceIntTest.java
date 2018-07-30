package za.co.skywalk.pangeodata.web.rest;

import za.co.skywalk.pangeodata.PangeodataJHipsterApp;

import za.co.skywalk.pangeodata.domain.Requirement;
import za.co.skywalk.pangeodata.repository.RequirementRepository;
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
 * Test class for the RequirementResource REST controller.
 *
 * @see RequirementResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = PangeodataJHipsterApp.class)
public class RequirementResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_LINKS = "AAAAAAAAAA";
    private static final String UPDATED_LINKS = "BBBBBBBBBB";

    private static final String DEFAULT_COUNTRY = "AAAAAAAAAA";
    private static final String UPDATED_COUNTRY = "BBBBBBBBBB";

    private static final String DEFAULT_PRODUCT = "AAAAAAAAAA";
    private static final String UPDATED_PRODUCT = "BBBBBBBBBB";

    private static final String DEFAULT_TYPE = "AAAAAAAAAA";
    private static final String UPDATED_TYPE = "BBBBBBBBBB";

    private static final String DEFAULT_INPUT = "AAAAAAAAAA";
    private static final String UPDATED_INPUT = "BBBBBBBBBB";

    private static final String DEFAULT_FORM = "AAAAAAAAAA";
    private static final String UPDATED_FORM = "BBBBBBBBBB";

    private static final String DEFAULT_ACTIVE = "AAAAAAAAAA";
    private static final String UPDATED_ACTIVE = "BBBBBBBBBB";

    private static final String DEFAULT_CREATED_AT = "AAAAAAAAAA";
    private static final String UPDATED_CREATED_AT = "BBBBBBBBBB";

    private static final String DEFAULT_UPDATED_AT = "AAAAAAAAAA";
    private static final String UPDATED_UPDATED_AT = "BBBBBBBBBB";

    private static final String DEFAULT_DISPLAY_ORDER = "AAAAAAAAAA";
    private static final String UPDATED_DISPLAY_ORDER = "BBBBBBBBBB";

    private static final String DEFAULT_DISPLAY_DOWNLOAD_LINK = "AAAAAAAAAA";
    private static final String UPDATED_DISPLAY_DOWNLOAD_LINK = "BBBBBBBBBB";

    private static final String DEFAULT_I_COVER_NAME = "AAAAAAAAAA";
    private static final String UPDATED_I_COVER_NAME = "BBBBBBBBBB";

    @Autowired
    private RequirementRepository requirementRepository;


    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    private MockMvc restRequirementMockMvc;

    private Requirement requirement;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final RequirementResource requirementResource = new RequirementResource(requirementRepository);
        this.restRequirementMockMvc = MockMvcBuilders.standaloneSetup(requirementResource)
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
    public static Requirement createEntity() {
        Requirement requirement = new Requirement()
            .name(DEFAULT_NAME)
            .links(DEFAULT_LINKS)
            .country(DEFAULT_COUNTRY)
            .product(DEFAULT_PRODUCT)
            .type(DEFAULT_TYPE)
            .input(DEFAULT_INPUT)
            .form(DEFAULT_FORM)
            .active(DEFAULT_ACTIVE)
            .createdAt(DEFAULT_CREATED_AT)
            .updatedAt(DEFAULT_UPDATED_AT)
            .displayOrder(DEFAULT_DISPLAY_ORDER)
            .displayDownloadLink(DEFAULT_DISPLAY_DOWNLOAD_LINK)
            .iCoverName(DEFAULT_I_COVER_NAME);
        return requirement;
    }

    @Before
    public void initTest() {
        requirementRepository.deleteAll();
        requirement = createEntity();
    }

    @Test
    public void createRequirement() throws Exception {
        int databaseSizeBeforeCreate = requirementRepository.findAll().size();

        // Create the Requirement
        restRequirementMockMvc.perform(post("/api/requirements")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(requirement)))
            .andExpect(status().isCreated());

        // Validate the Requirement in the database
        List<Requirement> requirementList = requirementRepository.findAll();
        assertThat(requirementList).hasSize(databaseSizeBeforeCreate + 1);
        Requirement testRequirement = requirementList.get(requirementList.size() - 1);
        assertThat(testRequirement.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testRequirement.getLinks()).isEqualTo(DEFAULT_LINKS);
        assertThat(testRequirement.getCountry()).isEqualTo(DEFAULT_COUNTRY);
        assertThat(testRequirement.getProduct()).isEqualTo(DEFAULT_PRODUCT);
        assertThat(testRequirement.getType()).isEqualTo(DEFAULT_TYPE);
        assertThat(testRequirement.getInput()).isEqualTo(DEFAULT_INPUT);
        assertThat(testRequirement.getForm()).isEqualTo(DEFAULT_FORM);
        assertThat(testRequirement.getActive()).isEqualTo(DEFAULT_ACTIVE);
        assertThat(testRequirement.getCreatedAt()).isEqualTo(DEFAULT_CREATED_AT);
        assertThat(testRequirement.getUpdatedAt()).isEqualTo(DEFAULT_UPDATED_AT);
        assertThat(testRequirement.getDisplayOrder()).isEqualTo(DEFAULT_DISPLAY_ORDER);
        assertThat(testRequirement.getDisplayDownloadLink()).isEqualTo(DEFAULT_DISPLAY_DOWNLOAD_LINK);
        assertThat(testRequirement.getiCoverName()).isEqualTo(DEFAULT_I_COVER_NAME);
    }

    @Test
    public void createRequirementWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = requirementRepository.findAll().size();

        // Create the Requirement with an existing ID
        requirement.setId("existing_id");

        // An entity with an existing ID cannot be created, so this API call must fail
        restRequirementMockMvc.perform(post("/api/requirements")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(requirement)))
            .andExpect(status().isBadRequest());

        // Validate the Requirement in the database
        List<Requirement> requirementList = requirementRepository.findAll();
        assertThat(requirementList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    public void getAllRequirements() throws Exception {
        // Initialize the database
        requirementRepository.save(requirement);

        // Get all the requirementList
        restRequirementMockMvc.perform(get("/api/requirements?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(requirement.getId())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].links").value(hasItem(DEFAULT_LINKS.toString())))
            .andExpect(jsonPath("$.[*].country").value(hasItem(DEFAULT_COUNTRY.toString())))
            .andExpect(jsonPath("$.[*].product").value(hasItem(DEFAULT_PRODUCT.toString())))
            .andExpect(jsonPath("$.[*].type").value(hasItem(DEFAULT_TYPE.toString())))
            .andExpect(jsonPath("$.[*].input").value(hasItem(DEFAULT_INPUT.toString())))
            .andExpect(jsonPath("$.[*].form").value(hasItem(DEFAULT_FORM.toString())))
            .andExpect(jsonPath("$.[*].active").value(hasItem(DEFAULT_ACTIVE.toString())))
            .andExpect(jsonPath("$.[*].createdAt").value(hasItem(DEFAULT_CREATED_AT.toString())))
            .andExpect(jsonPath("$.[*].updatedAt").value(hasItem(DEFAULT_UPDATED_AT.toString())))
            .andExpect(jsonPath("$.[*].displayOrder").value(hasItem(DEFAULT_DISPLAY_ORDER.toString())))
            .andExpect(jsonPath("$.[*].displayDownloadLink").value(hasItem(DEFAULT_DISPLAY_DOWNLOAD_LINK.toString())))
            .andExpect(jsonPath("$.[*].iCoverName").value(hasItem(DEFAULT_I_COVER_NAME.toString())));
    }
    

    @Test
    public void getRequirement() throws Exception {
        // Initialize the database
        requirementRepository.save(requirement);

        // Get the requirement
        restRequirementMockMvc.perform(get("/api/requirements/{id}", requirement.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(requirement.getId()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.links").value(DEFAULT_LINKS.toString()))
            .andExpect(jsonPath("$.country").value(DEFAULT_COUNTRY.toString()))
            .andExpect(jsonPath("$.product").value(DEFAULT_PRODUCT.toString()))
            .andExpect(jsonPath("$.type").value(DEFAULT_TYPE.toString()))
            .andExpect(jsonPath("$.input").value(DEFAULT_INPUT.toString()))
            .andExpect(jsonPath("$.form").value(DEFAULT_FORM.toString()))
            .andExpect(jsonPath("$.active").value(DEFAULT_ACTIVE.toString()))
            .andExpect(jsonPath("$.createdAt").value(DEFAULT_CREATED_AT.toString()))
            .andExpect(jsonPath("$.updatedAt").value(DEFAULT_UPDATED_AT.toString()))
            .andExpect(jsonPath("$.displayOrder").value(DEFAULT_DISPLAY_ORDER.toString()))
            .andExpect(jsonPath("$.displayDownloadLink").value(DEFAULT_DISPLAY_DOWNLOAD_LINK.toString()))
            .andExpect(jsonPath("$.iCoverName").value(DEFAULT_I_COVER_NAME.toString()));
    }
    @Test
    public void getNonExistingRequirement() throws Exception {
        // Get the requirement
        restRequirementMockMvc.perform(get("/api/requirements/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateRequirement() throws Exception {
        // Initialize the database
        requirementRepository.save(requirement);

        int databaseSizeBeforeUpdate = requirementRepository.findAll().size();

        // Update the requirement
        Requirement updatedRequirement = requirementRepository.findById(requirement.getId()).get();
        updatedRequirement
            .name(UPDATED_NAME)
            .links(UPDATED_LINKS)
            .country(UPDATED_COUNTRY)
            .product(UPDATED_PRODUCT)
            .type(UPDATED_TYPE)
            .input(UPDATED_INPUT)
            .form(UPDATED_FORM)
            .active(UPDATED_ACTIVE)
            .createdAt(UPDATED_CREATED_AT)
            .updatedAt(UPDATED_UPDATED_AT)
            .displayOrder(UPDATED_DISPLAY_ORDER)
            .displayDownloadLink(UPDATED_DISPLAY_DOWNLOAD_LINK)
            .iCoverName(UPDATED_I_COVER_NAME);

        restRequirementMockMvc.perform(put("/api/requirements")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedRequirement)))
            .andExpect(status().isOk());

        // Validate the Requirement in the database
        List<Requirement> requirementList = requirementRepository.findAll();
        assertThat(requirementList).hasSize(databaseSizeBeforeUpdate);
        Requirement testRequirement = requirementList.get(requirementList.size() - 1);
        assertThat(testRequirement.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testRequirement.getLinks()).isEqualTo(UPDATED_LINKS);
        assertThat(testRequirement.getCountry()).isEqualTo(UPDATED_COUNTRY);
        assertThat(testRequirement.getProduct()).isEqualTo(UPDATED_PRODUCT);
        assertThat(testRequirement.getType()).isEqualTo(UPDATED_TYPE);
        assertThat(testRequirement.getInput()).isEqualTo(UPDATED_INPUT);
        assertThat(testRequirement.getForm()).isEqualTo(UPDATED_FORM);
        assertThat(testRequirement.getActive()).isEqualTo(UPDATED_ACTIVE);
        assertThat(testRequirement.getCreatedAt()).isEqualTo(UPDATED_CREATED_AT);
        assertThat(testRequirement.getUpdatedAt()).isEqualTo(UPDATED_UPDATED_AT);
        assertThat(testRequirement.getDisplayOrder()).isEqualTo(UPDATED_DISPLAY_ORDER);
        assertThat(testRequirement.getDisplayDownloadLink()).isEqualTo(UPDATED_DISPLAY_DOWNLOAD_LINK);
        assertThat(testRequirement.getiCoverName()).isEqualTo(UPDATED_I_COVER_NAME);
    }

    @Test
    public void updateNonExistingRequirement() throws Exception {
        int databaseSizeBeforeUpdate = requirementRepository.findAll().size();

        // Create the Requirement

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restRequirementMockMvc.perform(put("/api/requirements")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(requirement)))
            .andExpect(status().isBadRequest());

        // Validate the Requirement in the database
        List<Requirement> requirementList = requirementRepository.findAll();
        assertThat(requirementList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    public void deleteRequirement() throws Exception {
        // Initialize the database
        requirementRepository.save(requirement);

        int databaseSizeBeforeDelete = requirementRepository.findAll().size();

        // Get the requirement
        restRequirementMockMvc.perform(delete("/api/requirements/{id}", requirement.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Requirement> requirementList = requirementRepository.findAll();
        assertThat(requirementList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Requirement.class);
        Requirement requirement1 = new Requirement();
        requirement1.setId("id1");
        Requirement requirement2 = new Requirement();
        requirement2.setId(requirement1.getId());
        assertThat(requirement1).isEqualTo(requirement2);
        requirement2.setId("id2");
        assertThat(requirement1).isNotEqualTo(requirement2);
        requirement1.setId(null);
        assertThat(requirement1).isNotEqualTo(requirement2);
    }
}
