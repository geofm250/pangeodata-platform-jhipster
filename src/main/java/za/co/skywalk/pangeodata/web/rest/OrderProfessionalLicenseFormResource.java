package za.co.skywalk.pangeodata.web.rest;

import com.codahale.metrics.annotation.Timed;
import za.co.skywalk.pangeodata.domain.OrderProfessionalLicenseForm;
import za.co.skywalk.pangeodata.repository.OrderProfessionalLicenseFormRepository;
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
 * REST controller for managing OrderProfessionalLicenseForm.
 */
@RestController
@RequestMapping("/api")
public class OrderProfessionalLicenseFormResource {

    private final Logger log = LoggerFactory.getLogger(OrderProfessionalLicenseFormResource.class);

    private static final String ENTITY_NAME = "orderProfessionalLicenseForm";

    private final OrderProfessionalLicenseFormRepository orderProfessionalLicenseFormRepository;

    public OrderProfessionalLicenseFormResource(OrderProfessionalLicenseFormRepository orderProfessionalLicenseFormRepository) {
        this.orderProfessionalLicenseFormRepository = orderProfessionalLicenseFormRepository;
    }

    /**
     * POST  /order-professional-license-forms : Create a new orderProfessionalLicenseForm.
     *
     * @param orderProfessionalLicenseForm the orderProfessionalLicenseForm to create
     * @return the ResponseEntity with status 201 (Created) and with body the new orderProfessionalLicenseForm, or with status 400 (Bad Request) if the orderProfessionalLicenseForm has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/order-professional-license-forms")
    @Timed
    public ResponseEntity<OrderProfessionalLicenseForm> createOrderProfessionalLicenseForm(@RequestBody OrderProfessionalLicenseForm orderProfessionalLicenseForm) throws URISyntaxException {
        log.debug("REST request to save OrderProfessionalLicenseForm : {}", orderProfessionalLicenseForm);
        if (orderProfessionalLicenseForm.getId() != null) {
            throw new BadRequestAlertException("A new orderProfessionalLicenseForm cannot already have an ID", ENTITY_NAME, "idexists");
        }
        OrderProfessionalLicenseForm result = orderProfessionalLicenseFormRepository.save(orderProfessionalLicenseForm);
        return ResponseEntity.created(new URI("/api/order-professional-license-forms/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /order-professional-license-forms : Updates an existing orderProfessionalLicenseForm.
     *
     * @param orderProfessionalLicenseForm the orderProfessionalLicenseForm to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated orderProfessionalLicenseForm,
     * or with status 400 (Bad Request) if the orderProfessionalLicenseForm is not valid,
     * or with status 500 (Internal Server Error) if the orderProfessionalLicenseForm couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/order-professional-license-forms")
    @Timed
    public ResponseEntity<OrderProfessionalLicenseForm> updateOrderProfessionalLicenseForm(@RequestBody OrderProfessionalLicenseForm orderProfessionalLicenseForm) throws URISyntaxException {
        log.debug("REST request to update OrderProfessionalLicenseForm : {}", orderProfessionalLicenseForm);
        if (orderProfessionalLicenseForm.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        OrderProfessionalLicenseForm result = orderProfessionalLicenseFormRepository.save(orderProfessionalLicenseForm);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, orderProfessionalLicenseForm.getId().toString()))
            .body(result);
    }

    /**
     * GET  /order-professional-license-forms : get all the orderProfessionalLicenseForms.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of orderProfessionalLicenseForms in body
     */
    @GetMapping("/order-professional-license-forms")
    @Timed
    public List<OrderProfessionalLicenseForm> getAllOrderProfessionalLicenseForms() {
        log.debug("REST request to get all OrderProfessionalLicenseForms");
        return orderProfessionalLicenseFormRepository.findAll();
    }

    /**
     * GET  /order-professional-license-forms/:id : get the "id" orderProfessionalLicenseForm.
     *
     * @param id the id of the orderProfessionalLicenseForm to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the orderProfessionalLicenseForm, or with status 404 (Not Found)
     */
    @GetMapping("/order-professional-license-forms/{id}")
    @Timed
    public ResponseEntity<OrderProfessionalLicenseForm> getOrderProfessionalLicenseForm(@PathVariable String id) {
        log.debug("REST request to get OrderProfessionalLicenseForm : {}", id);
        Optional<OrderProfessionalLicenseForm> orderProfessionalLicenseForm = orderProfessionalLicenseFormRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(orderProfessionalLicenseForm);
    }

    /**
     * DELETE  /order-professional-license-forms/:id : delete the "id" orderProfessionalLicenseForm.
     *
     * @param id the id of the orderProfessionalLicenseForm to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/order-professional-license-forms/{id}")
    @Timed
    public ResponseEntity<Void> deleteOrderProfessionalLicenseForm(@PathVariable String id) {
        log.debug("REST request to delete OrderProfessionalLicenseForm : {}", id);

        orderProfessionalLicenseFormRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id)).build();
    }
}
