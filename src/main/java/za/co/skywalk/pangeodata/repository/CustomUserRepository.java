package za.co.skywalk.pangeodata.repository;

import za.co.skywalk.pangeodata.domain.CustomUser;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data MongoDB repository for the CustomUser entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CustomUserRepository extends MongoRepository<CustomUser, String> {

}
