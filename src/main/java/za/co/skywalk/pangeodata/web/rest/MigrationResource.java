package za.co.skywalk.pangeodata.web.rest;

import com.codahale.metrics.annotation.Timed;
import za.co.skywalk.pangeodata.domain.Migration;
import za.co.skywalk.pangeodata.repository.MigrationRepository;
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
 * REST controller for managing Migration.
 */
@RestController
@RequestMapping("/api")
public class MigrationResource {

    private final Logger log = LoggerFactory.getLogger(MigrationResource.class);

    private static final String ENTITY_NAME = "migration";

    private final MigrationRepository migrationRepository;

    public MigrationResource(MigrationRepository migrationRepository) {
        this.migrationRepository = migrationRepository;
    }

    /**
     * POST  /migrations : Create a new migration.
     *
     * @param migration the migration to create
     * @return the ResponseEntity with status 201 (Created) and with body the new migration, or with status 400 (Bad Request) if the migration has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/migrations")
    @Timed
    public ResponseEntity<Migration> createMigration(@RequestBody Migration migration) throws URISyntaxException {
        log.debug("REST request to save Migration : {}", migration);
        if (migration.getId() != null) {
            throw new BadRequestAlertException("A new migration cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Migration result = migrationRepository.save(migration);
        return ResponseEntity.created(new URI("/api/migrations/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /migrations : Updates an existing migration.
     *
     * @param migration the migration to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated migration,
     * or with status 400 (Bad Request) if the migration is not valid,
     * or with status 500 (Internal Server Error) if the migration couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/migrations")
    @Timed
    public ResponseEntity<Migration> updateMigration(@RequestBody Migration migration) throws URISyntaxException {
        log.debug("REST request to update Migration : {}", migration);
        if (migration.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Migration result = migrationRepository.save(migration);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, migration.getId().toString()))
            .body(result);
    }

    /**
     * GET  /migrations : get all the migrations.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of migrations in body
     */
    @GetMapping("/migrations")
    @Timed
    public List<Migration> getAllMigrations() {
        log.debug("REST request to get all Migrations");
        return migrationRepository.findAll();
    }

    /**
     * GET  /migrations/:id : get the "id" migration.
     *
     * @param id the id of the migration to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the migration, or with status 404 (Not Found)
     */
    @GetMapping("/migrations/{id}")
    @Timed
    public ResponseEntity<Migration> getMigration(@PathVariable String id) {
        log.debug("REST request to get Migration : {}", id);
        Optional<Migration> migration = migrationRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(migration);
    }

    /**
     * DELETE  /migrations/:id : delete the "id" migration.
     *
     * @param id the id of the migration to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/migrations/{id}")
    @Timed
    public ResponseEntity<Void> deleteMigration(@PathVariable String id) {
        log.debug("REST request to delete Migration : {}", id);

        migrationRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id)).build();
    }
}
