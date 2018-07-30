package za.co.skywalk.pangeodata.web.rest;

import com.codahale.metrics.annotation.Timed;
import za.co.skywalk.pangeodata.domain.OrderEmploymentForm;
import za.co.skywalk.pangeodata.repository.OrderEmploymentFormRepository;
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
 * REST controller for managing OrderEmploymentForm.
 */
@RestController
@RequestMapping("/api")
public class OrderEmploymentFormResource {

    private final Logger log = LoggerFactory.getLogger(OrderEmploymentFormResource.class);

    private static final String ENTITY_NAME = "orderEmploymentForm";

    private final OrderEmploymentFormRepository orderEmploymentFormRepository;

    public OrderEmploymentFormResource(OrderEmploymentFormRepository orderEmploymentFormRepository) {
        this.orderEmploymentFormRepository = orderEmploymentFormRepository;
    }

    /**
     * POST  /order-employment-forms : Create a new orderEmploymentForm.
     *
     * @param orderEmploymentForm the orderEmploymentForm to create
     * @return the ResponseEntity with status 201 (Created) and with body the new orderEmploymentForm, or with status 400 (Bad Request) if the orderEmploymentForm has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/order-employment-forms")
    @Timed
    public ResponseEntity<OrderEmploymentForm> createOrderEmploymentForm(@RequestBody OrderEmploymentForm orderEmploymentForm) throws URISyntaxException {
        log.debug("REST request to save OrderEmploymentForm : {}", orderEmploymentForm);
        if (orderEmploymentForm.getId() != null) {
            throw new BadRequestAlertException("A new orderEmploymentForm cannot already have an ID", ENTITY_NAME, "idexists");
        }
        OrderEmploymentForm result = orderEmploymentFormRepository.save(orderEmploymentForm);
        return ResponseEntity.created(new URI("/api/order-employment-forms/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /order-employment-forms : Updates an existing orderEmploymentForm.
     *
     * @param orderEmploymentForm the orderEmploymentForm to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated orderEmploymentForm,
     * or with status 400 (Bad Request) if the orderEmploymentForm is not valid,
     * or with status 500 (Internal Server Error) if the orderEmploymentForm couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/order-employment-forms")
    @Timed
    public ResponseEntity<OrderEmploymentForm> updateOrderEmploymentForm(@RequestBody OrderEmploymentForm orderEmploymentForm) throws URISyntaxException {
        log.debug("REST request to update OrderEmploymentForm : {}", orderEmploymentForm);
        if (orderEmploymentForm.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        OrderEmploymentForm result = orderEmploymentFormRepository.save(orderEmploymentForm);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, orderEmploymentForm.getId().toString()))
            .body(result);
    }

    /**
     * GET  /order-employment-forms : get all the orderEmploymentForms.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of orderEmploymentForms in body
     */
    @GetMapping("/order-employment-forms")
    @Timed
    public List<OrderEmploymentForm> getAllOrderEmploymentForms() {
        log.debug("REST request to get all OrderEmploymentForms");
        return orderEmploymentFormRepository.findAll();
    }

    /**
     * GET  /order-employment-forms/:id : get the "id" orderEmploymentForm.
     *
     * @param id the id of the orderEmploymentForm to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the orderEmploymentForm, or with status 404 (Not Found)
     */
    @GetMapping("/order-employment-forms/{id}")
    @Timed
    public ResponseEntity<OrderEmploymentForm> getOrderEmploymentForm(@PathVariable String id) {
        log.debug("REST request to get OrderEmploymentForm : {}", id);
        Optional<OrderEmploymentForm> orderEmploymentForm = orderEmploymentFormRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(orderEmploymentForm);
    }

    /**
     * DELETE  /order-employment-forms/:id : delete the "id" orderEmploymentForm.
     *
     * @param id the id of the orderEmploymentForm to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/order-employment-forms/{id}")
    @Timed
    public ResponseEntity<Void> deleteOrderEmploymentForm(@PathVariable String id) {
        log.debug("REST request to delete OrderEmploymentForm : {}", id);

        orderEmploymentFormRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id)).build();
    }
}
