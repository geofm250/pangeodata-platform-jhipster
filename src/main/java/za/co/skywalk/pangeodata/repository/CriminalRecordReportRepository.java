package za.co.skywalk.pangeodata.repository;

import za.co.skywalk.pangeodata.domain.CriminalRecordReport;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data MongoDB repository for the CriminalRecordReport entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CriminalRecordReportRepository extends MongoRepository<CriminalRecordReport, String> {

}
