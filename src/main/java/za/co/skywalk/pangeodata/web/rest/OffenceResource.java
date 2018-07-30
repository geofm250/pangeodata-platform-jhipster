package za.co.skywalk.pangeodata.web.rest;

import com.codahale.metrics.annotation.Timed;
import za.co.skywalk.pangeodata.domain.Offence;
import za.co.skywalk.pangeodata.repository.OffenceRepository;
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
 * REST controller for managing Offence.
 */
@RestController
@RequestMapping("/api")
public class OffenceResource {

    private final Logger log = LoggerFactory.getLogger(OffenceResource.class);

    private static final String ENTITY_NAME = "offence";

    private final OffenceRepository offenceRepository;

    public OffenceResource(OffenceRepository offenceRepository) {
        this.offenceRepository = offenceRepository;
    }

    /**
     * POST  /offences : Create a new offence.
     *
     * @param offence the offence to create
     * @return the ResponseEntity with status 201 (Created) and with body the new offence, or with status 400 (Bad Request) if the offence has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/offences")
    @Timed
    public ResponseEntity<Offence> createOffence(@RequestBody Offence offence) throws URISyntaxException {
        log.debug("REST request to save Offence : {}", offence);
        if (offence.getId() != null) {
            throw new BadRequestAlertException("A new offence cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Offence result = offenceRepository.save(offence);
        return ResponseEntity.created(new URI("/api/offences/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /offences : Updates an existing offence.
     *
     * @param offence the offence to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated offence,
     * or with status 400 (Bad Request) if the offence is not valid,
     * or with status 500 (Internal Server Error) if the offence couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/offences")
    @Timed
    public ResponseEntity<Offence> updateOffence(@RequestBody Offence offence) throws URISyntaxException {
        log.debug("REST request to update Offence : {}", offence);
        if (offence.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Offence result = offenceRepository.save(offence);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, offence.getId().toString()))
            .body(result);
    }

    /**
     * GET  /offences : get all the offences.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of offences in body
     */
    @GetMapping("/offences")
    @Timed
    public List<Offence> getAllOffences() {
        log.debug("REST request to get all Offences");
        return offenceRepository.findAll();
    }

    /**
     * GET  /offences/:id : get the "id" offence.
     *
     * @param id the id of the offence to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the offence, or with status 404 (Not Found)
     */
    @GetMapping("/offences/{id}")
    @Timed
    public ResponseEntity<Offence> getOffence(@PathVariable String id) {
        log.debug("REST request to get Offence : {}", id);
        Optional<Offence> offence = offenceRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(offence);
    }

    /**
     * DELETE  /offences/:id : delete the "id" offence.
     *
     * @param id the id of the offence to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/offences/{id}")
    @Timed
    public ResponseEntity<Void> deleteOffence(@PathVariable String id) {
        log.debug("REST request to delete Offence : {}", id);

        offenceRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id)).build();
    }
}
