package za.co.skywalk.pangeodata.repository;

import za.co.skywalk.pangeodata.domain.Session;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data MongoDB repository for the Session entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SessionRepository extends MongoRepository<Session, String> {

}
