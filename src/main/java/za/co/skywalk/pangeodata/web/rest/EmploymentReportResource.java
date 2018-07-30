package za.co.skywalk.pangeodata.web.rest;

import com.codahale.metrics.annotation.Timed;
import za.co.skywalk.pangeodata.domain.EmploymentReport;
import za.co.skywalk.pangeodata.repository.EmploymentReportRepository;
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
 * REST controller for managing EmploymentReport.
 */
@RestController
@RequestMapping("/api")
public class EmploymentReportResource {

    private final Logger log = LoggerFactory.getLogger(EmploymentReportResource.class);

    private static final String ENTITY_NAME = "employmentReport";

    private final EmploymentReportRepository employmentReportRepository;

    public EmploymentReportResource(EmploymentReportRepository employmentReportRepository) {
        this.employmentReportRepository = employmentReportRepository;
    }

    /**
     * POST  /employment-reports : Create a new employmentReport.
     *
     * @param employmentReport the employmentReport to create
     * @return the ResponseEntity with status 201 (Created) and with body the new employmentReport, or with status 400 (Bad Request) if the employmentReport has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/employment-reports")
    @Timed
    public ResponseEntity<EmploymentReport> createEmploymentReport(@RequestBody EmploymentReport employmentReport) throws URISyntaxException {
        log.debug("REST request to save EmploymentReport : {}", employmentReport);
        if (employmentReport.getId() != null) {
            throw new BadRequestAlertException("A new employmentReport cannot already have an ID", ENTITY_NAME, "idexists");
        }
        EmploymentReport result = employmentReportRepository.save(employmentReport);
        return ResponseEntity.created(new URI("/api/employment-reports/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /employment-reports : Updates an existing employmentReport.
     *
     * @param employmentReport the employmentReport to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated employmentReport,
     * or with status 400 (Bad Request) if the employmentReport is not valid,
     * or with status 500 (Internal Server Error) if the employmentReport couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/employment-reports")
    @Timed
    public ResponseEntity<EmploymentReport> updateEmploymentReport(@RequestBody EmploymentReport employmentReport) throws URISyntaxException {
        log.debug("REST request to update EmploymentReport : {}", employmentReport);
        if (employmentReport.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        EmploymentReport result = employmentReportRepository.save(employmentReport);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, employmentReport.getId().toString()))
            .body(result);
    }

    /**
     * GET  /employment-reports : get all the employmentReports.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of employmentReports in body
     */
    @GetMapping("/employment-reports")
    @Timed
    public List<EmploymentReport> getAllEmploymentReports() {
        log.debug("REST request to get all EmploymentReports");
        return employmentReportRepository.findAll();
    }

    /**
     * GET  /employment-reports/:id : get the "id" employmentReport.
     *
     * @param id the id of the employmentReport to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the employmentReport, or with status 404 (Not Found)
     */
    @GetMapping("/employment-reports/{id}")
    @Timed
    public ResponseEntity<EmploymentReport> getEmploymentReport(@PathVariable String id) {
        log.debug("REST request to get EmploymentReport : {}", id);
        Optional<EmploymentReport> employmentReport = employmentReportRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(employmentReport);
    }

    /**
     * DELETE  /employment-reports/:id : delete the "id" employmentReport.
     *
     * @param id the id of the employmentReport to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/employment-reports/{id}")
    @Timed
    public ResponseEntity<Void> deleteEmploymentReport(@PathVariable String id) {
        log.debug("REST request to delete EmploymentReport : {}", id);

        employmentReportRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id)).build();
    }
}
