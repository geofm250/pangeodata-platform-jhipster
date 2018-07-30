package za.co.skywalk.pangeodata.web.rest;

import com.codahale.metrics.annotation.Timed;
import za.co.skywalk.pangeodata.domain.Token;
import za.co.skywalk.pangeodata.repository.TokenRepository;
import za.co.skywalk.pangeodata.web.rest.errors.BadRequestAlertException;
import za.co.skywalk.pangeodata.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Token.
 */
@RestController
@RequestMapping("/api")
public class TokenResource {

    private final Logger log = LoggerFactory.getLogger(TokenResource.class);

    private static final String ENTITY_NAME = "token";

    private final TokenRepository tokenRepository;

    public TokenResource(TokenRepository tokenRepository) {
        this.tokenRepository = tokenRepository;
    }

    /**
     * POST  /tokens : Create a new token.
     *
     * @param token the token to create
     * @return the ResponseEntity with status 201 (Created) and with body the new token, or with status 400 (Bad Request) if the token has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/tokens")
    @Timed
    public ResponseEntity<Token> createToken(@RequestBody Token token) throws URISyntaxException {
        log.debug("REST request to save Token : {}", token);
        if (token.getId() != null) {
            throw new BadRequestAlertException("A new token cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Token result = tokenRepository.save(token);
        return ResponseEntity.created(new URI("/api/tokens/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /tokens : Updates an existing token.
     *
     * @param token the token to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated token,
     * or with status 400 (Bad Request) if the token is not valid,
     * or with status 500 (Internal Server Error) if the token couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/tokens")
    @Timed
    public ResponseEntity<Token> updateToken(@RequestBody Token token) throws URISyntaxException {
        log.debug("REST request to update Token : {}", token);
        if (token.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Token result = tokenRepository.save(token);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, token.getId().toString()))
            .body(result);
    }

    /**
     * GET  /tokens : get all the tokens.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of tokens in body
     */
    @GetMapping("/tokens")
    @Timed
    public List<Token> getAllTokens() {
        log.debug("REST request to get all Tokens");
        return tokenRepository.findAll();
    }

    /**
     * GET  /tokens/:id : get the "id" token.
     *
     * @param id the id of the token to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the token, or with status 404 (Not Found)
     */
    @GetMapping("/tokens/{id}")
    @Timed
    public ResponseEntity<Token> getToken(@PathVariable String id) {
        log.debug("REST request to get Token : {}", id);
        Optional<Token> token = tokenRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(token);
    }

    /**
     * DELETE  /tokens/:id : delete the "id" token.
     *
     * @param id the id of the token to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/tokens/{id}")
    @Timed
    public ResponseEntity<Void> deleteToken(@PathVariable String id) {
        log.debug("REST request to delete Token : {}", id);

        tokenRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id)).build();
    }
}
