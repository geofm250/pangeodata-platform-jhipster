package za.co.skywalk.pangeodata.repository;

import za.co.skywalk.pangeodata.domain.IOrderReport;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data MongoDB repository for the IOrderReport entity.
 */
@SuppressWarnings("unused")
@Repository
public interface IOrderReportRepository extends MongoRepository<IOrderReport, String> {

}
