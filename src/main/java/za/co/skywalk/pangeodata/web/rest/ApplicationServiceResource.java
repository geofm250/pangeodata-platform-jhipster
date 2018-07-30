package za.co.skywalk.pangeodata.web.rest;

import com.codahale.metrics.annotation.Timed;
import za.co.skywalk.pangeodata.domain.ApplicationService;
import za.co.skywalk.pangeodata.repository.ApplicationServiceRepository;
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
 * REST controller for managing ApplicationService.
 */
@RestController
@RequestMapping("/api")
public class ApplicationServiceResource {

    private final Logger log = LoggerFactory.getLogger(ApplicationServiceResource.class);

    private static final String ENTITY_NAME = "applicationService";

    private final ApplicationServiceRepository applicationServiceRepository;

    public ApplicationServiceResource(ApplicationServiceRepository applicationServiceRepository) {
        this.applicationServiceRepository = applicationServiceRepository;
    }

    /**
     * POST  /application-services : Create a new applicationService.
     *
     * @param applicationService the applicationService to create
     * @return the ResponseEntity with status 201 (Created) and with body the new applicationService, or with status 400 (Bad Request) if the applicationService has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/application-services")
    @Timed
    public ResponseEntity<ApplicationService> createApplicationService(@RequestBody ApplicationService applicationService) throws URISyntaxException {
        log.debug("REST request to save ApplicationService : {}", applicationService);
        if (applicationService.getId() != null) {
            throw new BadRequestAlertException("A new applicationService cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ApplicationService result = applicationServiceRepository.save(applicationService);
        return ResponseEntity.created(new URI("/api/application-services/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /application-services : Updates an existing applicationService.
     *
     * @param applicationService the applicationService to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated applicationService,
     * or with status 400 (Bad Request) if the applicationService is not valid,
     * or with status 500 (Internal Server Error) if the applicationService couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/application-services")
    @Timed
    public ResponseEntity<ApplicationService> updateApplicationService(@RequestBody ApplicationService applicationService) throws URISyntaxException {
        log.debug("REST request to update ApplicationService : {}", applicationService);
        if (applicationService.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ApplicationService result = applicationServiceRepository.save(applicationService);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, applicationService.getId().toString()))
            .body(result);
    }

    /**
     * GET  /application-services : get all the applicationServices.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of applicationServices in body
     */
    @GetMapping("/application-services")
    @Timed
    public List<ApplicationService> getAllApplicationServices() {
        log.debug("REST request to get all ApplicationServices");
        return applicationServiceRepository.findAll();
    }

    /**
     * GET  /application-services/:id : get the "id" applicationService.
     *
     * @param id the id of the applicationService to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the applicationService, or with status 404 (Not Found)
     */
    @GetMapping("/application-services/{id}")
    @Timed
    public ResponseEntity<ApplicationService> getApplicationService(@PathVariable String id) {
        log.debug("REST request to get ApplicationService : {}", id);
        Optional<ApplicationService> applicationService = applicationServiceRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(applicationService);
    }

    /**
     * DELETE  /application-services/:id : delete the "id" applicationService.
     *
     * @param id the id of the applicationService to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/application-services/{id}")
    @Timed
    public ResponseEntity<Void> deleteApplicationService(@PathVariable String id) {
        log.debug("REST request to delete ApplicationService : {}", id);

        applicationServiceRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id)).build();
    }
}
