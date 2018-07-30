package za.co.skywalk.pangeodata.repository;

import za.co.skywalk.pangeodata.domain.Requirement;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data MongoDB repository for the Requirement entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RequirementRepository extends MongoRepository<Requirement, String> {

}
