package za.co.skywalk.pangeodata.web.rest;

import za.co.skywalk.pangeodata.PangeodataJHipsterApp;

import za.co.skywalk.pangeodata.domain.Transaction;
import za.co.skywalk.pangeodata.repository.TransactionRepository;
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
 * Test class for the TransactionResource REST controller.
 *
 * @see TransactionResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = PangeodataJHipsterApp.class)
public class TransactionResourceIntTest {

    private static final String DEFAULT_GENERALNFORMATION = "AAAAAAAAAA";
    private static final String UPDATED_GENERALNFORMATION = "BBBBBBBBBB";

    private static final String DEFAULT_ADDESSES = "AAAAAAAAAA";
    private static final String UPDATED_ADDESSES = "BBBBBBBBBB";

    private static final String DEFAULT_STATUS = "AAAAAAAAAA";
    private static final String UPDATED_STATUS = "BBBBBBBBBB";

    private static final String DEFAULT_STATUS_DISPLAY = "AAAAAAAAAA";
    private static final String UPDATED_STATUS_DISPLAY = "BBBBBBBBBB";

    private static final String DEFAULT_EDITABLE = "AAAAAAAAAA";
    private static final String UPDATED_EDITABLE = "BBBBBBBBBB";

    private static final String DEFAULT_EDIT_MODE = "AAAAAAAAAA";
    private static final String UPDATED_EDIT_MODE = "BBBBBBBBBB";

    private static final String DEFAULT_ACTIVE = "AAAAAAAAAA";
    private static final String UPDATED_ACTIVE = "BBBBBBBBBB";

    private static final String DEFAULT_COST = "AAAAAAAAAA";
    private static final String UPDATED_COST = "BBBBBBBBBB";

    private static final String DEFAULT_REFERENCE_ID = "AAAAAAAAAA";
    private static final String UPDATED_REFERENCE_ID = "BBBBBBBBBB";

    private static final String DEFAULT_USER = "AAAAAAAAAA";
    private static final String UPDATED_USER = "BBBBBBBBBB";

    private static final String DEFAULT_COMPANY = "AAAAAAAAAA";
    private static final String UPDATED_COMPANY = "BBBBBBBBBB";

    private static final String DEFAULT_CREATED_AT = "AAAAAAAAAA";
    private static final String UPDATED_CREATED_AT = "BBBBBBBBBB";

    private static final String DEFAULT_STATUS_NR = "AAAAAAAAAA";
    private static final String UPDATED_STATUS_NR = "BBBBBBBBBB";

    private static final String DEFAULT_REDIRECT_URL = "AAAAAAAAAA";
    private static final String UPDATED_REDIRECT_URL = "BBBBBBBBBB";

    private static final String DEFAULT_CONSENT_FORM = "AAAAAAAAAA";
    private static final String UPDATED_CONSENT_FORM = "BBBBBBBBBB";

    private static final String DEFAULT_LOCAL_CONSENT_FORM = "AAAAAAAAAA";
    private static final String UPDATED_LOCAL_CONSENT_FORM = "BBBBBBBBBB";

    private static final String DEFAULT_VALID = "AAAAAAAAAA";
    private static final String UPDATED_VALID = "BBBBBBBBBB";

    private static final String DEFAULT_UPDATED_AT = "AAAAAAAAAA";
    private static final String UPDATED_UPDATED_AT = "BBBBBBBBBB";

    private static final String DEFAULT_ORDERS = "AAAAAAAAAA";
    private static final String UPDATED_ORDERS = "BBBBBBBBBB";

    @Autowired
    private TransactionRepository transactionRepository;


    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    private MockMvc restTransactionMockMvc;

    private Transaction transaction;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TransactionResource transactionResource = new TransactionResource(transactionRepository);
        this.restTransactionMockMvc = MockMvcBuilders.standaloneSetup(transactionResource)
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
    public static Transaction createEntity() {
        Transaction transaction = new Transaction()
            .generalnformation(DEFAULT_GENERALNFORMATION)
            .addesses(DEFAULT_ADDESSES)
            .status(DEFAULT_STATUS)
            .statusDisplay(DEFAULT_STATUS_DISPLAY)
            .editable(DEFAULT_EDITABLE)
            .editMode(DEFAULT_EDIT_MODE)
            .active(DEFAULT_ACTIVE)
            .cost(DEFAULT_COST)
            .referenceId(DEFAULT_REFERENCE_ID)
            .user(DEFAULT_USER)
            .company(DEFAULT_COMPANY)
            .createdAt(DEFAULT_CREATED_AT)
            .statusNr(DEFAULT_STATUS_NR)
            .redirectUrl(DEFAULT_REDIRECT_URL)
            .consentForm(DEFAULT_CONSENT_FORM)
            .localConsentForm(DEFAULT_LOCAL_CONSENT_FORM)
            .valid(DEFAULT_VALID)
            .updatedAt(DEFAULT_UPDATED_AT)
            .orders(DEFAULT_ORDERS);
        return transaction;
    }

