package za.co.skywalk.pangeodata.repository;

import za.co.skywalk.pangeodata.domain.Rule;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data MongoDB repository for the Rule entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RuleRepository extends MongoRepository<Rule, String> {

}
