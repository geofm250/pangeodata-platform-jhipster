package za.co.skywalk.pangeodata.web.rest;

import za.co.skywalk.pangeodata.PangeodataJHipsterApp;

import za.co.skywalk.pangeodata.domain.Order;
import za.co.skywalk.pangeodata.repository.OrderRepository;
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
 * Test class for the OrderResource REST controller.
 *
 * @see OrderResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = PangeodataJHipsterApp.class)
public class OrderResourceIntTest {

    private static final String DEFAULT_FILES = "AAAAAAAAAA";
    private static final String UPDATED_FILES = "BBBBBBBBBB";

    private static final String DEFAULT_REQ_INPUTS = "AAAAAAAAAA";
    private static final String UPDATED_REQ_INPUTS = "BBBBBBBBBB";

    private static final String DEFAULT_REQ_FORM_INPUTS = "AAAAAAAAAA";
    private static final String UPDATED_REQ_FORM_INPUTS = "BBBBBBBBBB";

    private static final String DEFAULT_PRODUCT = "AAAAAAAAAA";
    private static final String UPDATED_PRODUCT = "BBBBBBBBBB";

    private static final String DEFAULT_TRANSACTION = "AAAAAAAAAA";
    private static final String UPDATED_TRANSACTION = "BBBBBBBBBB";

    private static final String DEFAULT_USER = "AAAAAAAAAA";
    private static final String UPDATED_USER = "BBBBBBBBBB";

    private static final String DEFAULT_STATUS = "AAAAAAAAAA";
    private static final String UPDATED_STATUS = "BBBBBBBBBB";

    private static final String DEFAULT_REJECT_REASON = "AAAAAAAAAA";
    private static final String UPDATED_REJECT_REASON = "BBBBBBBBBB";

    private static final String DEFAULT_COMPANY = "AAAAAAAAAA";
    private static final String UPDATED_COMPANY = "BBBBBBBBBB";

    private static final String DEFAULT_PARTNER = "AAAAAAAAAA";
    private static final String UPDATED_PARTNER = "BBBBBBBBBB";

    private static final String DEFAULT_COUNTRY = "AAAAAAAAAA";
    private static final String UPDATED_COUNTRY = "BBBBBBBBBB";

    private static final String DEFAULT_CREATED_AT = "AAAAAAAAAA";
    private static final String UPDATED_CREATED_AT = "BBBBBBBBBB";

    private static final String DEFAULT_UPDATED_AT = "AAAAAAAAAA";
    private static final String UPDATED_UPDATED_AT = "BBBBBBBBBB";

    private static final String DEFAULT_EXPECTED_DATE = "AAAAAAAAAA";
    private static final String UPDATED_EXPECTED_DATE = "BBBBBBBBBB";

    private static final String DEFAULT_DAY_TILL_COMPLETE = "AAAAAAAAAA";
    private static final String UPDATED_DAY_TILL_COMPLETE = "BBBBBBBBBB";

    private static final String DEFAULT_COST = "AAAAAAAAAA";
    private static final String UPDATED_COST = "BBBBBBBBBB";

    private static final String DEFAULT_TURN_AROUND_TIME = "AAAAAAAAAA";
    private static final String UPDATED_TURN_AROUND_TIME = "BBBBBBBBBB";

    private static final String DEFAULT_REPORT = "AAAAAAAAAA";
    private static final String UPDATED_REPORT = "BBBBBBBBBB";

    private static final String DEFAULT_REFERENECE_ID = "AAAAAAAAAA";
    private static final String UPDATED_REFERENECE_ID = "BBBBBBBBBB";

    private static final String DEFAULT_CANCELLATION_REASON = "AAAAAAAAAA";
    private static final String UPDATED_CANCELLATION_REASON = "BBBBBBBBBB";

    private static final String DEFAULT_CLIENT_ID = "AAAAAAAAAA";
    private static final String UPDATED_CLIENT_ID = "BBBBBBBBBB";

    private static final String DEFAULT_ACTIVE = "AAAAAAAAAA";
    private static final String UPDATED_ACTIVE = "BBBBBBBBBB";

    private static final String DEFAULT_SELECTED = "AAAAAAAAAA";
    private static final String UPDATED_SELECTED = "BBBBBBBBBB";

    private static final String DEFAULT_APPLICATION_ID = "AAAAAAAAAA";
    private static final String UPDATED_APPLICATION_ID = "BBBBBBBBBB";

    private static final String DEFAULT_APPLICATION_SERVICE_IDS = "AAAAAAAAAA";
    private static final String UPDATED_APPLICATION_SERVICE_IDS = "BBBBBBBBBB";

