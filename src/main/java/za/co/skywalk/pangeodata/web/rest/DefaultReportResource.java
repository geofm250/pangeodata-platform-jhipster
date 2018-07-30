package za.co.skywalk.pangeodata.web.rest;

import com.codahale.metrics.annotation.Timed;
import za.co.skywalk.pangeodata.domain.DefaultReport;
import za.co.skywalk.pangeodata.repository.DefaultReportRepository;
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
 * REST controller for managing DefaultReport.
 */
@RestController
@RequestMapping("/api")
public class DefaultReportResource {

    private final Logger log = LoggerFactory.getLogger(DefaultReportResource.class);

    private static final String ENTITY_NAME = "defaultReport";

    private final DefaultReportRepository defaultReportRepository;

    public DefaultReportResource(DefaultReportRepository defaultReportRepository) {
        this.defaultReportRepository = defaultReportRepository;
    }

    /**
     * POST  /default-reports : Create a new defaultReport.
     *
     * @param defaultReport the defaultReport to create
     * @return the ResponseEntity with status 201 (Created) and with body the new defaultReport, or with status 400 (Bad Request) if the defaultReport has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/default-reports")
    @Timed
    public ResponseEntity<DefaultReport> createDefaultReport(@RequestBody DefaultReport defaultReport) throws URISyntaxException {
        log.debug("REST request to save DefaultReport : {}", defaultReport);
        if (defaultReport.getId() != null) {
            throw new BadRequestAlertException("A new defaultReport cannot already have an ID", ENTITY_NAME, "idexists");
        }
        DefaultReport result = defaultReportRepository.save(defaultReport);
        return ResponseEntity.created(new URI("/api/default-reports/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /default-reports : Updates an existing defaultReport.
     *
     * @param defaultReport the defaultReport to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated defaultReport,
     * or with status 400 (Bad Request) if the defaultReport is not valid,
     * or with status 500 (Internal Server Error) if the defaultReport couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/default-reports")
    @Timed
    public ResponseEntity<DefaultReport> updateDefaultReport(@RequestBody DefaultReport defaultReport) throws URISyntaxException {
        log.debug("REST request to update DefaultReport : {}", defaultReport);
        if (defaultReport.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        DefaultReport result = defaultReportRepository.save(defaultReport);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, defaultReport.getId().toString()))
            .body(result);
    }

    /**
     * GET  /default-reports : get all the defaultReports.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of defaultReports in body
     */
    @GetMapping("/default-reports")
    @Timed
    public List<DefaultReport> getAllDefaultReports() {
        log.debug("REST request to get all DefaultReports");
        return defaultReportRepository.findAll();
    }

    /**
     * GET  /default-reports/:id : get the "id" defaultReport.
     *
     * @param id the id of the defaultReport to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the defaultReport, or with status 404 (Not Found)
     */
    @GetMapping("/default-reports/{id}")
    @Timed
    public ResponseEntity<DefaultReport> getDefaultReport(@PathVariable String id) {
        log.debug("REST request to get DefaultReport : {}", id);
        Optional<DefaultReport> defaultReport = defaultReportRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(defaultReport);
    }

    /**
     * DELETE  /default-reports/:id : delete the "id" defaultReport.
     *
     * @param id the id of the defaultReport to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/default-reports/{id}")
    @Timed
    public ResponseEntity<Void> deleteDefaultReport(@PathVariable String id) {
        log.debug("REST request to delete DefaultReport : {}", id);

        defaultReportRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id)).build();
    }
}
