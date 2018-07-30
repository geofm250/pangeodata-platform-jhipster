package za.co.skywalk.pangeodata.web.rest;

import za.co.skywalk.pangeodata.PangeodataJHipsterApp;

import za.co.skywalk.pangeodata.domain.OrderForm;
import za.co.skywalk.pangeodata.repository.OrderFormRepository;
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
 * Test class for the OrderFormResource REST controller.
 *
 * @see OrderFormResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = PangeodataJHipsterApp.class)
public class OrderFormResourceIntTest {

    private static final String DEFAULT_FORM_TYPE = "AAAAAAAAAA";
    private static final String UPDATED_FORM_TYPE = "BBBBBBBBBB";

    private static final String DEFAULT_INPUT = "AAAAAAAAAA";
    private static final String UPDATED_INPUT = "BBBBBBBBBB";

    private static final String DEFAULT_VALID = "AAAAAAAAAA";
    private static final String UPDATED_VALID = "BBBBBBBBBB";

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    @Autowired
    private OrderFormRepository orderFormRepository;


    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    private MockMvc restOrderFormMockMvc;

    private OrderForm orderForm;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final OrderFormResource orderFormResource = new OrderFormResource(orderFormRepository);
        this.restOrderFormMockMvc = MockMvcBuilders.standaloneSetup(orderFormResource)
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
    public static OrderForm createEntity() {
        OrderForm orderForm = new OrderForm()
            .formType(DEFAULT_FORM_TYPE)
            .input(DEFAULT_INPUT)
            .valid(DEFAULT_VALID)
            .name(DEFAULT_NAME);
        return orderForm;
    }

    @Before
    public void initTest() {
        orderFormRepository.deleteAll();
        orderForm = createEntity();
    }

    @Test
    public void createOrderForm() throws Exception {
        int databaseSizeBeforeCreate = orderFormRepository.findAll().size();

        // Create the OrderForm
        restOrderFormMockMvc.perform(post("/api/order-forms")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(orderForm)))
            .andExpect(status().isCreated());

        // Validate the OrderForm in the database
        List<OrderForm> orderFormList = orderFormRepository.findAll();
        assertThat(orderFormList).hasSize(databaseSizeBeforeCreate + 1);
        OrderForm testOrderForm = orderFormList.get(orderFormList.size() - 1);
        assertThat(testOrderForm.getFormType()).isEqualTo(DEFAULT_FORM_TYPE);
        assertThat(testOrderForm.getInput()).isEqualTo(DEFAULT_INPUT);
        assertThat(testOrderForm.getValid()).isEqualTo(DEFAULT_VALID);
        assertThat(testOrderForm.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    public void createOrderFormWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = orderFormRepository.findAll().size();

        // Create the OrderForm with an existing ID
        orderForm.setId("existing_id");

        // An entity with an existing ID cannot be created, so this API call must fail
        restOrderFormMockMvc.perform(post("/api/order-forms")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(orderForm)))
            .andExpect(status().isBadRequest());

        // Validate the OrderForm in the database
        List<OrderForm> orderFormList = orderFormRepository.findAll();
        assertThat(orderFormList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    public void getAllOrderForms() throws Exception {
        // Initialize the database
        orderFormRepository.save(orderForm);

        // Get all the orderFormList
        restOrderFormMockMvc.perform(get("/api/order-forms?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(orderForm.getId())))
            .andExpect(jsonPath("$.[*].formType").value(hasItem(DEFAULT_FORM_TYPE.toString())))
            .andExpect(jsonPath("$.[*].input").value(hasItem(DEFAULT_INPUT.toString())))
            .andExpect(jsonPath("$.[*].valid").value(hasItem(DEFAULT_VALID.toString())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())));
    }
    

    @Test
    public void getOrderForm() throws Exception {
        // Initialize the database
        orderFormRepository.save(orderForm);

        // Get the orderForm
        restOrderFormMockMvc.perform(get("/api/order-forms/{id}", orderForm.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(orderForm.getId()))
            .andExpect(jsonPath("$.formType").value(DEFAULT_FORM_TYPE.toString()))
            .andExpect(jsonPath("$.input").value(DEFAULT_INPUT.toString()))
            .andExpect(jsonPath("$.valid").value(DEFAULT_VALID.toString()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()));
    }
    @Test
    public void getNonExistingOrderForm() throws Exception {
        // Get the orderForm
        restOrderFormMockMvc.perform(get("/api/order-forms/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateOrderForm() throws Exception {
        // Initialize the database
        orderFormRepository.save(orderForm);

        int databaseSizeBeforeUpdate = orderFormRepository.findAll().size();

        // Update the orderForm
        OrderForm updatedOrderForm = orderFormRepository.findById(orderForm.getId()).get();
        updatedOrderForm
            .formType(UPDATED_FORM_TYPE)
            .input(UPDATED_INPUT)
            .valid(UPDATED_VALID)
            .name(UPDATED_NAME);

        restOrderFormMockMvc.perform(put("/api/order-forms")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedOrderForm)))
            .andExpect(status().isOk());

        // Validate the OrderForm in the database
        List<OrderForm> orderFormList = orderFormRepository.findAll();
        assertThat(orderFormList).hasSize(databaseSizeBeforeUpdate);
        OrderForm testOrderForm = orderFormList.get(orderFormList.size() - 1);
        assertThat(testOrderForm.getFormType()).isEqualTo(UPDATED_FORM_TYPE);
        assertThat(testOrderForm.getInput()).isEqualTo(UPDATED_INPUT);
        assertThat(testOrderForm.getValid()).isEqualTo(UPDATED_VALID);
        assertThat(testOrderForm.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    public void updateNonExistingOrderForm() throws Exception {
        int databaseSizeBeforeUpdate = orderFormRepository.findAll().size();

        // Create the OrderForm

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restOrderFormMockMvc.perform(put("/api/order-forms")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(orderForm)))
            .andExpect(status().isBadRequest());

        // Validate the OrderForm in the database
        List<OrderForm> orderFormList = orderFormRepository.findAll();
        assertThat(orderFormList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    public void deleteOrderForm() throws Exception {
        // Initialize the database
        orderFormRepository.save(orderForm);

        int databaseSizeBeforeDelete = orderFormRepository.findAll().size();

        // Get the orderForm
        restOrderFormMockMvc.perform(delete("/api/order-forms/{id}", orderForm.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<OrderForm> orderFormList = orderFormRepository.findAll();
        assertThat(orderFormList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(OrderForm.class);
        OrderForm orderForm1 = new OrderForm();
        orderForm1.setId("id1");
        OrderForm orderForm2 = new OrderForm();
        orderForm2.setId(orderForm1.getId());
        assertThat(orderForm1).isEqualTo(orderForm2);
        orderForm2.setId("id2");
        assertThat(orderForm1).isNotEqualTo(orderForm2);
        orderForm1.setId(null);
        assertThat(orderForm1).isNotEqualTo(orderForm2);
    }
}
