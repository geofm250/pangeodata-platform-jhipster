package za.co.skywalk.pangeodata.repository;

import za.co.skywalk.pangeodata.domain.CreditCheckReport;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data MongoDB repository for the CreditCheckReport entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CreditCheckReportRepository extends MongoRepository<CreditCheckReport, String> {

}
