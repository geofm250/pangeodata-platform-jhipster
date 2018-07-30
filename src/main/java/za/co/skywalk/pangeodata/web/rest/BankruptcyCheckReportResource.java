package za.co.skywalk.pangeodata.web.rest;

import com.codahale.metrics.annotation.Timed;
import za.co.skywalk.pangeodata.domain.BankruptcyCheckReport;
import za.co.skywalk.pangeodata.repository.BankruptcyCheckReportRepository;
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
 * REST controller for managing BankruptcyCheckReport.
 */
@RestController
@RequestMapping("/api")
public class BankruptcyCheckReportResource {

    private final Logger log = LoggerFactory.getLogger(BankruptcyCheckReportResource.class);

    private static final String ENTITY_NAME = "bankruptcyCheckReport";

    private final BankruptcyCheckReportRepository bankruptcyCheckReportRepository;

    public BankruptcyCheckReportResource(BankruptcyCheckReportRepository bankruptcyCheckReportRepository) {
        this.bankruptcyCheckReportRepository = bankruptcyCheckReportRepository;
    }

    /**
     * POST  /bankruptcy-check-reports : Create a new bankruptcyCheckReport.
     *
     * @param bankruptcyCheckReport the bankruptcyCheckReport to create
     * @return the ResponseEntity with status 201 (Created) and with body the new bankruptcyCheckReport, or with status 400 (Bad Request) if the bankruptcyCheckReport has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/bankruptcy-check-reports")
    @Timed
    public ResponseEntity<BankruptcyCheckReport> createBankruptcyCheckReport(@RequestBody BankruptcyCheckReport bankruptcyCheckReport) throws URISyntaxException {
        log.debug("REST request to save BankruptcyCheckReport : {}", bankruptcyCheckReport);
        if (bankruptcyCheckReport.getId() != null) {
            throw new BadRequestAlertException("A new bankruptcyCheckReport cannot already have an ID", ENTITY_NAME, "idexists");
        }
        BankruptcyCheckReport result = bankruptcyCheckReportRepository.save(bankruptcyCheckReport);
        return ResponseEntity.created(new URI("/api/bankruptcy-check-reports/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /bankruptcy-check-reports : Updates an existing bankruptcyCheckReport.
     *
     * @param bankruptcyCheckReport the bankruptcyCheckReport to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated bankruptcyCheckReport,
     * or with status 400 (Bad Request) if the bankruptcyCheckReport is not valid,
     * or with status 500 (Internal Server Error) if the bankruptcyCheckReport couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/bankruptcy-check-reports")
    @Timed
    public ResponseEntity<BankruptcyCheckReport> updateBankruptcyCheckReport(@RequestBody BankruptcyCheckReport bankruptcyCheckReport) throws URISyntaxException {
        log.debug("REST request to update BankruptcyCheckReport : {}", bankruptcyCheckReport);
        if (bankruptcyCheckReport.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        BankruptcyCheckReport result = bankruptcyCheckReportRepository.save(bankruptcyCheckReport);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, bankruptcyCheckReport.getId().toString()))
            .body(result);
    }

    /**
     * GET  /bankruptcy-check-reports : get all the bankruptcyCheckReports.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of bankruptcyCheckReports in body
     */
    @GetMapping("/bankruptcy-check-reports")
    @Timed
    public List<BankruptcyCheckReport> getAllBankruptcyCheckReports() {
        log.debug("REST request to get all BankruptcyCheckReports");
        return bankruptcyCheckReportRepository.findAll();
    }

    /**
     * GET  /bankruptcy-check-reports/:id : get the "id" bankruptcyCheckReport.
     *
     * @param id the id of the bankruptcyCheckReport to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the bankruptcyCheckReport, or with status 404 (Not Found)
     */
    @GetMapping("/bankruptcy-check-reports/{id}")
    @Timed
    public ResponseEntity<BankruptcyCheckReport> getBankruptcyCheckReport(@PathVariable String id) {
        log.debug("REST request to get BankruptcyCheckReport : {}", id);
        Optional<BankruptcyCheckReport> bankruptcyCheckReport = bankruptcyCheckReportRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(bankruptcyCheckReport);
    }

    /**
     * DELETE  /bankruptcy-check-reports/:id : delete the "id" bankruptcyCheckReport.
     *
     * @param id the id of the bankruptcyCheckReport to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/bankruptcy-check-reports/{id}")
    @Timed
    public ResponseEntity<Void> deleteBankruptcyCheckReport(@PathVariable String id) {
        log.debug("REST request to delete BankruptcyCheckReport : {}", id);

        bankruptcyCheckReportRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id)).build();
    }
}
