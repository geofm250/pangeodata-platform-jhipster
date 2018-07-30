package za.co.skywalk.pangeodata.web.rest;

import com.codahale.metrics.annotation.Timed;
import za.co.skywalk.pangeodata.domain.EducationReport;
import za.co.skywalk.pangeodata.repository.EducationReportRepository;
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
 * REST controller for managing EducationReport.
 */
@RestController
@RequestMapping("/api")
public class EducationReportResource {

    private final Logger log = LoggerFactory.getLogger(EducationReportResource.class);

    private static final String ENTITY_NAME = "educationReport";

    private final EducationReportRepository educationReportRepository;

    public EducationReportResource(EducationReportRepository educationReportRepository) {
        this.educationReportRepository = educationReportRepository;
    }

    /**
     * POST  /education-reports : Create a new educationReport.
     *
     * @param educationReport the educationReport to create
     * @return the ResponseEntity with status 201 (Created) and with body the new educationReport, or with status 400 (Bad Request) if the educationReport has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/education-reports")
    @Timed
    public ResponseEntity<EducationReport> createEducationReport(@RequestBody EducationReport educationReport) throws URISyntaxException {
        log.debug("REST request to save EducationReport : {}", educationReport);
        if (educationReport.getId() != null) {
            throw new BadRequestAlertException("A new educationReport cannot already have an ID", ENTITY_NAME, "idexists");
        }
        EducationReport result = educationReportRepository.save(educationReport);
        return ResponseEntity.created(new URI("/api/education-reports/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /education-reports : Updates an existing educationReport.
     *
     * @param educationReport the educationReport to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated educationReport,
     * or with status 400 (Bad Request) if the educationReport is not valid,
     * or with status 500 (Internal Server Error) if the educationReport couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/education-reports")
    @Timed
    public ResponseEntity<EducationReport> updateEducationReport(@RequestBody EducationReport educationReport) throws URISyntaxException {
        log.debug("REST request to update EducationReport : {}", educationReport);
        if (educationReport.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        EducationReport result = educationReportRepository.save(educationReport);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, educationReport.getId().toString()))
            .body(result);
    }

    /**
     * GET  /education-reports : get all the educationReports.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of educationReports in body
     */
    @GetMapping("/education-reports")
    @Timed
    public List<EducationReport> getAllEducationReports() {
        log.debug("REST request to get all EducationReports");
        return educationReportRepository.findAll();
    }

    /**
     * GET  /education-reports/:id : get the "id" educationReport.
     *
     * @param id the id of the educationReport to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the educationReport, or with status 404 (Not Found)
     */
    @GetMapping("/education-reports/{id}")
    @Timed
    public ResponseEntity<EducationReport> getEducationReport(@PathVariable String id) {
        log.debug("REST request to get EducationReport : {}", id);
        Optional<EducationReport> educationReport = educationReportRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(educationReport);
    }

    /**
     * DELETE  /education-reports/:id : delete the "id" educationReport.
     *
     * @param id the id of the educationReport to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/education-reports/{id}")
    @Timed
    public ResponseEntity<Void> deleteEducationReport(@PathVariable String id) {
        log.debug("REST request to delete EducationReport : {}", id);

        educationReportRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id)).build();
    }
}
