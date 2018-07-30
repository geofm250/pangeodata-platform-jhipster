package za.co.skywalk.pangeodata.web.rest;

import za.co.skywalk.pangeodata.PangeodataJHipsterApp;

import za.co.skywalk.pangeodata.domain.OrderEducationForm;
import za.co.skywalk.pangeodata.repository.OrderEducationFormRepository;
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
 * Test class for the OrderEducationFormResource REST controller.
 *
 * @see OrderEducationFormResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = PangeodataJHipsterApp.class)
public class OrderEducationFormResourceIntTest {

    private static final String DEFAULT_TYPE_DIPLOMA = "AAAAAAAAAA";
    private static final String UPDATED_TYPE_DIPLOMA = "BBBBBBBBBB";

    private static final String DEFAULT_NAME_OF_INSTITUTION = "AAAAAAAAAA";
    private static final String UPDATED_NAME_OF_INSTITUTION = "BBBBBBBBBB";

    private static final String DEFAULT_INSTITUTION_LOCAL_NAME = "AAAAAAAAAA";
    private static final String UPDATED_INSTITUTION_LOCAL_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_SUBJECT = "AAAAAAAAAA";
    private static final String UPDATED_SUBJECT = "BBBBBBBBBB";

    private static final String DEFAULT_PERFORMANCE = "AAAAAAAAAA";
    private static final String UPDATED_PERFORMANCE = "BBBBBBBBBB";

    private static final String DEFAULT_TYPE_OF_INSTITUTION = "AAAAAAAAAA";
    private static final String UPDATED_TYPE_OF_INSTITUTION = "BBBBBBBBBB";

    private static final String DEFAULT_SOURCE_WEBSITE = "AAAAAAAAAA";
    private static final String UPDATED_SOURCE_WEBSITE = "BBBBBBBBBB";

    private static final String DEFAULT_SOURCE_NAME = "AAAAAAAAAA";
    private static final String UPDATED_SOURCE_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_SOURCE_PHONE = "AAAAAAAAAA";
    private static final String UPDATED_SOURCE_PHONE = "BBBBBBBBBB";

    private static final String DEFAULT_SOURCE_EMAIL = "AAAAAAAAAA";
    private static final String UPDATED_SOURCE_EMAIL = "BBBBBBBBBB";

    private static final String DEFAULT_PRESENT = "AAAAAAAAAA";
    private static final String UPDATED_PRESENT = "BBBBBBBBBB";

    private static final String DEFAULT_ATTENDANCE_START_DATE = "AAAAAAAAAA";
    private static final String UPDATED_ATTENDANCE_START_DATE = "BBBBBBBBBB";

    private static final String DEFAULT_ATTENDANCE_END_DATE = "AAAAAAAAAA";
    private static final String UPDATED_ATTENDANCE_END_DATE = "BBBBBBBBBB";

    private static final String DEFAULT_DIPLOMA_AWARD_DATE = "AAAAAAAAAA";
    private static final String UPDATED_DIPLOMA_AWARD_DATE = "BBBBBBBBBB";

    private static final String DEFAULT_STUDENT_REGISTRATION_NO = "AAAAAAAAAA";
    private static final String UPDATED_STUDENT_REGISTRATION_NO = "BBBBBBBBBB";

    private static final String DEFAULT_TOWN = "AAAAAAAAAA";
    private static final String UPDATED_TOWN = "BBBBBBBBBB";

    private static final String DEFAULT_STATE = "AAAAAAAAAA";
    private static final String UPDATED_STATE = "BBBBBBBBBB";

    private static final String DEFAULT_COUNTRY = "AAAAAAAAAA";
    private static final String UPDATED_COUNTRY = "BBBBBBBBBB";

    private static final String DEFAULT_POSTAL_CODE = "AAAAAAAAAA";
    private static final String UPDATED_POSTAL_CODE = "BBBBBBBBBB";

    private static final String DEFAULT_NOTES = "AAAAAAAAAA";
    private static final String UPDATED_NOTES = "BBBBBBBBBB";

    @Autowired
    private OrderEducationFormRepository orderEducationFormRepository;


    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    private MockMvc restOrderEducationFormMockMvc;

