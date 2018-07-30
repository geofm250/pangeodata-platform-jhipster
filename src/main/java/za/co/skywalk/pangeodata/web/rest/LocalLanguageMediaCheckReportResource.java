package za.co.skywalk.pangeodata.web.rest;

import com.codahale.metrics.annotation.Timed;
import za.co.skywalk.pangeodata.domain.LocalLanguageMediaCheckReport;
import za.co.skywalk.pangeodata.repository.LocalLanguageMediaCheckReportRepository;
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
 * REST controller for managing LocalLanguageMediaCheckReport.
 */
@RestController
@RequestMapping("/api")
public class LocalLanguageMediaCheckReportResource {

    private final Logger log = LoggerFactory.getLogger(LocalLanguageMediaCheckReportResource.class);

    private static final String ENTITY_NAME = "localLanguageMediaCheckReport";

    private final LocalLanguageMediaCheckReportRepository localLanguageMediaCheckReportRepository;

    public LocalLanguageMediaCheckReportResource(LocalLanguageMediaCheckReportRepository localLanguageMediaCheckReportRepository) {
        this.localLanguageMediaCheckReportRepository = localLanguageMediaCheckReportRepository;
    }

    /**
     * POST  /local-language-media-check-reports : Create a new localLanguageMediaCheckReport.
     *
     * @param localLanguageMediaCheckReport the localLanguageMediaCheckReport to create
     * @return the ResponseEntity with status 201 (Created) and with body the new localLanguageMediaCheckReport, or with status 400 (Bad Request) if the localLanguageMediaCheckReport has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/local-language-media-check-reports")
    @Timed
    public ResponseEntity<LocalLanguageMediaCheckReport> createLocalLanguageMediaCheckReport(@RequestBody LocalLanguageMediaCheckReport localLanguageMediaCheckReport) throws URISyntaxException {
        log.debug("REST request to save LocalLanguageMediaCheckReport : {}", localLanguageMediaCheckReport);
        if (localLanguageMediaCheckReport.getId() != null) {
            throw new BadRequestAlertException("A new localLanguageMediaCheckReport cannot already have an ID", ENTITY_NAME, "idexists");
        }
        LocalLanguageMediaCheckReport result = localLanguageMediaCheckReportRepository.save(localLanguageMediaCheckReport);
        return ResponseEntity.created(new URI("/api/local-language-media-check-reports/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /local-language-media-check-reports : Updates an existing localLanguageMediaCheckReport.
     *
     * @param localLanguageMediaCheckReport the localLanguageMediaCheckReport to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated localLanguageMediaCheckReport,
     * or with status 400 (Bad Request) if the localLanguageMediaCheckReport is not valid,
     * or with status 500 (Internal Server Error) if the localLanguageMediaCheckReport couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/local-language-media-check-reports")
    @Timed
    public ResponseEntity<LocalLanguageMediaCheckReport> updateLocalLanguageMediaCheckReport(@RequestBody LocalLanguageMediaCheckReport localLanguageMediaCheckReport) throws URISyntaxException {
        log.debug("REST request to update LocalLanguageMediaCheckReport : {}", localLanguageMediaCheckReport);
        if (localLanguageMediaCheckReport.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        LocalLanguageMediaCheckReport result = localLanguageMediaCheckReportRepository.save(localLanguageMediaCheckReport);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, localLanguageMediaCheckReport.getId().toString()))
            .body(result);
    }

    /**
     * GET  /local-language-media-check-reports : get all the localLanguageMediaCheckReports.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of localLanguageMediaCheckReports in body
     */
    @GetMapping("/local-language-media-check-reports")
    @Timed
    public List<LocalLanguageMediaCheckReport> getAllLocalLanguageMediaCheckReports() {
        log.debug("REST request to get all LocalLanguageMediaCheckReports");
        return localLanguageMediaCheckReportRepository.findAll();
    }

    /**
     * GET  /local-language-media-check-reports/:id : get the "id" localLanguageMediaCheckReport.
     *
     * @param id the id of the localLanguageMediaCheckReport to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the localLanguageMediaCheckReport, or with status 404 (Not Found)
     */
    @GetMapping("/local-language-media-check-reports/{id}")
    @Timed
    public ResponseEntity<LocalLanguageMediaCheckReport> getLocalLanguageMediaCheckReport(@PathVariable String id) {
        log.debug("REST request to get LocalLanguageMediaCheckReport : {}", id);
        Optional<LocalLanguageMediaCheckReport> localLanguageMediaCheckReport = localLanguageMediaCheckReportRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(localLanguageMediaCheckReport);
    }

    /**
     * DELETE  /local-language-media-check-reports/:id : delete the "id" localLanguageMediaCheckReport.
     *
     * @param id the id of the localLanguageMediaCheckReport to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/local-language-media-check-reports/{id}")
    @Timed
    public ResponseEntity<Void> deleteLocalLanguageMediaCheckReport(@PathVariable String id) {
        log.debug("REST request to delete LocalLanguageMediaCheckReport : {}", id);

        localLanguageMediaCheckReportRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id)).build();
    }
}
