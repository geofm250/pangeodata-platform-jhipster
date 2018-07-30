package za.co.skywalk.pangeodata.web.rest;

import com.codahale.metrics.annotation.Timed;
import za.co.skywalk.pangeodata.domain.ProductCountry;
import za.co.skywalk.pangeodata.repository.ProductCountryRepository;
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
 * REST controller for managing ProductCountry.
 */
@RestController
@RequestMapping("/api")
public class ProductCountryResource {

    private final Logger log = LoggerFactory.getLogger(ProductCountryResource.class);

    private static final String ENTITY_NAME = "productCountry";

    private final ProductCountryRepository productCountryRepository;

    public ProductCountryResource(ProductCountryRepository productCountryRepository) {
        this.productCountryRepository = productCountryRepository;
    }

    /**
     * POST  /product-countries : Create a new productCountry.
     *
     * @param productCountry the productCountry to create
     * @return the ResponseEntity with status 201 (Created) and with body the new productCountry, or with status 400 (Bad Request) if the productCountry has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/product-countries")
    @Timed
    public ResponseEntity<ProductCountry> createProductCountry(@RequestBody ProductCountry productCountry) throws URISyntaxException {
        log.debug("REST request to save ProductCountry : {}", productCountry);
        if (productCountry.getId() != null) {
            throw new BadRequestAlertException("A new productCountry cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ProductCountry result = productCountryRepository.save(productCountry);
        return ResponseEntity.created(new URI("/api/product-countries/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /product-countries : Updates an existing productCountry.
     *
     * @param productCountry the productCountry to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated productCountry,
     * or with status 400 (Bad Request) if the productCountry is not valid,
     * or with status 500 (Internal Server Error) if the productCountry couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/product-countries")
    @Timed
    public ResponseEntity<ProductCountry> updateProductCountry(@RequestBody ProductCountry productCountry) throws URISyntaxException {
        log.debug("REST request to update ProductCountry : {}", productCountry);
        if (productCountry.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ProductCountry result = productCountryRepository.save(productCountry);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, productCountry.getId().toString()))
            .body(result);
    }

    /**
     * GET  /product-countries : get all the productCountries.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of productCountries in body
     */
    @GetMapping("/product-countries")
    @Timed
    public List<ProductCountry> getAllProductCountries() {
        log.debug("REST request to get all ProductCountries");
        return productCountryRepository.findAll();
    }

    /**
     * GET  /product-countries/:id : get the "id" productCountry.
     *
     * @param id the id of the productCountry to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the productCountry, or with status 404 (Not Found)
     */
    @GetMapping("/product-countries/{id}")
    @Timed
    public ResponseEntity<ProductCountry> getProductCountry(@PathVariable String id) {
        log.debug("REST request to get ProductCountry : {}", id);
        Optional<ProductCountry> productCountry = productCountryRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(productCountry);
    }

    /**
     * DELETE  /product-countries/:id : delete the "id" productCountry.
     *
     * @param id the id of the productCountry to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/product-countries/{id}")
    @Timed
    public ResponseEntity<Void> deleteProductCountry(@PathVariable String id) {
        log.debug("REST request to delete ProductCountry : {}", id);

        productCountryRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id)).build();
    }
}
