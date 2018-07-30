package za.co.skywalk.pangeodata.repository;

import za.co.skywalk.pangeodata.domain.BankruptcyCheckReport;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data MongoDB repository for the BankruptcyCheckReport entity.
 */
@SuppressWarnings("unused")
@Repository
public interface BankruptcyCheckReportRepository extends MongoRepository<BankruptcyCheckReport, String> {

}
