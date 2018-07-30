package za.co.skywalk.pangeodata.web.rest;

import com.codahale.metrics.annotation.Timed;
import za.co.skywalk.pangeodata.domain.File;
import za.co.skywalk.pangeodata.repository.FileRepository;
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
 * REST controller for managing File.
 */
@RestController
@RequestMapping("/api")
public class FileResource {

    private final Logger log = LoggerFactory.getLogger(FileResource.class);

    private static final String ENTITY_NAME = "file";

    private final FileRepository fileRepository;

    public FileResource(FileRepository fileRepository) {
        this.fileRepository = fileRepository;
    }

    /**
     * POST  /files : Create a new file.
     *
     * @param file the file to create
     * @return the ResponseEntity with status 201 (Created) and with body the new file, or with status 400 (Bad Request) if the file has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/files")
    @Timed
    public ResponseEntity<File> createFile(@RequestBody File file) throws URISyntaxException {
        log.debug("REST request to save File : {}", file);
        if (file.getId() != null) {
            throw new BadRequestAlertException("A new file cannot already have an ID", ENTITY_NAME, "idexists");
        }
        File result = fileRepository.save(file);
        return ResponseEntity.created(new URI("/api/files/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /files : Updates an existing file.
     *
     * @param file the file to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated file,
     * or with status 400 (Bad Request) if the file is not valid,
     * or with status 500 (Internal Server Error) if the file couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/files")
    @Timed
    public ResponseEntity<File> updateFile(@RequestBody File file) throws URISyntaxException {
        log.debug("REST request to update File : {}", file);
        if (file.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        File result = fileRepository.save(file);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, file.getId().toString()))
            .body(result);
    }

    /**
     * GET  /files : get all the files.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of files in body
     */
    @GetMapping("/files")
    @Timed
    public List<File> getAllFiles() {
        log.debug("REST request to get all Files");
        return fileRepository.findAll();
    }

    /**
     * GET  /files/:id : get the "id" file.
     *
     * @param id the id of the file to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the file, or with status 404 (Not Found)
     */
    @GetMapping("/files/{id}")
    @Timed
    public ResponseEntity<File> getFile(@PathVariable String id) {
        log.debug("REST request to get File : {}", id);
        Optional<File> file = fileRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(file);
    }

    /**
     * DELETE  /files/:id : delete the "id" file.
     *
     * @param id the id of the file to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/files/{id}")
    @Timed
    public ResponseEntity<Void> deleteFile(@PathVariable String id) {
        log.debug("REST request to delete File : {}", id);

        fileRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id)).build();
    }
}
