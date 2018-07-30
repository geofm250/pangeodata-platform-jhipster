package za.co.skywalk.pangeodata.web.rest;

import com.codahale.metrics.annotation.Timed;
import za.co.skywalk.pangeodata.domain.OrderInput;
import za.co.skywalk.pangeodata.repository.OrderInputRepository;
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
 * REST controller for managing OrderInput.
 */
@RestController
@RequestMapping("/api")
public class OrderInputResource {

    private final Logger log = LoggerFactory.getLogger(OrderInputResource.class);

    private static final String ENTITY_NAME = "orderInput";

    private final OrderInputRepository orderInputRepository;

    public OrderInputResource(OrderInputRepository orderInputRepository) {
        this.orderInputRepository = orderInputRepository;
    }

    /**
     * POST  /order-inputs : Create a new orderInput.
     *
     * @param orderInput the orderInput to create
     * @return the ResponseEntity with status 201 (Created) and with body the new orderInput, or with status 400 (Bad Request) if the orderInput has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/order-inputs")
    @Timed
    public ResponseEntity<OrderInput> createOrderInput(@RequestBody OrderInput orderInput) throws URISyntaxException {
        log.debug("REST request to save OrderInput : {}", orderInput);
        if (orderInput.getId() != null) {
            throw new BadRequestAlertException("A new orderInput cannot already have an ID", ENTITY_NAME, "idexists");
        }
        OrderInput result = orderInputRepository.save(orderInput);
        return ResponseEntity.created(new URI("/api/order-inputs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /order-inputs : Updates an existing orderInput.
     *
     * @param orderInput the orderInput to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated orderInput,
     * or with status 400 (Bad Request) if the orderInput is not valid,
     * or with status 500 (Internal Server Error) if the orderInput couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/order-inputs")
    @Timed
    public ResponseEntity<OrderInput> updateOrderInput(@RequestBody OrderInput orderInput) throws URISyntaxException {
        log.debug("REST request to update OrderInput : {}", orderInput);
        if (orderInput.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        OrderInput result = orderInputRepository.save(orderInput);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, orderInput.getId().toString()))
            .body(result);
    }

    /**
     * GET  /order-inputs : get all the orderInputs.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of orderInputs in body
     */
    @GetMapping("/order-inputs")
    @Timed
    public List<OrderInput> getAllOrderInputs() {
        log.debug("REST request to get all OrderInputs");
        return orderInputRepository.findAll();
    }

    /**
     * GET  /order-inputs/:id : get the "id" orderInput.
     *
     * @param id the id of the orderInput to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the orderInput, or with status 404 (Not Found)
     */
    @GetMapping("/order-inputs/{id}")
    @Timed
    public ResponseEntity<OrderInput> getOrderInput(@PathVariable String id) {
        log.debug("REST request to get OrderInput : {}", id);
        Optional<OrderInput> orderInput = orderInputRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(orderInput);
    }

    /**
     * DELETE  /order-inputs/:id : delete the "id" orderInput.
     *
     * @param id the id of the orderInput to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/order-inputs/{id}")
    @Timed
    public ResponseEntity<Void> deleteOrderInput(@PathVariable String id) {
        log.debug("REST request to delete OrderInput : {}", id);

        orderInputRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id)).build();
    }
}
