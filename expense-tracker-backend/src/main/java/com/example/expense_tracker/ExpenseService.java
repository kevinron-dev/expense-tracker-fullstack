package com.example.expense_tracker;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;


@Service
public class ExpenseService {
	
	@Autowired
	private ExpenseRepo expenseRepo;

	@Autowired
	private UserRepo userRepo;
	
	public List<Object[]> getCategoryRegret(int userId){
		return expenseRepo.getRegretPercentageByCategory(userId);
	}

	public ExpenseEntity createExpense(ExpenseRequest request) {
		validateRequest(request);

		UserEntity user = userRepo.findById(request.getUserId()).orElse(null);
		if (user == null) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid userId");
		}

		ExpenseEntity expense = new ExpenseEntity();
		expense.setAmount(request.getAmount());
		expense.setCategory(request.getCategory());
		expense.setPaymentMode(request.getPaymentMode());
		expense.setExpenseDate(request.getExpenseDate());
		expense.setDescription(request.getDescription());
		expense.setUser(user);

		return expenseRepo.save(expense);
	}

	public List<ExpenseEntity> getExpenses(Integer userId) {
		if (userId == null) {
			return expenseRepo.findAllByOrderByExpenseDateDescExpenseIdDesc();
		}
		return expenseRepo.findByUserUserIdOrderByExpenseDateDescExpenseIdDesc(userId);
	}

	public void deleteExpense(int expenseId) {
		if (!expenseRepo.existsById(expenseId)) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Expense not found");
		}
		expenseRepo.deleteById(expenseId);
	}

    public Double getTotalSpent(Long userId) {
        return expenseRepo.getTotalSpent(userId);
    }

    public Long getTotalExpenseCount(Long userId) {
        return expenseRepo.getTotalExpenseCount(userId);
    }

    public ExpenseResponse toResponse(ExpenseEntity expense) {
		return new ExpenseResponse(
			expense.getExpenseId(),
			expense.getAmount(),
			expense.getCategory(),
			expense.getPaymentMode(),
			expense.getExpenseDate(),
			expense.getDescription(),
			expense.getUser() != null ? expense.getUser().getUserId() : 0
		);
    }

	private void validateRequest(ExpenseRequest request) {
		if (request == null) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Request body is required");
		}
		if (request.getAmount() == null || request.getAmount() <= 0) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Amount must be greater than 0");
		}
		if (request.getCategory() == null || request.getCategory().isBlank()) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Category is required");
		}
		if (request.getPaymentMode() == null || request.getPaymentMode().isBlank()) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Payment mode is required");
		}
		if (request.getExpenseDate() == null) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Expense date is required");
		}
		if (request.getUserId() == null) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "UserId is required");
		}
	}

}
