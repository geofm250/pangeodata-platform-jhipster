package za.co.skywalk.pangeodata.web.rest;

import za.co.skywalk.pangeodata.PangeodataJHipsterApp;

import za.co.skywalk.pangeodata.domain.IOrderReport;
import za.co.skywalk.pangeodata.repository.IOrderReportRepository;
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
 * Test class for the IOrderReportResource REST controller.
 *
 * @see IOrderReportResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = PangeodataJHipsterApp.class)
public class IOrderReportResourceIntTest {

    @Autowired
    private IOrderReportRepository iOrderReportRepository;


    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    private MockMvc restIOrderReportMockMvc;

    private IOrderReport iOrderReport;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final IOrderReportResource iOrderReportResource = new IOrderReportResource(iOrderReportRepository);
        this.restIOrderReportMockMvc = MockMvcBuilders.standaloneSetup(iOrderReportResource)
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
    public static IOrderReport createEntity() {
        IOrderReport iOrderReport = new IOrderReport();
        return iOrderReport;
    }

    @Before
    public void initTest() {
        iOrderReportRepository.deleteAll();
        iOrderReport = createEntity();
    }

    @Test
    public void createIOrderReport() throws Exception {
        int databaseSizeBeforeCreate = iOrderReportRepository.findAll().size();

        // Create the IOrderReport
        restIOrderReportMockMvc.perform(post("/api/i-order-reports")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(iOrderReport)))
            .andExpect(status().isCreated());

        // Validate the IOrderReport in the database
        List<IOrderReport> iOrderReportList = iOrderReportRepository.findAll();
        assertThat(iOrderReportList).hasSize(databaseSizeBeforeCreate + 1);
        IOrderReport testIOrderReport = iOrderReportList.get(iOrderReportList.size() - 1);
    }

    @Test
    public void createIOrderReportWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = iOrderReportRepository.findAll().size();

        // Create the IOrderReport with an existing ID
        iOrderReport.setId("existing_id");

        // An entity with an existing ID cannot be created, so this API call must fail
        restIOrderReportMockMvc.perform(post("/api/i-order-reports")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(iOrderReport)))
            .andExpect(status().isBadRequest());

        // Validate the IOrderReport in the database
        List<IOrderReport> iOrderReportList = iOrderReportRepository.findAll();
        assertThat(iOrderReportList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    public void getAllIOrderReports() throws Exception {
        // Initialize the database
        iOrderReportRepository.save(iOrderReport);

        // Get all the iOrderReportList
        restIOrderReportMockMvc.perform(get("/api/i-order-reports?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(iOrderReport.getId())));
    }
    

    @Test
    public void getIOrderReport() throws Exception {
        // Initialize the database
        iOrderReportRepository.save(iOrderReport);

        // Get the iOrderReport
        restIOrderReportMockMvc.perform(get("/api/i-order-reports/{id}", iOrderReport.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(iOrderReport.getId()));
    }
    @Test
    public void getNonExistingIOrderReport() throws Exception {
        // Get the iOrderReport
        restIOrderReportMockMvc.perform(get("/api/i-order-reports/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateIOrderReport() throws Exception {
        // Initialize the database
        iOrderReportRepository.save(iOrderReport);

        int databaseSizeBeforeUpdate = iOrderReportRepository.findAll().size();

        // Update the iOrderReport
        IOrderReport updatedIOrderReport = iOrderReportRepository.findById(iOrderReport.getId()).get();

        restIOrderReportMockMvc.perform(put("/api/i-order-reports")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedIOrderReport)))
            .andExpect(status().isOk());

        // Validate the IOrderReport in the database
        List<IOrderReport> iOrderReportList = iOrderReportRepository.findAll();
        assertThat(iOrderReportList).hasSize(databaseSizeBeforeUpdate);
        IOrderReport testIOrderReport = iOrderReportList.get(iOrderReportList.size() - 1);
    }

    @Test
    public void updateNonExistingIOrderReport() throws Exception {
        int databaseSizeBeforeUpdate = iOrderReportRepository.findAll().size();

        // Create the IOrderReport

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restIOrderReportMockMvc.perform(put("/api/i-order-reports")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(iOrderReport)))
            .andExpect(status().isBadRequest());

        // Validate the IOrderReport in the database
        List<IOrderReport> iOrderReportList = iOrderReportRepository.findAll();
        assertThat(iOrderReportList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    public void deleteIOrderReport() throws Exception {
        // Initialize the database
        iOrderReportRepository.save(iOrderReport);

        int databaseSizeBeforeDelete = iOrderReportRepository.findAll().size();

        // Get the iOrderReport
        restIOrderReportMockMvc.perform(delete("/api/i-order-reports/{id}", iOrderReport.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<IOrderReport> iOrderReportList = iOrderReportRepository.findAll();
        assertThat(iOrderReportList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(IOrderReport.class);
        IOrderReport iOrderReport1 = new IOrderReport();
        iOrderReport1.setId("id1");
        IOrderReport iOrderReport2 = new IOrderReport();
        iOrderReport2.setId(iOrderReport1.getId());
        assertThat(iOrderReport1).isEqualTo(iOrderReport2);
        iOrderReport2.setId("id2");
        assertThat(iOrderReport1).isNotEqualTo(iOrderReport2);
        iOrderReport1.setId(null);
        assertThat(iOrderReport1).isNotEqualTo(iOrderReport2);
    }
}
