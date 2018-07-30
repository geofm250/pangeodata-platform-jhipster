package za.co.skywalk.pangeodata.web.rest;

import za.co.skywalk.pangeodata.PangeodataJHipsterApp;

import za.co.skywalk.pangeodata.domain.OrderFile;
import za.co.skywalk.pangeodata.repository.OrderFileRepository;
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
 * Test class for the OrderFileResource REST controller.
 *
 * @see OrderFileResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = PangeodataJHipsterApp.class)
public class OrderFileResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_LOCAL_FILES = "AAAAAAAAAA";
    private static final String UPDATED_LOCAL_FILES = "BBBBBBBBBB";

    private static final String DEFAULT_FILES = "AAAAAAAAAA";
    private static final String UPDATED_FILES = "BBBBBBBBBB";

    private static final String DEFAULT_LINKS = "AAAAAAAAAA";
    private static final String UPDATED_LINKS = "BBBBBBBBBB";

    private static final String DEFAULT_DISPLAY_LINKS = "AAAAAAAAAA";
    private static final String UPDATED_DISPLAY_LINKS = "BBBBBBBBBB";

    private static final String DEFAULT_I_COVER_NAME = "AAAAAAAAAA";
    private static final String UPDATED_I_COVER_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_ORDER_ID = "AAAAAAAAAA";
    private static final String UPDATED_ORDER_ID = "BBBBBBBBBB";

    @Autowired
    private OrderFileRepository orderFileRepository;


    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    private MockMvc restOrderFileMockMvc;

    private OrderFile orderFile;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final OrderFileResource orderFileResource = new OrderFileResource(orderFileRepository);
        this.restOrderFileMockMvc = MockMvcBuilders.standaloneSetup(orderFileResource)
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
    public static OrderFile createEntity() {
        OrderFile orderFile = new OrderFile()
            .name(DEFAULT_NAME)
            .localFiles(DEFAULT_LOCAL_FILES)
            .files(DEFAULT_FILES)
            .links(DEFAULT_LINKS)
            .displayLinks(DEFAULT_DISPLAY_LINKS)
            .iCoverName(DEFAULT_I_COVER_NAME)
            .orderId(DEFAULT_ORDER_ID);
        return orderFile;
    }

    @Before
    public void initTest() {
        orderFileRepository.deleteAll();
        orderFile = createEntity();
    }

    @Test
    public void createOrderFile() throws Exception {
        int databaseSizeBeforeCreate = orderFileRepository.findAll().size();

        // Create the OrderFile
        restOrderFileMockMvc.perform(post("/api/order-files")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(orderFile)))
            .andExpect(status().isCreated());

        // Validate the OrderFile in the database
        List<OrderFile> orderFileList = orderFileRepository.findAll();
        assertThat(orderFileList).hasSize(databaseSizeBeforeCreate + 1);
        OrderFile testOrderFile = orderFileList.get(orderFileList.size() - 1);
        assertThat(testOrderFile.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testOrderFile.getLocalFiles()).isEqualTo(DEFAULT_LOCAL_FILES);
        assertThat(testOrderFile.getFiles()).isEqualTo(DEFAULT_FILES);
        assertThat(testOrderFile.getLinks()).isEqualTo(DEFAULT_LINKS);
        assertThat(testOrderFile.getDisplayLinks()).isEqualTo(DEFAULT_DISPLAY_LINKS);
        assertThat(testOrderFile.getiCoverName()).isEqualTo(DEFAULT_I_COVER_NAME);
        assertThat(testOrderFile.getOrderId()).isEqualTo(DEFAULT_ORDER_ID);
    }

    @Test
    public void createOrderFileWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = orderFileRepository.findAll().size();

        // Create the OrderFile with an existing ID
        orderFile.setId("existing_id");

        // An entity with an existing ID cannot be created, so this API call must fail
        restOrderFileMockMvc.perform(post("/api/order-files")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(orderFile)))
            .andExpect(status().isBadRequest());

        // Validate the OrderFile in the database
        List<OrderFile> orderFileList = orderFileRepository.findAll();
        assertThat(orderFileList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    public void getAllOrderFiles() throws Exception {
        // Initialize the database
        orderFileRepository.save(orderFile);

        // Get all the orderFileList
        restOrderFileMockMvc.perform(get("/api/order-files?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(orderFile.getId())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].localFiles").value(hasItem(DEFAULT_LOCAL_FILES.toString())))
            .andExpect(jsonPath("$.[*].files").value(hasItem(DEFAULT_FILES.toString())))
            .andExpect(jsonPath("$.[*].links").value(hasItem(DEFAULT_LINKS.toString())))
            .andExpect(jsonPath("$.[*].displayLinks").value(hasItem(DEFAULT_DISPLAY_LINKS.toString())))
            .andExpect(jsonPath("$.[*].iCoverName").value(hasItem(DEFAULT_I_COVER_NAME.toString())))
            .andExpect(jsonPath("$.[*].orderId").value(hasItem(DEFAULT_ORDER_ID.toString())));
    }
    

    @Test
    public void getOrderFile() throws Exception {
        // Initialize the database
        orderFileRepository.save(orderFile);

        // Get the orderFile
        restOrderFileMockMvc.perform(get("/api/order-files/{id}", orderFile.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(orderFile.getId()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.localFiles").value(DEFAULT_LOCAL_FILES.toString()))
            .andExpect(jsonPath("$.files").value(DEFAULT_FILES.toString()))
            .andExpect(jsonPath("$.links").value(DEFAULT_LINKS.toString()))
            .andExpect(jsonPath("$.displayLinks").value(DEFAULT_DISPLAY_LINKS.toString()))
            .andExpect(jsonPath("$.iCoverName").value(DEFAULT_I_COVER_NAME.toString()))
            .andExpect(jsonPath("$.orderId").value(DEFAULT_ORDER_ID.toString()));
    }
    @Test
    public void getNonExistingOrderFile() throws Exception {
        // Get the orderFile
        restOrderFileMockMvc.perform(get("/api/order-files/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateOrderFile() throws Exception {
        // Initialize the database
        orderFileRepository.save(orderFile);

        int databaseSizeBeforeUpdate = orderFileRepository.findAll().size();

        // Update the orderFile
        OrderFile updatedOrderFile = orderFileRepository.findById(orderFile.getId()).get();
        updatedOrderFile
            .name(UPDATED_NAME)
            .localFiles(UPDATED_LOCAL_FILES)
            .files(UPDATED_FILES)
            .links(UPDATED_LINKS)
            .displayLinks(UPDATED_DISPLAY_LINKS)
            .iCoverName(UPDATED_I_COVER_NAME)
            .orderId(UPDATED_ORDER_ID);

        restOrderFileMockMvc.perform(put("/api/order-files")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedOrderFile)))
            .andExpect(status().isOk());

        // Validate the OrderFile in the database
        List<OrderFile> orderFileList = orderFileRepository.findAll();
        assertThat(orderFileList).hasSize(databaseSizeBeforeUpdate);
        OrderFile testOrderFile = orderFileList.get(orderFileList.size() - 1);
        assertThat(testOrderFile.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testOrderFile.getLocalFiles()).isEqualTo(UPDATED_LOCAL_FILES);
        assertThat(testOrderFile.getFiles()).isEqualTo(UPDATED_FILES);
        assertThat(testOrderFile.getLinks()).isEqualTo(UPDATED_LINKS);
        assertThat(testOrderFile.getDisplayLinks()).isEqualTo(UPDATED_DISPLAY_LINKS);
        assertThat(testOrderFile.getiCoverName()).isEqualTo(UPDATED_I_COVER_NAME);
        assertThat(testOrderFile.getOrderId()).isEqualTo(UPDATED_ORDER_ID);
    }

    @Test
    public void updateNonExistingOrderFile() throws Exception {
        int databaseSizeBeforeUpdate = orderFileRepository.findAll().size();

        // Create the OrderFile

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restOrderFileMockMvc.perform(put("/api/order-files")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(orderFile)))
            .andExpect(status().isBadRequest());

        // Validate the OrderFile in the database
        List<OrderFile> orderFileList = orderFileRepository.findAll();
        assertThat(orderFileList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    public void deleteOrderFile() throws Exception {
        // Initialize the database
        orderFileRepository.save(orderFile);

        int databaseSizeBeforeDelete = orderFileRepository.findAll().size();

        // Get the orderFile
        restOrderFileMockMvc.perform(delete("/api/order-files/{id}", orderFile.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<OrderFile> orderFileList = orderFileRepository.findAll();
        assertThat(orderFileList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(OrderFile.class);
        OrderFile orderFile1 = new OrderFile();
        orderFile1.setId("id1");
        OrderFile orderFile2 = new OrderFile();
        orderFile2.setId(orderFile1.getId());
        assertThat(orderFile1).isEqualTo(orderFile2);
        orderFile2.setId("id2");
        assertThat(orderFile1).isNotEqualTo(orderFile2);
        orderFile1.setId(null);
        assertThat(orderFile1).isNotEqualTo(orderFile2);
    }
}
