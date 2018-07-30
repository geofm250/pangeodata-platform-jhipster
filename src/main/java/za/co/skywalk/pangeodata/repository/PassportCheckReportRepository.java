package za.co.skywalk.pangeodata.repository;

import za.co.skywalk.pangeodata.domain.PassportCheckReport;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data MongoDB repository for the PassportCheckReport entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PassportCheckReportRepository extends MongoRepository<PassportCheckReport, String> {

}
