package za.co.skywalk.pangeodata.repository;

import za.co.skywalk.pangeodata.domain.ICoverName;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data MongoDB repository for the ICoverName entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ICoverNameRepository extends MongoRepository<ICoverName, String> {

}
