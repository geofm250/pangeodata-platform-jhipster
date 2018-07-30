package za.co.skywalk.pangeodata.web.rest;

import za.co.skywalk.pangeodata.PangeodataJHipsterApp;

import za.co.skywalk.pangeodata.domain.ApplicationService;
import za.co.skywalk.pangeodata.repository.ApplicationServiceRepository;
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
 * Test class for the ApplicationServiceResource REST controller.
 *
 * @see ApplicationServiceResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = PangeodataJHipsterApp.class)
public class ApplicationServiceResourceIntTest {

    private static final String DEFAULT_APPLICATION_SERVICE_ID = "AAAAAAAAAA";
    private static final String UPDATED_APPLICATION_SERVICE_ID = "BBBBBBBBBB";

    private static final String DEFAULT_ORDER_ID = "AAAAAAAAAA";
    private static final String UPDATED_ORDER_ID = "BBBBBBBBBB";

    @Autowired
    private ApplicationServiceRepository applicationServiceRepository;


    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    private MockMvc restApplicationServiceMockMvc;

    private ApplicationService applicationService;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ApplicationServiceResource applicationServiceResource = new ApplicationServiceResource(applicationServiceRepository);
        this.restApplicationServiceMockMvc = MockMvcBuilders.standaloneSetup(applicationServiceResource)
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
    public static ApplicationService createEntity() {
        ApplicationService applicationService = new ApplicationService()
            .applicationServiceId(DEFAULT_APPLICATION_SERVICE_ID)
            .orderId(DEFAULT_ORDER_ID);
        return applicationService;
    }

    @Before
    public void initTest() {
        applicationServiceRepository.deleteAll();
        applicationService = createEntity();
    }

    @Test
    public void createApplicationService() throws Exception {
        int databaseSizeBeforeCreate = applicationServiceRepository.findAll().size();

        // Create the ApplicationService
        restApplicationServiceMockMvc.perform(post("/api/application-services")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(applicationService)))
            .andExpect(status().isCreated());

        // Validate the ApplicationService in the database
        List<ApplicationService> applicationServiceList = applicationServiceRepository.findAll();
        assertThat(applicationServiceList).hasSize(databaseSizeBeforeCreate + 1);
        ApplicationService testApplicationService = applicationServiceList.get(applicationServiceList.size() - 1);
        assertThat(testApplicationService.getApplicationServiceId()).isEqualTo(DEFAULT_APPLICATION_SERVICE_ID);
        assertThat(testApplicationService.getOrderId()).isEqualTo(DEFAULT_ORDER_ID);
    }

    @Test
    public void createApplicationServiceWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = applicationServiceRepository.findAll().size();

        // Create the ApplicationService with an existing ID
        applicationService.setId("existing_id");

        // An entity with an existing ID cannot be created, so this API call must fail
        restApplicationServiceMockMvc.perform(post("/api/application-services")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(applicationService)))
            .andExpect(status().isBadRequest());

        // Validate the ApplicationService in the database
        List<ApplicationService> applicationServiceList = applicationServiceRepository.findAll();
        assertThat(applicationServiceList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    public void getAllApplicationServices() throws Exception {
        // Initialize the database
        applicationServiceRepository.save(applicationService);

        // Get all the applicationServiceList
        restApplicationServiceMockMvc.perform(get("/api/application-services?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(applicationService.getId())))
            .andExpect(jsonPath("$.[*].applicationServiceId").value(hasItem(DEFAULT_APPLICATION_SERVICE_ID.toString())))
            .andExpect(jsonPath("$.[*].orderId").value(hasItem(DEFAULT_ORDER_ID.toString())));
    }
    

    @Test
    public void getApplicationService() throws Exception {
        // Initialize the database
        applicationServiceRepository.save(applicationService);

        // Get the applicationService
        restApplicationServiceMockMvc.perform(get("/api/application-services/{id}", applicationService.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(applicationService.getId()))
            .andExpect(jsonPath("$.applicationServiceId").value(DEFAULT_APPLICATION_SERVICE_ID.toString()))
            .andExpect(jsonPath("$.orderId").value(DEFAULT_ORDER_ID.toString()));
    }
    @Test
    public void getNonExistingApplicationService() throws Exception {
        // Get the applicationService
        restApplicationServiceMockMvc.perform(get("/api/application-services/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateApplicationService() throws Exception {
        // Initialize the database
        applicationServiceRepository.save(applicationService);

        int databaseSizeBeforeUpdate = applicationServiceRepository.findAll().size();

        // Update the applicationService
        ApplicationService updatedApplicationService = applicationServiceRepository.findById(applicationService.getId()).get();
        updatedApplicationService
            .applicationServiceId(UPDATED_APPLICATION_SERVICE_ID)
            .orderId(UPDATED_ORDER_ID);

        restApplicationServiceMockMvc.perform(put("/api/application-services")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedApplicationService)))
            .andExpect(status().isOk());

        // Validate the ApplicationService in the database
        List<ApplicationService> applicationServiceList = applicationServiceRepository.findAll();
        assertThat(applicationServiceList).hasSize(databaseSizeBeforeUpdate);
        ApplicationService testApplicationService = applicationServiceList.get(applicationServiceList.size() - 1);
        assertThat(testApplicationService.getApplicationServiceId()).isEqualTo(UPDATED_APPLICATION_SERVICE_ID);
        assertThat(testApplicationService.getOrderId()).isEqualTo(UPDATED_ORDER_ID);
    }

    @Test
    public void updateNonExistingApplicationService() throws Exception {
        int databaseSizeBeforeUpdate = applicationServiceRepository.findAll().size();

        // Create the ApplicationService

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restApplicationServiceMockMvc.perform(put("/api/application-services")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(applicationService)))
            .andExpect(status().isBadRequest());

        // Validate the ApplicationService in the database
        List<ApplicationService> applicationServiceList = applicationServiceRepository.findAll();
        assertThat(applicationServiceList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    public void deleteApplicationService() throws Exception {
        // Initialize the database
        applicationServiceRepository.save(applicationService);

        int databaseSizeBeforeDelete = applicationServiceRepository.findAll().size();

        // Get the applicationService
        restApplicationServiceMockMvc.perform(delete("/api/application-services/{id}", applicationService.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<ApplicationService> applicationServiceList = applicationServiceRepository.findAll();
        assertThat(applicationServiceList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ApplicationService.class);
        ApplicationService applicationService1 = new ApplicationService();
        applicationService1.setId("id1");
        ApplicationService applicationService2 = new ApplicationService();
        applicationService2.setId(applicationService1.getId());
        assertThat(applicationService1).isEqualTo(applicationService2);
        applicationService2.setId("id2");
        assertThat(applicationService1).isNotEqualTo(applicationService2);
        applicationService1.setId(null);
        assertThat(applicationService1).isNotEqualTo(applicationService2);
    }
}