    private static final String DEFAULT_I_COVER_REPORT = "AAAAAAAAAA";
    private static final String UPDATED_I_COVER_REPORT = "BBBBBBBBBB";

    @Autowired
    private OrderRepository orderRepository;


    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    private MockMvc restOrderMockMvc;

    private Order order;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final OrderResource orderResource = new OrderResource(orderRepository);
        this.restOrderMockMvc = MockMvcBuilders.standaloneSetup(orderResource)
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
    public static Order createEntity() {
        Order order = new Order()
            .files(DEFAULT_FILES)
            .reqInputs(DEFAULT_REQ_INPUTS)
            .reqFormInputs(DEFAULT_REQ_FORM_INPUTS)
            .product(DEFAULT_PRODUCT)
            .transaction(DEFAULT_TRANSACTION)
            .user(DEFAULT_USER)
            .status(DEFAULT_STATUS)
            .rejectReason(DEFAULT_REJECT_REASON)
            .company(DEFAULT_COMPANY)
            .partner(DEFAULT_PARTNER)
            .country(DEFAULT_COUNTRY)
            .createdAt(DEFAULT_CREATED_AT)
            .updatedAt(DEFAULT_UPDATED_AT)
            .expectedDate(DEFAULT_EXPECTED_DATE)
            .dayTillComplete(DEFAULT_DAY_TILL_COMPLETE)
            .cost(DEFAULT_COST)
            .turnAroundTime(DEFAULT_TURN_AROUND_TIME)
            .report(DEFAULT_REPORT)
            .refereneceId(DEFAULT_REFERENECE_ID)
            .cancellationReason(DEFAULT_CANCELLATION_REASON)
            .clientId(DEFAULT_CLIENT_ID)
            .active(DEFAULT_ACTIVE)
            .selected(DEFAULT_SELECTED)
            .applicationId(DEFAULT_APPLICATION_ID)
            .applicationServiceIds(DEFAULT_APPLICATION_SERVICE_IDS)
            .iCoverReport(DEFAULT_I_COVER_REPORT);
        return order;
    }

    @Before
    public void initTest() {
        orderRepository.deleteAll();
        order = createEntity();
    }

    @Test
    public void createOrder() throws Exception {
        int databaseSizeBeforeCreate = orderRepository.findAll().size();

        // Create the Order
        restOrderMockMvc.perform(post("/api/orders")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(order)))
            .andExpect(status().isCreated());