    private OrderEducationForm orderEducationForm;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final OrderEducationFormResource orderEducationFormResource = new OrderEducationFormResource(orderEducationFormRepository);
        this.restOrderEducationFormMockMvc = MockMvcBuilders.standaloneSetup(orderEducationFormResource)
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
    public static OrderEducationForm createEntity() {
        OrderEducationForm orderEducationForm = new OrderEducationForm()
            .typeDiploma(DEFAULT_TYPE_DIPLOMA)
            .nameOfInstitution(DEFAULT_NAME_OF_INSTITUTION)
            .institutionLocalName(DEFAULT_INSTITUTION_LOCAL_NAME)
            .subject(DEFAULT_SUBJECT)
            .performance(DEFAULT_PERFORMANCE)
            .typeOfInstitution(DEFAULT_TYPE_OF_INSTITUTION)
            .sourceWebsite(DEFAULT_SOURCE_WEBSITE)
            .sourceName(DEFAULT_SOURCE_NAME)
            .sourcePhone(DEFAULT_SOURCE_PHONE)
            .sourceEmail(DEFAULT_SOURCE_EMAIL)
            .present(DEFAULT_PRESENT)
            .attendanceStartDate(DEFAULT_ATTENDANCE_START_DATE)
            .attendanceEndDate(DEFAULT_ATTENDANCE_END_DATE)
            .diplomaAwardDate(DEFAULT_DIPLOMA_AWARD_DATE)
            .studentRegistrationNo(DEFAULT_STUDENT_REGISTRATION_NO)
            .town(DEFAULT_TOWN)
            .state(DEFAULT_STATE)
            .country(DEFAULT_COUNTRY)
            .postalCode(DEFAULT_POSTAL_CODE)
            .notes(DEFAULT_NOTES);
        return orderEducationForm;
    }

    @Before
    public void initTest() {
        orderEducationFormRepository.deleteAll();
        orderEducationForm = createEntity();
    }

    @Test
    public void createOrderEducationForm() throws Exception {
        int databaseSizeBeforeCreate = orderEducationFormRepository.findAll().size();

        // Create the OrderEducationForm
        restOrderEducationFormMockMvc.perform(post("/api/order-education-forms")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(orderEducationForm)))
            .andExpect(status().isCreated());

