package za.co.skywalk.pangeodata.web.rest;

import com.codahale.metrics.annotation.Timed;
import za.co.skywalk.pangeodata.domain.IdentityCheckReport;
import za.co.skywalk.pangeodata.repository.IdentityCheckReportRepository;
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
 * REST controller for managing IdentityCheckReport.
 */
@RestController
@RequestMapping("/api")
public class IdentityCheckReportResource {

    private final Logger log = LoggerFactory.getLogger(IdentityCheckReportResource.class);

    private static final String ENTITY_NAME = "identityCheckReport";

    private final IdentityCheckReportRepository identityCheckReportRepository;

    public IdentityCheckReportResource(IdentityCheckReportRepository identityCheckReportRepository) {
        this.identityCheckReportRepository = identityCheckReportRepository;
    }

    /**
     * POST  /identity-check-reports : Create a new identityCheckReport.
     *
     * @param identityCheckReport the identityCheckReport to create
     * @return the ResponseEntity with status 201 (Created) and with body the new identityCheckReport, or with status 400 (Bad Request) if the identityCheckReport has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/identity-check-reports")
    @Timed
    public ResponseEntity<IdentityCheckReport> createIdentityCheckReport(@RequestBody IdentityCheckReport identityCheckReport) throws URISyntaxException {
        log.debug("REST request to save IdentityCheckReport : {}", identityCheckReport);
        if (identityCheckReport.getId() != null) {
            throw new BadRequestAlertException("A new identityCheckReport cannot already have an ID", ENTITY_NAME, "idexists");
        }
        IdentityCheckReport result = identityCheckReportRepository.save(identityCheckReport);
        return ResponseEntity.created(new URI("/api/identity-check-reports/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /identity-check-reports : Updates an existing identityCheckReport.
     *
     * @param identityCheckReport the identityCheckReport to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated identityCheckReport,
     * or with status 400 (Bad Request) if the identityCheckReport is not valid,
     * or with status 500 (Internal Server Error) if the identityCheckReport couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/identity-check-reports")
    @Timed
    public ResponseEntity<IdentityCheckReport> updateIdentityCheckReport(@RequestBody IdentityCheckReport identityCheckReport) throws URISyntaxException {
        log.debug("REST request to update IdentityCheckReport : {}", identityCheckReport);
        if (identityCheckReport.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        IdentityCheckReport result = identityCheckReportRepository.save(identityCheckReport);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, identityCheckReport.getId().toString()))
            .body(result);
    }

    /**
     * GET  /identity-check-reports : get all the identityCheckReports.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of identityCheckReports in body
     */
    @GetMapping("/identity-check-reports")
    @Timed
    public List<IdentityCheckReport> getAllIdentityCheckReports() {
        log.debug("REST request to get all IdentityCheckReports");
        return identityCheckReportRepository.findAll();
    }

    /**
     * GET  /identity-check-reports/:id : get the "id" identityCheckReport.
     *
     * @param id the id of the identityCheckReport to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the identityCheckReport, or with status 404 (Not Found)
     */
    @GetMapping("/identity-check-reports/{id}")
    @Timed
    public ResponseEntity<IdentityCheckReport> getIdentityCheckReport(@PathVariable String id) {
        log.debug("REST request to get IdentityCheckReport : {}", id);
        Optional<IdentityCheckReport> identityCheckReport = identityCheckReportRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(identityCheckReport);
    }

    /**
     * DELETE  /identity-check-reports/:id : delete the "id" identityCheckReport.
     *
     * @param id the id of the identityCheckReport to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/identity-check-reports/{id}")
    @Timed
    public ResponseEntity<Void> deleteIdentityCheckReport(@PathVariable String id) {
        log.debug("REST request to delete IdentityCheckReport : {}", id);

        identityCheckReportRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id)).build();
    }
}
