package za.co.skywalk.pangeodata.web.rest;

import za.co.skywalk.pangeodata.PangeodataJHipsterApp;

import za.co.skywalk.pangeodata.domain.OrderInput;
import za.co.skywalk.pangeodata.repository.OrderInputRepository;
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
 * Test class for the OrderInputResource REST controller.
 *
 * @see OrderInputResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = PangeodataJHipsterApp.class)
public class OrderInputResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_ORDER_ID = "AAAAAAAAAA";
    private static final String UPDATED_ORDER_ID = "BBBBBBBBBB";

    private static final String DEFAULT_LABEL = "AAAAAAAAAA";
    private static final String UPDATED_LABEL = "BBBBBBBBBB";

    private static final String DEFAULT_INPUT = "AAAAAAAAAA";
    private static final String UPDATED_INPUT = "BBBBBBBBBB";

    private static final String DEFAULT_I_COVER_NAME = "AAAAAAAAAA";
    private static final String UPDATED_I_COVER_NAME = "BBBBBBBBBB";

    @Autowired
    private OrderInputRepository orderInputRepository;


    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    private MockMvc restOrderInputMockMvc;

    private OrderInput orderInput;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final OrderInputResource orderInputResource = new OrderInputResource(orderInputRepository);
        this.restOrderInputMockMvc = MockMvcBuilders.standaloneSetup(orderInputResource)
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
    public static OrderInput createEntity() {
        OrderInput orderInput = new OrderInput()
            .name(DEFAULT_NAME)
            .orderId(DEFAULT_ORDER_ID)
            .label(DEFAULT_LABEL)
            .input(DEFAULT_INPUT)
            .iCoverName(DEFAULT_I_COVER_NAME);
        return orderInput;
    }

    @Before
    public void initTest() {
        orderInputRepository.deleteAll();
        orderInput = createEntity();
    }

    @Test
    public void createOrderInput() throws Exception {
        int databaseSizeBeforeCreate = orderInputRepository.findAll().size();

        // Create the OrderInput
        restOrderInputMockMvc.perform(post("/api/order-inputs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(orderInput)))
            .andExpect(status().isCreated());

        // Validate the OrderInput in the database
        List<OrderInput> orderInputList = orderInputRepository.findAll();
        assertThat(orderInputList).hasSize(databaseSizeBeforeCreate + 1);
        OrderInput testOrderInput = orderInputList.get(orderInputList.size() - 1);
        assertThat(testOrderInput.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testOrderInput.getOrderId()).isEqualTo(DEFAULT_ORDER_ID);
        assertThat(testOrderInput.getLabel()).isEqualTo(DEFAULT_LABEL);
        assertThat(testOrderInput.getInput()).isEqualTo(DEFAULT_INPUT);
        assertThat(testOrderInput.getiCoverName()).isEqualTo(DEFAULT_I_COVER_NAME);
    }

    @Test
    public void createOrderInputWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = orderInputRepository.findAll().size();

        // Create the OrderInput with an existing ID
        orderInput.setId("existing_id");

        // An entity with an existing ID cannot be created, so this API call must fail
        restOrderInputMockMvc.perform(post("/api/order-inputs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(orderInput)))
            .andExpect(status().isBadRequest());

        // Validate the OrderInput in the database
        List<OrderInput> orderInputList = orderInputRepository.findAll();
        assertThat(orderInputList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    public void getAllOrderInputs() throws Exception {
        // Initialize the database
        orderInputRepository.save(orderInput);

        // Get all the orderInputList
        restOrderInputMockMvc.perform(get("/api/order-inputs?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(orderInput.getId())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].orderId").value(hasItem(DEFAULT_ORDER_ID.toString())))
            .andExpect(jsonPath("$.[*].label").value(hasItem(DEFAULT_LABEL.toString())))
            .andExpect(jsonPath("$.[*].input").value(hasItem(DEFAULT_INPUT.toString())))
            .andExpect(jsonPath("$.[*].iCoverName").value(hasItem(DEFAULT_I_COVER_NAME.toString())));
    }
    

    @Test
    public void getOrderInput() throws Exception {
        // Initialize the database
        orderInputRepository.save(orderInput);

        // Get the orderInput
        restOrderInputMockMvc.perform(get("/api/order-inputs/{id}", orderInput.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(orderInput.getId()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.orderId").value(DEFAULT_ORDER_ID.toString()))
            .andExpect(jsonPath("$.label").value(DEFAULT_LABEL.toString()))
            .andExpect(jsonPath("$.input").value(DEFAULT_INPUT.toString()))
            .andExpect(jsonPath("$.iCoverName").value(DEFAULT_I_COVER_NAME.toString()));
    }
    @Test
    public void getNonExistingOrderInput() throws Exception {
        // Get the orderInput
        restOrderInputMockMvc.perform(get("/api/order-inputs/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateOrderInput() throws Exception {
        // Initialize the database
        orderInputRepository.save(orderInput);

        int databaseSizeBeforeUpdate = orderInputRepository.findAll().size();

        // Update the orderInput
        OrderInput updatedOrderInput = orderInputRepository.findById(orderInput.getId()).get();
        updatedOrderInput
            .name(UPDATED_NAME)
            .orderId(UPDATED_ORDER_ID)
            .label(UPDATED_LABEL)
            .input(UPDATED_INPUT)
            .iCoverName(UPDATED_I_COVER_NAME);

        restOrderInputMockMvc.perform(put("/api/order-inputs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedOrderInput)))
            .andExpect(status().isOk());

        // Validate the OrderInput in the database
        List<OrderInput> orderInputList = orderInputRepository.findAll();
        assertThat(orderInputList).hasSize(databaseSizeBeforeUpdate);
        OrderInput testOrderInput = orderInputList.get(orderInputList.size() - 1);
        assertThat(testOrderInput.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testOrderInput.getOrderId()).isEqualTo(UPDATED_ORDER_ID);
        assertThat(testOrderInput.getLabel()).isEqualTo(UPDATED_LABEL);
        assertThat(testOrderInput.getInput()).isEqualTo(UPDATED_INPUT);
        assertThat(testOrderInput.getiCoverName()).isEqualTo(UPDATED_I_COVER_NAME);
    }

    @Test
    public void updateNonExistingOrderInput() throws Exception {
        int databaseSizeBeforeUpdate = orderInputRepository.findAll().size();

        // Create the OrderInput

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restOrderInputMockMvc.perform(put("/api/order-inputs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(orderInput)))
            .andExpect(status().isBadRequest());

        // Validate the OrderInput in the database
        List<OrderInput> orderInputList = orderInputRepository.findAll();
        assertThat(orderInputList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    public void deleteOrderInput() throws Exception {
        // Initialize the database
        orderInputRepository.save(orderInput);

        int databaseSizeBeforeDelete = orderInputRepository.findAll().size();

        // Get the orderInput
        restOrderInputMockMvc.perform(delete("/api/order-inputs/{id}", orderInput.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<OrderInput> orderInputList = orderInputRepository.findAll();
        assertThat(orderInputList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(OrderInput.class);
        OrderInput orderInput1 = new OrderInput();
        orderInput1.setId("id1");
        OrderInput orderInput2 = new OrderInput();
        orderInput2.setId(orderInput1.getId());
        assertThat(orderInput1).isEqualTo(orderInput2);
        orderInput2.setId("id2");
        assertThat(orderInput1).isNotEqualTo(orderInput2);
        orderInput1.setId(null);
        assertThat(orderInput1).isNotEqualTo(orderInput2);
    }
}
