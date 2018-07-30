package za.co.skywalk.pangeodata.web.rest;

import com.codahale.metrics.annotation.Timed;
import za.co.skywalk.pangeodata.domain.OrderForm;
import za.co.skywalk.pangeodata.repository.OrderFormRepository;
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
 * REST controller for managing OrderForm.
 */
@RestController
@RequestMapping("/api")
public class OrderFormResource {

    private final Logger log = LoggerFactory.getLogger(OrderFormResource.class);

    private static final String ENTITY_NAME = "orderForm";

    private final OrderFormRepository orderFormRepository;

    public OrderFormResource(OrderFormRepository orderFormRepository) {
        this.orderFormRepository = orderFormRepository;
    }

    /**
     * POST  /order-forms : Create a new orderForm.
     *
     * @param orderForm the orderForm to create
     * @return the ResponseEntity with status 201 (Created) and with body the new orderForm, or with status 400 (Bad Request) if the orderForm has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/order-forms")
    @Timed
    public ResponseEntity<OrderForm> createOrderForm(@RequestBody OrderForm orderForm) throws URISyntaxException {
        log.debug("REST request to save OrderForm : {}", orderForm);
        if (orderForm.getId() != null) {
            throw new BadRequestAlertException("A new orderForm cannot already have an ID", ENTITY_NAME, "idexists");
        }
        OrderForm result = orderFormRepository.save(orderForm);
        return ResponseEntity.created(new URI("/api/order-forms/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /order-forms : Updates an existing orderForm.
     *
     * @param orderForm the orderForm to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated orderForm,
     * or with status 400 (Bad Request) if the orderForm is not valid,
     * or with status 500 (Internal Server Error) if the orderForm couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/order-forms")
    @Timed
    public ResponseEntity<OrderForm> updateOrderForm(@RequestBody OrderForm orderForm) throws URISyntaxException {
        log.debug("REST request to update OrderForm : {}", orderForm);
        if (orderForm.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        OrderForm result = orderFormRepository.save(orderForm);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, orderForm.getId().toString()))
            .body(result);
    }

    /**
     * GET  /order-forms : get all the orderForms.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of orderForms in body
     */
    @GetMapping("/order-forms")
    @Timed
    public List<OrderForm> getAllOrderForms() {
        log.debug("REST request to get all OrderForms");
        return orderFormRepository.findAll();
    }

    /**
     * GET  /order-forms/:id : get the "id" orderForm.
     *
     * @param id the id of the orderForm to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the orderForm, or with status 404 (Not Found)
     */
    @GetMapping("/order-forms/{id}")
    @Timed
    public ResponseEntity<OrderForm> getOrderForm(@PathVariable String id) {
        log.debug("REST request to get OrderForm : {}", id);
        Optional<OrderForm> orderForm = orderFormRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(orderForm);
    }

    /**
     * DELETE  /order-forms/:id : delete the "id" orderForm.
     *
     * @param id the id of the orderForm to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/order-forms/{id}")
    @Timed
    public ResponseEntity<Void> deleteOrderForm(@PathVariable String id) {
        log.debug("REST request to delete OrderForm : {}", id);

        orderFormRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id)).build();
    }
}
