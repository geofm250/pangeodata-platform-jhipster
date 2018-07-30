package za.co.skywalk.pangeodata.repository;

import za.co.skywalk.pangeodata.domain.DriversLicenseCheckReport;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data MongoDB repository for the DriversLicenseCheckReport entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DriversLicenseCheckReportRepository extends MongoRepository<DriversLicenseCheckReport, String> {

}
