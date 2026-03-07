package com.example.expense_tracker;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ReflectionService {

	@Autowired
    private ReflectionRepo reflectionRepository;

    public ReflectionEntity save(ReflectionEntity reflection) {
        return reflectionRepository.save(reflection);
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
}
