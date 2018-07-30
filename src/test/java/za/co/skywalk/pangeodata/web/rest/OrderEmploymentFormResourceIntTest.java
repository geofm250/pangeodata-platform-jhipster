package za.co.skywalk.pangeodata.web.rest;

import za.co.skywalk.pangeodata.PangeodataJHipsterApp;

import za.co.skywalk.pangeodata.domain.OrderEmploymentForm;
import za.co.skywalk.pangeodata.repository.OrderEmploymentFormRepository;
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
 * Test class for the OrderEmploymentFormResource REST controller.
 *
 * @see OrderEmploymentFormResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = PangeodataJHipsterApp.class)
public class OrderEmploymentFormResourceIntTest {

    private static final String DEFAULT_EMPLOYER_NAME = "AAAAAAAAAA";
    private static final String UPDATED_EMPLOYER_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_MANAGER_NAME = "AAAAAAAAAA";
    private static final String UPDATED_MANAGER_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_ENDING_PAY = "AAAAAAAAAA";
    private static final String UPDATED_ENDING_PAY = "BBBBBBBBBB";

    private static final String DEFAULT_REHIRE_ELIGIBILITY = "AAAAAAAAAA";
    private static final String UPDATED_REHIRE_ELIGIBILITY = "BBBBBBBBBB";

    private static final String DEFAULT_INSTITUTION_LOCAL_NAME = "AAAAAAAAAA";
    private static final String UPDATED_INSTITUTION_LOCAL_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_SOURCE_WEBSITE = "AAAAAAAAAA";
    private static final String UPDATED_SOURCE_WEBSITE = "BBBBBBBBBB";

    private static final String DEFAULT_SOURCE_PHONE = "AAAAAAAAAA";
    private static final String UPDATED_SOURCE_PHONE = "BBBBBBBBBB";

    private static final String DEFAULT_SOURCE_EMAIL = "AAAAAAAAAA";
    private static final String UPDATED_SOURCE_EMAIL = "BBBBBBBBBB";

    private static final String DEFAULT_PRESENT = "AAAAAAAAAA";
    private static final String UPDATED_PRESENT = "BBBBBBBBBB";

    private static final String DEFAULT_EMPLOYMENT_START_DATE = "AAAAAAAAAA";
    private static final String UPDATED_EMPLOYMENT_START_DATE = "BBBBBBBBBB";

    private static final String DEFAULT_EMPLOYMENT_END_DATE = "AAAAAAAAAA";
    private static final String UPDATED_EMPLOYMENT_END_DATE = "BBBBBBBBBB";

    private static final String DEFAULT_ENDING_POSITION = "AAAAAAAAAA";
    private static final String UPDATED_ENDING_POSITION = "BBBBBBBBBB";

    private static final String DEFAULT_STARTING_POSITION = "AAAAAAAAAA";
    private static final String UPDATED_STARTING_POSITION = "BBBBBBBBBB";

    private static final String DEFAULT_STARTING_PAY = "AAAAAAAAAA";
    private static final String UPDATED_STARTING_PAY = "BBBBBBBBBB";

    private static final String DEFAULT_STREET = "AAAAAAAAAA";
    private static final String UPDATED_STREET = "BBBBBBBBBB";

    private static final String DEFAULT_POSTAL_CODE = "AAAAAAAAAA";
    private static final String UPDATED_POSTAL_CODE = "BBBBBBBBBB";

    private static final String DEFAULT_REASON_FOR_LEAVING = "AAAAAAAAAA";
    private static final String UPDATED_REASON_FOR_LEAVING = "BBBBBBBBBB";

    private static final String DEFAULT_NOTES = "AAAAAAAAAA";
    private static final String UPDATED_NOTES = "BBBBBBBBBB";

    @Autowired
    private OrderEmploymentFormRepository orderEmploymentFormRepository;


    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    private MockMvc restOrderEmploymentFormMockMvc;

