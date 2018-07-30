package za.co.skywalk.pangeodata.web.rest;

import com.codahale.metrics.annotation.Timed;
import za.co.skywalk.pangeodata.domain.IOrderReport;
import za.co.skywalk.pangeodata.repository.IOrderReportRepository;
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
 * REST controller for managing IOrderReport.
 */
@RestController
@RequestMapping("/api")
public class IOrderReportResource {

    private final Logger log = LoggerFactory.getLogger(IOrderReportResource.class);

    private static final String ENTITY_NAME = "iOrderReport";

    private final IOrderReportRepository iOrderReportRepository;

    public IOrderReportResource(IOrderReportRepository iOrderReportRepository) {
        this.iOrderReportRepository = iOrderReportRepository;
    }

    /**
     * POST  /i-order-reports : Create a new iOrderReport.
     *
     * @param iOrderReport the iOrderReport to create
     * @return the ResponseEntity with status 201 (Created) and with body the new iOrderReport, or with status 400 (Bad Request) if the iOrderReport has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/i-order-reports")
    @Timed
    public ResponseEntity<IOrderReport> createIOrderReport(@RequestBody IOrderReport iOrderReport) throws URISyntaxException {
        log.debug("REST request to save IOrderReport : {}", iOrderReport);
        if (iOrderReport.getId() != null) {
            throw new BadRequestAlertException("A new iOrderReport cannot already have an ID", ENTITY_NAME, "idexists");
        }
        IOrderReport result = iOrderReportRepository.save(iOrderReport);
        return ResponseEntity.created(new URI("/api/i-order-reports/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /i-order-reports : Updates an existing iOrderReport.
     *
     * @param iOrderReport the iOrderReport to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated iOrderReport,
     * or with status 400 (Bad Request) if the iOrderReport is not valid,
     * or with status 500 (Internal Server Error) if the iOrderReport couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/i-order-reports")
    @Timed
    public ResponseEntity<IOrderReport> updateIOrderReport(@RequestBody IOrderReport iOrderReport) throws URISyntaxException {
        log.debug("REST request to update IOrderReport : {}", iOrderReport);
        if (iOrderReport.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        IOrderReport result = iOrderReportRepository.save(iOrderReport);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, iOrderReport.getId().toString()))
            .body(result);
    }

    /**
     * GET  /i-order-reports : get all the iOrderReports.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of iOrderReports in body
     */
    @GetMapping("/i-order-reports")
    @Timed
    public List<IOrderReport> getAllIOrderReports() {
        log.debug("REST request to get all IOrderReports");
        return iOrderReportRepository.findAll();
    }

    /**
     * GET  /i-order-reports/:id : get the "id" iOrderReport.
     *
     * @param id the id of the iOrderReport to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the iOrderReport, or with status 404 (Not Found)
     */
    @GetMapping("/i-order-reports/{id}")
    @Timed
    public ResponseEntity<IOrderReport> getIOrderReport(@PathVariable String id) {
        log.debug("REST request to get IOrderReport : {}", id);
        Optional<IOrderReport> iOrderReport = iOrderReportRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(iOrderReport);
    }

    /**
     * DELETE  /i-order-reports/:id : delete the "id" iOrderReport.
     *
     * @param id the id of the iOrderReport to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/i-order-reports/{id}")
    @Timed
    public ResponseEntity<Void> deleteIOrderReport(@PathVariable String id) {
        log.debug("REST request to delete IOrderReport : {}", id);

        iOrderReportRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id)).build();
    }
}
