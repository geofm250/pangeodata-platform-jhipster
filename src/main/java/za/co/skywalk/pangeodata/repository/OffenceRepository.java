package za.co.skywalk.pangeodata.repository;

import za.co.skywalk.pangeodata.domain.Offence;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data MongoDB repository for the Offence entity.
 */
@SuppressWarnings("unused")
@Repository
public interface OffenceRepository extends MongoRepository<Offence, String> {

}
