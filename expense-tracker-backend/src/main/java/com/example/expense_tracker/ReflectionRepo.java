package com.example.expense_tracker;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ReflectionRepo extends JpaRepository<ReflectionEntity, Integer> {
    Optional<ReflectionEntity> findByExpenseExpenseId(int expenseId);
    List<ReflectionEntity> findByExpenseUserUserIdOrderByExpenseExpenseDateDescExpenseExpenseIdDesc(Long userId);

    @Query("""
        SELECT COUNT(r.reflectionId)
        FROM ReflectionEntity r
        WHERE r.expense.user.userId = :userId
        AND r.rating = 'REGRET'
    """)
    Long getTotalRegretCount(Long userId);

    @Query("""
        SELECT COUNT(r.reflectionId)
        FROM ReflectionEntity r
        WHERE r.expense.user.userId = :userId
        AND r.rating = 'WORTH'
    """)
    Long getTotalWorthCount(Long userId);

    @Query("""
        SELECT COALESCE(SUM(r.expense.amount), 0)
        FROM ReflectionEntity r
        WHERE r.expense.user.userId = :userId
        AND r.rating = 'REGRET'
    """)
    Double getMoneyWasted(Long userId);

    @Query("""
        SELECT 
            (COUNT(r.reflectionId) * 100.0 / COUNT(e.expenseId))
        FROM ExpenseEntity e
        LEFT JOIN ReflectionEntity r
            ON e.expenseId = r.expense.expenseId
            AND r.rating = 'REGRET'
        WHERE e.user.userId = :userId
    """)
    Double getOverallRegretPercentage(Long userId);

    @Query("""
        SELECT e.category,
               (COUNT(r.reflectionId) * 100.0 / COUNT(e.expenseId))
        FROM ExpenseEntity e
        LEFT JOIN ReflectionEntity r
            ON e.expenseId = r.expense.expenseId
            AND r.rating = 'REGRET'
        WHERE e.user.userId = :userId
        GROUP BY e.category
        ORDER BY (COUNT(r.reflectionId) * 1.0 / COUNT(e.expenseId)) DESC
    """)
    List<Object[]> getCategoryWiseRegretPercentage(Long userId);

    @Query("""
        SELECT e.category
        FROM ExpenseEntity e
        LEFT JOIN ReflectionEntity r
            ON e.expenseId = r.expense.expenseId
            AND r.rating = 'REGRET'
        WHERE e.user.userId = :userId
        GROUP BY e.category
        ORDER BY (COUNT(r.reflectionId) * 1.0 / COUNT(e.expenseId)) DESC
    """)
    List<String> getWorstCategory(Long userId);

    @Query("""
        SELECT e.category
        FROM ExpenseEntity e
        LEFT JOIN ReflectionEntity r
            ON e.expenseId = r.expense.expenseId
            AND r.rating = 'REGRET'
        WHERE e.user.userId = :userId
        GROUP BY e.category
        ORDER BY (COUNT(r.reflectionId) * 1.0 / COUNT(e.expenseId)) ASC
    """)
    List<String> getBestCategory(Long userId);
}
