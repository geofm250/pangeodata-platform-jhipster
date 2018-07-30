package za.co.skywalk.pangeodata.repository;

import za.co.skywalk.pangeodata.domain.IdentityCheckReport;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data MongoDB repository for the IdentityCheckReport entity.
 */
@SuppressWarnings("unused")
@Repository
public interface IdentityCheckReportRepository extends MongoRepository<IdentityCheckReport, String> {

}
