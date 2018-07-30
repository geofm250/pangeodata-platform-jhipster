package za.co.skywalk.pangeodata.repository;

import za.co.skywalk.pangeodata.domain.Link;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data MongoDB repository for the Link entity.
 */
@SuppressWarnings("unused")
@Repository
public interface LinkRepository extends MongoRepository<Link, String> {

}
