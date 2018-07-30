package za.co.skywalk.pangeodata.web.rest;

import com.codahale.metrics.annotation.Timed;
import za.co.skywalk.pangeodata.domain.LicenseCheckReport;
import za.co.skywalk.pangeodata.repository.LicenseCheckReportRepository;
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
 * REST controller for managing LicenseCheckReport.
 */
@RestController
@RequestMapping("/api")
public class LicenseCheckReportResource {

    private final Logger log = LoggerFactory.getLogger(LicenseCheckReportResource.class);

    private static final String ENTITY_NAME = "licenseCheckReport";

    private final LicenseCheckReportRepository licenseCheckReportRepository;

    public LicenseCheckReportResource(LicenseCheckReportRepository licenseCheckReportRepository) {
        this.licenseCheckReportRepository = licenseCheckReportRepository;
    }

    /**
     * POST  /license-check-reports : Create a new licenseCheckReport.
     *
     * @param licenseCheckReport the licenseCheckReport to create
     * @return the ResponseEntity with status 201 (Created) and with body the new licenseCheckReport, or with status 400 (Bad Request) if the licenseCheckReport has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/license-check-reports")
    @Timed
    public ResponseEntity<LicenseCheckReport> createLicenseCheckReport(@RequestBody LicenseCheckReport licenseCheckReport) throws URISyntaxException {
        log.debug("REST request to save LicenseCheckReport : {}", licenseCheckReport);
        if (licenseCheckReport.getId() != null) {
            throw new BadRequestAlertException("A new licenseCheckReport cannot already have an ID", ENTITY_NAME, "idexists");
        }
        LicenseCheckReport result = licenseCheckReportRepository.save(licenseCheckReport);
        return ResponseEntity.created(new URI("/api/license-check-reports/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /license-check-reports : Updates an existing licenseCheckReport.
     *
     * @param licenseCheckReport the licenseCheckReport to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated licenseCheckReport,
     * or with status 400 (Bad Request) if the licenseCheckReport is not valid,
     * or with status 500 (Internal Server Error) if the licenseCheckReport couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/license-check-reports")
    @Timed
    public ResponseEntity<LicenseCheckReport> updateLicenseCheckReport(@RequestBody LicenseCheckReport licenseCheckReport) throws URISyntaxException {
        log.debug("REST request to update LicenseCheckReport : {}", licenseCheckReport);
        if (licenseCheckReport.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        LicenseCheckReport result = licenseCheckReportRepository.save(licenseCheckReport);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, licenseCheckReport.getId().toString()))
            .body(result);
    }

    /**
     * GET  /license-check-reports : get all the licenseCheckReports.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of licenseCheckReports in body
     */
    @GetMapping("/license-check-reports")
    @Timed
    public List<LicenseCheckReport> getAllLicenseCheckReports() {
        log.debug("REST request to get all LicenseCheckReports");
        return licenseCheckReportRepository.findAll();
    }

    /**
     * GET  /license-check-reports/:id : get the "id" licenseCheckReport.
     *
     * @param id the id of the licenseCheckReport to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the licenseCheckReport, or with status 404 (Not Found)
     */
    @GetMapping("/license-check-reports/{id}")
    @Timed
    public ResponseEntity<LicenseCheckReport> getLicenseCheckReport(@PathVariable String id) {
        log.debug("REST request to get LicenseCheckReport : {}", id);
        Optional<LicenseCheckReport> licenseCheckReport = licenseCheckReportRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(licenseCheckReport);
    }

    /**
     * DELETE  /license-check-reports/:id : delete the "id" licenseCheckReport.
     *
     * @param id the id of the licenseCheckReport to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/license-check-reports/{id}")
    @Timed
    public ResponseEntity<Void> deleteLicenseCheckReport(@PathVariable String id) {
        log.debug("REST request to delete LicenseCheckReport : {}", id);

        licenseCheckReportRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id)).build();
    }
}
