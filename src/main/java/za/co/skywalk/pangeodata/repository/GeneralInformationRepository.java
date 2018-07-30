package za.co.skywalk.pangeodata.repository;

import za.co.skywalk.pangeodata.domain.GeneralInformation;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data MongoDB repository for the GeneralInformation entity.
 */
@SuppressWarnings("unused")
@Repository
public interface GeneralInformationRepository extends MongoRepository<GeneralInformation, String> {

}
