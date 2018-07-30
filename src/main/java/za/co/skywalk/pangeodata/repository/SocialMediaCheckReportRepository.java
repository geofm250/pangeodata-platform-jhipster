package za.co.skywalk.pangeodata.repository;

import za.co.skywalk.pangeodata.domain.SocialMediaCheckReport;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data MongoDB repository for the SocialMediaCheckReport entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SocialMediaCheckReportRepository extends MongoRepository<SocialMediaCheckReport, String> {

}
