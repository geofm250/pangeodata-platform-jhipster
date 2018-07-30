package za.co.skywalk.pangeodata.web.rest;

import com.codahale.metrics.annotation.Timed;
import za.co.skywalk.pangeodata.domain.PoliticallyExposedPersonsCheckReport;
import za.co.skywalk.pangeodata.repository.PoliticallyExposedPersonsCheckReportRepository;
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
 * REST controller for managing PoliticallyExposedPersonsCheckReport.
 */
@RestController
@RequestMapping("/api")
public class PoliticallyExposedPersonsCheckReportResource {

    private final Logger log = LoggerFactory.getLogger(PoliticallyExposedPersonsCheckReportResource.class);

    private static final String ENTITY_NAME = "politicallyExposedPersonsCheckReport";

    private final PoliticallyExposedPersonsCheckReportRepository politicallyExposedPersonsCheckReportRepository;

    public PoliticallyExposedPersonsCheckReportResource(PoliticallyExposedPersonsCheckReportRepository politicallyExposedPersonsCheckReportRepository) {
        this.politicallyExposedPersonsCheckReportRepository = politicallyExposedPersonsCheckReportRepository;
    }

    /**
     * POST  /politically-exposed-persons-check-reports : Create a new politicallyExposedPersonsCheckReport.
     *
     * @param politicallyExposedPersonsCheckReport the politicallyExposedPersonsCheckReport to create
     * @return the ResponseEntity with status 201 (Created) and with body the new politicallyExposedPersonsCheckReport, or with status 400 (Bad Request) if the politicallyExposedPersonsCheckReport has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/politically-exposed-persons-check-reports")
    @Timed
    public ResponseEntity<PoliticallyExposedPersonsCheckReport> createPoliticallyExposedPersonsCheckReport(@RequestBody PoliticallyExposedPersonsCheckReport politicallyExposedPersonsCheckReport) throws URISyntaxException {
        log.debug("REST request to save PoliticallyExposedPersonsCheckReport : {}", politicallyExposedPersonsCheckReport);
        if (politicallyExposedPersonsCheckReport.getId() != null) {
            throw new BadRequestAlertException("A new politicallyExposedPersonsCheckReport cannot already have an ID", ENTITY_NAME, "idexists");
        }
        PoliticallyExposedPersonsCheckReport result = politicallyExposedPersonsCheckReportRepository.save(politicallyExposedPersonsCheckReport);
        return ResponseEntity.created(new URI("/api/politically-exposed-persons-check-reports/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /politically-exposed-persons-check-reports : Updates an existing politicallyExposedPersonsCheckReport.
     *
     * @param politicallyExposedPersonsCheckReport the politicallyExposedPersonsCheckReport to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated politicallyExposedPersonsCheckReport,
     * or with status 400 (Bad Request) if the politicallyExposedPersonsCheckReport is not valid,
     * or with status 500 (Internal Server Error) if the politicallyExposedPersonsCheckReport couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/politically-exposed-persons-check-reports")
    @Timed
    public ResponseEntity<PoliticallyExposedPersonsCheckReport> updatePoliticallyExposedPersonsCheckReport(@RequestBody PoliticallyExposedPersonsCheckReport politicallyExposedPersonsCheckReport) throws URISyntaxException {
        log.debug("REST request to update PoliticallyExposedPersonsCheckReport : {}", politicallyExposedPersonsCheckReport);
        if (politicallyExposedPersonsCheckReport.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        PoliticallyExposedPersonsCheckReport result = politicallyExposedPersonsCheckReportRepository.save(politicallyExposedPersonsCheckReport);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, politicallyExposedPersonsCheckReport.getId().toString()))
            .body(result);
    }

    /**
     * GET  /politically-exposed-persons-check-reports : get all the politicallyExposedPersonsCheckReports.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of politicallyExposedPersonsCheckReports in body
     */
    @GetMapping("/politically-exposed-persons-check-reports")
    @Timed
    public List<PoliticallyExposedPersonsCheckReport> getAllPoliticallyExposedPersonsCheckReports() {
        log.debug("REST request to get all PoliticallyExposedPersonsCheckReports");
        return politicallyExposedPersonsCheckReportRepository.findAll();
    }

    /**
     * GET  /politically-exposed-persons-check-reports/:id : get the "id" politicallyExposedPersonsCheckReport.
     *
     * @param id the id of the politicallyExposedPersonsCheckReport to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the politicallyExposedPersonsCheckReport, or with status 404 (Not Found)
     */
    @GetMapping("/politically-exposed-persons-check-reports/{id}")
    @Timed
    public ResponseEntity<PoliticallyExposedPersonsCheckReport> getPoliticallyExposedPersonsCheckReport(@PathVariable String id) {
        log.debug("REST request to get PoliticallyExposedPersonsCheckReport : {}", id);
        Optional<PoliticallyExposedPersonsCheckReport> politicallyExposedPersonsCheckReport = politicallyExposedPersonsCheckReportRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(politicallyExposedPersonsCheckReport);
    }

    /**
     * DELETE  /politically-exposed-persons-check-reports/:id : delete the "id" politicallyExposedPersonsCheckReport.
     *
     * @param id the id of the politicallyExposedPersonsCheckReport to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/politically-exposed-persons-check-reports/{id}")
    @Timed
    public ResponseEntity<Void> deletePoliticallyExposedPersonsCheckReport(@PathVariable String id) {
        log.debug("REST request to delete PoliticallyExposedPersonsCheckReport : {}", id);

        politicallyExposedPersonsCheckReportRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id)).build();
    }
}
