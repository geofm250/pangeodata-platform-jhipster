package za.co.skywalk.pangeodata.web.rest;

import com.codahale.metrics.annotation.Timed;
import za.co.skywalk.pangeodata.domain.SocialMediaCheckReport;
import za.co.skywalk.pangeodata.repository.SocialMediaCheckReportRepository;
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
 * REST controller for managing SocialMediaCheckReport.
 */
@RestController
@RequestMapping("/api")
public class SocialMediaCheckReportResource {

    private final Logger log = LoggerFactory.getLogger(SocialMediaCheckReportResource.class);

    private static final String ENTITY_NAME = "socialMediaCheckReport";

    private final SocialMediaCheckReportRepository socialMediaCheckReportRepository;

    public SocialMediaCheckReportResource(SocialMediaCheckReportRepository socialMediaCheckReportRepository) {
        this.socialMediaCheckReportRepository = socialMediaCheckReportRepository;
    }

    /**
     * POST  /social-media-check-reports : Create a new socialMediaCheckReport.
     *
     * @param socialMediaCheckReport the socialMediaCheckReport to create
     * @return the ResponseEntity with status 201 (Created) and with body the new socialMediaCheckReport, or with status 400 (Bad Request) if the socialMediaCheckReport has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/social-media-check-reports")
    @Timed
    public ResponseEntity<SocialMediaCheckReport> createSocialMediaCheckReport(@RequestBody SocialMediaCheckReport socialMediaCheckReport) throws URISyntaxException {
        log.debug("REST request to save SocialMediaCheckReport : {}", socialMediaCheckReport);
        if (socialMediaCheckReport.getId() != null) {
            throw new BadRequestAlertException("A new socialMediaCheckReport cannot already have an ID", ENTITY_NAME, "idexists");
        }
        SocialMediaCheckReport result = socialMediaCheckReportRepository.save(socialMediaCheckReport);
        return ResponseEntity.created(new URI("/api/social-media-check-reports/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /social-media-check-reports : Updates an existing socialMediaCheckReport.
     *
     * @param socialMediaCheckReport the socialMediaCheckReport to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated socialMediaCheckReport,
     * or with status 400 (Bad Request) if the socialMediaCheckReport is not valid,
     * or with status 500 (Internal Server Error) if the socialMediaCheckReport couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/social-media-check-reports")
    @Timed
    public ResponseEntity<SocialMediaCheckReport> updateSocialMediaCheckReport(@RequestBody SocialMediaCheckReport socialMediaCheckReport) throws URISyntaxException {
        log.debug("REST request to update SocialMediaCheckReport : {}", socialMediaCheckReport);
        if (socialMediaCheckReport.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        SocialMediaCheckReport result = socialMediaCheckReportRepository.save(socialMediaCheckReport);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, socialMediaCheckReport.getId().toString()))
            .body(result);
    }

    /**
     * GET  /social-media-check-reports : get all the socialMediaCheckReports.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of socialMediaCheckReports in body
     */
    @GetMapping("/social-media-check-reports")
    @Timed
    public List<SocialMediaCheckReport> getAllSocialMediaCheckReports() {
        log.debug("REST request to get all SocialMediaCheckReports");
        return socialMediaCheckReportRepository.findAll();
    }

    /**
     * GET  /social-media-check-reports/:id : get the "id" socialMediaCheckReport.
     *
     * @param id the id of the socialMediaCheckReport to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the socialMediaCheckReport, or with status 404 (Not Found)
     */
    @GetMapping("/social-media-check-reports/{id}")
    @Timed
    public ResponseEntity<SocialMediaCheckReport> getSocialMediaCheckReport(@PathVariable String id) {
        log.debug("REST request to get SocialMediaCheckReport : {}", id);
        Optional<SocialMediaCheckReport> socialMediaCheckReport = socialMediaCheckReportRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(socialMediaCheckReport);
    }

    /**
     * DELETE  /social-media-check-reports/:id : delete the "id" socialMediaCheckReport.
     *
     * @param id the id of the socialMediaCheckReport to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/social-media-check-reports/{id}")
    @Timed
    public ResponseEntity<Void> deleteSocialMediaCheckReport(@PathVariable String id) {
        log.debug("REST request to delete SocialMediaCheckReport : {}", id);

        socialMediaCheckReportRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id)).build();
    }
}
