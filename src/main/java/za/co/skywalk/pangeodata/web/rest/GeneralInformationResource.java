package za.co.skywalk.pangeodata.web.rest;

import com.codahale.metrics.annotation.Timed;
import za.co.skywalk.pangeodata.domain.GeneralInformation;
import za.co.skywalk.pangeodata.repository.GeneralInformationRepository;
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
 * REST controller for managing GeneralInformation.
 */
@RestController
@RequestMapping("/api")
public class GeneralInformationResource {

    private final Logger log = LoggerFactory.getLogger(GeneralInformationResource.class);

    private static final String ENTITY_NAME = "generalInformation";

    private final GeneralInformationRepository generalInformationRepository;

    public GeneralInformationResource(GeneralInformationRepository generalInformationRepository) {
        this.generalInformationRepository = generalInformationRepository;
    }

    /**
     * POST  /general-informations : Create a new generalInformation.
     *
     * @param generalInformation the generalInformation to create
     * @return the ResponseEntity with status 201 (Created) and with body the new generalInformation, or with status 400 (Bad Request) if the generalInformation has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/general-informations")
    @Timed
    public ResponseEntity<GeneralInformation> createGeneralInformation(@RequestBody GeneralInformation generalInformation) throws URISyntaxException {
        log.debug("REST request to save GeneralInformation : {}", generalInformation);
        if (generalInformation.getId() != null) {
            throw new BadRequestAlertException("A new generalInformation cannot already have an ID", ENTITY_NAME, "idexists");
        }
        GeneralInformation result = generalInformationRepository.save(generalInformation);
        return ResponseEntity.created(new URI("/api/general-informations/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /general-informations : Updates an existing generalInformation.
     *
     * @param generalInformation the generalInformation to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated generalInformation,
     * or with status 400 (Bad Request) if the generalInformation is not valid,
     * or with status 500 (Internal Server Error) if the generalInformation couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/general-informations")
    @Timed
    public ResponseEntity<GeneralInformation> updateGeneralInformation(@RequestBody GeneralInformation generalInformation) throws URISyntaxException {
        log.debug("REST request to update GeneralInformation : {}", generalInformation);
        if (generalInformation.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        GeneralInformation result = generalInformationRepository.save(generalInformation);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, generalInformation.getId().toString()))
            .body(result);
    }

    /**
     * GET  /general-informations : get all the generalInformations.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of generalInformations in body
     */
    @GetMapping("/general-informations")
    @Timed
    public List<GeneralInformation> getAllGeneralInformations() {
        log.debug("REST request to get all GeneralInformations");
        return generalInformationRepository.findAll();
    }

    /**
     * GET  /general-informations/:id : get the "id" generalInformation.
     *
     * @param id the id of the generalInformation to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the generalInformation, or with status 404 (Not Found)
     */
    @GetMapping("/general-informations/{id}")
    @Timed
    public ResponseEntity<GeneralInformation> getGeneralInformation(@PathVariable String id) {
        log.debug("REST request to get GeneralInformation : {}", id);
        Optional<GeneralInformation> generalInformation = generalInformationRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(generalInformation);
    }

    /**
     * DELETE  /general-informations/:id : delete the "id" generalInformation.
     *
     * @param id the id of the generalInformation to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/general-informations/{id}")
    @Timed
    public ResponseEntity<Void> deleteGeneralInformation(@PathVariable String id) {
        log.debug("REST request to delete GeneralInformation : {}", id);

        generalInformationRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id)).build();
    }
}
