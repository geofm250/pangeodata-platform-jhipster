package za.co.skywalk.pangeodata.repository;

import za.co.skywalk.pangeodata.domain.DefaultReport;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data MongoDB repository for the DefaultReport entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DefaultReportRepository extends MongoRepository<DefaultReport, String> {

}