    private OrderEmploymentForm orderEmploymentForm;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final OrderEmploymentFormResource orderEmploymentFormResource = new OrderEmploymentFormResource(orderEmploymentFormRepository);
        this.restOrderEmploymentFormMockMvc = MockMvcBuilders.standaloneSetup(orderEmploymentFormResource)
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
    public static OrderEmploymentForm createEntity() {
        OrderEmploymentForm orderEmploymentForm = new OrderEmploymentForm()
            .employerName(DEFAULT_EMPLOYER_NAME)
            .managerName(DEFAULT_MANAGER_NAME)
            .endingPay(DEFAULT_ENDING_PAY)
            .rehireEligibility(DEFAULT_REHIRE_ELIGIBILITY)
            .institutionLocalName(DEFAULT_INSTITUTION_LOCAL_NAME)
            .sourceWebsite(DEFAULT_SOURCE_WEBSITE)
            .sourcePhone(DEFAULT_SOURCE_PHONE)
            .sourceEmail(DEFAULT_SOURCE_EMAIL)
            .present(DEFAULT_PRESENT)
            .employmentStartDate(DEFAULT_EMPLOYMENT_START_DATE)
            .employmentEndDate(DEFAULT_EMPLOYMENT_END_DATE)
            .endingPosition(DEFAULT_ENDING_POSITION)
            .startingPosition(DEFAULT_STARTING_POSITION)
            .startingPay(DEFAULT_STARTING_PAY)
            .street(DEFAULT_STREET)
            .postalCode(DEFAULT_POSTAL_CODE)
            .reasonForLeaving(DEFAULT_REASON_FOR_LEAVING)
            .notes(DEFAULT_NOTES);
        return orderEmploymentForm;
    }

    @Before
    public void initTest() {
        orderEmploymentFormRepository.deleteAll();
        orderEmploymentForm = createEntity();
    }

    @Test
    public void createOrderEmploymentForm() throws Exception {
        int databaseSizeBeforeCreate = orderEmploymentFormRepository.findAll().size();

        // Create the OrderEmploymentForm
        restOrderEmploymentFormMockMvc.perform(post("/api/order-employment-forms")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(orderEmploymentForm)))
            .andExpect(status().isCreated());

