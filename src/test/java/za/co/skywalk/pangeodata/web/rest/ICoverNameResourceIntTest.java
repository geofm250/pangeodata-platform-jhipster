package za.co.skywalk.pangeodata.web.rest;

import za.co.skywalk.pangeodata.PangeodataJHipsterApp;

import za.co.skywalk.pangeodata.domain.ICoverName;
import za.co.skywalk.pangeodata.repository.ICoverNameRepository;
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
 * Test class for the ICoverNameResource REST controller.
 *
 * @see ICoverNameResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = PangeodataJHipsterApp.class)
public class ICoverNameResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_REQUIREMENT_ID = "AAAAAAAAAA";
    private static final String UPDATED_REQUIREMENT_ID = "BBBBBBBBBB";

    @Autowired
    private ICoverNameRepository iCoverNameRepository;


    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    private MockMvc restICoverNameMockMvc;

    private ICoverName iCoverName;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ICoverNameResource iCoverNameResource = new ICoverNameResource(iCoverNameRepository);
        this.restICoverNameMockMvc = MockMvcBuilders.standaloneSetup(iCoverNameResource)
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
    public static ICoverName createEntity() {
        ICoverName iCoverName = new ICoverName()
            .name(DEFAULT_NAME)
            .requirementId(DEFAULT_REQUIREMENT_ID);
        return iCoverName;
    }

    @Before
    public void initTest() {
        iCoverNameRepository.deleteAll();
        iCoverName = createEntity();
    }

    @Test
    public void createICoverName() throws Exception {
        int databaseSizeBeforeCreate = iCoverNameRepository.findAll().size();

        // Create the ICoverName
        restICoverNameMockMvc.perform(post("/api/i-cover-names")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(iCoverName)))
            .andExpect(status().isCreated());

        // Validate the ICoverName in the database
        List<ICoverName> iCoverNameList = iCoverNameRepository.findAll();
        assertThat(iCoverNameList).hasSize(databaseSizeBeforeCreate + 1);
        ICoverName testICoverName = iCoverNameList.get(iCoverNameList.size() - 1);
        assertThat(testICoverName.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testICoverName.getRequirementId()).isEqualTo(DEFAULT_REQUIREMENT_ID);
    }

    @Test
    public void createICoverNameWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = iCoverNameRepository.findAll().size();

        // Create the ICoverName with an existing ID
        iCoverName.setId("existing_id");

        // An entity with an existing ID cannot be created, so this API call must fail
        restICoverNameMockMvc.perform(post("/api/i-cover-names")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(iCoverName)))
            .andExpect(status().isBadRequest());

        // Validate the ICoverName in the database
        List<ICoverName> iCoverNameList = iCoverNameRepository.findAll();
        assertThat(iCoverNameList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    public void getAllICoverNames() throws Exception {
        // Initialize the database
        iCoverNameRepository.save(iCoverName);

        // Get all the iCoverNameList
        restICoverNameMockMvc.perform(get("/api/i-cover-names?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(iCoverName.getId())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].requirementId").value(hasItem(DEFAULT_REQUIREMENT_ID.toString())));
    }
    

    @Test
    public void getICoverName() throws Exception {
        // Initialize the database
        iCoverNameRepository.save(iCoverName);

        // Get the iCoverName
        restICoverNameMockMvc.perform(get("/api/i-cover-names/{id}", iCoverName.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(iCoverName.getId()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.requirementId").value(DEFAULT_REQUIREMENT_ID.toString()));
    }
    @Test
    public void getNonExistingICoverName() throws Exception {
        // Get the iCoverName
        restICoverNameMockMvc.perform(get("/api/i-cover-names/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateICoverName() throws Exception {
        // Initialize the database
        iCoverNameRepository.save(iCoverName);

        int databaseSizeBeforeUpdate = iCoverNameRepository.findAll().size();

        // Update the iCoverName
        ICoverName updatedICoverName = iCoverNameRepository.findById(iCoverName.getId()).get();
        updatedICoverName
            .name(UPDATED_NAME)
            .requirementId(UPDATED_REQUIREMENT_ID);

        restICoverNameMockMvc.perform(put("/api/i-cover-names")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedICoverName)))
            .andExpect(status().isOk());

        // Validate the ICoverName in the database
        List<ICoverName> iCoverNameList = iCoverNameRepository.findAll();
        assertThat(iCoverNameList).hasSize(databaseSizeBeforeUpdate);
        ICoverName testICoverName = iCoverNameList.get(iCoverNameList.size() - 1);
        assertThat(testICoverName.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testICoverName.getRequirementId()).isEqualTo(UPDATED_REQUIREMENT_ID);
    }

    @Test
    public void updateNonExistingICoverName() throws Exception {
        int databaseSizeBeforeUpdate = iCoverNameRepository.findAll().size();

        // Create the ICoverName

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restICoverNameMockMvc.perform(put("/api/i-cover-names")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(iCoverName)))
            .andExpect(status().isBadRequest());

        // Validate the ICoverName in the database
        List<ICoverName> iCoverNameList = iCoverNameRepository.findAll();
        assertThat(iCoverNameList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    public void deleteICoverName() throws Exception {
        // Initialize the database
        iCoverNameRepository.save(iCoverName);

        int databaseSizeBeforeDelete = iCoverNameRepository.findAll().size();

        // Get the iCoverName
        restICoverNameMockMvc.perform(delete("/api/i-cover-names/{id}", iCoverName.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<ICoverName> iCoverNameList = iCoverNameRepository.findAll();
        assertThat(iCoverNameList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ICoverName.class);
        ICoverName iCoverName1 = new ICoverName();
        iCoverName1.setId("id1");
        ICoverName iCoverName2 = new ICoverName();
        iCoverName2.setId(iCoverName1.getId());
        assertThat(iCoverName1).isEqualTo(iCoverName2);
        iCoverName2.setId("id2");
        assertThat(iCoverName1).isNotEqualTo(iCoverName2);
        iCoverName1.setId(null);
        assertThat(iCoverName1).isNotEqualTo(iCoverName2);
    }
}