    @Before
    public void initTest() {
        transactionRepository.deleteAll();
        transaction = createEntity();
    }

    @Test
    public void createTransaction() throws Exception {
        int databaseSizeBeforeCreate = transactionRepository.findAll().size();

        // Create the Transaction
        restTransactionMockMvc.perform(post("/api/transactions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(transaction)))
            .andExpect(status().isCreated());

        // Validate the Transaction in the database
        List<Transaction> transactionList = transactionRepository.findAll();
        assertThat(transactionList).hasSize(databaseSizeBeforeCreate + 1);
        Transaction testTransaction = transactionList.get(transactionList.size() - 1);
        assertThat(testTransaction.getGeneralnformation()).isEqualTo(DEFAULT_GENERALNFORMATION);
        assertThat(testTransaction.getAddesses()).isEqualTo(DEFAULT_ADDESSES);
        assertThat(testTransaction.getStatus()).isEqualTo(DEFAULT_STATUS);
        assertThat(testTransaction.getStatusDisplay()).isEqualTo(DEFAULT_STATUS_DISPLAY);
        assertThat(testTransaction.getEditable()).isEqualTo(DEFAULT_EDITABLE);
        assertThat(testTransaction.getEditMode()).isEqualTo(DEFAULT_EDIT_MODE);
        assertThat(testTransaction.getActive()).isEqualTo(DEFAULT_ACTIVE);
        assertThat(testTransaction.getCost()).isEqualTo(DEFAULT_COST);
        assertThat(testTransaction.getReferenceId()).isEqualTo(DEFAULT_REFERENCE_ID);
        assertThat(testTransaction.getUser()).isEqualTo(DEFAULT_USER);
        assertThat(testTransaction.getCompany()).isEqualTo(DEFAULT_COMPANY);
        assertThat(testTransaction.getCreatedAt()).isEqualTo(DEFAULT_CREATED_AT);
        assertThat(testTransaction.getStatusNr()).isEqualTo(DEFAULT_STATUS_NR);
        assertThat(testTransaction.getRedirectUrl()).isEqualTo(DEFAULT_REDIRECT_URL);
        assertThat(testTransaction.getConsentForm()).isEqualTo(DEFAULT_CONSENT_FORM);
        assertThat(testTransaction.getLocalConsentForm()).isEqualTo(DEFAULT_LOCAL_CONSENT_FORM);
        assertThat(testTransaction.getValid()).isEqualTo(DEFAULT_VALID);
        assertThat(testTransaction.getUpdatedAt()).isEqualTo(DEFAULT_UPDATED_AT);
        assertThat(testTransaction.getOrders()).isEqualTo(DEFAULT_ORDERS);
    }

    @Test
    public void createTransactionWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = transactionRepository.findAll().size();

        // Create the Transaction with an existing ID
        transaction.setId("existing_id");

        // An entity with an existing ID cannot be created, so this API call must fail
        restTransactionMockMvc.perform(post("/api/transactions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(transaction)))
            .andExpect(status().isBadRequest());

        // Validate the Transaction in the database
        List<Transaction> transactionList = transactionRepository.findAll();
        assertThat(transactionList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    public void getAllTransactions() throws Exception {
        // Initialize the database
        transactionRepository.save(transaction);

        // Get all the transactionList
        restTransactionMockMvc.perform(get("/api/transactions?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(transaction.getId())))
            .andExpect(jsonPath("$.[*].generalnformation").value(hasItem(DEFAULT_GENERALNFORMATION.toString())))
            .andExpect(jsonPath("$.[*].addesses").value(hasItem(DEFAULT_ADDESSES.toString())))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.toString())))
            .andExpect(jsonPath("$.[*].statusDisplay").value(hasItem(DEFAULT_STATUS_DISPLAY.toString())))
            .andExpect(jsonPath("$.[*].editable").value(hasItem(DEFAULT_EDITABLE.toString())))
            .andExpect(jsonPath("$.[*].editMode").value(hasItem(DEFAULT_EDIT_MODE.toString())))
            .andExpect(jsonPath("$.[*].active").value(hasItem(DEFAULT_ACTIVE.toString())))
            .andExpect(jsonPath("$.[*].cost").value(hasItem(DEFAULT_COST.toString())))
            .andExpect(jsonPath("$.[*].referenceId").value(hasItem(DEFAULT_REFERENCE_ID.toString())))
            .andExpect(jsonPath("$.[*].user").value(hasItem(DEFAULT_USER.toString())))
            .andExpect(jsonPath("$.[*].company").value(hasItem(DEFAULT_COMPANY.toString())))
            .andExpect(jsonPath("$.[*].createdAt").value(hasItem(DEFAULT_CREATED_AT.toString())))
            .andExpect(jsonPath("$.[*].statusNr").value(hasItem(DEFAULT_STATUS_NR.toString())))
            .andExpect(jsonPath("$.[*].redirectUrl").value(hasItem(DEFAULT_REDIRECT_URL.toString())))
            .andExpect(jsonPath("$.[*].consentForm").value(hasItem(DEFAULT_CONSENT_FORM.toString())))
            .andExpect(jsonPath("$.[*].localConsentForm").value(hasItem(DEFAULT_LOCAL_CONSENT_FORM.toString())))
            .andExpect(jsonPath("$.[*].valid").value(hasItem(DEFAULT_VALID.toString())))
            .andExpect(jsonPath("$.[*].updatedAt").value(hasItem(DEFAULT_UPDATED_AT.toString())))
            .andExpect(jsonPath("$.[*].orders").value(hasItem(DEFAULT_ORDERS.toString())));
    }
    

    @Test
    public void getTransaction() throws Exception {
        // Initialize the database
        transactionRepository.save(transaction);

        // Get the transaction
        restTransactionMockMvc.perform(get("/api/transactions/{id}", transaction.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(transaction.getId()))
            .andExpect(jsonPath("$.generalnformation").value(DEFAULT_GENERALNFORMATION.toString()))
            .andExpect(jsonPath("$.addesses").value(DEFAULT_ADDESSES.toString()))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS.toString()))
            .andExpect(jsonPath("$.statusDisplay").value(DEFAULT_STATUS_DISPLAY.toString()))
            .andExpect(jsonPath("$.editable").value(DEFAULT_EDITABLE.toString()))
            .andExpect(jsonPath("$.editMode").value(DEFAULT_EDIT_MODE.toString()))
            .andExpect(jsonPath("$.active").value(DEFAULT_ACTIVE.toString()))
            .andExpect(jsonPath("$.cost").value(DEFAULT_COST.toString()))
            .andExpect(jsonPath("$.referenceId").value(DEFAULT_REFERENCE_ID.toString()))
            .andExpect(jsonPath("$.user").value(DEFAULT_USER.toString()))
            .andExpect(jsonPath("$.company").value(DEFAULT_COMPANY.toString()))
            .andExpect(jsonPath("$.createdAt").value(DEFAULT_CREATED_AT.toString()))
            .andExpect(jsonPath("$.statusNr").value(DEFAULT_STATUS_NR.toString()))
            .andExpect(jsonPath("$.redirectUrl").value(DEFAULT_REDIRECT_URL.toString()))
            .andExpect(jsonPath("$.consentForm").value(DEFAULT_CONSENT_FORM.toString()))
            .andExpect(jsonPath("$.localConsentForm").value(DEFAULT_LOCAL_CONSENT_FORM.toString()))
            .andExpect(jsonPath("$.valid").value(DEFAULT_VALID.toString()))
            .andExpect(jsonPath("$.updatedAt").value(DEFAULT_UPDATED_AT.toString()))
            .andExpect(jsonPath("$.orders").value(DEFAULT_ORDERS.toString()));
    }
    @Test
    public void getNonExistingTransaction() throws Exception {
        // Get the transaction
        restTransactionMockMvc.perform(get("/api/transactions/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateTransaction() throws Exception {
        // Initialize the database
        transactionRepository.save(transaction);

        int databaseSizeBeforeUpdate = transactionRepository.findAll().size();

        // Update the transaction
        Transaction updatedTransaction = transactionRepository.findById(transaction.getId()).get();
        updatedTransaction
            .generalnformation(UPDATED_GENERALNFORMATION)
            .addesses(UPDATED_ADDESSES)
            .status(UPDATED_STATUS)
            .statusDisplay(UPDATED_STATUS_DISPLAY)
            .editable(UPDATED_EDITABLE)
            .editMode(UPDATED_EDIT_MODE)
            .active(UPDATED_ACTIVE)
            .cost(UPDATED_COST)
            .referenceId(UPDATED_REFERENCE_ID)
            .user(UPDATED_USER)
            .company(UPDATED_COMPANY)
            .createdAt(UPDATED_CREATED_AT)
            .statusNr(UPDATED_STATUS_NR)
            .redirectUrl(UPDATED_REDIRECT_URL)
            .consentForm(UPDATED_CONSENT_FORM)
            .localConsentForm(UPDATED_LOCAL_CONSENT_FORM)
            .valid(UPDATED_VALID)
            .updatedAt(UPDATED_UPDATED_AT)
            .orders(UPDATED_ORDERS);

        restTransactionMockMvc.perform(put("/api/transactions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTransaction)))
            .andExpect(status().isOk());

        // Validate the Transaction in the database
        List<Transaction> transactionList = transactionRepository.findAll();
        assertThat(transactionList).hasSize(databaseSizeBeforeUpdate);
        Transaction testTransaction = transactionList.get(transactionList.size() - 1);
        assertThat(testTransaction.getGeneralnformation()).isEqualTo(UPDATED_GENERALNFORMATION);
        assertThat(testTransaction.getAddesses()).isEqualTo(UPDATED_ADDESSES);
        assertThat(testTransaction.getStatus()).isEqualTo(UPDATED_STATUS);
        assertThat(testTransaction.getStatusDisplay()).isEqualTo(UPDATED_STATUS_DISPLAY);
        assertThat(testTransaction.getEditable()).isEqualTo(UPDATED_EDITABLE);
        assertThat(testTransaction.getEditMode()).isEqualTo(UPDATED_EDIT_MODE);
        assertThat(testTransaction.getActive()).isEqualTo(UPDATED_ACTIVE);
        assertThat(testTransaction.getCost()).isEqualTo(UPDATED_COST);
        assertThat(testTransaction.getReferenceId()).isEqualTo(UPDATED_REFERENCE_ID);
        assertThat(testTransaction.getUser()).isEqualTo(UPDATED_USER);
        assertThat(testTransaction.getCompany()).isEqualTo(UPDATED_COMPANY);
        assertThat(testTransaction.getCreatedAt()).isEqualTo(UPDATED_CREATED_AT);
        assertThat(testTransaction.getStatusNr()).isEqualTo(UPDATED_STATUS_NR);
        assertThat(testTransaction.getRedirectUrl()).isEqualTo(UPDATED_REDIRECT_URL);
        assertThat(testTransaction.getConsentForm()).isEqualTo(UPDATED_CONSENT_FORM);
        assertThat(testTransaction.getLocalConsentForm()).isEqualTo(UPDATED_LOCAL_CONSENT_FORM);
        assertThat(testTransaction.getValid()).isEqualTo(UPDATED_VALID);
        assertThat(testTransaction.getUpdatedAt()).isEqualTo(UPDATED_UPDATED_AT);
        assertThat(testTransaction.getOrders()).isEqualTo(UPDATED_ORDERS);
    }

    @Test
    public void updateNonExistingTransaction() throws Exception {
        int databaseSizeBeforeUpdate = transactionRepository.findAll().size();

        // Create the Transaction

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restTransactionMockMvc.perform(put("/api/transactions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(transaction)))
            .andExpect(status().isBadRequest());

        // Validate the Transaction in the database
        List<Transaction> transactionList = transactionRepository.findAll();
        assertThat(transactionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    public void deleteTransaction() throws Exception {
        // Initialize the database
        transactionRepository.save(transaction);

        int databaseSizeBeforeDelete = transactionRepository.findAll().size();

        // Get the transaction
        restTransactionMockMvc.perform(delete("/api/transactions/{id}", transaction.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Transaction> transactionList = transactionRepository.findAll();
        assertThat(transactionList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Transaction.class);
        Transaction transaction1 = new Transaction();
        transaction1.setId("id1");
        Transaction transaction2 = new Transaction();
        transaction2.setId(transaction1.getId());
        assertThat(transaction1).isEqualTo(transaction2);
        transaction2.setId("id2");
        assertThat(transaction1).isNotEqualTo(transaction2);
        transaction1.setId(null);
        assertThat(transaction1).isNotEqualTo(transaction2);
    }
}
