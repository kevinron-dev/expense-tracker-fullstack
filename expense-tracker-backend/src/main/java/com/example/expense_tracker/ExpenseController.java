package com.example.expense_tracker;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/expenses")
public class ExpenseController {
	
	@Autowired
	private ExpenseService expenseService;

	@Autowired
    private ReflectionService reflectionService;

	@GetMapping
	public List<ExpenseResponse> getExpenses(@RequestParam(required = false) Integer userId) {
		List<ExpenseEntity> expenses = expenseService.getExpenses(userId);
		List<ExpenseResponse> response = new ArrayList<>();
		for (ExpenseEntity expense : expenses) {
			response.add(expenseService.toResponse(expense));
		}
		return response;
	}

	@PostMapping
	public ResponseEntity<ExpenseResponse> createExpense(@RequestBody ExpenseRequest request) {
		ExpenseEntity created = expenseService.createExpense(request);
		return ResponseEntity
			.status(HttpStatus.CREATED)
			.body(expenseService.toResponse(created));
	}

	@DeleteMapping("/{expenseId}")
	public ResponseEntity<Void> deleteExpense(@PathVariable int expenseId) {
		expenseService.deleteExpense(expenseId);
		return ResponseEntity.noContent().build();
	}

	@GetMapping("/regret/category/{userId}")
	public List<Object[]> getCategoryRegretLegacy(@PathVariable int userId) {
		return expenseService.getCategoryRegret(userId);
	}

    @GetMapping("/total-spent/{userId}")
    public Double getTotalSpent(@PathVariable Long userId) {
        Double total = expenseService.getTotalSpent(userId);
        return total != null ? total : 0.0;
    }

    @GetMapping("/total-expenses/{userId}")
    public Long getTotalExpenses(@PathVariable Long userId) {
        Long total = expenseService.getTotalExpenseCount(userId);
        return total != null ? total : 0L;
    }

    @GetMapping("/total-regret/{userId}")
    public Long getTotalRegret(@PathVariable Long userId) {
        Long total = reflectionService.getTotalRegretCount(userId);
        return total != null ? total : 0L;
    }

    @GetMapping("/total-worth/{userId}")
    public Long getTotalWorth(@PathVariable Long userId) {
        Long total = reflectionService.getTotalWorthCount(userId);
        return total != null ? total : 0L;
    }

    @GetMapping("/money-wasted/{userId}")
    public Double getMoneyWasted(@PathVariable Long userId) {
        Double total = reflectionService.getMoneyWasted(userId);
        return total != null ? total : 0.0;
    }

    @GetMapping("/regret-percentage/{userId}")
    public Double getRegretPercentage(@PathVariable Long userId) {
        Double percent = reflectionService.getOverallRegretPercentage(userId);
        return percent != null ? percent : 0.0;
    }

    @GetMapping("/category-regret/{userId}")
    public List<Object[]> getCategoryRegret(@PathVariable Long userId) {
        return expenseService.getCategoryRegret(userId.intValue());
    }

    @GetMapping("/worst-category/{userId}")
    public String getWorstCategory(@PathVariable Long userId) {
        return reflectionService.getWorstCategory(userId);
    }

    @GetMapping("/best-category/{userId}")
    public String getBestCategory(@PathVariable Long userId) {
        return reflectionService.getBestCategory(userId);
    }

}
