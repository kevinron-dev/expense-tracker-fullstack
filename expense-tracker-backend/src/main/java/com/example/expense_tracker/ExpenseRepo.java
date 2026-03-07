package com.example.expense_tracker;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ExpenseRepo extends JpaRepository<ExpenseEntity, Integer>{
	List<ExpenseEntity> findByUserUserIdOrderByExpenseDateDescExpenseIdDesc(int userId);
	List<ExpenseEntity> findAllByOrderByExpenseDateDescExpenseIdDesc();
	
	@Query("""
		    SELECT e.category, 
		           COUNT(r.reflectionId), 
		           COUNT(e.expenseId), 
		           (COUNT(r.reflectionId) * 100.0 / COUNT(e.expenseId)) 
		    FROM ExpenseEntity e 
		    LEFT JOIN e.reflections r 
		    WITH r.rating = 'REGRET' 
		    WHERE e.user.userId = :userId 
		    GROUP BY e.category 
		    ORDER BY (COUNT(r.reflectionId) * 1.0 / COUNT(e.expenseId)) DESC
		""")
		List<Object[]> getRegretPercentageByCategory(@Param("userId") int userId);

    @Query("""
        SELECT COALESCE(SUM(e.amount), 0)
        FROM ExpenseEntity e
        WHERE e.user.userId = :userId
    """)
    Double getTotalSpent(Long userId);

    @Query("""
        SELECT COUNT(e.expenseId)
        FROM ExpenseEntity e
        WHERE e.user.userId = :userId
    """)
    Long getTotalExpenseCount(Long userId);
}
