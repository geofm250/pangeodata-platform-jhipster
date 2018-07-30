package za.co.skywalk.pangeodata.web.rest;

import com.codahale.metrics.annotation.Timed;
import za.co.skywalk.pangeodata.domain.AddressCheckReport;
import za.co.skywalk.pangeodata.repository.AddressCheckReportRepository;
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
 * REST controller for managing AddressCheckReport.
 */
@RestController
@RequestMapping("/api")
public class AddressCheckReportResource {

    private final Logger log = LoggerFactory.getLogger(AddressCheckReportResource.class);

    private static final String ENTITY_NAME = "addressCheckReport";

    private final AddressCheckReportRepository addressCheckReportRepository;

    public AddressCheckReportResource(AddressCheckReportRepository addressCheckReportRepository) {
        this.addressCheckReportRepository = addressCheckReportRepository;
    }

    /**
     * POST  /address-check-reports : Create a new addressCheckReport.
     *
     * @param addressCheckReport the addressCheckReport to create
     * @return the ResponseEntity with status 201 (Created) and with body the new addressCheckReport, or with status 400 (Bad Request) if the addressCheckReport has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/address-check-reports")
    @Timed
    public ResponseEntity<AddressCheckReport> createAddressCheckReport(@RequestBody AddressCheckReport addressCheckReport) throws URISyntaxException {
        log.debug("REST request to save AddressCheckReport : {}", addressCheckReport);
        if (addressCheckReport.getId() != null) {
            throw new BadRequestAlertException("A new addressCheckReport cannot already have an ID", ENTITY_NAME, "idexists");
        }
        AddressCheckReport result = addressCheckReportRepository.save(addressCheckReport);
        return ResponseEntity.created(new URI("/api/address-check-reports/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /address-check-reports : Updates an existing addressCheckReport.
     *
     * @param addressCheckReport the addressCheckReport to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated addressCheckReport,
     * or with status 400 (Bad Request) if the addressCheckReport is not valid,
     * or with status 500 (Internal Server Error) if the addressCheckReport couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/address-check-reports")
    @Timed
    public ResponseEntity<AddressCheckReport> updateAddressCheckReport(@RequestBody AddressCheckReport addressCheckReport) throws URISyntaxException {
        log.debug("REST request to update AddressCheckReport : {}", addressCheckReport);
        if (addressCheckReport.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        AddressCheckReport result = addressCheckReportRepository.save(addressCheckReport);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, addressCheckReport.getId().toString()))
            .body(result);
    }

    /**
     * GET  /address-check-reports : get all the addressCheckReports.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of addressCheckReports in body
     */
    @GetMapping("/address-check-reports")
    @Timed
    public List<AddressCheckReport> getAllAddressCheckReports() {
        log.debug("REST request to get all AddressCheckReports");
        return addressCheckReportRepository.findAll();
    }

    /**
     * GET  /address-check-reports/:id : get the "id" addressCheckReport.
     *
     * @param id the id of the addressCheckReport to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the addressCheckReport, or with status 404 (Not Found)
     */
    @GetMapping("/address-check-reports/{id}")
    @Timed
    public ResponseEntity<AddressCheckReport> getAddressCheckReport(@PathVariable String id) {
        log.debug("REST request to get AddressCheckReport : {}", id);
        Optional<AddressCheckReport> addressCheckReport = addressCheckReportRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(addressCheckReport);
    }

    /**
     * DELETE  /address-check-reports/:id : delete the "id" addressCheckReport.
     *
     * @param id the id of the addressCheckReport to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/address-check-reports/{id}")
    @Timed
    public ResponseEntity<Void> deleteAddressCheckReport(@PathVariable String id) {
        log.debug("REST request to delete AddressCheckReport : {}", id);

        addressCheckReportRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id)).build();
    }
}
