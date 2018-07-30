package za.co.skywalk.pangeodata.repository;

import za.co.skywalk.pangeodata.domain.OrderInput;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data MongoDB repository for the OrderInput entity.
 */
@SuppressWarnings("unused")
@Repository
public interface OrderInputRepository extends MongoRepository<OrderInput, String> {

}
