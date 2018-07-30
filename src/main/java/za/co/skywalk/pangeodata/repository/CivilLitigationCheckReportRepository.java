package za.co.skywalk.pangeodata.repository;

import za.co.skywalk.pangeodata.domain.CivilLitigationCheckReport;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data MongoDB repository for the CivilLitigationCheckReport entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CivilLitigationCheckReportRepository extends MongoRepository<CivilLitigationCheckReport, String> {

}
