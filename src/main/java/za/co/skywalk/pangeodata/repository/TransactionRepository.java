package za.co.skywalk.pangeodata.repository;

import za.co.skywalk.pangeodata.domain.Transaction;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data MongoDB repository for the Transaction entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TransactionRepository extends MongoRepository<Transaction, String> {

}
