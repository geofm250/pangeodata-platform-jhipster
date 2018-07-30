package za.co.skywalk.pangeodata.repository;

import za.co.skywalk.pangeodata.domain.ProductCountry;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data MongoDB repository for the ProductCountry entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProductCountryRepository extends MongoRepository<ProductCountry, String> {

}
