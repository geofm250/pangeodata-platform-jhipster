package za.co.skywalk.pangeodata.repository;

import za.co.skywalk.pangeodata.domain.AddressCheckReport;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data MongoDB repository for the AddressCheckReport entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AddressCheckReportRepository extends MongoRepository<AddressCheckReport, String> {

}
