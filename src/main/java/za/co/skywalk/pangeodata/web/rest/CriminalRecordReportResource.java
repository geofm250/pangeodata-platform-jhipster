package za.co.skywalk.pangeodata.web.rest;

import com.codahale.metrics.annotation.Timed;
import za.co.skywalk.pangeodata.domain.CriminalRecordReport;
import za.co.skywalk.pangeodata.repository.CriminalRecordReportRepository;
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
 * REST controller for managing CriminalRecordReport.
 */
@RestController
@RequestMapping("/api")
public class CriminalRecordReportResource {

    private final Logger log = LoggerFactory.getLogger(CriminalRecordReportResource.class);

    private static final String ENTITY_NAME = "criminalRecordReport";

    private final CriminalRecordReportRepository criminalRecordReportRepository;

    public CriminalRecordReportResource(CriminalRecordReportRepository criminalRecordReportRepository) {
        this.criminalRecordReportRepository = criminalRecordReportRepository;
    }

    /**
     * POST  /criminal-record-reports : Create a new criminalRecordReport.
     *
     * @param criminalRecordReport the criminalRecordReport to create
     * @return the ResponseEntity with status 201 (Created) and with body the new criminalRecordReport, or with status 400 (Bad Request) if the criminalRecordReport has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/criminal-record-reports")
    @Timed
    public ResponseEntity<CriminalRecordReport> createCriminalRecordReport(@RequestBody CriminalRecordReport criminalRecordReport) throws URISyntaxException {
        log.debug("REST request to save CriminalRecordReport : {}", criminalRecordReport);
        if (criminalRecordReport.getId() != null) {
            throw new BadRequestAlertException("A new criminalRecordReport cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CriminalRecordReport result = criminalRecordReportRepository.save(criminalRecordReport);
        return ResponseEntity.created(new URI("/api/criminal-record-reports/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /criminal-record-reports : Updates an existing criminalRecordReport.
     *
     * @param criminalRecordReport the criminalRecordReport to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated criminalRecordReport,
     * or with status 400 (Bad Request) if the criminalRecordReport is not valid,
     * or with status 500 (Internal Server Error) if the criminalRecordReport couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/criminal-record-reports")
    @Timed
    public ResponseEntity<CriminalRecordReport> updateCriminalRecordReport(@RequestBody CriminalRecordReport criminalRecordReport) throws URISyntaxException {
        log.debug("REST request to update CriminalRecordReport : {}", criminalRecordReport);
        if (criminalRecordReport.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        CriminalRecordReport result = criminalRecordReportRepository.save(criminalRecordReport);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, criminalRecordReport.getId().toString()))
            .body(result);
    }

    /**
     * GET  /criminal-record-reports : get all the criminalRecordReports.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of criminalRecordReports in body
     */
    @GetMapping("/criminal-record-reports")
    @Timed
    public List<CriminalRecordReport> getAllCriminalRecordReports() {
        log.debug("REST request to get all CriminalRecordReports");
        return criminalRecordReportRepository.findAll();
    }

    /**
     * GET  /criminal-record-reports/:id : get the "id" criminalRecordReport.
     *
     * @param id the id of the criminalRecordReport to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the criminalRecordReport, or with status 404 (Not Found)
     */
    @GetMapping("/criminal-record-reports/{id}")
    @Timed
    public ResponseEntity<CriminalRecordReport> getCriminalRecordReport(@PathVariable String id) {
        log.debug("REST request to get CriminalRecordReport : {}", id);
        Optional<CriminalRecordReport> criminalRecordReport = criminalRecordReportRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(criminalRecordReport);
    }

    /**
     * DELETE  /criminal-record-reports/:id : delete the "id" criminalRecordReport.
     *
     * @param id the id of the criminalRecordReport to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/criminal-record-reports/{id}")
    @Timed
    public ResponseEntity<Void> deleteCriminalRecordReport(@PathVariable String id) {
        log.debug("REST request to delete CriminalRecordReport : {}", id);

        criminalRecordReportRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id)).build();
    }
}
