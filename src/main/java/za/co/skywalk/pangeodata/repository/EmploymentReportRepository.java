package za.co.skywalk.pangeodata.repository;

import za.co.skywalk.pangeodata.domain.EmploymentReport;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data MongoDB repository for the EmploymentReport entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EmploymentReportRepository extends MongoRepository<EmploymentReport, String> {

}
