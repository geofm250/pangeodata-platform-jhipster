package za.co.skywalk.pangeodata.web.rest;

import za.co.skywalk.pangeodata.PangeodataJHipsterApp;

import za.co.skywalk.pangeodata.domain.OrderProfessionalLicenseForm;
import za.co.skywalk.pangeodata.repository.OrderProfessionalLicenseFormRepository;
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
 * Test class for the OrderProfessionalLicenseFormResource REST controller.
 *
 * @see OrderProfessionalLicenseFormResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = PangeodataJHipsterApp.class)
public class OrderProfessionalLicenseFormResourceIntTest {

    private static final String DEFAULT_NAME_OF_LICENSE = "AAAAAAAAAA";
    private static final String UPDATED_NAME_OF_LICENSE = "BBBBBBBBBB";

    private static final String DEFAULT_TOWN = "AAAAAAAAAA";
    private static final String UPDATED_TOWN = "BBBBBBBBBB";

    private static final String DEFAULT_LICENSE_INSTITUTION = "AAAAAAAAAA";
    private static final String UPDATED_LICENSE_INSTITUTION = "BBBBBBBBBB";

    @Autowired
    private OrderProfessionalLicenseFormRepository orderProfessionalLicenseFormRepository;


    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    private MockMvc restOrderProfessionalLicenseFormMockMvc;

    private OrderProfessionalLicenseForm orderProfessionalLicenseForm;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final OrderProfessionalLicenseFormResource orderProfessionalLicenseFormResource = new OrderProfessionalLicenseFormResource(orderProfessionalLicenseFormRepository);
        this.restOrderProfessionalLicenseFormMockMvc = MockMvcBuilders.standaloneSetup(orderProfessionalLicenseFormResource)
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
    public static OrderProfessionalLicenseForm createEntity() {
        OrderProfessionalLicenseForm orderProfessionalLicenseForm = new OrderProfessionalLicenseForm()
            .nameOfLicense(DEFAULT_NAME_OF_LICENSE)
            .town(DEFAULT_TOWN)
            .licenseInstitution(DEFAULT_LICENSE_INSTITUTION);
        return orderProfessionalLicenseForm;
    }

    @Before
    public void initTest() {
        orderProfessionalLicenseFormRepository.deleteAll();
        orderProfessionalLicenseForm = createEntity();
    }

    @Test
    public void createOrderProfessionalLicenseForm() throws Exception {
        int databaseSizeBeforeCreate = orderProfessionalLicenseFormRepository.findAll().size();

        // Create the OrderProfessionalLicenseForm
        restOrderProfessionalLicenseFormMockMvc.perform(post("/api/order-professional-license-forms")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(orderProfessionalLicenseForm)))
            .andExpect(status().isCreated());

