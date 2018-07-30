package za.co.skywalk.pangeodata.repository;

import za.co.skywalk.pangeodata.domain.ReportedCriminalActivityCheck;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data MongoDB repository for the ReportedCriminalActivityCheck entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ReportedCriminalActivityCheckRepository extends MongoRepository<ReportedCriminalActivityCheck, String> {

}
