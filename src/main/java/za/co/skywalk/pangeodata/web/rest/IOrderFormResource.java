package za.co.skywalk.pangeodata.web.rest;

import com.codahale.metrics.annotation.Timed;
import za.co.skywalk.pangeodata.domain.IOrderForm;
import za.co.skywalk.pangeodata.repository.IOrderFormRepository;
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
 * REST controller for managing IOrderForm.
 */
@RestController
@RequestMapping("/api")
public class IOrderFormResource {

    private final Logger log = LoggerFactory.getLogger(IOrderFormResource.class);

    private static final String ENTITY_NAME = "iOrderForm";

    private final IOrderFormRepository iOrderFormRepository;

    public IOrderFormResource(IOrderFormRepository iOrderFormRepository) {
        this.iOrderFormRepository = iOrderFormRepository;
    }

    /**
     * POST  /i-order-forms : Create a new iOrderForm.
     *
     * @param iOrderForm the iOrderForm to create
     * @return the ResponseEntity with status 201 (Created) and with body the new iOrderForm, or with status 400 (Bad Request) if the iOrderForm has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/i-order-forms")
    @Timed
    public ResponseEntity<IOrderForm> createIOrderForm(@RequestBody IOrderForm iOrderForm) throws URISyntaxException {
        log.debug("REST request to save IOrderForm : {}", iOrderForm);
        if (iOrderForm.getId() != null) {
            throw new BadRequestAlertException("A new iOrderForm cannot already have an ID", ENTITY_NAME, "idexists");
        }
        IOrderForm result = iOrderFormRepository.save(iOrderForm);
        return ResponseEntity.created(new URI("/api/i-order-forms/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /i-order-forms : Updates an existing iOrderForm.
     *
     * @param iOrderForm the iOrderForm to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated iOrderForm,
     * or with status 400 (Bad Request) if the iOrderForm is not valid,
     * or with status 500 (Internal Server Error) if the iOrderForm couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/i-order-forms")
    @Timed
    public ResponseEntity<IOrderForm> updateIOrderForm(@RequestBody IOrderForm iOrderForm) throws URISyntaxException {
        log.debug("REST request to update IOrderForm : {}", iOrderForm);
        if (iOrderForm.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        IOrderForm result = iOrderFormRepository.save(iOrderForm);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, iOrderForm.getId().toString()))
            .body(result);
    }

    /**
     * GET  /i-order-forms : get all the iOrderForms.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of iOrderForms in body
     */
    @GetMapping("/i-order-forms")
    @Timed
    public List<IOrderForm> getAllIOrderForms() {
        log.debug("REST request to get all IOrderForms");
        return iOrderFormRepository.findAll();
    }

    /**
     * GET  /i-order-forms/:id : get the "id" iOrderForm.
     *
     * @param id the id of the iOrderForm to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the iOrderForm, or with status 404 (Not Found)
     */
    @GetMapping("/i-order-forms/{id}")
    @Timed
    public ResponseEntity<IOrderForm> getIOrderForm(@PathVariable String id) {
        log.debug("REST request to get IOrderForm : {}", id);
        Optional<IOrderForm> iOrderForm = iOrderFormRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(iOrderForm);
    }

    /**
     * DELETE  /i-order-forms/:id : delete the "id" iOrderForm.
     *
     * @param id the id of the iOrderForm to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/i-order-forms/{id}")
    @Timed
    public ResponseEntity<Void> deleteIOrderForm(@PathVariable String id) {
        log.debug("REST request to delete IOrderForm : {}", id);

        iOrderFormRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id)).build();
    }
}
