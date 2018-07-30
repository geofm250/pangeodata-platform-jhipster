package za.co.skywalk.pangeodata.web.rest;

import com.codahale.metrics.annotation.Timed;
import za.co.skywalk.pangeodata.domain.Requirement;
import za.co.skywalk.pangeodata.repository.RequirementRepository;
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
 * REST controller for managing Requirement.
 */
@RestController
@RequestMapping("/api")
public class RequirementResource {

    private final Logger log = LoggerFactory.getLogger(RequirementResource.class);

    private static final String ENTITY_NAME = "requirement";

    private final RequirementRepository requirementRepository;

    public RequirementResource(RequirementRepository requirementRepository) {
        this.requirementRepository = requirementRepository;
    }

    /**
     * POST  /requirements : Create a new requirement.
     *
     * @param requirement the requirement to create
     * @return the ResponseEntity with status 201 (Created) and with body the new requirement, or with status 400 (Bad Request) if the requirement has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/requirements")
    @Timed
    public ResponseEntity<Requirement> createRequirement(@RequestBody Requirement requirement) throws URISyntaxException {
        log.debug("REST request to save Requirement : {}", requirement);
        if (requirement.getId() != null) {
            throw new BadRequestAlertException("A new requirement cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Requirement result = requirementRepository.save(requirement);
        return ResponseEntity.created(new URI("/api/requirements/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /requirements : Updates an existing requirement.
     *
     * @param requirement the requirement to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated requirement,
     * or with status 400 (Bad Request) if the requirement is not valid,
     * or with status 500 (Internal Server Error) if the requirement couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/requirements")
    @Timed
    public ResponseEntity<Requirement> updateRequirement(@RequestBody Requirement requirement) throws URISyntaxException {
        log.debug("REST request to update Requirement : {}", requirement);
        if (requirement.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Requirement result = requirementRepository.save(requirement);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, requirement.getId().toString()))
            .body(result);
    }

    /**
     * GET  /requirements : get all the requirements.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of requirements in body
     */
    @GetMapping("/requirements")
    @Timed
    public List<Requirement> getAllRequirements() {
        log.debug("REST request to get all Requirements");
        return requirementRepository.findAll();
    }

    /**
     * GET  /requirements/:id : get the "id" requirement.
     *
     * @param id the id of the requirement to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the requirement, or with status 404 (Not Found)
     */
    @GetMapping("/requirements/{id}")
    @Timed
    public ResponseEntity<Requirement> getRequirement(@PathVariable String id) {
        log.debug("REST request to get Requirement : {}", id);
        Optional<Requirement> requirement = requirementRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(requirement);
    }

    /**
     * DELETE  /requirements/:id : delete the "id" requirement.
     *
     * @param id the id of the requirement to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/requirements/{id}")
    @Timed
    public ResponseEntity<Void> deleteRequirement(@PathVariable String id) {
        log.debug("REST request to delete Requirement : {}", id);

        requirementRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id)).build();
    }
}
