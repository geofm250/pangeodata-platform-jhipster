package za.co.skywalk.pangeodata.repository;

import za.co.skywalk.pangeodata.domain.OrderFile;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data MongoDB repository for the OrderFile entity.
 */
@SuppressWarnings("unused")
@Repository
public interface OrderFileRepository extends MongoRepository<OrderFile, String> {

}
