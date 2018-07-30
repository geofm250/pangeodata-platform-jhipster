package za.co.skywalk.pangeodata.web.rest;

import com.codahale.metrics.annotation.Timed;
import za.co.skywalk.pangeodata.domain.ReportedCriminalActivityCheck;
import za.co.skywalk.pangeodata.repository.ReportedCriminalActivityCheckRepository;
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
 * REST controller for managing ReportedCriminalActivityCheck.
 */
@RestController
@RequestMapping("/api")
public class ReportedCriminalActivityCheckResource {

    private final Logger log = LoggerFactory.getLogger(ReportedCriminalActivityCheckResource.class);

    private static final String ENTITY_NAME = "reportedCriminalActivityCheck";

    private final ReportedCriminalActivityCheckRepository reportedCriminalActivityCheckRepository;

    public ReportedCriminalActivityCheckResource(ReportedCriminalActivityCheckRepository reportedCriminalActivityCheckRepository) {
        this.reportedCriminalActivityCheckRepository = reportedCriminalActivityCheckRepository;
    }

    /**
     * POST  /reported-criminal-activity-checks : Create a new reportedCriminalActivityCheck.
     *
     * @param reportedCriminalActivityCheck the reportedCriminalActivityCheck to create
     * @return the ResponseEntity with status 201 (Created) and with body the new reportedCriminalActivityCheck, or with status 400 (Bad Request) if the reportedCriminalActivityCheck has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/reported-criminal-activity-checks")
    @Timed
    public ResponseEntity<ReportedCriminalActivityCheck> createReportedCriminalActivityCheck(@RequestBody ReportedCriminalActivityCheck reportedCriminalActivityCheck) throws URISyntaxException {
        log.debug("REST request to save ReportedCriminalActivityCheck : {}", reportedCriminalActivityCheck);
        if (reportedCriminalActivityCheck.getId() != null) {
            throw new BadRequestAlertException("A new reportedCriminalActivityCheck cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ReportedCriminalActivityCheck result = reportedCriminalActivityCheckRepository.save(reportedCriminalActivityCheck);
        return ResponseEntity.created(new URI("/api/reported-criminal-activity-checks/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /reported-criminal-activity-checks : Updates an existing reportedCriminalActivityCheck.
     *
     * @param reportedCriminalActivityCheck the reportedCriminalActivityCheck to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated reportedCriminalActivityCheck,
     * or with status 400 (Bad Request) if the reportedCriminalActivityCheck is not valid,
     * or with status 500 (Internal Server Error) if the reportedCriminalActivityCheck couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/reported-criminal-activity-checks")
    @Timed
    public ResponseEntity<ReportedCriminalActivityCheck> updateReportedCriminalActivityCheck(@RequestBody ReportedCriminalActivityCheck reportedCriminalActivityCheck) throws URISyntaxException {
        log.debug("REST request to update ReportedCriminalActivityCheck : {}", reportedCriminalActivityCheck);
        if (reportedCriminalActivityCheck.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ReportedCriminalActivityCheck result = reportedCriminalActivityCheckRepository.save(reportedCriminalActivityCheck);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, reportedCriminalActivityCheck.getId().toString()))
            .body(result);
    }

    /**
     * GET  /reported-criminal-activity-checks : get all the reportedCriminalActivityChecks.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of reportedCriminalActivityChecks in body
     */
    @GetMapping("/reported-criminal-activity-checks")
    @Timed
    public List<ReportedCriminalActivityCheck> getAllReportedCriminalActivityChecks() {
        log.debug("REST request to get all ReportedCriminalActivityChecks");
        return reportedCriminalActivityCheckRepository.findAll();
    }

    /**
     * GET  /reported-criminal-activity-checks/:id : get the "id" reportedCriminalActivityCheck.
     *
     * @param id the id of the reportedCriminalActivityCheck to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the reportedCriminalActivityCheck, or with status 404 (Not Found)
     */
    @GetMapping("/reported-criminal-activity-checks/{id}")
    @Timed
    public ResponseEntity<ReportedCriminalActivityCheck> getReportedCriminalActivityCheck(@PathVariable String id) {
        log.debug("REST request to get ReportedCriminalActivityCheck : {}", id);
        Optional<ReportedCriminalActivityCheck> reportedCriminalActivityCheck = reportedCriminalActivityCheckRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(reportedCriminalActivityCheck);
    }

    /**
     * DELETE  /reported-criminal-activity-checks/:id : delete the "id" reportedCriminalActivityCheck.
     *
     * @param id the id of the reportedCriminalActivityCheck to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/reported-criminal-activity-checks/{id}")
    @Timed
    public ResponseEntity<Void> deleteReportedCriminalActivityCheck(@PathVariable String id) {
        log.debug("REST request to delete ReportedCriminalActivityCheck : {}", id);

        reportedCriminalActivityCheckRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id)).build();
    }
}
