package za.co.skywalk.pangeodata.repository;

import za.co.skywalk.pangeodata.domain.Migration;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data MongoDB repository for the Migration entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MigrationRepository extends MongoRepository<Migration, String> {

}
