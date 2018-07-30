package za.co.skywalk.pangeodata.web.rest;

import com.codahale.metrics.annotation.Timed;
import za.co.skywalk.pangeodata.domain.ReferenceCheckReport;
import za.co.skywalk.pangeodata.repository.ReferenceCheckReportRepository;
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
 * REST controller for managing ReferenceCheckReport.
 */
@RestController
@RequestMapping("/api")
public class ReferenceCheckReportResource {

    private final Logger log = LoggerFactory.getLogger(ReferenceCheckReportResource.class);

    private static final String ENTITY_NAME = "referenceCheckReport";

    private final ReferenceCheckReportRepository referenceCheckReportRepository;

    public ReferenceCheckReportResource(ReferenceCheckReportRepository referenceCheckReportRepository) {
        this.referenceCheckReportRepository = referenceCheckReportRepository;
    }

    /**
     * POST  /reference-check-reports : Create a new referenceCheckReport.
     *
     * @param referenceCheckReport the referenceCheckReport to create
     * @return the ResponseEntity with status 201 (Created) and with body the new referenceCheckReport, or with status 400 (Bad Request) if the referenceCheckReport has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/reference-check-reports")
    @Timed
    public ResponseEntity<ReferenceCheckReport> createReferenceCheckReport(@RequestBody ReferenceCheckReport referenceCheckReport) throws URISyntaxException {
        log.debug("REST request to save ReferenceCheckReport : {}", referenceCheckReport);
        if (referenceCheckReport.getId() != null) {
            throw new BadRequestAlertException("A new referenceCheckReport cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ReferenceCheckReport result = referenceCheckReportRepository.save(referenceCheckReport);
        return ResponseEntity.created(new URI("/api/reference-check-reports/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /reference-check-reports : Updates an existing referenceCheckReport.
     *
     * @param referenceCheckReport the referenceCheckReport to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated referenceCheckReport,
     * or with status 400 (Bad Request) if the referenceCheckReport is not valid,
     * or with status 500 (Internal Server Error) if the referenceCheckReport couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/reference-check-reports")
    @Timed
    public ResponseEntity<ReferenceCheckReport> updateReferenceCheckReport(@RequestBody ReferenceCheckReport referenceCheckReport) throws URISyntaxException {
        log.debug("REST request to update ReferenceCheckReport : {}", referenceCheckReport);
        if (referenceCheckReport.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ReferenceCheckReport result = referenceCheckReportRepository.save(referenceCheckReport);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, referenceCheckReport.getId().toString()))
            .body(result);
    }

    /**
     * GET  /reference-check-reports : get all the referenceCheckReports.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of referenceCheckReports in body
     */
    @GetMapping("/reference-check-reports")
    @Timed
    public List<ReferenceCheckReport> getAllReferenceCheckReports() {
        log.debug("REST request to get all ReferenceCheckReports");
        return referenceCheckReportRepository.findAll();
    }

    /**
     * GET  /reference-check-reports/:id : get the "id" referenceCheckReport.
     *
     * @param id the id of the referenceCheckReport to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the referenceCheckReport, or with status 404 (Not Found)
     */
    @GetMapping("/reference-check-reports/{id}")
    @Timed
    public ResponseEntity<ReferenceCheckReport> getReferenceCheckReport(@PathVariable String id) {
        log.debug("REST request to get ReferenceCheckReport : {}", id);
        Optional<ReferenceCheckReport> referenceCheckReport = referenceCheckReportRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(referenceCheckReport);
    }

    /**
     * DELETE  /reference-check-reports/:id : delete the "id" referenceCheckReport.
     *
     * @param id the id of the referenceCheckReport to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/reference-check-reports/{id}")
    @Timed
    public ResponseEntity<Void> deleteReferenceCheckReport(@PathVariable String id) {
        log.debug("REST request to delete ReferenceCheckReport : {}", id);

        referenceCheckReportRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id)).build();
    }
}
