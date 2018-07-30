package za.co.skywalk.pangeodata.web.rest;

import za.co.skywalk.pangeodata.PangeodataJHipsterApp;

import za.co.skywalk.pangeodata.domain.Migration;
import za.co.skywalk.pangeodata.repository.MigrationRepository;
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
 * Test class for the MigrationResource REST controller.
 *
 * @see MigrationResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = PangeodataJHipsterApp.class)
public class MigrationResourceIntTest {

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final String DEFAULT_VERSION = "AAAAAAAAAA";
    private static final String UPDATED_VERSION = "BBBBBBBBBB";

    @Autowired
    private MigrationRepository migrationRepository;


    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    private MockMvc restMigrationMockMvc;

    private Migration migration;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final MigrationResource migrationResource = new MigrationResource(migrationRepository);
        this.restMigrationMockMvc = MockMvcBuilders.standaloneSetup(migrationResource)
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
    public static Migration createEntity() {
        Migration migration = new Migration()
            .description(DEFAULT_DESCRIPTION)
            .version(DEFAULT_VERSION);
        return migration;
    }

    @Before
    public void initTest() {
        migrationRepository.deleteAll();
        migration = createEntity();
    }

    @Test
    public void createMigration() throws Exception {
        int databaseSizeBeforeCreate = migrationRepository.findAll().size();

        // Create the Migration
        restMigrationMockMvc.perform(post("/api/migrations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(migration)))
            .andExpect(status().isCreated());

        // Validate the Migration in the database
        List<Migration> migrationList = migrationRepository.findAll();
        assertThat(migrationList).hasSize(databaseSizeBeforeCreate + 1);
        Migration testMigration = migrationList.get(migrationList.size() - 1);
        assertThat(testMigration.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testMigration.getVersion()).isEqualTo(DEFAULT_VERSION);
    }

    @Test
    public void createMigrationWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = migrationRepository.findAll().size();

        // Create the Migration with an existing ID
        migration.setId("existing_id");

        // An entity with an existing ID cannot be created, so this API call must fail
        restMigrationMockMvc.perform(post("/api/migrations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(migration)))
            .andExpect(status().isBadRequest());

        // Validate the Migration in the database
        List<Migration> migrationList = migrationRepository.findAll();
        assertThat(migrationList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    public void getAllMigrations() throws Exception {
        // Initialize the database
        migrationRepository.save(migration);

        // Get all the migrationList
        restMigrationMockMvc.perform(get("/api/migrations?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(migration.getId())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].version").value(hasItem(DEFAULT_VERSION.toString())));
    }
    

    @Test
    public void getMigration() throws Exception {
        // Initialize the database
        migrationRepository.save(migration);

        // Get the migration
        restMigrationMockMvc.perform(get("/api/migrations/{id}", migration.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(migration.getId()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.version").value(DEFAULT_VERSION.toString()));
    }
    @Test
    public void getNonExistingMigration() throws Exception {
        // Get the migration
        restMigrationMockMvc.perform(get("/api/migrations/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateMigration() throws Exception {
        // Initialize the database
        migrationRepository.save(migration);

        int databaseSizeBeforeUpdate = migrationRepository.findAll().size();

        // Update the migration
        Migration updatedMigration = migrationRepository.findById(migration.getId()).get();
        updatedMigration
            .description(UPDATED_DESCRIPTION)
            .version(UPDATED_VERSION);

        restMigrationMockMvc.perform(put("/api/migrations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedMigration)))
            .andExpect(status().isOk());

        // Validate the Migration in the database
        List<Migration> migrationList = migrationRepository.findAll();
        assertThat(migrationList).hasSize(databaseSizeBeforeUpdate);
        Migration testMigration = migrationList.get(migrationList.size() - 1);
        assertThat(testMigration.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testMigration.getVersion()).isEqualTo(UPDATED_VERSION);
    }

    @Test
    public void updateNonExistingMigration() throws Exception {
        int databaseSizeBeforeUpdate = migrationRepository.findAll().size();

        // Create the Migration

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restMigrationMockMvc.perform(put("/api/migrations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(migration)))
            .andExpect(status().isBadRequest());

        // Validate the Migration in the database
        List<Migration> migrationList = migrationRepository.findAll();
        assertThat(migrationList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    public void deleteMigration() throws Exception {
        // Initialize the database
        migrationRepository.save(migration);

        int databaseSizeBeforeDelete = migrationRepository.findAll().size();

        // Get the migration
        restMigrationMockMvc.perform(delete("/api/migrations/{id}", migration.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Migration> migrationList = migrationRepository.findAll();
        assertThat(migrationList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Migration.class);
        Migration migration1 = new Migration();
        migration1.setId("id1");
        Migration migration2 = new Migration();
        migration2.setId(migration1.getId());
        assertThat(migration1).isEqualTo(migration2);
        migration2.setId("id2");
        assertThat(migration1).isNotEqualTo(migration2);
        migration1.setId(null);
        assertThat(migration1).isNotEqualTo(migration2);
    }
}
