package za.co.skywalk.pangeodata.web.rest;

import za.co.skywalk.pangeodata.PangeodataJHipsterApp;

import za.co.skywalk.pangeodata.domain.Token;
import za.co.skywalk.pangeodata.repository.TokenRepository;
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
 * Test class for the TokenResource REST controller.
 *
 * @see TokenResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = PangeodataJHipsterApp.class)
public class TokenResourceIntTest {

    private static final String DEFAULT_CREATED_AT = "AAAAAAAAAA";
    private static final String UPDATED_CREATED_AT = "BBBBBBBBBB";

    private static final String DEFAULT_EXPIRED_AT = "AAAAAAAAAA";
    private static final String UPDATED_EXPIRED_AT = "BBBBBBBBBB";

    private static final String DEFAULT_USER_ID = "AAAAAAAAAA";
    private static final String UPDATED_USER_ID = "BBBBBBBBBB";

    private static final String DEFAULT_TOKEN = "AAAAAAAAAA";
    private static final String UPDATED_TOKEN = "BBBBBBBBBB";

    @Autowired
    private TokenRepository tokenRepository;


    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    private MockMvc restTokenMockMvc;

    private Token token;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TokenResource tokenResource = new TokenResource(tokenRepository);
        this.restTokenMockMvc = MockMvcBuilders.standaloneSetup(tokenResource)
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
    public static Token createEntity() {
        Token token = new Token()
            .createdAt(DEFAULT_CREATED_AT)
            .expiredAt(DEFAULT_EXPIRED_AT)
            .userId(DEFAULT_USER_ID)
            .token(DEFAULT_TOKEN);
        return token;
    }

    @Before
    public void initTest() {
        tokenRepository.deleteAll();
        token = createEntity();
    }

    @Test
    public void createToken() throws Exception {
        int databaseSizeBeforeCreate = tokenRepository.findAll().size();

        // Create the Token
        restTokenMockMvc.perform(post("/api/tokens")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(token)))
            .andExpect(status().isCreated());

        // Validate the Token in the database
        List<Token> tokenList = tokenRepository.findAll();
        assertThat(tokenList).hasSize(databaseSizeBeforeCreate + 1);
        Token testToken = tokenList.get(tokenList.size() - 1);
        assertThat(testToken.getCreatedAt()).isEqualTo(DEFAULT_CREATED_AT);
        assertThat(testToken.getExpiredAt()).isEqualTo(DEFAULT_EXPIRED_AT);
        assertThat(testToken.getUserId()).isEqualTo(DEFAULT_USER_ID);
        assertThat(testToken.getToken()).isEqualTo(DEFAULT_TOKEN);
    }

    @Test
    public void createTokenWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = tokenRepository.findAll().size();

        // Create the Token with an existing ID
        token.setId("existing_id");

        // An entity with an existing ID cannot be created, so this API call must fail
        restTokenMockMvc.perform(post("/api/tokens")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(token)))
            .andExpect(status().isBadRequest());

        // Validate the Token in the database
        List<Token> tokenList = tokenRepository.findAll();
        assertThat(tokenList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    public void getAllTokens() throws Exception {
        // Initialize the database
        tokenRepository.save(token);

        // Get all the tokenList
        restTokenMockMvc.perform(get("/api/tokens?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(token.getId())))
            .andExpect(jsonPath("$.[*].createdAt").value(hasItem(DEFAULT_CREATED_AT.toString())))
            .andExpect(jsonPath("$.[*].expiredAt").value(hasItem(DEFAULT_EXPIRED_AT.toString())))
            .andExpect(jsonPath("$.[*].userId").value(hasItem(DEFAULT_USER_ID.toString())))
            .andExpect(jsonPath("$.[*].token").value(hasItem(DEFAULT_TOKEN.toString())));
    }
    

    @Test
    public void getToken() throws Exception {
        // Initialize the database
        tokenRepository.save(token);

        // Get the token
        restTokenMockMvc.perform(get("/api/tokens/{id}", token.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(token.getId()))
            .andExpect(jsonPath("$.createdAt").value(DEFAULT_CREATED_AT.toString()))
            .andExpect(jsonPath("$.expiredAt").value(DEFAULT_EXPIRED_AT.toString()))
            .andExpect(jsonPath("$.userId").value(DEFAULT_USER_ID.toString()))
            .andExpect(jsonPath("$.token").value(DEFAULT_TOKEN.toString()));
    }
    @Test
    public void getNonExistingToken() throws Exception {
        // Get the token
        restTokenMockMvc.perform(get("/api/tokens/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateToken() throws Exception {
        // Initialize the database
        tokenRepository.save(token);

        int databaseSizeBeforeUpdate = tokenRepository.findAll().size();

        // Update the token
        Token updatedToken = tokenRepository.findById(token.getId()).get();
        updatedToken
            .createdAt(UPDATED_CREATED_AT)
            .expiredAt(UPDATED_EXPIRED_AT)
            .userId(UPDATED_USER_ID)
            .token(UPDATED_TOKEN);

        restTokenMockMvc.perform(put("/api/tokens")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedToken)))
            .andExpect(status().isOk());

        // Validate the Token in the database
        List<Token> tokenList = tokenRepository.findAll();
        assertThat(tokenList).hasSize(databaseSizeBeforeUpdate);
        Token testToken = tokenList.get(tokenList.size() - 1);
        assertThat(testToken.getCreatedAt()).isEqualTo(UPDATED_CREATED_AT);
        assertThat(testToken.getExpiredAt()).isEqualTo(UPDATED_EXPIRED_AT);
        assertThat(testToken.getUserId()).isEqualTo(UPDATED_USER_ID);
        assertThat(testToken.getToken()).isEqualTo(UPDATED_TOKEN);
    }

    @Test
    public void updateNonExistingToken() throws Exception {
        int databaseSizeBeforeUpdate = tokenRepository.findAll().size();

        // Create the Token

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restTokenMockMvc.perform(put("/api/tokens")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(token)))
            .andExpect(status().isBadRequest());

        // Validate the Token in the database
        List<Token> tokenList = tokenRepository.findAll();
        assertThat(tokenList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    public void deleteToken() throws Exception {
        // Initialize the database
        tokenRepository.save(token);

        int databaseSizeBeforeDelete = tokenRepository.findAll().size();

        // Get the token
        restTokenMockMvc.perform(delete("/api/tokens/{id}", token.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Token> tokenList = tokenRepository.findAll();
        assertThat(tokenList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Token.class);
        Token token1 = new Token();
        token1.setId("id1");
        Token token2 = new Token();
        token2.setId(token1.getId());
        assertThat(token1).isEqualTo(token2);
        token2.setId("id2");
        assertThat(token1).isNotEqualTo(token2);
        token1.setId(null);
        assertThat(token1).isNotEqualTo(token2);
    }
}
