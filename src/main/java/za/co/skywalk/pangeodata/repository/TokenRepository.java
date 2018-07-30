package za.co.skywalk.pangeodata.repository;

import za.co.skywalk.pangeodata.domain.Token;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data MongoDB repository for the Token entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TokenRepository extends MongoRepository<Token, String> {

}
