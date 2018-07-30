package za.co.skywalk.pangeodata.web.rest;

import com.codahale.metrics.annotation.Timed;
import za.co.skywalk.pangeodata.domain.CivilLitigationCheckReport;
import za.co.skywalk.pangeodata.repository.CivilLitigationCheckReportRepository;
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
 * REST controller for managing CivilLitigationCheckReport.
 */
@RestController
@RequestMapping("/api")
public class CivilLitigationCheckReportResource {

    private final Logger log = LoggerFactory.getLogger(CivilLitigationCheckReportResource.class);

    private static final String ENTITY_NAME = "civilLitigationCheckReport";

    private final CivilLitigationCheckReportRepository civilLitigationCheckReportRepository;

    public CivilLitigationCheckReportResource(CivilLitigationCheckReportRepository civilLitigationCheckReportRepository) {
        this.civilLitigationCheckReportRepository = civilLitigationCheckReportRepository;
    }

    /**
     * POST  /civil-litigation-check-reports : Create a new civilLitigationCheckReport.
     *
     * @param civilLitigationCheckReport the civilLitigationCheckReport to create
     * @return the ResponseEntity with status 201 (Created) and with body the new civilLitigationCheckReport, or with status 400 (Bad Request) if the civilLitigationCheckReport has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/civil-litigation-check-reports")
    @Timed
    public ResponseEntity<CivilLitigationCheckReport> createCivilLitigationCheckReport(@RequestBody CivilLitigationCheckReport civilLitigationCheckReport) throws URISyntaxException {
        log.debug("REST request to save CivilLitigationCheckReport : {}", civilLitigationCheckReport);
        if (civilLitigationCheckReport.getId() != null) {
            throw new BadRequestAlertException("A new civilLitigationCheckReport cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CivilLitigationCheckReport result = civilLitigationCheckReportRepository.save(civilLitigationCheckReport);
        return ResponseEntity.created(new URI("/api/civil-litigation-check-reports/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /civil-litigation-check-reports : Updates an existing civilLitigationCheckReport.
     *
     * @param civilLitigationCheckReport the civilLitigationCheckReport to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated civilLitigationCheckReport,
     * or with status 400 (Bad Request) if the civilLitigationCheckReport is not valid,
     * or with status 500 (Internal Server Error) if the civilLitigationCheckReport couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/civil-litigation-check-reports")
    @Timed
    public ResponseEntity<CivilLitigationCheckReport> updateCivilLitigationCheckReport(@RequestBody CivilLitigationCheckReport civilLitigationCheckReport) throws URISyntaxException {
        log.debug("REST request to update CivilLitigationCheckReport : {}", civilLitigationCheckReport);
        if (civilLitigationCheckReport.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        CivilLitigationCheckReport result = civilLitigationCheckReportRepository.save(civilLitigationCheckReport);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, civilLitigationCheckReport.getId().toString()))
            .body(result);
    }

    /**
     * GET  /civil-litigation-check-reports : get all the civilLitigationCheckReports.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of civilLitigationCheckReports in body
     */
    @GetMapping("/civil-litigation-check-reports")
    @Timed
    public List<CivilLitigationCheckReport> getAllCivilLitigationCheckReports() {
        log.debug("REST request to get all CivilLitigationCheckReports");
        return civilLitigationCheckReportRepository.findAll();
    }

    /**
     * GET  /civil-litigation-check-reports/:id : get the "id" civilLitigationCheckReport.
     *
     * @param id the id of the civilLitigationCheckReport to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the civilLitigationCheckReport, or with status 404 (Not Found)
     */
    @GetMapping("/civil-litigation-check-reports/{id}")
    @Timed
    public ResponseEntity<CivilLitigationCheckReport> getCivilLitigationCheckReport(@PathVariable String id) {
        log.debug("REST request to get CivilLitigationCheckReport : {}", id);
        Optional<CivilLitigationCheckReport> civilLitigationCheckReport = civilLitigationCheckReportRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(civilLitigationCheckReport);
    }

    /**
     * DELETE  /civil-litigation-check-reports/:id : delete the "id" civilLitigationCheckReport.
     *
     * @param id the id of the civilLitigationCheckReport to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/civil-litigation-check-reports/{id}")
    @Timed
    public ResponseEntity<Void> deleteCivilLitigationCheckReport(@PathVariable String id) {
        log.debug("REST request to delete CivilLitigationCheckReport : {}", id);

        civilLitigationCheckReportRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id)).build();
    }
}
