package za.co.skywalk.pangeodata.web.rest;

import com.codahale.metrics.annotation.Timed;
import za.co.skywalk.pangeodata.domain.OrderEducationForm;
import za.co.skywalk.pangeodata.repository.OrderEducationFormRepository;
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
 * REST controller for managing OrderEducationForm.
 */
@RestController
@RequestMapping("/api")
public class OrderEducationFormResource {

    private final Logger log = LoggerFactory.getLogger(OrderEducationFormResource.class);

    private static final String ENTITY_NAME = "orderEducationForm";

    private final OrderEducationFormRepository orderEducationFormRepository;

    public OrderEducationFormResource(OrderEducationFormRepository orderEducationFormRepository) {
        this.orderEducationFormRepository = orderEducationFormRepository;
    }

    /**
     * POST  /order-education-forms : Create a new orderEducationForm.
     *
     * @param orderEducationForm the orderEducationForm to create
     * @return the ResponseEntity with status 201 (Created) and with body the new orderEducationForm, or with status 400 (Bad Request) if the orderEducationForm has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/order-education-forms")
    @Timed
    public ResponseEntity<OrderEducationForm> createOrderEducationForm(@RequestBody OrderEducationForm orderEducationForm) throws URISyntaxException {
        log.debug("REST request to save OrderEducationForm : {}", orderEducationForm);
        if (orderEducationForm.getId() != null) {
            throw new BadRequestAlertException("A new orderEducationForm cannot already have an ID", ENTITY_NAME, "idexists");
        }
        OrderEducationForm result = orderEducationFormRepository.save(orderEducationForm);
        return ResponseEntity.created(new URI("/api/order-education-forms/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /order-education-forms : Updates an existing orderEducationForm.
     *
     * @param orderEducationForm the orderEducationForm to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated orderEducationForm,
     * or with status 400 (Bad Request) if the orderEducationForm is not valid,
     * or with status 500 (Internal Server Error) if the orderEducationForm couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/order-education-forms")
    @Timed
    public ResponseEntity<OrderEducationForm> updateOrderEducationForm(@RequestBody OrderEducationForm orderEducationForm) throws URISyntaxException {
        log.debug("REST request to update OrderEducationForm : {}", orderEducationForm);
        if (orderEducationForm.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        OrderEducationForm result = orderEducationFormRepository.save(orderEducationForm);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, orderEducationForm.getId().toString()))
            .body(result);
    }

    /**
     * GET  /order-education-forms : get all the orderEducationForms.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of orderEducationForms in body
     */
    @GetMapping("/order-education-forms")
    @Timed
    public List<OrderEducationForm> getAllOrderEducationForms() {
        log.debug("REST request to get all OrderEducationForms");
        return orderEducationFormRepository.findAll();
    }

    /**
     * GET  /order-education-forms/:id : get the "id" orderEducationForm.
     *
     * @param id the id of the orderEducationForm to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the orderEducationForm, or with status 404 (Not Found)
     */
    @GetMapping("/order-education-forms/{id}")
    @Timed
    public ResponseEntity<OrderEducationForm> getOrderEducationForm(@PathVariable String id) {
        log.debug("REST request to get OrderEducationForm : {}", id);
        Optional<OrderEducationForm> orderEducationForm = orderEducationFormRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(orderEducationForm);
    }

    /**
     * DELETE  /order-education-forms/:id : delete the "id" orderEducationForm.
     *
     * @param id the id of the orderEducationForm to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/order-education-forms/{id}")
    @Timed
    public ResponseEntity<Void> deleteOrderEducationForm(@PathVariable String id) {
        log.debug("REST request to delete OrderEducationForm : {}", id);

        orderEducationFormRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id)).build();
    }
}
