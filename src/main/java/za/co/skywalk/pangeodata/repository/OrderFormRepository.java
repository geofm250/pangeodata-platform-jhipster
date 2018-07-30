package za.co.skywalk.pangeodata.repository;

import za.co.skywalk.pangeodata.domain.OrderForm;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data MongoDB repository for the OrderForm entity.
 */
@SuppressWarnings("unused")
@Repository
public interface OrderFormRepository extends MongoRepository<OrderForm, String> {

}