        // Validate the OrderEmploymentForm in the database
        List<OrderEmploymentForm> orderEmploymentFormList = orderEmploymentFormRepository.findAll();
        assertThat(orderEmploymentFormList).hasSize(databaseSizeBeforeCreate + 1);
        OrderEmploymentForm testOrderEmploymentForm = orderEmploymentFormList.get(orderEmploymentFormList.size() - 1);
        assertThat(testOrderEmploymentForm.getEmployerName()).isEqualTo(DEFAULT_EMPLOYER_NAME);
        assertThat(testOrderEmploymentForm.getManagerName()).isEqualTo(DEFAULT_MANAGER_NAME);
        assertThat(testOrderEmploymentForm.getEndingPay()).isEqualTo(DEFAULT_ENDING_PAY);
        assertThat(testOrderEmploymentForm.getRehireEligibility()).isEqualTo(DEFAULT_REHIRE_ELIGIBILITY);
        assertThat(testOrderEmploymentForm.getInstitutionLocalName()).isEqualTo(DEFAULT_INSTITUTION_LOCAL_NAME);
        assertThat(testOrderEmploymentForm.getSourceWebsite()).isEqualTo(DEFAULT_SOURCE_WEBSITE);
        assertThat(testOrderEmploymentForm.getSourcePhone()).isEqualTo(DEFAULT_SOURCE_PHONE);
        assertThat(testOrderEmploymentForm.getSourceEmail()).isEqualTo(DEFAULT_SOURCE_EMAIL);
        assertThat(testOrderEmploymentForm.getPresent()).isEqualTo(DEFAULT_PRESENT);
        assertThat(testOrderEmploymentForm.getEmploymentStartDate()).isEqualTo(DEFAULT_EMPLOYMENT_START_DATE);
        assertThat(testOrderEmploymentForm.getEmploymentEndDate()).isEqualTo(DEFAULT_EMPLOYMENT_END_DATE);
        assertThat(testOrderEmploymentForm.getEndingPosition()).isEqualTo(DEFAULT_ENDING_POSITION);
        assertThat(testOrderEmploymentForm.getStartingPosition()).isEqualTo(DEFAULT_STARTING_POSITION);
        assertThat(testOrderEmploymentForm.getStartingPay()).isEqualTo(DEFAULT_STARTING_PAY);
        assertThat(testOrderEmploymentForm.getStreet()).isEqualTo(DEFAULT_STREET);
        assertThat(testOrderEmploymentForm.getPostalCode()).isEqualTo(DEFAULT_POSTAL_CODE);
        assertThat(testOrderEmploymentForm.getReasonForLeaving()).isEqualTo(DEFAULT_REASON_FOR_LEAVING);
        assertThat(testOrderEmploymentForm.getNotes()).isEqualTo(DEFAULT_NOTES);
    }

    @Test
    public void createOrderEmploymentFormWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = orderEmploymentFormRepository.findAll().size();

        // Create the OrderEmploymentForm with an existing ID
        orderEmploymentForm.setId("existing_id");

        // An entity with an existing ID cannot be created, so this API call must fail
        restOrderEmploymentFormMockMvc.perform(post("/api/order-employment-forms")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(orderEmploymentForm)))
            .andExpect(status().isBadRequest());

        // Validate the OrderEmploymentForm in the database
        List<OrderEmploymentForm> orderEmploymentFormList = orderEmploymentFormRepository.findAll();
        assertThat(orderEmploymentFormList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    public void getAllOrderEmploymentForms() throws Exception {
        // Initialize the database
        orderEmploymentFormRepository.save(orderEmploymentForm);

        // Get all the orderEmploymentFormList
        restOrderEmploymentFormMockMvc.perform(get("/api/order-employment-forms?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(orderEmploymentForm.getId())))
            .andExpect(jsonPath("$.[*].employerName").value(hasItem(DEFAULT_EMPLOYER_NAME.toString())))
            .andExpect(jsonPath("$.[*].managerName").value(hasItem(DEFAULT_MANAGER_NAME.toString())))
            .andExpect(jsonPath("$.[*].endingPay").value(hasItem(DEFAULT_ENDING_PAY.toString())))
            .andExpect(jsonPath("$.[*].rehireEligibility").value(hasItem(DEFAULT_REHIRE_ELIGIBILITY.toString())))
            .andExpect(jsonPath("$.[*].institutionLocalName").value(hasItem(DEFAULT_INSTITUTION_LOCAL_NAME.toString())))
            .andExpect(jsonPath("$.[*].sourceWebsite").value(hasItem(DEFAULT_SOURCE_WEBSITE.toString())))
            .andExpect(jsonPath("$.[*].sourcePhone").value(hasItem(DEFAULT_SOURCE_PHONE.toString())))
            .andExpect(jsonPath("$.[*].sourceEmail").value(hasItem(DEFAULT_SOURCE_EMAIL.toString())))
            .andExpect(jsonPath("$.[*].present").value(hasItem(DEFAULT_PRESENT.toString())))
            .andExpect(jsonPath("$.[*].employmentStartDate").value(hasItem(DEFAULT_EMPLOYMENT_START_DATE.toString())))
            .andExpect(jsonPath("$.[*].employmentEndDate").value(hasItem(DEFAULT_EMPLOYMENT_END_DATE.toString())))
            .andExpect(jsonPath("$.[*].endingPosition").value(hasItem(DEFAULT_ENDING_POSITION.toString())))
            .andExpect(jsonPath("$.[*].startingPosition").value(hasItem(DEFAULT_STARTING_POSITION.toString())))
            .andExpect(jsonPath("$.[*].startingPay").value(hasItem(DEFAULT_STARTING_PAY.toString())))
            .andExpect(jsonPath("$.[*].street").value(hasItem(DEFAULT_STREET.toString())))
            .andExpect(jsonPath("$.[*].postalCode").value(hasItem(DEFAULT_POSTAL_CODE.toString())))
            .andExpect(jsonPath("$.[*].reasonForLeaving").value(hasItem(DEFAULT_REASON_FOR_LEAVING.toString())))
            .andExpect(jsonPath("$.[*].notes").value(hasItem(DEFAULT_NOTES.toString())));
    }
    

    @Test
    public void getOrderEmploymentForm() throws Exception {
        // Initialize the database
        orderEmploymentFormRepository.save(orderEmploymentForm);

        // Get the orderEmploymentForm
        restOrderEmploymentFormMockMvc.perform(get("/api/order-employment-forms/{id}", orderEmploymentForm.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(orderEmploymentForm.getId()))
            .andExpect(jsonPath("$.employerName").value(DEFAULT_EMPLOYER_NAME.toString()))
            .andExpect(jsonPath("$.managerName").value(DEFAULT_MANAGER_NAME.toString()))
            .andExpect(jsonPath("$.endingPay").value(DEFAULT_ENDING_PAY.toString()))
            .andExpect(jsonPath("$.rehireEligibility").value(DEFAULT_REHIRE_ELIGIBILITY.toString()))
            .andExpect(jsonPath("$.institutionLocalName").value(DEFAULT_INSTITUTION_LOCAL_NAME.toString()))
            .andExpect(jsonPath("$.sourceWebsite").value(DEFAULT_SOURCE_WEBSITE.toString()))
            .andExpect(jsonPath("$.sourcePhone").value(DEFAULT_SOURCE_PHONE.toString()))
            .andExpect(jsonPath("$.sourceEmail").value(DEFAULT_SOURCE_EMAIL.toString()))
            .andExpect(jsonPath("$.present").value(DEFAULT_PRESENT.toString()))
            .andExpect(jsonPath("$.employmentStartDate").value(DEFAULT_EMPLOYMENT_START_DATE.toString()))
            .andExpect(jsonPath("$.employmentEndDate").value(DEFAULT_EMPLOYMENT_END_DATE.toString()))
            .andExpect(jsonPath("$.endingPosition").value(DEFAULT_ENDING_POSITION.toString()))
            .andExpect(jsonPath("$.startingPosition").value(DEFAULT_STARTING_POSITION.toString()))
            .andExpect(jsonPath("$.startingPay").value(DEFAULT_STARTING_PAY.toString()))
            .andExpect(jsonPath("$.street").value(DEFAULT_STREET.toString()))
            .andExpect(jsonPath("$.postalCode").value(DEFAULT_POSTAL_CODE.toString()))
            .andExpect(jsonPath("$.reasonForLeaving").value(DEFAULT_REASON_FOR_LEAVING.toString()))
            .andExpect(jsonPath("$.notes").value(DEFAULT_NOTES.toString()));
    }
    @Test
    public void getNonExistingOrderEmploymentForm() throws Exception {
        // Get the orderEmploymentForm
        restOrderEmploymentFormMockMvc.perform(get("/api/order-employment-forms/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateOrderEmploymentForm() throws Exception {
        // Initialize the database
        orderEmploymentFormRepository.save(orderEmploymentForm);

        int databaseSizeBeforeUpdate = orderEmploymentFormRepository.findAll().size();

        // Update the orderEmploymentForm
        OrderEmploymentForm updatedOrderEmploymentForm = orderEmploymentFormRepository.findById(orderEmploymentForm.getId()).get();
        updatedOrderEmploymentForm
            .employerName(UPDATED_EMPLOYER_NAME)
            .managerName(UPDATED_MANAGER_NAME)
            .endingPay(UPDATED_ENDING_PAY)
            .rehireEligibility(UPDATED_REHIRE_ELIGIBILITY)
            .institutionLocalName(UPDATED_INSTITUTION_LOCAL_NAME)
            .sourceWebsite(UPDATED_SOURCE_WEBSITE)
            .sourcePhone(UPDATED_SOURCE_PHONE)
            .sourceEmail(UPDATED_SOURCE_EMAIL)
            .present(UPDATED_PRESENT)
            .employmentStartDate(UPDATED_EMPLOYMENT_START_DATE)
            .employmentEndDate(UPDATED_EMPLOYMENT_END_DATE)
            .endingPosition(UPDATED_ENDING_POSITION)
            .startingPosition(UPDATED_STARTING_POSITION)
            .startingPay(UPDATED_STARTING_PAY)
            .street(UPDATED_STREET)
            .postalCode(UPDATED_POSTAL_CODE)
            .reasonForLeaving(UPDATED_REASON_FOR_LEAVING)
            .notes(UPDATED_NOTES);

        restOrderEmploymentFormMockMvc.perform(put("/api/order-employment-forms")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedOrderEmploymentForm)))
            .andExpect(status().isOk());

        // Validate the OrderEmploymentForm in the database
        List<OrderEmploymentForm> orderEmploymentFormList = orderEmploymentFormRepository.findAll();
        assertThat(orderEmploymentFormList).hasSize(databaseSizeBeforeUpdate);
        OrderEmploymentForm testOrderEmploymentForm = orderEmploymentFormList.get(orderEmploymentFormList.size() - 1);
        assertThat(testOrderEmploymentForm.getEmployerName()).isEqualTo(UPDATED_EMPLOYER_NAME);
        assertThat(testOrderEmploymentForm.getManagerName()).isEqualTo(UPDATED_MANAGER_NAME);
        assertThat(testOrderEmploymentForm.getEndingPay()).isEqualTo(UPDATED_ENDING_PAY);
        assertThat(testOrderEmploymentForm.getRehireEligibility()).isEqualTo(UPDATED_REHIRE_ELIGIBILITY);
        assertThat(testOrderEmploymentForm.getInstitutionLocalName()).isEqualTo(UPDATED_INSTITUTION_LOCAL_NAME);
        assertThat(testOrderEmploymentForm.getSourceWebsite()).isEqualTo(UPDATED_SOURCE_WEBSITE);
        assertThat(testOrderEmploymentForm.getSourcePhone()).isEqualTo(UPDATED_SOURCE_PHONE);
        assertThat(testOrderEmploymentForm.getSourceEmail()).isEqualTo(UPDATED_SOURCE_EMAIL);
        assertThat(testOrderEmploymentForm.getPresent()).isEqualTo(UPDATED_PRESENT);
        assertThat(testOrderEmploymentForm.getEmploymentStartDate()).isEqualTo(UPDATED_EMPLOYMENT_START_DATE);
        assertThat(testOrderEmploymentForm.getEmploymentEndDate()).isEqualTo(UPDATED_EMPLOYMENT_END_DATE);
        assertThat(testOrderEmploymentForm.getEndingPosition()).isEqualTo(UPDATED_ENDING_POSITION);
        assertThat(testOrderEmploymentForm.getStartingPosition()).isEqualTo(UPDATED_STARTING_POSITION);
        assertThat(testOrderEmploymentForm.getStartingPay()).isEqualTo(UPDATED_STARTING_PAY);
        assertThat(testOrderEmploymentForm.getStreet()).isEqualTo(UPDATED_STREET);
        assertThat(testOrderEmploymentForm.getPostalCode()).isEqualTo(UPDATED_POSTAL_CODE);
        assertThat(testOrderEmploymentForm.getReasonForLeaving()).isEqualTo(UPDATED_REASON_FOR_LEAVING);
        assertThat(testOrderEmploymentForm.getNotes()).isEqualTo(UPDATED_NOTES);
    }

    @Test
    public void updateNonExistingOrderEmploymentForm() throws Exception {
        int databaseSizeBeforeUpdate = orderEmploymentFormRepository.findAll().size();

        // Create the OrderEmploymentForm

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restOrderEmploymentFormMockMvc.perform(put("/api/order-employment-forms")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(orderEmploymentForm)))
            .andExpect(status().isBadRequest());

        // Validate the OrderEmploymentForm in the database
        List<OrderEmploymentForm> orderEmploymentFormList = orderEmploymentFormRepository.findAll();
        assertThat(orderEmploymentFormList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    public void deleteOrderEmploymentForm() throws Exception {
        // Initialize the database
        orderEmploymentFormRepository.save(orderEmploymentForm);

        int databaseSizeBeforeDelete = orderEmploymentFormRepository.findAll().size();

        // Get the orderEmploymentForm
        restOrderEmploymentFormMockMvc.perform(delete("/api/order-employment-forms/{id}", orderEmploymentForm.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<OrderEmploymentForm> orderEmploymentFormList = orderEmploymentFormRepository.findAll();
        assertThat(orderEmploymentFormList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(OrderEmploymentForm.class);
        OrderEmploymentForm orderEmploymentForm1 = new OrderEmploymentForm();
        orderEmploymentForm1.setId("id1");
        OrderEmploymentForm orderEmploymentForm2 = new OrderEmploymentForm();
        orderEmploymentForm2.setId(orderEmploymentForm1.getId());
        assertThat(orderEmploymentForm1).isEqualTo(orderEmploymentForm2);
        orderEmploymentForm2.setId("id2");
        assertThat(orderEmploymentForm1).isNotEqualTo(orderEmploymentForm2);
        orderEmploymentForm1.setId(null);
        assertThat(orderEmploymentForm1).isNotEqualTo(orderEmploymentForm2);
    }
}
