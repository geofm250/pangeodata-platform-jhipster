package za.co.skywalk.pangeodata.web.rest;

import za.co.skywalk.pangeodata.PangeodataJHipsterApp;

import za.co.skywalk.pangeodata.domain.IOrderForm;
import za.co.skywalk.pangeodata.repository.IOrderFormRepository;
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
 * Test class for the IOrderFormResource REST controller.
 *
 * @see IOrderFormResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = PangeodataJHipsterApp.class)
public class IOrderFormResourceIntTest {

    @Autowired
    private IOrderFormRepository iOrderFormRepository;


    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    private MockMvc restIOrderFormMockMvc;

    private IOrderForm iOrderForm;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final IOrderFormResource iOrderFormResource = new IOrderFormResource(iOrderFormRepository);
        this.restIOrderFormMockMvc = MockMvcBuilders.standaloneSetup(iOrderFormResource)
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
    public static IOrderForm createEntity() {
        IOrderForm iOrderForm = new IOrderForm();
        return iOrderForm;
    }

    @Before
    public void initTest() {
        iOrderFormRepository.deleteAll();
        iOrderForm = createEntity();
    }

    @Test
    public void createIOrderForm() throws Exception {
        int databaseSizeBeforeCreate = iOrderFormRepository.findAll().size();

        // Create the IOrderForm
        restIOrderFormMockMvc.perform(post("/api/i-order-forms")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(iOrderForm)))
            .andExpect(status().isCreated());

        // Validate the IOrderForm in the database
        List<IOrderForm> iOrderFormList = iOrderFormRepository.findAll();
        assertThat(iOrderFormList).hasSize(databaseSizeBeforeCreate + 1);
        IOrderForm testIOrderForm = iOrderFormList.get(iOrderFormList.size() - 1);
    }

    @Test
    public void createIOrderFormWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = iOrderFormRepository.findAll().size();

        // Create the IOrderForm with an existing ID
        iOrderForm.setId("existing_id");

        // An entity with an existing ID cannot be created, so this API call must fail
        restIOrderFormMockMvc.perform(post("/api/i-order-forms")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(iOrderForm)))
            .andExpect(status().isBadRequest());

        // Validate the IOrderForm in the database
        List<IOrderForm> iOrderFormList = iOrderFormRepository.findAll();
        assertThat(iOrderFormList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    public void getAllIOrderForms() throws Exception {
        // Initialize the database
        iOrderFormRepository.save(iOrderForm);

        // Get all the iOrderFormList
        restIOrderFormMockMvc.perform(get("/api/i-order-forms?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(iOrderForm.getId())));
    }
    

    @Test
    public void getIOrderForm() throws Exception {
        // Initialize the database
        iOrderFormRepository.save(iOrderForm);

        // Get the iOrderForm
        restIOrderFormMockMvc.perform(get("/api/i-order-forms/{id}", iOrderForm.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(iOrderForm.getId()));
    }
    @Test
    public void getNonExistingIOrderForm() throws Exception {
        // Get the iOrderForm
        restIOrderFormMockMvc.perform(get("/api/i-order-forms/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateIOrderForm() throws Exception {
        // Initialize the database
        iOrderFormRepository.save(iOrderForm);

        int databaseSizeBeforeUpdate = iOrderFormRepository.findAll().size();

        // Update the iOrderForm
        IOrderForm updatedIOrderForm = iOrderFormRepository.findById(iOrderForm.getId()).get();

        restIOrderFormMockMvc.perform(put("/api/i-order-forms")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedIOrderForm)))
            .andExpect(status().isOk());

        // Validate the IOrderForm in the database
        List<IOrderForm> iOrderFormList = iOrderFormRepository.findAll();
        assertThat(iOrderFormList).hasSize(databaseSizeBeforeUpdate);
        IOrderForm testIOrderForm = iOrderFormList.get(iOrderFormList.size() - 1);
    }

    @Test
    public void updateNonExistingIOrderForm() throws Exception {
        int databaseSizeBeforeUpdate = iOrderFormRepository.findAll().size();

        // Create the IOrderForm

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restIOrderFormMockMvc.perform(put("/api/i-order-forms")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(iOrderForm)))
            .andExpect(status().isBadRequest());

        // Validate the IOrderForm in the database
        List<IOrderForm> iOrderFormList = iOrderFormRepository.findAll();
        assertThat(iOrderFormList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    public void deleteIOrderForm() throws Exception {
        // Initialize the database
        iOrderFormRepository.save(iOrderForm);

        int databaseSizeBeforeDelete = iOrderFormRepository.findAll().size();

        // Get the iOrderForm
        restIOrderFormMockMvc.perform(delete("/api/i-order-forms/{id}", iOrderForm.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<IOrderForm> iOrderFormList = iOrderFormRepository.findAll();
        assertThat(iOrderFormList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(IOrderForm.class);
        IOrderForm iOrderForm1 = new IOrderForm();
        iOrderForm1.setId("id1");
        IOrderForm iOrderForm2 = new IOrderForm();
        iOrderForm2.setId(iOrderForm1.getId());
        assertThat(iOrderForm1).isEqualTo(iOrderForm2);
        iOrderForm2.setId("id2");
        assertThat(iOrderForm1).isNotEqualTo(iOrderForm2);
        iOrderForm1.setId(null);
        assertThat(iOrderForm1).isNotEqualTo(iOrderForm2);
    }
}
