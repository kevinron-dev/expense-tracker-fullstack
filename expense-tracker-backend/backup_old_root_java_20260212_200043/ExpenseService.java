package com.example.expense_tracker;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class ExpenseService {
	
	@Autowired
	private ExpenseRepo expenseRepo;
	
	public List<Object[]> getCategoryRegret(int userId){
		return expenseRepo.getRegretPercentageByCategory(userId);
	}
	public ExpenseEntity save(ExpenseEntity expense) {
        return expenseRepo.save(expense);
    }

    public Double getTotalSpent(Long userId) {
        return expenseRepo.getTotalSpent(userId);
    }

    public Long getTotalExpenseCount(Long userId) {
        return expenseRepo.getTotalExpenseCount(userId);
    }

}
