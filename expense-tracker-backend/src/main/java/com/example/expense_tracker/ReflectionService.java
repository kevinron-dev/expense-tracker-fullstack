package com.example.expense_tracker;

import java.util.List;
import java.util.Locale;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class ReflectionService {

	@Autowired
    private ReflectionRepo reflectionRepository;

	@Autowired
	private ExpenseRepo expenseRepo;

    public ReflectionEntity save(ReflectionEntity reflection) {
        return reflectionRepository.save(reflection);
    }

    public ReflectionEntity upsertReflection(ReflectionRequest request) {
    	validateRequest(request);

    	ExpenseEntity expense = expenseRepo.findById(request.getExpenseId()).orElse(null);
    	if (expense == null) {
    		throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Expense not found");
    	}

    	ReflectionEntity reflection = reflectionRepository.findByExpenseExpenseId(request.getExpenseId()).orElse(null);
    	if (reflection == null) {
    		reflection = new ReflectionEntity();
    	}

    	reflection.setExpense(expense);
    	reflection.setRating(normalizeRating(request.getRating()));
    	reflection.setNote(request.getNote() == null || request.getNote().isBlank() ? null : request.getNote().trim());

    	return reflectionRepository.save(reflection);
    }

    public List<ReflectionEntity> getReflectionsByUser(Long userId) {
    	return reflectionRepository.findByExpenseUserUserIdOrderByExpenseExpenseDateDescExpenseExpenseIdDesc(userId);
    }

    public ReflectionResponse toResponse(ReflectionEntity reflection) {
    	int expenseId = reflection.getExpense() != null ? reflection.getExpense().getExpenseId() : 0;
    	return new ReflectionResponse(
    		reflection.getReflectionId(),
    		expenseId,
    		reflection.getRating(),
    		reflection.getNote()
    	);
    }

    public Long getTotalRegretCount(Long userId) {
        return reflectionRepository.getTotalRegretCount(userId);
    }

    public Long getTotalWorthCount(Long userId) {
        return reflectionRepository.getTotalWorthCount(userId);
    }

    public Double getMoneyWasted(Long userId) {
        return reflectionRepository.getMoneyWasted(userId);
    }

    public Double getOverallRegretPercentage(Long userId) {
        return reflectionRepository.getOverallRegretPercentage(userId);
    }

    public List<Object[]> getCategoryWiseRegretPercentage(Long userId) {
        return reflectionRepository.getCategoryWiseRegretPercentage(userId);
    }

    public String getWorstCategory(Long userId) {
        List<String> list = reflectionRepository.getWorstCategory(userId);
        return list.isEmpty() ? null : list.get(0);
    }

    public String getBestCategory(Long userId) {
        List<String> list = reflectionRepository.getBestCategory(userId);
        return list.isEmpty() ? null : list.get(0);
    }

    private void validateRequest(ReflectionRequest request) {
    	if (request == null) {
    		throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Request body is required");
    	}
    	if (request.getExpenseId() == null || request.getExpenseId() <= 0) {
    		throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Valid expenseId is required");
    	}
    	if (request.getRating() == null || request.getRating().isBlank()) {
    		throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Rating is required");
    	}
    }

    private String normalizeRating(String rawRating) {
    	String normalized = rawRating.trim().toUpperCase(Locale.ROOT);
    	if ("REGRET".equals(normalized)) {
    		return "REGRET";
    	}
    	if ("WORTH".equals(normalized) || "WORTHIT".equals(normalized) || "WORTH IT".equals(normalized) || "WORTH-IT".equals(normalized) || "WORTH_IT".equals(normalized)) {
    		return "WORTH";
    	}

    	throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Rating must be REGRET or WORTH");
    }
}