        // Validate the OrderEducationForm in the database
        List<OrderEducationForm> orderEducationFormList = orderEducationFormRepository.findAll();
        assertThat(orderEducationFormList).hasSize(databaseSizeBeforeCreate + 1);
        OrderEducationForm testOrderEducationForm = orderEducationFormList.get(orderEducationFormList.size() - 1);
        assertThat(testOrderEducationForm.getTypeDiploma()).isEqualTo(DEFAULT_TYPE_DIPLOMA);
        assertThat(testOrderEducationForm.getNameOfInstitution()).isEqualTo(DEFAULT_NAME_OF_INSTITUTION);
        assertThat(testOrderEducationForm.getInstitutionLocalName()).isEqualTo(DEFAULT_INSTITUTION_LOCAL_NAME);
        assertThat(testOrderEducationForm.getSubject()).isEqualTo(DEFAULT_SUBJECT);
        assertThat(testOrderEducationForm.getPerformance()).isEqualTo(DEFAULT_PERFORMANCE);
        assertThat(testOrderEducationForm.getTypeOfInstitution()).isEqualTo(DEFAULT_TYPE_OF_INSTITUTION);
        assertThat(testOrderEducationForm.getSourceWebsite()).isEqualTo(DEFAULT_SOURCE_WEBSITE);
        assertThat(testOrderEducationForm.getSourceName()).isEqualTo(DEFAULT_SOURCE_NAME);
        assertThat(testOrderEducationForm.getSourcePhone()).isEqualTo(DEFAULT_SOURCE_PHONE);
        assertThat(testOrderEducationForm.getSourceEmail()).isEqualTo(DEFAULT_SOURCE_EMAIL);
        assertThat(testOrderEducationForm.getPresent()).isEqualTo(DEFAULT_PRESENT);
        assertThat(testOrderEducationForm.getAttendanceStartDate()).isEqualTo(DEFAULT_ATTENDANCE_START_DATE);
        assertThat(testOrderEducationForm.getAttendanceEndDate()).isEqualTo(DEFAULT_ATTENDANCE_END_DATE);
        assertThat(testOrderEducationForm.getDiplomaAwardDate()).isEqualTo(DEFAULT_DIPLOMA_AWARD_DATE);
        assertThat(testOrderEducationForm.getStudentRegistrationNo()).isEqualTo(DEFAULT_STUDENT_REGISTRATION_NO);
        assertThat(testOrderEducationForm.getTown()).isEqualTo(DEFAULT_TOWN);
        assertThat(testOrderEducationForm.getState()).isEqualTo(DEFAULT_STATE);
        assertThat(testOrderEducationForm.getCountry()).isEqualTo(DEFAULT_COUNTRY);
        assertThat(testOrderEducationForm.getPostalCode()).isEqualTo(DEFAULT_POSTAL_CODE);
        assertThat(testOrderEducationForm.getNotes()).isEqualTo(DEFAULT_NOTES);
    }

    @Test
    public void createOrderEducationFormWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = orderEducationFormRepository.findAll().size();

        // Create the OrderEducationForm with an existing ID
        orderEducationForm.setId("existing_id");

        // An entity with an existing ID cannot be created, so this API call must fail
        restOrderEducationFormMockMvc.perform(post("/api/order-education-forms")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(orderEducationForm)))
            .andExpect(status().isBadRequest());

        // Validate the OrderEducationForm in the database
        List<OrderEducationForm> orderEducationFormList = orderEducationFormRepository.findAll();
        assertThat(orderEducationFormList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    public void getAllOrderEducationForms() throws Exception {
        // Initialize the database
        orderEducationFormRepository.save(orderEducationForm);

        // Get all the orderEducationFormList
        restOrderEducationFormMockMvc.perform(get("/api/order-education-forms?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(orderEducationForm.getId())))
            .andExpect(jsonPath("$.[*].typeDiploma").value(hasItem(DEFAULT_TYPE_DIPLOMA.toString())))
            .andExpect(jsonPath("$.[*].nameOfInstitution").value(hasItem(DEFAULT_NAME_OF_INSTITUTION.toString())))
            .andExpect(jsonPath("$.[*].institutionLocalName").value(hasItem(DEFAULT_INSTITUTION_LOCAL_NAME.toString())))
            .andExpect(jsonPath("$.[*].subject").value(hasItem(DEFAULT_SUBJECT.toString())))
            .andExpect(jsonPath("$.[*].performance").value(hasItem(DEFAULT_PERFORMANCE.toString())))
            .andExpect(jsonPath("$.[*].typeOfInstitution").value(hasItem(DEFAULT_TYPE_OF_INSTITUTION.toString())))
            .andExpect(jsonPath("$.[*].sourceWebsite").value(hasItem(DEFAULT_SOURCE_WEBSITE.toString())))
            .andExpect(jsonPath("$.[*].sourceName").value(hasItem(DEFAULT_SOURCE_NAME.toString())))
            .andExpect(jsonPath("$.[*].sourcePhone").value(hasItem(DEFAULT_SOURCE_PHONE.toString())))
            .andExpect(jsonPath("$.[*].sourceEmail").value(hasItem(DEFAULT_SOURCE_EMAIL.toString())))
            .andExpect(jsonPath("$.[*].present").value(hasItem(DEFAULT_PRESENT.toString())))
            .andExpect(jsonPath("$.[*].attendanceStartDate").value(hasItem(DEFAULT_ATTENDANCE_START_DATE.toString())))
            .andExpect(jsonPath("$.[*].attendanceEndDate").value(hasItem(DEFAULT_ATTENDANCE_END_DATE.toString())))
            .andExpect(jsonPath("$.[*].diplomaAwardDate").value(hasItem(DEFAULT_DIPLOMA_AWARD_DATE.toString())))
            .andExpect(jsonPath("$.[*].studentRegistrationNo").value(hasItem(DEFAULT_STUDENT_REGISTRATION_NO.toString())))
            .andExpect(jsonPath("$.[*].town").value(hasItem(DEFAULT_TOWN.toString())))
            .andExpect(jsonPath("$.[*].state").value(hasItem(DEFAULT_STATE.toString())))
            .andExpect(jsonPath("$.[*].country").value(hasItem(DEFAULT_COUNTRY.toString())))
            .andExpect(jsonPath("$.[*].postalCode").value(hasItem(DEFAULT_POSTAL_CODE.toString())))
            .andExpect(jsonPath("$.[*].notes").value(hasItem(DEFAULT_NOTES.toString())));
    }
    

    @Test
    public void getOrderEducationForm() throws Exception {
        // Initialize the database
        orderEducationFormRepository.save(orderEducationForm);

        // Get the orderEducationForm
        restOrderEducationFormMockMvc.perform(get("/api/order-education-forms/{id}", orderEducationForm.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(orderEducationForm.getId()))
            .andExpect(jsonPath("$.typeDiploma").value(DEFAULT_TYPE_DIPLOMA.toString()))
            .andExpect(jsonPath("$.nameOfInstitution").value(DEFAULT_NAME_OF_INSTITUTION.toString()))
            .andExpect(jsonPath("$.institutionLocalName").value(DEFAULT_INSTITUTION_LOCAL_NAME.toString()))
            .andExpect(jsonPath("$.subject").value(DEFAULT_SUBJECT.toString()))
            .andExpect(jsonPath("$.performance").value(DEFAULT_PERFORMANCE.toString()))
            .andExpect(jsonPath("$.typeOfInstitution").value(DEFAULT_TYPE_OF_INSTITUTION.toString()))
            .andExpect(jsonPath("$.sourceWebsite").value(DEFAULT_SOURCE_WEBSITE.toString()))
            .andExpect(jsonPath("$.sourceName").value(DEFAULT_SOURCE_NAME.toString()))
            .andExpect(jsonPath("$.sourcePhone").value(DEFAULT_SOURCE_PHONE.toString()))
            .andExpect(jsonPath("$.sourceEmail").value(DEFAULT_SOURCE_EMAIL.toString()))
            .andExpect(jsonPath("$.present").value(DEFAULT_PRESENT.toString()))
            .andExpect(jsonPath("$.attendanceStartDate").value(DEFAULT_ATTENDANCE_START_DATE.toString()))
            .andExpect(jsonPath("$.attendanceEndDate").value(DEFAULT_ATTENDANCE_END_DATE.toString()))
            .andExpect(jsonPath("$.diplomaAwardDate").value(DEFAULT_DIPLOMA_AWARD_DATE.toString()))
            .andExpect(jsonPath("$.studentRegistrationNo").value(DEFAULT_STUDENT_REGISTRATION_NO.toString()))
            .andExpect(jsonPath("$.town").value(DEFAULT_TOWN.toString()))
            .andExpect(jsonPath("$.state").value(DEFAULT_STATE.toString()))
            .andExpect(jsonPath("$.country").value(DEFAULT_COUNTRY.toString()))
            .andExpect(jsonPath("$.postalCode").value(DEFAULT_POSTAL_CODE.toString()))
            .andExpect(jsonPath("$.notes").value(DEFAULT_NOTES.toString()));
    }
    @Test
    public void getNonExistingOrderEducationForm() throws Exception {
        // Get the orderEducationForm
        restOrderEducationFormMockMvc.perform(get("/api/order-education-forms/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateOrderEducationForm() throws Exception {
        // Initialize the database
        orderEducationFormRepository.save(orderEducationForm);

        int databaseSizeBeforeUpdate = orderEducationFormRepository.findAll().size();

        // Update the orderEducationForm
        OrderEducationForm updatedOrderEducationForm = orderEducationFormRepository.findById(orderEducationForm.getId()).get();
        updatedOrderEducationForm
            .typeDiploma(UPDATED_TYPE_DIPLOMA)
            .nameOfInstitution(UPDATED_NAME_OF_INSTITUTION)
            .institutionLocalName(UPDATED_INSTITUTION_LOCAL_NAME)
            .subject(UPDATED_SUBJECT)
            .performance(UPDATED_PERFORMANCE)
            .typeOfInstitution(UPDATED_TYPE_OF_INSTITUTION)
            .sourceWebsite(UPDATED_SOURCE_WEBSITE)
            .sourceName(UPDATED_SOURCE_NAME)
            .sourcePhone(UPDATED_SOURCE_PHONE)
            .sourceEmail(UPDATED_SOURCE_EMAIL)
            .present(UPDATED_PRESENT)
            .attendanceStartDate(UPDATED_ATTENDANCE_START_DATE)
            .attendanceEndDate(UPDATED_ATTENDANCE_END_DATE)
            .diplomaAwardDate(UPDATED_DIPLOMA_AWARD_DATE)
            .studentRegistrationNo(UPDATED_STUDENT_REGISTRATION_NO)
            .town(UPDATED_TOWN)
            .state(UPDATED_STATE)
            .country(UPDATED_COUNTRY)
            .postalCode(UPDATED_POSTAL_CODE)
            .notes(UPDATED_NOTES);

        restOrderEducationFormMockMvc.perform(put("/api/order-education-forms")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedOrderEducationForm)))
            .andExpect(status().isOk());

        // Validate the OrderEducationForm in the database
        List<OrderEducationForm> orderEducationFormList = orderEducationFormRepository.findAll();
        assertThat(orderEducationFormList).hasSize(databaseSizeBeforeUpdate);
        OrderEducationForm testOrderEducationForm = orderEducationFormList.get(orderEducationFormList.size() - 1);
        assertThat(testOrderEducationForm.getTypeDiploma()).isEqualTo(UPDATED_TYPE_DIPLOMA);
        assertThat(testOrderEducationForm.getNameOfInstitution()).isEqualTo(UPDATED_NAME_OF_INSTITUTION);
        assertThat(testOrderEducationForm.getInstitutionLocalName()).isEqualTo(UPDATED_INSTITUTION_LOCAL_NAME);
        assertThat(testOrderEducationForm.getSubject()).isEqualTo(UPDATED_SUBJECT);
        assertThat(testOrderEducationForm.getPerformance()).isEqualTo(UPDATED_PERFORMANCE);
        assertThat(testOrderEducationForm.getTypeOfInstitution()).isEqualTo(UPDATED_TYPE_OF_INSTITUTION);
        assertThat(testOrderEducationForm.getSourceWebsite()).isEqualTo(UPDATED_SOURCE_WEBSITE);
        assertThat(testOrderEducationForm.getSourceName()).isEqualTo(UPDATED_SOURCE_NAME);
        assertThat(testOrderEducationForm.getSourcePhone()).isEqualTo(UPDATED_SOURCE_PHONE);
        assertThat(testOrderEducationForm.getSourceEmail()).isEqualTo(UPDATED_SOURCE_EMAIL);
        assertThat(testOrderEducationForm.getPresent()).isEqualTo(UPDATED_PRESENT);
        assertThat(testOrderEducationForm.getAttendanceStartDate()).isEqualTo(UPDATED_ATTENDANCE_START_DATE);
        assertThat(testOrderEducationForm.getAttendanceEndDate()).isEqualTo(UPDATED_ATTENDANCE_END_DATE);
        assertThat(testOrderEducationForm.getDiplomaAwardDate()).isEqualTo(UPDATED_DIPLOMA_AWARD_DATE);
        assertThat(testOrderEducationForm.getStudentRegistrationNo()).isEqualTo(UPDATED_STUDENT_REGISTRATION_NO);
        assertThat(testOrderEducationForm.getTown()).isEqualTo(UPDATED_TOWN);
        assertThat(testOrderEducationForm.getState()).isEqualTo(UPDATED_STATE);
        assertThat(testOrderEducationForm.getCountry()).isEqualTo(UPDATED_COUNTRY);
        assertThat(testOrderEducationForm.getPostalCode()).isEqualTo(UPDATED_POSTAL_CODE);
        assertThat(testOrderEducationForm.getNotes()).isEqualTo(UPDATED_NOTES);
    }

    @Test
    public void updateNonExistingOrderEducationForm() throws Exception {
        int databaseSizeBeforeUpdate = orderEducationFormRepository.findAll().size();

        // Create the OrderEducationForm

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restOrderEducationFormMockMvc.perform(put("/api/order-education-forms")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(orderEducationForm)))
            .andExpect(status().isBadRequest());

        // Validate the OrderEducationForm in the database
        List<OrderEducationForm> orderEducationFormList = orderEducationFormRepository.findAll();
        assertThat(orderEducationFormList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    public void deleteOrderEducationForm() throws Exception {
        // Initialize the database
        orderEducationFormRepository.save(orderEducationForm);

        int databaseSizeBeforeDelete = orderEducationFormRepository.findAll().size();

        // Get the orderEducationForm
        restOrderEducationFormMockMvc.perform(delete("/api/order-education-forms/{id}", orderEducationForm.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<OrderEducationForm> orderEducationFormList = orderEducationFormRepository.findAll();
        assertThat(orderEducationFormList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(OrderEducationForm.class);
        OrderEducationForm orderEducationForm1 = new OrderEducationForm();
        orderEducationForm1.setId("id1");
        OrderEducationForm orderEducationForm2 = new OrderEducationForm();
        orderEducationForm2.setId(orderEducationForm1.getId());
        assertThat(orderEducationForm1).isEqualTo(orderEducationForm2);
        orderEducationForm2.setId("id2");
        assertThat(orderEducationForm1).isNotEqualTo(orderEducationForm2);
        orderEducationForm1.setId(null);
        assertThat(orderEducationForm1).isNotEqualTo(orderEducationForm2);
    }
}
