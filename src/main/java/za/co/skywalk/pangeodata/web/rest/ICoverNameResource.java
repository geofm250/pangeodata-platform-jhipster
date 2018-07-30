package za.co.skywalk.pangeodata.web.rest;

import com.codahale.metrics.annotation.Timed;
import za.co.skywalk.pangeodata.domain.ICoverName;
import za.co.skywalk.pangeodata.repository.ICoverNameRepository;
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
 * REST controller for managing ICoverName.
 */
@RestController
@RequestMapping("/api")
public class ICoverNameResource {

    private final Logger log = LoggerFactory.getLogger(ICoverNameResource.class);

    private static final String ENTITY_NAME = "iCoverName";

    private final ICoverNameRepository iCoverNameRepository;

    public ICoverNameResource(ICoverNameRepository iCoverNameRepository) {
        this.iCoverNameRepository = iCoverNameRepository;
    }

    /**
     * POST  /i-cover-names : Create a new iCoverName.
     *
     * @param iCoverName the iCoverName to create
     * @return the ResponseEntity with status 201 (Created) and with body the new iCoverName, or with status 400 (Bad Request) if the iCoverName has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/i-cover-names")
    @Timed
    public ResponseEntity<ICoverName> createICoverName(@RequestBody ICoverName iCoverName) throws URISyntaxException {
        log.debug("REST request to save ICoverName : {}", iCoverName);
        if (iCoverName.getId() != null) {
            throw new BadRequestAlertException("A new iCoverName cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ICoverName result = iCoverNameRepository.save(iCoverName);
        return ResponseEntity.created(new URI("/api/i-cover-names/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /i-cover-names : Updates an existing iCoverName.
     *
     * @param iCoverName the iCoverName to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated iCoverName,
     * or with status 400 (Bad Request) if the iCoverName is not valid,
     * or with status 500 (Internal Server Error) if the iCoverName couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/i-cover-names")
    @Timed
    public ResponseEntity<ICoverName> updateICoverName(@RequestBody ICoverName iCoverName) throws URISyntaxException {
        log.debug("REST request to update ICoverName : {}", iCoverName);
        if (iCoverName.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ICoverName result = iCoverNameRepository.save(iCoverName);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, iCoverName.getId().toString()))
            .body(result);
    }

    /**
     * GET  /i-cover-names : get all the iCoverNames.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of iCoverNames in body
     */
    @GetMapping("/i-cover-names")
    @Timed
    public List<ICoverName> getAllICoverNames() {
        log.debug("REST request to get all ICoverNames");
        return iCoverNameRepository.findAll();
    }

    /**
     * GET  /i-cover-names/:id : get the "id" iCoverName.
     *
     * @param id the id of the iCoverName to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the iCoverName, or with status 404 (Not Found)
     */
    @GetMapping("/i-cover-names/{id}")
    @Timed
    public ResponseEntity<ICoverName> getICoverName(@PathVariable String id) {
        log.debug("REST request to get ICoverName : {}", id);
        Optional<ICoverName> iCoverName = iCoverNameRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(iCoverName);
    }

    /**
     * DELETE  /i-cover-names/:id : delete the "id" iCoverName.
     *
     * @param id the id of the iCoverName to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/i-cover-names/{id}")
    @Timed
    public ResponseEntity<Void> deleteICoverName(@PathVariable String id) {
        log.debug("REST request to delete ICoverName : {}", id);

        iCoverNameRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id)).build();
    }
}
