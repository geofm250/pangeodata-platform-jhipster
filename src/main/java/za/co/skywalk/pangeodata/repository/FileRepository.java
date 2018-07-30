package za.co.skywalk.pangeodata.repository;

import za.co.skywalk.pangeodata.domain.File;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data MongoDB repository for the File entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FileRepository extends MongoRepository<File, String> {

}
