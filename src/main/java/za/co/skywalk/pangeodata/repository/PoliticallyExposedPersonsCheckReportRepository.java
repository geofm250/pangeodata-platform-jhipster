package za.co.skywalk.pangeodata.repository;

import za.co.skywalk.pangeodata.domain.PoliticallyExposedPersonsCheckReport;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data MongoDB repository for the PoliticallyExposedPersonsCheckReport entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PoliticallyExposedPersonsCheckReportRepository extends MongoRepository<PoliticallyExposedPersonsCheckReport, String> {

}