        // Validate the OrderProfessionalLicenseForm in the database
        List<OrderProfessionalLicenseForm> orderProfessionalLicenseFormList = orderProfessionalLicenseFormRepository.findAll();
        assertThat(orderProfessionalLicenseFormList).hasSize(databaseSizeBeforeCreate + 1);
        OrderProfessionalLicenseForm testOrderProfessionalLicenseForm = orderProfessionalLicenseFormList.get(orderProfessionalLicenseFormList.size() - 1);
        assertThat(testOrderProfessionalLicenseForm.getNameOfLicense()).isEqualTo(DEFAULT_NAME_OF_LICENSE);
        assertThat(testOrderProfessionalLicenseForm.getTown()).isEqualTo(DEFAULT_TOWN);
        assertThat(testOrderProfessionalLicenseForm.getLicenseInstitution()).isEqualTo(DEFAULT_LICENSE_INSTITUTION);
    }

    @Test
    public void createOrderProfessionalLicenseFormWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = orderProfessionalLicenseFormRepository.findAll().size();

        // Create the OrderProfessionalLicenseForm with an existing ID
        orderProfessionalLicenseForm.setId("existing_id");

        // An entity with an existing ID cannot be created, so this API call must fail
        restOrderProfessionalLicenseFormMockMvc.perform(post("/api/order-professional-license-forms")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(orderProfessionalLicenseForm)))
            .andExpect(status().isBadRequest());

        // Validate the OrderProfessionalLicenseForm in the database
        List<OrderProfessionalLicenseForm> orderProfessionalLicenseFormList = orderProfessionalLicenseFormRepository.findAll();
        assertThat(orderProfessionalLicenseFormList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    public void getAllOrderProfessionalLicenseForms() throws Exception {
        // Initialize the database
        orderProfessionalLicenseFormRepository.save(orderProfessionalLicenseForm);

        // Get all the orderProfessionalLicenseFormList
        restOrderProfessionalLicenseFormMockMvc.perform(get("/api/order-professional-license-forms?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(orderProfessionalLicenseForm.getId())))
            .andExpect(jsonPath("$.[*].nameOfLicense").value(hasItem(DEFAULT_NAME_OF_LICENSE.toString())))
            .andExpect(jsonPath("$.[*].town").value(hasItem(DEFAULT_TOWN.toString())))
            .andExpect(jsonPath("$.[*].licenseInstitution").value(hasItem(DEFAULT_LICENSE_INSTITUTION.toString())));
    }
    

    @Test
    public void getOrderProfessionalLicenseForm() throws Exception {
        // Initialize the database
        orderProfessionalLicenseFormRepository.save(orderProfessionalLicenseForm);

        // Get the orderProfessionalLicenseForm
        restOrderProfessionalLicenseFormMockMvc.perform(get("/api/order-professional-license-forms/{id}", orderProfessionalLicenseForm.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(orderProfessionalLicenseForm.getId()))
            .andExpect(jsonPath("$.nameOfLicense").value(DEFAULT_NAME_OF_LICENSE.toString()))
            .andExpect(jsonPath("$.town").value(DEFAULT_TOWN.toString()))
            .andExpect(jsonPath("$.licenseInstitution").value(DEFAULT_LICENSE_INSTITUTION.toString()));
    }
    @Test
    public void getNonExistingOrderProfessionalLicenseForm() throws Exception {
        // Get the orderProfessionalLicenseForm
        restOrderProfessionalLicenseFormMockMvc.perform(get("/api/order-professional-license-forms/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateOrderProfessionalLicenseForm() throws Exception {
        // Initialize the database
        orderProfessionalLicenseFormRepository.save(orderProfessionalLicenseForm);

        int databaseSizeBeforeUpdate = orderProfessionalLicenseFormRepository.findAll().size();

        // Update the orderProfessionalLicenseForm
        OrderProfessionalLicenseForm updatedOrderProfessionalLicenseForm = orderProfessionalLicenseFormRepository.findById(orderProfessionalLicenseForm.getId()).get();
        updatedOrderProfessionalLicenseForm
            .nameOfLicense(UPDATED_NAME_OF_LICENSE)
            .town(UPDATED_TOWN)
            .licenseInstitution(UPDATED_LICENSE_INSTITUTION);

        restOrderProfessionalLicenseFormMockMvc.perform(put("/api/order-professional-license-forms")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedOrderProfessionalLicenseForm)))
            .andExpect(status().isOk());

        // Validate the OrderProfessionalLicenseForm in the database
        List<OrderProfessionalLicenseForm> orderProfessionalLicenseFormList = orderProfessionalLicenseFormRepository.findAll();
        assertThat(orderProfessionalLicenseFormList).hasSize(databaseSizeBeforeUpdate);
        OrderProfessionalLicenseForm testOrderProfessionalLicenseForm = orderProfessionalLicenseFormList.get(orderProfessionalLicenseFormList.size() - 1);
        assertThat(testOrderProfessionalLicenseForm.getNameOfLicense()).isEqualTo(UPDATED_NAME_OF_LICENSE);
        assertThat(testOrderProfessionalLicenseForm.getTown()).isEqualTo(UPDATED_TOWN);
        assertThat(testOrderProfessionalLicenseForm.getLicenseInstitution()).isEqualTo(UPDATED_LICENSE_INSTITUTION);
    }

    @Test
    public void updateNonExistingOrderProfessionalLicenseForm() throws Exception {
        int databaseSizeBeforeUpdate = orderProfessionalLicenseFormRepository.findAll().size();

        // Create the OrderProfessionalLicenseForm

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restOrderProfessionalLicenseFormMockMvc.perform(put("/api/order-professional-license-forms")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(orderProfessionalLicenseForm)))
            .andExpect(status().isBadRequest());

        // Validate the OrderProfessionalLicenseForm in the database
        List<OrderProfessionalLicenseForm> orderProfessionalLicenseFormList = orderProfessionalLicenseFormRepository.findAll();
        assertThat(orderProfessionalLicenseFormList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    public void deleteOrderProfessionalLicenseForm() throws Exception {
        // Initialize the database
        orderProfessionalLicenseFormRepository.save(orderProfessionalLicenseForm);

        int databaseSizeBeforeDelete = orderProfessionalLicenseFormRepository.findAll().size();

        // Get the orderProfessionalLicenseForm
        restOrderProfessionalLicenseFormMockMvc.perform(delete("/api/order-professional-license-forms/{id}", orderProfessionalLicenseForm.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<OrderProfessionalLicenseForm> orderProfessionalLicenseFormList = orderProfessionalLicenseFormRepository.findAll();
        assertThat(orderProfessionalLicenseFormList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(OrderProfessionalLicenseForm.class);
        OrderProfessionalLicenseForm orderProfessionalLicenseForm1 = new OrderProfessionalLicenseForm();
        orderProfessionalLicenseForm1.setId("id1");
        OrderProfessionalLicenseForm orderProfessionalLicenseForm2 = new OrderProfessionalLicenseForm();
        orderProfessionalLicenseForm2.setId(orderProfessionalLicenseForm1.getId());
        assertThat(orderProfessionalLicenseForm1).isEqualTo(orderProfessionalLicenseForm2);
        orderProfessionalLicenseForm2.setId("id2");
        assertThat(orderProfessionalLicenseForm1).isNotEqualTo(orderProfessionalLicenseForm2);
        orderProfessionalLicenseForm1.setId(null);
        assertThat(orderProfessionalLicenseForm1).isNotEqualTo(orderProfessionalLicenseForm2);
    }
}
