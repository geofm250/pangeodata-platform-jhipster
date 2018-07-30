package za.co.skywalk.pangeodata.repository;

import za.co.skywalk.pangeodata.domain.OrderEmploymentForm;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data MongoDB repository for the OrderEmploymentForm entity.
 */
@SuppressWarnings("unused")
@Repository
public interface OrderEmploymentFormRepository extends MongoRepository<OrderEmploymentForm, String> {

}
