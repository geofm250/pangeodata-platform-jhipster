package za.co.skywalk.pangeodata.web.rest;

import com.codahale.metrics.annotation.Timed;
import za.co.skywalk.pangeodata.domain.DirectorshipVerificationReport;
import za.co.skywalk.pangeodata.repository.DirectorshipVerificationReportRepository;
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
 * REST controller for managing DirectorshipVerificationReport.
 */
@RestController
@RequestMapping("/api")
public class DirectorshipVerificationReportResource {

    private final Logger log = LoggerFactory.getLogger(DirectorshipVerificationReportResource.class);

    private static final String ENTITY_NAME = "directorshipVerificationReport";

    private final DirectorshipVerificationReportRepository directorshipVerificationReportRepository;

    public DirectorshipVerificationReportResource(DirectorshipVerificationReportRepository directorshipVerificationReportRepository) {
        this.directorshipVerificationReportRepository = directorshipVerificationReportRepository;
    }

    /**
     * POST  /directorship-verification-reports : Create a new directorshipVerificationReport.
     *
     * @param directorshipVerificationReport the directorshipVerificationReport to create
     * @return the ResponseEntity with status 201 (Created) and with body the new directorshipVerificationReport, or with status 400 (Bad Request) if the directorshipVerificationReport has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/directorship-verification-reports")
    @Timed
    public ResponseEntity<DirectorshipVerificationReport> createDirectorshipVerificationReport(@RequestBody DirectorshipVerificationReport directorshipVerificationReport) throws URISyntaxException {
        log.debug("REST request to save DirectorshipVerificationReport : {}", directorshipVerificationReport);
        if (directorshipVerificationReport.getId() != null) {
            throw new BadRequestAlertException("A new directorshipVerificationReport cannot already have an ID", ENTITY_NAME, "idexists");
        }
        DirectorshipVerificationReport result = directorshipVerificationReportRepository.save(directorshipVerificationReport);
        return ResponseEntity.created(new URI("/api/directorship-verification-reports/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /directorship-verification-reports : Updates an existing directorshipVerificationReport.
     *
     * @param directorshipVerificationReport the directorshipVerificationReport to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated directorshipVerificationReport,
     * or with status 400 (Bad Request) if the directorshipVerificationReport is not valid,
     * or with status 500 (Internal Server Error) if the directorshipVerificationReport couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/directorship-verification-reports")
    @Timed
    public ResponseEntity<DirectorshipVerificationReport> updateDirectorshipVerificationReport(@RequestBody DirectorshipVerificationReport directorshipVerificationReport) throws URISyntaxException {
        log.debug("REST request to update DirectorshipVerificationReport : {}", directorshipVerificationReport);
        if (directorshipVerificationReport.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        DirectorshipVerificationReport result = directorshipVerificationReportRepository.save(directorshipVerificationReport);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, directorshipVerificationReport.getId().toString()))
            .body(result);
    }

    /**
     * GET  /directorship-verification-reports : get all the directorshipVerificationReports.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of directorshipVerificationReports in body
     */
    @GetMapping("/directorship-verification-reports")
    @Timed
    public List<DirectorshipVerificationReport> getAllDirectorshipVerificationReports() {
        log.debug("REST request to get all DirectorshipVerificationReports");
        return directorshipVerificationReportRepository.findAll();
    }

    /**
     * GET  /directorship-verification-reports/:id : get the "id" directorshipVerificationReport.
     *
     * @param id the id of the directorshipVerificationReport to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the directorshipVerificationReport, or with status 404 (Not Found)
     */
    @GetMapping("/directorship-verification-reports/{id}")
    @Timed
    public ResponseEntity<DirectorshipVerificationReport> getDirectorshipVerificationReport(@PathVariable String id) {
        log.debug("REST request to get DirectorshipVerificationReport : {}", id);
        Optional<DirectorshipVerificationReport> directorshipVerificationReport = directorshipVerificationReportRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(directorshipVerificationReport);
    }

    /**
     * DELETE  /directorship-verification-reports/:id : delete the "id" directorshipVerificationReport.
     *
     * @param id the id of the directorshipVerificationReport to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/directorship-verification-reports/{id}")
    @Timed
    public ResponseEntity<Void> deleteDirectorshipVerificationReport(@PathVariable String id) {
        log.debug("REST request to delete DirectorshipVerificationReport : {}", id);

        directorshipVerificationReportRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id)).build();
    }
}
