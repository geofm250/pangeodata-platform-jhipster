package za.co.skywalk.pangeodata.web.rest;

import com.codahale.metrics.annotation.Timed;
import za.co.skywalk.pangeodata.domain.PassportCheckReport;
import za.co.skywalk.pangeodata.repository.PassportCheckReportRepository;
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
 * REST controller for managing PassportCheckReport.
 */
@RestController
@RequestMapping("/api")
public class PassportCheckReportResource {

    private final Logger log = LoggerFactory.getLogger(PassportCheckReportResource.class);

    private static final String ENTITY_NAME = "passportCheckReport";

    private final PassportCheckReportRepository passportCheckReportRepository;

    public PassportCheckReportResource(PassportCheckReportRepository passportCheckReportRepository) {
        this.passportCheckReportRepository = passportCheckReportRepository;
    }

    /**
     * POST  /passport-check-reports : Create a new passportCheckReport.
     *
     * @param passportCheckReport the passportCheckReport to create
     * @return the ResponseEntity with status 201 (Created) and with body the new passportCheckReport, or with status 400 (Bad Request) if the passportCheckReport has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/passport-check-reports")
    @Timed
    public ResponseEntity<PassportCheckReport> createPassportCheckReport(@RequestBody PassportCheckReport passportCheckReport) throws URISyntaxException {
        log.debug("REST request to save PassportCheckReport : {}", passportCheckReport);
        if (passportCheckReport.getId() != null) {
            throw new BadRequestAlertException("A new passportCheckReport cannot already have an ID", ENTITY_NAME, "idexists");
        }
        PassportCheckReport result = passportCheckReportRepository.save(passportCheckReport);
        return ResponseEntity.created(new URI("/api/passport-check-reports/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /passport-check-reports : Updates an existing passportCheckReport.
     *
     * @param passportCheckReport the passportCheckReport to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated passportCheckReport,
     * or with status 400 (Bad Request) if the passportCheckReport is not valid,
     * or with status 500 (Internal Server Error) if the passportCheckReport couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/passport-check-reports")
    @Timed
    public ResponseEntity<PassportCheckReport> updatePassportCheckReport(@RequestBody PassportCheckReport passportCheckReport) throws URISyntaxException {
        log.debug("REST request to update PassportCheckReport : {}", passportCheckReport);
        if (passportCheckReport.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        PassportCheckReport result = passportCheckReportRepository.save(passportCheckReport);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, passportCheckReport.getId().toString()))
            .body(result);
    }

    /**
     * GET  /passport-check-reports : get all the passportCheckReports.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of passportCheckReports in body
     */
    @GetMapping("/passport-check-reports")
    @Timed
    public List<PassportCheckReport> getAllPassportCheckReports() {
        log.debug("REST request to get all PassportCheckReports");
        return passportCheckReportRepository.findAll();
    }

    /**
     * GET  /passport-check-reports/:id : get the "id" passportCheckReport.
     *
     * @param id the id of the passportCheckReport to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the passportCheckReport, or with status 404 (Not Found)
     */
    @GetMapping("/passport-check-reports/{id}")
    @Timed
    public ResponseEntity<PassportCheckReport> getPassportCheckReport(@PathVariable String id) {
        log.debug("REST request to get PassportCheckReport : {}", id);
        Optional<PassportCheckReport> passportCheckReport = passportCheckReportRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(passportCheckReport);
    }

    /**
     * DELETE  /passport-check-reports/:id : delete the "id" passportCheckReport.
     *
     * @param id the id of the passportCheckReport to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/passport-check-reports/{id}")
    @Timed
    public ResponseEntity<Void> deletePassportCheckReport(@PathVariable String id) {
        log.debug("REST request to delete PassportCheckReport : {}", id);

        passportCheckReportRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id)).build();
    }
}
