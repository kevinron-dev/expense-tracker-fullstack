package com.example.expense_tracker;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/expenses")
public class ExpenseController {
	
	@Autowired
	private ExpenseService expenseService;
	
	@GetMapping("/regret/category/{userId}")
	public List<Object[]> getCategoryRegret(@PathVariable int userId) {
		return expenseService.getCategoryRegret(userId);
	}
	@Autowired
    private ReflectionService reflectionService;

    @GetMapping("/total-spent/{userId}")
    public Double getTotalSpent(@PathVariable Long userId) {
        return expenseService.getTotalSpent(userId);
    }

    @GetMapping("/total-expenses/{userId}")
    public Long getTotalExpenses(@PathVariable Long userId) {
        return expenseService.getTotalExpenseCount(userId);
    }

    @GetMapping("/total-regret/{userId}")
    public Long getTotalRegret(@PathVariable Long userId) {
        return reflectionService.getTotalRegretCount(userId);
    }

    @GetMapping("/total-worth/{userId}")
    public Long getTotalWorth(@PathVariable Long userId) {
        return reflectionService.getTotalWorthCount(userId);
    }

    @GetMapping("/money-wasted/{userId}")
    public Double getMoneyWasted(@PathVariable Long userId) {
        return reflectionService.getMoneyWasted(userId);
    }

    @GetMapping("/regret-percentage/{userId}")
    public Double getRegretPercentage(@PathVariable Long userId) {
        return reflectionService.getOverallRegretPercentage(userId);
    }

    @GetMapping("/category-regret/{userId}")
    public List<Object[]> getCategoryRegret(@PathVariable Long userId) {
        return reflectionService.getCategoryWiseRegretPercentage(userId);
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
