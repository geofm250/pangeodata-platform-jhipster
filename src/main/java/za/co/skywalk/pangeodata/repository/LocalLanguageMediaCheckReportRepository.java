package za.co.skywalk.pangeodata.repository;

import za.co.skywalk.pangeodata.domain.LocalLanguageMediaCheckReport;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data MongoDB repository for the LocalLanguageMediaCheckReport entity.
 */
@SuppressWarnings("unused")
@Repository
public interface LocalLanguageMediaCheckReportRepository extends MongoRepository<LocalLanguageMediaCheckReport, String> {

}
