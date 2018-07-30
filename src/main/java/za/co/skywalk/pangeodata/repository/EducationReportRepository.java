package za.co.skywalk.pangeodata.repository;

import za.co.skywalk.pangeodata.domain.EducationReport;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data MongoDB repository for the EducationReport entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EducationReportRepository extends MongoRepository<EducationReport, String> {

}
