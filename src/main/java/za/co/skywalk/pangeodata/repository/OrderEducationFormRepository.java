package za.co.skywalk.pangeodata.repository;

import za.co.skywalk.pangeodata.domain.OrderEducationForm;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data MongoDB repository for the OrderEducationForm entity.
 */
@SuppressWarnings("unused")
@Repository
public interface OrderEducationFormRepository extends MongoRepository<OrderEducationForm, String> {

}
