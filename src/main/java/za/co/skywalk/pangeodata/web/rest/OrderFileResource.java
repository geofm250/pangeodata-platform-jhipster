package za.co.skywalk.pangeodata.web.rest;

import com.codahale.metrics.annotation.Timed;
import za.co.skywalk.pangeodata.domain.OrderFile;
import za.co.skywalk.pangeodata.repository.OrderFileRepository;
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
 * REST controller for managing OrderFile.
 */
@RestController
@RequestMapping("/api")
public class OrderFileResource {

    private final Logger log = LoggerFactory.getLogger(OrderFileResource.class);

    private static final String ENTITY_NAME = "orderFile";

    private final OrderFileRepository orderFileRepository;

    public OrderFileResource(OrderFileRepository orderFileRepository) {
        this.orderFileRepository = orderFileRepository;
    }

    /**
     * POST  /order-files : Create a new orderFile.
     *
     * @param orderFile the orderFile to create
     * @return the ResponseEntity with status 201 (Created) and with body the new orderFile, or with status 400 (Bad Request) if the orderFile has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/order-files")
    @Timed
    public ResponseEntity<OrderFile> createOrderFile(@RequestBody OrderFile orderFile) throws URISyntaxException {
        log.debug("REST request to save OrderFile : {}", orderFile);
        if (orderFile.getId() != null) {
            throw new BadRequestAlertException("A new orderFile cannot already have an ID", ENTITY_NAME, "idexists");
        }
        OrderFile result = orderFileRepository.save(orderFile);
        return ResponseEntity.created(new URI("/api/order-files/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /order-files : Updates an existing orderFile.
     *
     * @param orderFile the orderFile to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated orderFile,
     * or with status 400 (Bad Request) if the orderFile is not valid,
     * or with status 500 (Internal Server Error) if the orderFile couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/order-files")
    @Timed
    public ResponseEntity<OrderFile> updateOrderFile(@RequestBody OrderFile orderFile) throws URISyntaxException {
        log.debug("REST request to update OrderFile : {}", orderFile);
        if (orderFile.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        OrderFile result = orderFileRepository.save(orderFile);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, orderFile.getId().toString()))
            .body(result);
    }

    /**
     * GET  /order-files : get all the orderFiles.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of orderFiles in body
     */
    @GetMapping("/order-files")
    @Timed
    public List<OrderFile> getAllOrderFiles() {
        log.debug("REST request to get all OrderFiles");
        return orderFileRepository.findAll();
    }

    /**
     * GET  /order-files/:id : get the "id" orderFile.
     *
     * @param id the id of the orderFile to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the orderFile, or with status 404 (Not Found)
     */
    @GetMapping("/order-files/{id}")
    @Timed
    public ResponseEntity<OrderFile> getOrderFile(@PathVariable String id) {
        log.debug("REST request to get OrderFile : {}", id);
        Optional<OrderFile> orderFile = orderFileRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(orderFile);
    }

    /**
     * DELETE  /order-files/:id : delete the "id" orderFile.
     *
     * @param id the id of the orderFile to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/order-files/{id}")
    @Timed
    public ResponseEntity<Void> deleteOrderFile(@PathVariable String id) {
        log.debug("REST request to delete OrderFile : {}", id);

        orderFileRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id)).build();
    }
}
