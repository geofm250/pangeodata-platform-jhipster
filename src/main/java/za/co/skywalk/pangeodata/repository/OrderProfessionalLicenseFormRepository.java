package za.co.skywalk.pangeodata.repository;

import za.co.skywalk.pangeodata.domain.OrderProfessionalLicenseForm;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data MongoDB repository for the OrderProfessionalLicenseForm entity.
 */
@SuppressWarnings("unused")
@Repository
public interface OrderProfessionalLicenseFormRepository extends MongoRepository<OrderProfessionalLicenseForm, String> {

}
