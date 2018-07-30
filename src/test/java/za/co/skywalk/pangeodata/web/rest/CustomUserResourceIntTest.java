package za.co.skywalk.pangeodata.web.rest;

import za.co.skywalk.pangeodata.PangeodataJHipsterApp;

import za.co.skywalk.pangeodata.domain.CustomUser;
import za.co.skywalk.pangeodata.repository.CustomUserRepository;
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
 * Test class for the CustomUserResource REST controller.
 *
 * @see CustomUserResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = PangeodataJHipsterApp.class)
public class CustomUserResourceIntTest {

    private static final String DEFAULT_FIRSTNAME = "AAAAAAAAAA";
    private static final String UPDATED_FIRSTNAME = "BBBBBBBBBB";

    private static final String DEFAULT_LASTNAME = "AAAAAAAAAA";
    private static final String UPDATED_LASTNAME = "BBBBBBBBBB";

    private static final String DEFAULT_USERNAME = "AAAAAAAAAA";
    private static final String UPDATED_USERNAME = "BBBBBBBBBB";

    private static final String DEFAULT_EMAIL = "AAAAAAAAAA";
    private static final String UPDATED_EMAIL = "BBBBBBBBBB";

    private static final String DEFAULT_ROLE = "AAAAAAAAAA";
    private static final String UPDATED_ROLE = "BBBBBBBBBB";

    private static final String DEFAULT_COMPANY = "AAAAAAAAAA";
    private static final String UPDATED_COMPANY = "BBBBBBBBBB";

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_SURNAME = "AAAAAAAAAA";
    private static final String UPDATED_SURNAME = "BBBBBBBBBB";

    private static final String DEFAULT_PASSWORD = "AAAAAAAAAA";
    private static final String UPDATED_PASSWORD = "BBBBBBBBBB";

    private static final String DEFAULT_ACTIVE = "AAAAAAAAAA";
    private static final String UPDATED_ACTIVE = "BBBBBBBBBB";

    private static final String DEFAULT_CREATED_AT = "AAAAAAAAAA";
    private static final String UPDATED_CREATED_AT = "BBBBBBBBBB";

    private static final String DEFAULT_UPDATED_AT = "AAAAAAAAAA";
    private static final String UPDATED_UPDATED_AT = "BBBBBBBBBB";

    private static final String DEFAULT_IS_TOKEN_LOGIN = "AAAAAAAAAA";
    private static final String UPDATED_IS_TOKEN_LOGIN = "BBBBBBBBBB";

    private static final String DEFAULT_ORDER_ID = "AAAAAAAAAA";
    private static final String UPDATED_ORDER_ID = "BBBBBBBBBB";

    @Autowired
    private CustomUserRepository customUserRepository;


    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    private MockMvc restCustomUserMockMvc;

    private CustomUser customUser;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CustomUserResource customUserResource = new CustomUserResource(customUserRepository);
        this.restCustomUserMockMvc = MockMvcBuilders.standaloneSetup(customUserResource)
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
    public static CustomUser createEntity() {
        CustomUser customUser = new CustomUser()
            .firstname(DEFAULT_FIRSTNAME)
            .lastname(DEFAULT_LASTNAME)
            .username(DEFAULT_USERNAME)
            .email(DEFAULT_EMAIL)
            .role(DEFAULT_ROLE)
            .company(DEFAULT_COMPANY)
            .name(DEFAULT_NAME)
            .surname(DEFAULT_SURNAME)
            .password(DEFAULT_PASSWORD)
            .active(DEFAULT_ACTIVE)
            .createdAt(DEFAULT_CREATED_AT)
            .updatedAt(DEFAULT_UPDATED_AT)
            .isTokenLogin(DEFAULT_IS_TOKEN_LOGIN)
            .orderId(DEFAULT_ORDER_ID);
        return customUser;
    }

    @Before
    public void initTest() {
        customUserRepository.deleteAll();
        customUser = createEntity();
    }

    @Test
    public void createCustomUser() throws Exception {
        int databaseSizeBeforeCreate = customUserRepository.findAll().size();

        // Create the CustomUser
        restCustomUserMockMvc.perform(post("/api/custom-users")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(customUser)))
            .andExpect(status().isCreated());

