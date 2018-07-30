package za.co.skywalk.pangeodata.repository;

import za.co.skywalk.pangeodata.domain.DirectorshipVerificationReport;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data MongoDB repository for the DirectorshipVerificationReport entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DirectorshipVerificationReportRepository extends MongoRepository<DirectorshipVerificationReport, String> {

}