        // Validate the Order in the database
        List<Order> orderList = orderRepository.findAll();
        assertThat(orderList).hasSize(databaseSizeBeforeCreate + 1);
        Order testOrder = orderList.get(orderList.size() - 1);
        assertThat(testOrder.getFiles()).isEqualTo(DEFAULT_FILES);
        assertThat(testOrder.getReqInputs()).isEqualTo(DEFAULT_REQ_INPUTS);
        assertThat(testOrder.getReqFormInputs()).isEqualTo(DEFAULT_REQ_FORM_INPUTS);
        assertThat(testOrder.getProduct()).isEqualTo(DEFAULT_PRODUCT);
        assertThat(testOrder.getTransaction()).isEqualTo(DEFAULT_TRANSACTION);
        assertThat(testOrder.getUser()).isEqualTo(DEFAULT_USER);
        assertThat(testOrder.getStatus()).isEqualTo(DEFAULT_STATUS);
        assertThat(testOrder.getRejectReason()).isEqualTo(DEFAULT_REJECT_REASON);
        assertThat(testOrder.getCompany()).isEqualTo(DEFAULT_COMPANY);
        assertThat(testOrder.getPartner()).isEqualTo(DEFAULT_PARTNER);
        assertThat(testOrder.getCountry()).isEqualTo(DEFAULT_COUNTRY);
        assertThat(testOrder.getCreatedAt()).isEqualTo(DEFAULT_CREATED_AT);
        assertThat(testOrder.getUpdatedAt()).isEqualTo(DEFAULT_UPDATED_AT);
        assertThat(testOrder.getExpectedDate()).isEqualTo(DEFAULT_EXPECTED_DATE);
        assertThat(testOrder.getDayTillComplete()).isEqualTo(DEFAULT_DAY_TILL_COMPLETE);
        assertThat(testOrder.getCost()).isEqualTo(DEFAULT_COST);
        assertThat(testOrder.getTurnAroundTime()).isEqualTo(DEFAULT_TURN_AROUND_TIME);
        assertThat(testOrder.getReport()).isEqualTo(DEFAULT_REPORT);
        assertThat(testOrder.getRefereneceId()).isEqualTo(DEFAULT_REFERENECE_ID);
        assertThat(testOrder.getCancellationReason()).isEqualTo(DEFAULT_CANCELLATION_REASON);
        assertThat(testOrder.getClientId()).isEqualTo(DEFAULT_CLIENT_ID);
        assertThat(testOrder.getActive()).isEqualTo(DEFAULT_ACTIVE);
        assertThat(testOrder.getSelected()).isEqualTo(DEFAULT_SELECTED);
        assertThat(testOrder.getApplicationId()).isEqualTo(DEFAULT_APPLICATION_ID);
        assertThat(testOrder.getApplicationServiceIds()).isEqualTo(DEFAULT_APPLICATION_SERVICE_IDS);
        assertThat(testOrder.getiCoverReport()).isEqualTo(DEFAULT_I_COVER_REPORT);
    }

    @Test
    public void createOrderWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = orderRepository.findAll().size();

        // Create the Order with an existing ID
        order.setId("existing_id");

        // An entity with an existing ID cannot be created, so this API call must fail
        restOrderMockMvc.perform(post("/api/orders")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(order)))
            .andExpect(status().isBadRequest());

        // Validate the Order in the database
        List<Order> orderList = orderRepository.findAll();
        assertThat(orderList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    public void getAllOrders() throws Exception {
        // Initialize the database
        orderRepository.save(order);

        // Get all the orderList
        restOrderMockMvc.perform(get("/api/orders?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(order.getId())))
            .andExpect(jsonPath("$.[*].files").value(hasItem(DEFAULT_FILES.toString())))
            .andExpect(jsonPath("$.[*].reqInputs").value(hasItem(DEFAULT_REQ_INPUTS.toString())))
            .andExpect(jsonPath("$.[*].reqFormInputs").value(hasItem(DEFAULT_REQ_FORM_INPUTS.toString())))
            .andExpect(jsonPath("$.[*].product").value(hasItem(DEFAULT_PRODUCT.toString())))
            .andExpect(jsonPath("$.[*].transaction").value(hasItem(DEFAULT_TRANSACTION.toString())))
            .andExpect(jsonPath("$.[*].user").value(hasItem(DEFAULT_USER.toString())))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.toString())))
            .andExpect(jsonPath("$.[*].rejectReason").value(hasItem(DEFAULT_REJECT_REASON.toString())))
            .andExpect(jsonPath("$.[*].company").value(hasItem(DEFAULT_COMPANY.toString())))
            .andExpect(jsonPath("$.[*].partner").value(hasItem(DEFAULT_PARTNER.toString())))
            .andExpect(jsonPath("$.[*].country").value(hasItem(DEFAULT_COUNTRY.toString())))
            .andExpect(jsonPath("$.[*].createdAt").value(hasItem(DEFAULT_CREATED_AT.toString())))
            .andExpect(jsonPath("$.[*].updatedAt").value(hasItem(DEFAULT_UPDATED_AT.toString())))
            .andExpect(jsonPath("$.[*].expectedDate").value(hasItem(DEFAULT_EXPECTED_DATE.toString())))
            .andExpect(jsonPath("$.[*].dayTillComplete").value(hasItem(DEFAULT_DAY_TILL_COMPLETE.toString())))
            .andExpect(jsonPath("$.[*].cost").value(hasItem(DEFAULT_COST.toString())))
            .andExpect(jsonPath("$.[*].turnAroundTime").value(hasItem(DEFAULT_TURN_AROUND_TIME.toString())))
            .andExpect(jsonPath("$.[*].report").value(hasItem(DEFAULT_REPORT.toString())))
            .andExpect(jsonPath("$.[*].refereneceId").value(hasItem(DEFAULT_REFERENECE_ID.toString())))
            .andExpect(jsonPath("$.[*].cancellationReason").value(hasItem(DEFAULT_CANCELLATION_REASON.toString())))
            .andExpect(jsonPath("$.[*].clientId").value(hasItem(DEFAULT_CLIENT_ID.toString())))
            .andExpect(jsonPath("$.[*].active").value(hasItem(DEFAULT_ACTIVE.toString())))
            .andExpect(jsonPath("$.[*].selected").value(hasItem(DEFAULT_SELECTED.toString())))
            .andExpect(jsonPath("$.[*].applicationId").value(hasItem(DEFAULT_APPLICATION_ID.toString())))
            .andExpect(jsonPath("$.[*].applicationServiceIds").value(hasItem(DEFAULT_APPLICATION_SERVICE_IDS.toString())))
            .andExpect(jsonPath("$.[*].iCoverReport").value(hasItem(DEFAULT_I_COVER_REPORT.toString())));
    }
    

    @Test
    public void getOrder() throws Exception {
        // Initialize the database
        orderRepository.save(order);

        // Get the order
        restOrderMockMvc.perform(get("/api/orders/{id}", order.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(order.getId()))
            .andExpect(jsonPath("$.files").value(DEFAULT_FILES.toString()))
            .andExpect(jsonPath("$.reqInputs").value(DEFAULT_REQ_INPUTS.toString()))
            .andExpect(jsonPath("$.reqFormInputs").value(DEFAULT_REQ_FORM_INPUTS.toString()))
            .andExpect(jsonPath("$.product").value(DEFAULT_PRODUCT.toString()))
            .andExpect(jsonPath("$.transaction").value(DEFAULT_TRANSACTION.toString()))
            .andExpect(jsonPath("$.user").value(DEFAULT_USER.toString()))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS.toString()))
            .andExpect(jsonPath("$.rejectReason").value(DEFAULT_REJECT_REASON.toString()))
            .andExpect(jsonPath("$.company").value(DEFAULT_COMPANY.toString()))
            .andExpect(jsonPath("$.partner").value(DEFAULT_PARTNER.toString()))
            .andExpect(jsonPath("$.country").value(DEFAULT_COUNTRY.toString()))
            .andExpect(jsonPath("$.createdAt").value(DEFAULT_CREATED_AT.toString()))
            .andExpect(jsonPath("$.updatedAt").value(DEFAULT_UPDATED_AT.toString()))
            .andExpect(jsonPath("$.expectedDate").value(DEFAULT_EXPECTED_DATE.toString()))
            .andExpect(jsonPath("$.dayTillComplete").value(DEFAULT_DAY_TILL_COMPLETE.toString()))
            .andExpect(jsonPath("$.cost").value(DEFAULT_COST.toString()))
            .andExpect(jsonPath("$.turnAroundTime").value(DEFAULT_TURN_AROUND_TIME.toString()))
            .andExpect(jsonPath("$.report").value(DEFAULT_REPORT.toString()))
            .andExpect(jsonPath("$.refereneceId").value(DEFAULT_REFERENECE_ID.toString()))
            .andExpect(jsonPath("$.cancellationReason").value(DEFAULT_CANCELLATION_REASON.toString()))
            .andExpect(jsonPath("$.clientId").value(DEFAULT_CLIENT_ID.toString()))
            .andExpect(jsonPath("$.active").value(DEFAULT_ACTIVE.toString()))
            .andExpect(jsonPath("$.selected").value(DEFAULT_SELECTED.toString()))
            .andExpect(jsonPath("$.applicationId").value(DEFAULT_APPLICATION_ID.toString()))
            .andExpect(jsonPath("$.applicationServiceIds").value(DEFAULT_APPLICATION_SERVICE_IDS.toString()))
            .andExpect(jsonPath("$.iCoverReport").value(DEFAULT_I_COVER_REPORT.toString()));
    }
    @Test
    public void getNonExistingOrder() throws Exception {
        // Get the order
        restOrderMockMvc.perform(get("/api/orders/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateOrder() throws Exception {
        // Initialize the database
        orderRepository.save(order);

        int databaseSizeBeforeUpdate = orderRepository.findAll().size();

        // Update the order
        Order updatedOrder = orderRepository.findById(order.getId()).get();
        updatedOrder
            .files(UPDATED_FILES)
            .reqInputs(UPDATED_REQ_INPUTS)
            .reqFormInputs(UPDATED_REQ_FORM_INPUTS)
            .product(UPDATED_PRODUCT)
            .transaction(UPDATED_TRANSACTION)
            .user(UPDATED_USER)
            .status(UPDATED_STATUS)
            .rejectReason(UPDATED_REJECT_REASON)
            .company(UPDATED_COMPANY)
            .partner(UPDATED_PARTNER)
            .country(UPDATED_COUNTRY)
            .createdAt(UPDATED_CREATED_AT)
            .updatedAt(UPDATED_UPDATED_AT)
            .expectedDate(UPDATED_EXPECTED_DATE)
            .dayTillComplete(UPDATED_DAY_TILL_COMPLETE)
            .cost(UPDATED_COST)
            .turnAroundTime(UPDATED_TURN_AROUND_TIME)
            .report(UPDATED_REPORT)
            .refereneceId(UPDATED_REFERENECE_ID)
            .cancellationReason(UPDATED_CANCELLATION_REASON)
            .clientId(UPDATED_CLIENT_ID)
            .active(UPDATED_ACTIVE)
            .selected(UPDATED_SELECTED)
            .applicationId(UPDATED_APPLICATION_ID)
            .applicationServiceIds(UPDATED_APPLICATION_SERVICE_IDS)
            .iCoverReport(UPDATED_I_COVER_REPORT);

        restOrderMockMvc.perform(put("/api/orders")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedOrder)))
            .andExpect(status().isOk());

        // Validate the Order in the database
        List<Order> orderList = orderRepository.findAll();
        assertThat(orderList).hasSize(databaseSizeBeforeUpdate);
        Order testOrder = orderList.get(orderList.size() - 1);
        assertThat(testOrder.getFiles()).isEqualTo(UPDATED_FILES);
        assertThat(testOrder.getReqInputs()).isEqualTo(UPDATED_REQ_INPUTS);
        assertThat(testOrder.getReqFormInputs()).isEqualTo(UPDATED_REQ_FORM_INPUTS);
        assertThat(testOrder.getProduct()).isEqualTo(UPDATED_PRODUCT);
        assertThat(testOrder.getTransaction()).isEqualTo(UPDATED_TRANSACTION);
        assertThat(testOrder.getUser()).isEqualTo(UPDATED_USER);
        assertThat(testOrder.getStatus()).isEqualTo(UPDATED_STATUS);
        assertThat(testOrder.getRejectReason()).isEqualTo(UPDATED_REJECT_REASON);
        assertThat(testOrder.getCompany()).isEqualTo(UPDATED_COMPANY);
        assertThat(testOrder.getPartner()).isEqualTo(UPDATED_PARTNER);
        assertThat(testOrder.getCountry()).isEqualTo(UPDATED_COUNTRY);
        assertThat(testOrder.getCreatedAt()).isEqualTo(UPDATED_CREATED_AT);
        assertThat(testOrder.getUpdatedAt()).isEqualTo(UPDATED_UPDATED_AT);
        assertThat(testOrder.getExpectedDate()).isEqualTo(UPDATED_EXPECTED_DATE);
        assertThat(testOrder.getDayTillComplete()).isEqualTo(UPDATED_DAY_TILL_COMPLETE);
        assertThat(testOrder.getCost()).isEqualTo(UPDATED_COST);
        assertThat(testOrder.getTurnAroundTime()).isEqualTo(UPDATED_TURN_AROUND_TIME);
        assertThat(testOrder.getReport()).isEqualTo(UPDATED_REPORT);
        assertThat(testOrder.getRefereneceId()).isEqualTo(UPDATED_REFERENECE_ID);
        assertThat(testOrder.getCancellationReason()).isEqualTo(UPDATED_CANCELLATION_REASON);
        assertThat(testOrder.getClientId()).isEqualTo(UPDATED_CLIENT_ID);
        assertThat(testOrder.getActive()).isEqualTo(UPDATED_ACTIVE);
        assertThat(testOrder.getSelected()).isEqualTo(UPDATED_SELECTED);
        assertThat(testOrder.getApplicationId()).isEqualTo(UPDATED_APPLICATION_ID);
        assertThat(testOrder.getApplicationServiceIds()).isEqualTo(UPDATED_APPLICATION_SERVICE_IDS);
        assertThat(testOrder.getiCoverReport()).isEqualTo(UPDATED_I_COVER_REPORT);
    }

    @Test
    public void updateNonExistingOrder() throws Exception {
        int databaseSizeBeforeUpdate = orderRepository.findAll().size();

        // Create the Order

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restOrderMockMvc.perform(put("/api/orders")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(order)))
            .andExpect(status().isBadRequest());

        // Validate the Order in the database
        List<Order> orderList = orderRepository.findAll();
        assertThat(orderList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    public void deleteOrder() throws Exception {
        // Initialize the database
        orderRepository.save(order);

        int databaseSizeBeforeDelete = orderRepository.findAll().size();

        // Get the order
        restOrderMockMvc.perform(delete("/api/orders/{id}", order.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Order> orderList = orderRepository.findAll();
        assertThat(orderList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Order.class);
        Order order1 = new Order();
        order1.setId("id1");
        Order order2 = new Order();
        order2.setId(order1.getId());
        assertThat(order1).isEqualTo(order2);
        order2.setId("id2");
        assertThat(order1).isNotEqualTo(order2);
        order1.setId(null);
        assertThat(order1).isNotEqualTo(order2);
    }
}