        // Validate the CustomUser in the database
        List<CustomUser> customUserList = customUserRepository.findAll();
        assertThat(customUserList).hasSize(databaseSizeBeforeCreate + 1);
        CustomUser testCustomUser = customUserList.get(customUserList.size() - 1);
        assertThat(testCustomUser.getFirstname()).isEqualTo(DEFAULT_FIRSTNAME);
        assertThat(testCustomUser.getLastname()).isEqualTo(DEFAULT_LASTNAME);
        assertThat(testCustomUser.getUsername()).isEqualTo(DEFAULT_USERNAME);
        assertThat(testCustomUser.getEmail()).isEqualTo(DEFAULT_EMAIL);
        assertThat(testCustomUser.getRole()).isEqualTo(DEFAULT_ROLE);
        assertThat(testCustomUser.getCompany()).isEqualTo(DEFAULT_COMPANY);
        assertThat(testCustomUser.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testCustomUser.getSurname()).isEqualTo(DEFAULT_SURNAME);
        assertThat(testCustomUser.getPassword()).isEqualTo(DEFAULT_PASSWORD);
        assertThat(testCustomUser.getActive()).isEqualTo(DEFAULT_ACTIVE);
        assertThat(testCustomUser.getCreatedAt()).isEqualTo(DEFAULT_CREATED_AT);
        assertThat(testCustomUser.getUpdatedAt()).isEqualTo(DEFAULT_UPDATED_AT);
        assertThat(testCustomUser.getIsTokenLogin()).isEqualTo(DEFAULT_IS_TOKEN_LOGIN);
        assertThat(testCustomUser.getOrderId()).isEqualTo(DEFAULT_ORDER_ID);
    }

    @Test
    public void createCustomUserWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = customUserRepository.findAll().size();

        // Create the CustomUser with an existing ID
        customUser.setId("existing_id");

        // An entity with an existing ID cannot be created, so this API call must fail
        restCustomUserMockMvc.perform(post("/api/custom-users")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(customUser)))
            .andExpect(status().isBadRequest());

        // Validate the CustomUser in the database
        List<CustomUser> customUserList = customUserRepository.findAll();
        assertThat(customUserList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    public void getAllCustomUsers() throws Exception {
        // Initialize the database
        customUserRepository.save(customUser);

        // Get all the customUserList
        restCustomUserMockMvc.perform(get("/api/custom-users?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(customUser.getId())))
            .andExpect(jsonPath("$.[*].firstname").value(hasItem(DEFAULT_FIRSTNAME.toString())))
            .andExpect(jsonPath("$.[*].lastname").value(hasItem(DEFAULT_LASTNAME.toString())))
            .andExpect(jsonPath("$.[*].username").value(hasItem(DEFAULT_USERNAME.toString())))
            .andExpect(jsonPath("$.[*].email").value(hasItem(DEFAULT_EMAIL.toString())))
            .andExpect(jsonPath("$.[*].role").value(hasItem(DEFAULT_ROLE.toString())))
            .andExpect(jsonPath("$.[*].company").value(hasItem(DEFAULT_COMPANY.toString())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].surname").value(hasItem(DEFAULT_SURNAME.toString())))
            .andExpect(jsonPath("$.[*].password").value(hasItem(DEFAULT_PASSWORD.toString())))
            .andExpect(jsonPath("$.[*].active").value(hasItem(DEFAULT_ACTIVE.toString())))
            .andExpect(jsonPath("$.[*].createdAt").value(hasItem(DEFAULT_CREATED_AT.toString())))
            .andExpect(jsonPath("$.[*].updatedAt").value(hasItem(DEFAULT_UPDATED_AT.toString())))
            .andExpect(jsonPath("$.[*].isTokenLogin").value(hasItem(DEFAULT_IS_TOKEN_LOGIN.toString())))
            .andExpect(jsonPath("$.[*].orderId").value(hasItem(DEFAULT_ORDER_ID.toString())));
    }
    

    @Test
    public void getCustomUser() throws Exception {
        // Initialize the database
        customUserRepository.save(customUser);

        // Get the customUser
        restCustomUserMockMvc.perform(get("/api/custom-users/{id}", customUser.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(customUser.getId()))
            .andExpect(jsonPath("$.firstname").value(DEFAULT_FIRSTNAME.toString()))
            .andExpect(jsonPath("$.lastname").value(DEFAULT_LASTNAME.toString()))
            .andExpect(jsonPath("$.username").value(DEFAULT_USERNAME.toString()))
            .andExpect(jsonPath("$.email").value(DEFAULT_EMAIL.toString()))
            .andExpect(jsonPath("$.role").value(DEFAULT_ROLE.toString()))
            .andExpect(jsonPath("$.company").value(DEFAULT_COMPANY.toString()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.surname").value(DEFAULT_SURNAME.toString()))
            .andExpect(jsonPath("$.password").value(DEFAULT_PASSWORD.toString()))
            .andExpect(jsonPath("$.active").value(DEFAULT_ACTIVE.toString()))
            .andExpect(jsonPath("$.createdAt").value(DEFAULT_CREATED_AT.toString()))
            .andExpect(jsonPath("$.updatedAt").value(DEFAULT_UPDATED_AT.toString()))
            .andExpect(jsonPath("$.isTokenLogin").value(DEFAULT_IS_TOKEN_LOGIN.toString()))
            .andExpect(jsonPath("$.orderId").value(DEFAULT_ORDER_ID.toString()));
    }
    @Test
    public void getNonExistingCustomUser() throws Exception {
        // Get the customUser
        restCustomUserMockMvc.perform(get("/api/custom-users/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateCustomUser() throws Exception {
        // Initialize the database
        customUserRepository.save(customUser);

        int databaseSizeBeforeUpdate = customUserRepository.findAll().size();

        // Update the customUser
        CustomUser updatedCustomUser = customUserRepository.findById(customUser.getId()).get();
        updatedCustomUser
            .firstname(UPDATED_FIRSTNAME)
            .lastname(UPDATED_LASTNAME)
            .username(UPDATED_USERNAME)
            .email(UPDATED_EMAIL)
            .role(UPDATED_ROLE)
            .company(UPDATED_COMPANY)
            .name(UPDATED_NAME)
            .surname(UPDATED_SURNAME)
            .password(UPDATED_PASSWORD)
            .active(UPDATED_ACTIVE)
            .createdAt(UPDATED_CREATED_AT)
            .updatedAt(UPDATED_UPDATED_AT)
            .isTokenLogin(UPDATED_IS_TOKEN_LOGIN)
            .orderId(UPDATED_ORDER_ID);

        restCustomUserMockMvc.perform(put("/api/custom-users")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedCustomUser)))
            .andExpect(status().isOk());

        // Validate the CustomUser in the database
        List<CustomUser> customUserList = customUserRepository.findAll();
        assertThat(customUserList).hasSize(databaseSizeBeforeUpdate);
        CustomUser testCustomUser = customUserList.get(customUserList.size() - 1);
        assertThat(testCustomUser.getFirstname()).isEqualTo(UPDATED_FIRSTNAME);
        assertThat(testCustomUser.getLastname()).isEqualTo(UPDATED_LASTNAME);
        assertThat(testCustomUser.getUsername()).isEqualTo(UPDATED_USERNAME);
        assertThat(testCustomUser.getEmail()).isEqualTo(UPDATED_EMAIL);
        assertThat(testCustomUser.getRole()).isEqualTo(UPDATED_ROLE);
        assertThat(testCustomUser.getCompany()).isEqualTo(UPDATED_COMPANY);
        assertThat(testCustomUser.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testCustomUser.getSurname()).isEqualTo(UPDATED_SURNAME);
        assertThat(testCustomUser.getPassword()).isEqualTo(UPDATED_PASSWORD);
        assertThat(testCustomUser.getActive()).isEqualTo(UPDATED_ACTIVE);
        assertThat(testCustomUser.getCreatedAt()).isEqualTo(UPDATED_CREATED_AT);
        assertThat(testCustomUser.getUpdatedAt()).isEqualTo(UPDATED_UPDATED_AT);
        assertThat(testCustomUser.getIsTokenLogin()).isEqualTo(UPDATED_IS_TOKEN_LOGIN);
        assertThat(testCustomUser.getOrderId()).isEqualTo(UPDATED_ORDER_ID);
    }

    @Test
    public void updateNonExistingCustomUser() throws Exception {
        int databaseSizeBeforeUpdate = customUserRepository.findAll().size();

        // Create the CustomUser

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restCustomUserMockMvc.perform(put("/api/custom-users")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(customUser)))
            .andExpect(status().isBadRequest());

        // Validate the CustomUser in the database
        List<CustomUser> customUserList = customUserRepository.findAll();
        assertThat(customUserList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    public void deleteCustomUser() throws Exception {
        // Initialize the database
        customUserRepository.save(customUser);

        int databaseSizeBeforeDelete = customUserRepository.findAll().size();

        // Get the customUser
        restCustomUserMockMvc.perform(delete("/api/custom-users/{id}", customUser.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<CustomUser> customUserList = customUserRepository.findAll();
        assertThat(customUserList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CustomUser.class);
        CustomUser customUser1 = new CustomUser();
        customUser1.setId("id1");
        CustomUser customUser2 = new CustomUser();
        customUser2.setId(customUser1.getId());
        assertThat(customUser1).isEqualTo(customUser2);
        customUser2.setId("id2");
        assertThat(customUser1).isNotEqualTo(customUser2);
        customUser1.setId(null);
        assertThat(customUser1).isNotEqualTo(customUser2);
    }
}
