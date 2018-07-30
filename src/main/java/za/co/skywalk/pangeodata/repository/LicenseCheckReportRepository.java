package za.co.skywalk.pangeodata.repository;

import za.co.skywalk.pangeodata.domain.LicenseCheckReport;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data MongoDB repository for the LicenseCheckReport entity.
 */
@SuppressWarnings("unused")
@Repository
public interface LicenseCheckReportRepository extends MongoRepository<LicenseCheckReport, String> {

}
