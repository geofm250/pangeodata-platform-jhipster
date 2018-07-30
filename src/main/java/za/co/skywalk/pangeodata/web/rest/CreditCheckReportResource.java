package za.co.skywalk.pangeodata.web.rest;

import com.codahale.metrics.annotation.Timed;
import za.co.skywalk.pangeodata.domain.CreditCheckReport;
import za.co.skywalk.pangeodata.repository.CreditCheckReportRepository;
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
 * REST controller for managing CreditCheckReport.
 */
@RestController
@RequestMapping("/api")
public class CreditCheckReportResource {

    private final Logger log = LoggerFactory.getLogger(CreditCheckReportResource.class);

    private static final String ENTITY_NAME = "creditCheckReport";

    private final CreditCheckReportRepository creditCheckReportRepository;

    public CreditCheckReportResource(CreditCheckReportRepository creditCheckReportRepository) {
        this.creditCheckReportRepository = creditCheckReportRepository;
    }

    /**
     * POST  /credit-check-reports : Create a new creditCheckReport.
     *
     * @param creditCheckReport the creditCheckReport to create
     * @return the ResponseEntity with status 201 (Created) and with body the new creditCheckReport, or with status 400 (Bad Request) if the creditCheckReport has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/credit-check-reports")
    @Timed
    public ResponseEntity<CreditCheckReport> createCreditCheckReport(@RequestBody CreditCheckReport creditCheckReport) throws URISyntaxException {
        log.debug("REST request to save CreditCheckReport : {}", creditCheckReport);
        if (creditCheckReport.getId() != null) {
            throw new BadRequestAlertException("A new creditCheckReport cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CreditCheckReport result = creditCheckReportRepository.save(creditCheckReport);
        return ResponseEntity.created(new URI("/api/credit-check-reports/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /credit-check-reports : Updates an existing creditCheckReport.
     *
     * @param creditCheckReport the creditCheckReport to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated creditCheckReport,
     * or with status 400 (Bad Request) if the creditCheckReport is not valid,
     * or with status 500 (Internal Server Error) if the creditCheckReport couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/credit-check-reports")
    @Timed
    public ResponseEntity<CreditCheckReport> updateCreditCheckReport(@RequestBody CreditCheckReport creditCheckReport) throws URISyntaxException {
        log.debug("REST request to update CreditCheckReport : {}", creditCheckReport);
        if (creditCheckReport.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        CreditCheckReport result = creditCheckReportRepository.save(creditCheckReport);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, creditCheckReport.getId().toString()))
            .body(result);
    }

    /**
     * GET  /credit-check-reports : get all the creditCheckReports.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of creditCheckReports in body
     */
    @GetMapping("/credit-check-reports")
    @Timed
    public List<CreditCheckReport> getAllCreditCheckReports() {
        log.debug("REST request to get all CreditCheckReports");
        return creditCheckReportRepository.findAll();
    }

    /**
     * GET  /credit-check-reports/:id : get the "id" creditCheckReport.
     *
     * @param id the id of the creditCheckReport to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the creditCheckReport, or with status 404 (Not Found)
     */
    @GetMapping("/credit-check-reports/{id}")
    @Timed
    public ResponseEntity<CreditCheckReport> getCreditCheckReport(@PathVariable String id) {
        log.debug("REST request to get CreditCheckReport : {}", id);
        Optional<CreditCheckReport> creditCheckReport = creditCheckReportRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(creditCheckReport);
    }

    /**
     * DELETE  /credit-check-reports/:id : delete the "id" creditCheckReport.
     *
     * @param id the id of the creditCheckReport to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/credit-check-reports/{id}")
    @Timed
    public ResponseEntity<Void> deleteCreditCheckReport(@PathVariable String id) {
        log.debug("REST request to delete CreditCheckReport : {}", id);

        creditCheckReportRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id)).build();
    }
}
