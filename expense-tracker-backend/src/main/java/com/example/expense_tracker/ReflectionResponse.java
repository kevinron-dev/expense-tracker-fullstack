package com.example.expense_tracker;

public class ReflectionResponse {
	private int reflectionId;
	private int expenseId;
	private String rating;
	private String note;

	public ReflectionResponse() {
	}

	public ReflectionResponse(int reflectionId, int expenseId, String rating, String note) {
		this.reflectionId = reflectionId;
		this.expenseId = expenseId;
		this.rating = rating;
		this.note = note;
	}

	public int getReflectionId() {
		return reflectionId;
	}

	public void setReflectionId(int reflectionId) {
		this.reflectionId = reflectionId;
	}

	public int getExpenseId() {
		return expenseId;
	}

	public void setExpenseId(int expenseId) {
		this.expenseId = expenseId;
	}

	public String getRating() {
		return rating;
	}

	public void setRating(String rating) {
		this.rating = rating;
	}

	public String getNote() {
		return note;
	}

	public void setNote(String note) {
		this.note = note;
	}
}
