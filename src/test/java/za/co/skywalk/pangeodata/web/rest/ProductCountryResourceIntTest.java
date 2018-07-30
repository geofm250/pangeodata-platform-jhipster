package za.co.skywalk.pangeodata.web.rest;

import za.co.skywalk.pangeodata.PangeodataJHipsterApp;

import za.co.skywalk.pangeodata.domain.ProductCountry;
import za.co.skywalk.pangeodata.repository.ProductCountryRepository;
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
 * Test class for the ProductCountryResource REST controller.
 *
 * @see ProductCountryResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = PangeodataJHipsterApp.class)
public class ProductCountryResourceIntTest {

    private static final String DEFAULT_TURN_AROUND_TIME = "AAAAAAAAAA";
    private static final String UPDATED_TURN_AROUND_TIME = "BBBBBBBBBB";

    private static final String DEFAULT_COUNTRY = "AAAAAAAAAA";
    private static final String UPDATED_COUNTRY = "BBBBBBBBBB";

    private static final String DEFAULT_COST = "AAAAAAAAAA";
    private static final String UPDATED_COST = "BBBBBBBBBB";

    @Autowired
    private ProductCountryRepository productCountryRepository;


    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    private MockMvc restProductCountryMockMvc;

    private ProductCountry productCountry;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ProductCountryResource productCountryResource = new ProductCountryResource(productCountryRepository);
        this.restProductCountryMockMvc = MockMvcBuilders.standaloneSetup(productCountryResource)
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
    public static ProductCountry createEntity() {
        ProductCountry productCountry = new ProductCountry()
            .turnAroundTime(DEFAULT_TURN_AROUND_TIME)
            .country(DEFAULT_COUNTRY)
            .cost(DEFAULT_COST);
        return productCountry;
    }

    @Before
    public void initTest() {
        productCountryRepository.deleteAll();
        productCountry = createEntity();
    }

    @Test
    public void createProductCountry() throws Exception {
        int databaseSizeBeforeCreate = productCountryRepository.findAll().size();

        // Create the ProductCountry
        restProductCountryMockMvc.perform(post("/api/product-countries")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(productCountry)))
            .andExpect(status().isCreated());

        // Validate the ProductCountry in the database
        List<ProductCountry> productCountryList = productCountryRepository.findAll();
        assertThat(productCountryList).hasSize(databaseSizeBeforeCreate + 1);
        ProductCountry testProductCountry = productCountryList.get(productCountryList.size() - 1);
        assertThat(testProductCountry.getTurnAroundTime()).isEqualTo(DEFAULT_TURN_AROUND_TIME);
        assertThat(testProductCountry.getCountry()).isEqualTo(DEFAULT_COUNTRY);
        assertThat(testProductCountry.getCost()).isEqualTo(DEFAULT_COST);
    }

    @Test
    public void createProductCountryWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = productCountryRepository.findAll().size();

        // Create the ProductCountry with an existing ID
        productCountry.setId("existing_id");

        // An entity with an existing ID cannot be created, so this API call must fail
        restProductCountryMockMvc.perform(post("/api/product-countries")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(productCountry)))
            .andExpect(status().isBadRequest());

        // Validate the ProductCountry in the database
        List<ProductCountry> productCountryList = productCountryRepository.findAll();
        assertThat(productCountryList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    public void getAllProductCountries() throws Exception {
        // Initialize the database
        productCountryRepository.save(productCountry);

        // Get all the productCountryList
        restProductCountryMockMvc.perform(get("/api/product-countries?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(productCountry.getId())))
            .andExpect(jsonPath("$.[*].turnAroundTime").value(hasItem(DEFAULT_TURN_AROUND_TIME.toString())))
            .andExpect(jsonPath("$.[*].country").value(hasItem(DEFAULT_COUNTRY.toString())))
            .andExpect(jsonPath("$.[*].cost").value(hasItem(DEFAULT_COST.toString())));
    }
    

    @Test
    public void getProductCountry() throws Exception {
        // Initialize the database
        productCountryRepository.save(productCountry);

        // Get the productCountry
        restProductCountryMockMvc.perform(get("/api/product-countries/{id}", productCountry.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(productCountry.getId()))
            .andExpect(jsonPath("$.turnAroundTime").value(DEFAULT_TURN_AROUND_TIME.toString()))
            .andExpect(jsonPath("$.country").value(DEFAULT_COUNTRY.toString()))
            .andExpect(jsonPath("$.cost").value(DEFAULT_COST.toString()));
    }
    @Test
    public void getNonExistingProductCountry() throws Exception {
        // Get the productCountry
        restProductCountryMockMvc.perform(get("/api/product-countries/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateProductCountry() throws Exception {
        // Initialize the database
        productCountryRepository.save(productCountry);

        int databaseSizeBeforeUpdate = productCountryRepository.findAll().size();

        // Update the productCountry
        ProductCountry updatedProductCountry = productCountryRepository.findById(productCountry.getId()).get();
        updatedProductCountry
            .turnAroundTime(UPDATED_TURN_AROUND_TIME)
            .country(UPDATED_COUNTRY)
            .cost(UPDATED_COST);

        restProductCountryMockMvc.perform(put("/api/product-countries")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedProductCountry)))
            .andExpect(status().isOk());

        // Validate the ProductCountry in the database
        List<ProductCountry> productCountryList = productCountryRepository.findAll();
        assertThat(productCountryList).hasSize(databaseSizeBeforeUpdate);
        ProductCountry testProductCountry = productCountryList.get(productCountryList.size() - 1);
        assertThat(testProductCountry.getTurnAroundTime()).isEqualTo(UPDATED_TURN_AROUND_TIME);
        assertThat(testProductCountry.getCountry()).isEqualTo(UPDATED_COUNTRY);
        assertThat(testProductCountry.getCost()).isEqualTo(UPDATED_COST);
    }

    @Test
    public void updateNonExistingProductCountry() throws Exception {
        int databaseSizeBeforeUpdate = productCountryRepository.findAll().size();

        // Create the ProductCountry

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restProductCountryMockMvc.perform(put("/api/product-countries")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(productCountry)))
            .andExpect(status().isBadRequest());

        // Validate the ProductCountry in the database
        List<ProductCountry> productCountryList = productCountryRepository.findAll();
        assertThat(productCountryList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    public void deleteProductCountry() throws Exception {
        // Initialize the database
        productCountryRepository.save(productCountry);

        int databaseSizeBeforeDelete = productCountryRepository.findAll().size();

        // Get the productCountry
        restProductCountryMockMvc.perform(delete("/api/product-countries/{id}", productCountry.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<ProductCountry> productCountryList = productCountryRepository.findAll();
        assertThat(productCountryList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ProductCountry.class);
        ProductCountry productCountry1 = new ProductCountry();
        productCountry1.setId("id1");
        ProductCountry productCountry2 = new ProductCountry();
        productCountry2.setId(productCountry1.getId());
        assertThat(productCountry1).isEqualTo(productCountry2);
        productCountry2.setId("id2");
        assertThat(productCountry1).isNotEqualTo(productCountry2);
        productCountry1.setId(null);
        assertThat(productCountry1).isNotEqualTo(productCountry2);
    }
}
