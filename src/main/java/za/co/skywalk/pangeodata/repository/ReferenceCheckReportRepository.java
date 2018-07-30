package za.co.skywalk.pangeodata.repository;

import za.co.skywalk.pangeodata.domain.ReferenceCheckReport;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data MongoDB repository for the ReferenceCheckReport entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ReferenceCheckReportRepository extends MongoRepository<ReferenceCheckReport, String> {

}
