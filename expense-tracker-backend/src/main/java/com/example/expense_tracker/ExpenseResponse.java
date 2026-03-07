package com.example.expense_tracker;

import java.time.LocalDate;

public class ExpenseResponse {
    private int expenseId;
    private double amount;
    private String category;
    private String paymentMode;
    private LocalDate expenseDate;
    private String description;
    private int userId;

    public ExpenseResponse() {
    }

    public ExpenseResponse(
        int expenseId,
        double amount,
        String category,
        String paymentMode,
        LocalDate expenseDate,
        String description,
        int userId
    ) {
        this.expenseId = expenseId;
        this.amount = amount;
        this.category = category;
        this.paymentMode = paymentMode;
        this.expenseDate = expenseDate;
        this.description = description;
        this.userId = userId;
    }

    public int getExpenseId() {
        return expenseId;
    }

    public void setExpenseId(int expenseId) {
        this.expenseId = expenseId;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getPaymentMode() {
        return paymentMode;
    }

    public void setPaymentMode(String paymentMode) {
        this.paymentMode = paymentMode;
    }

    public LocalDate getExpenseDate() {
        return expenseDate;
    }

    public void setExpenseDate(LocalDate expenseDate) {
        this.expenseDate = expenseDate;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }
}
