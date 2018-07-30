package za.co.skywalk.pangeodata.repository;

import za.co.skywalk.pangeodata.domain.IOrderForm;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data MongoDB repository for the IOrderForm entity.
 */
@SuppressWarnings("unused")
@Repository
public interface IOrderFormRepository extends MongoRepository<IOrderForm, String> {

}
