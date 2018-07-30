package za.co.skywalk.pangeodata.web.rest;

import com.codahale.metrics.annotation.Timed;
import za.co.skywalk.pangeodata.domain.DriversLicenseCheckReport;
import za.co.skywalk.pangeodata.repository.DriversLicenseCheckReportRepository;
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
 * REST controller for managing DriversLicenseCheckReport.
 */
@RestController
@RequestMapping("/api")
public class DriversLicenseCheckReportResource {

    private final Logger log = LoggerFactory.getLogger(DriversLicenseCheckReportResource.class);

    private static final String ENTITY_NAME = "driversLicenseCheckReport";

    private final DriversLicenseCheckReportRepository driversLicenseCheckReportRepository;

    public DriversLicenseCheckReportResource(DriversLicenseCheckReportRepository driversLicenseCheckReportRepository) {
        this.driversLicenseCheckReportRepository = driversLicenseCheckReportRepository;
    }

    /**
     * POST  /drivers-license-check-reports : Create a new driversLicenseCheckReport.
     *
     * @param driversLicenseCheckReport the driversLicenseCheckReport to create
     * @return the ResponseEntity with status 201 (Created) and with body the new driversLicenseCheckReport, or with status 400 (Bad Request) if the driversLicenseCheckReport has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/drivers-license-check-reports")
    @Timed
    public ResponseEntity<DriversLicenseCheckReport> createDriversLicenseCheckReport(@RequestBody DriversLicenseCheckReport driversLicenseCheckReport) throws URISyntaxException {
        log.debug("REST request to save DriversLicenseCheckReport : {}", driversLicenseCheckReport);
        if (driversLicenseCheckReport.getId() != null) {
            throw new BadRequestAlertException("A new driversLicenseCheckReport cannot already have an ID", ENTITY_NAME, "idexists");
        }
        DriversLicenseCheckReport result = driversLicenseCheckReportRepository.save(driversLicenseCheckReport);
        return ResponseEntity.created(new URI("/api/drivers-license-check-reports/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /drivers-license-check-reports : Updates an existing driversLicenseCheckReport.
     *
     * @param driversLicenseCheckReport the driversLicenseCheckReport to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated driversLicenseCheckReport,
     * or with status 400 (Bad Request) if the driversLicenseCheckReport is not valid,
     * or with status 500 (Internal Server Error) if the driversLicenseCheckReport couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/drivers-license-check-reports")
    @Timed
    public ResponseEntity<DriversLicenseCheckReport> updateDriversLicenseCheckReport(@RequestBody DriversLicenseCheckReport driversLicenseCheckReport) throws URISyntaxException {
        log.debug("REST request to update DriversLicenseCheckReport : {}", driversLicenseCheckReport);
        if (driversLicenseCheckReport.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        DriversLicenseCheckReport result = driversLicenseCheckReportRepository.save(driversLicenseCheckReport);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, driversLicenseCheckReport.getId().toString()))
            .body(result);
    }

    /**
     * GET  /drivers-license-check-reports : get all the driversLicenseCheckReports.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of driversLicenseCheckReports in body
     */
    @GetMapping("/drivers-license-check-reports")
    @Timed
    public List<DriversLicenseCheckReport> getAllDriversLicenseCheckReports() {
        log.debug("REST request to get all DriversLicenseCheckReports");
        return driversLicenseCheckReportRepository.findAll();
    }

    /**
     * GET  /drivers-license-check-reports/:id : get the "id" driversLicenseCheckReport.
     *
     * @param id the id of the driversLicenseCheckReport to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the driversLicenseCheckReport, or with status 404 (Not Found)
     */
    @GetMapping("/drivers-license-check-reports/{id}")
    @Timed
    public ResponseEntity<DriversLicenseCheckReport> getDriversLicenseCheckReport(@PathVariable String id) {
        log.debug("REST request to get DriversLicenseCheckReport : {}", id);
        Optional<DriversLicenseCheckReport> driversLicenseCheckReport = driversLicenseCheckReportRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(driversLicenseCheckReport);
    }

    /**
     * DELETE  /drivers-license-check-reports/:id : delete the "id" driversLicenseCheckReport.
     *
     * @param id the id of the driversLicenseCheckReport to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/drivers-license-check-reports/{id}")
    @Timed
    public ResponseEntity<Void> deleteDriversLicenseCheckReport(@PathVariable String id) {
        log.debug("REST request to delete DriversLicenseCheckReport : {}", id);

        driversLicenseCheckReportRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id)).build();
    }
}
