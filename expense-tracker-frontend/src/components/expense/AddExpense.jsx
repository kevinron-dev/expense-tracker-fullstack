import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "primereact/card";
import { InputNumber } from "primereact/inputnumber";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import { Message } from "primereact/message";
import Navbar from "../layout/Navbar";
import { addExpense } from "../../services/api";

const AddExpense = () => {
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState("");
  const [paymentMode, setPaymentMode] = useState("");
  const [expenseDate, setExpenseDate] = useState(new Date());
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const categories = [
    { label: "Food & Dining", value: "Food", icon: "pi pi-shopping-bag" },
    { label: "Transportation", value: "Transport", icon: "pi pi-car" },
    { label: "Shopping", value: "Shopping", icon: "pi pi-shopping-cart" },
    { label: "Entertainment", value: "Entertainment", icon: "pi pi-ticket" },
    { label: "Bills & Utilities", value: "Bills", icon: "pi pi-file" },
    { label: "Health & Fitness", value: "Health", icon: "pi pi-heart" },
    { label: "Education", value: "Education", icon: "pi pi-book" },
    { label: "Other", value: "Other", icon: "pi pi-ellipsis-h" },
  ];

  const paymentModes = [
    { label: "Cash", value: "Cash", icon: "pi pi-money-bill" },
    { label: "Credit Card", value: "Card", icon: "pi pi-credit-card" },
    { label: "UPI", value: "UPI", icon: "pi pi-mobile" },
    { label: "Net Banking", value: "Net Banking", icon: "pi pi-globe" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    if (!amount || amount <= 0) {
      setError("Please enter a valid amount");
      return;
    }
    
    if (!category) {
      setError("Please select a category");
      return;
    }
    
    if (!paymentMode) {
      setError("Please select a payment mode");
      return;
    }
    
    const userId = Number(localStorage.getItem("userId"));
    if (!userId) {
      setError("Session expired. Please login again.");
      return;
    }

    setLoading(true);

    const expenseData = {
      amount,
      category,
      paymentMode,
      expenseDate: expenseDate.toISOString().split('T')[0],
      description,
      userId
    };

    try {
      await addExpense(expenseData);
      navigate("/expense-list");
    } catch (error) {
      console.error("Error adding expense:", error);
      setError("Failed to add expense");
      setLoading(false);
    }
  };

  return (
    <div className="page-shell">
      <Navbar />
      <div className="page-content">
        <div className="page-header">
          <h1 className="gradient-text page-title">
            Add New Expense
          </h1>
          <p className="page-subtitle">
            Track your spending and categorize your expenses
          </p>
        </div>

        <div className="flex justify-content-center">
          <Card className="expense-form-card">
            {error && (
              <Message severity="error" text={error} className="mb-4 w-full" />
            )}
            
            <form onSubmit={handleSubmit} className="expense-form">
              <div className="grid expense-form-grid">
                <div className="col-12 md:col-6">
                  <div className="field">
                    <label htmlFor="amount">
                      <i className="pi pi-wallet mr-2"></i>
                      Amount *
                    </label>
                    <InputNumber
                      id="amount"
                      value={amount}
                      onValueChange={(e) => setAmount(e.value)}
                      mode="currency"
                      currency="INR"
                      locale="en-IN"
                      className="w-full"
                      placeholder="0.00"
                    />
                  </div>
                </div>

                <div className="col-12 md:col-6">
                  <div className="field">
                    <label htmlFor="expenseDate">
                      <i className="pi pi-calendar mr-2"></i>
                      Date *
                    </label>
                    <Calendar
                      id="expenseDate"
                      value={expenseDate}
                      onChange={(e) => setExpenseDate(e.value)}
                      dateFormat="dd/mm/yy"
                      className="w-full"
                      showIcon
                      maxDate={new Date()}
                    />
                  </div>
                </div>

                <div className="col-12 md:col-6">
                  <div className="field">
                    <label htmlFor="category">
                      <i className="pi pi-tags mr-2"></i>
                      Category *
                    </label>
                    <Dropdown
                      id="category"
                      value={category}
                      options={categories}
                      onChange={(e) => setCategory(e.value)}
                      placeholder="Select a Category"
                      className="w-full"
                    />
                  </div>
                </div>

                <div className="col-12 md:col-6">
                  <div className="field">
                    <label htmlFor="paymentMode">
                      <i className="pi pi-credit-card mr-2"></i>
                      Payment Mode *
                    </label>
                    <Dropdown
                      id="paymentMode"
                      value={paymentMode}
                      options={paymentModes}
                      onChange={(e) => setPaymentMode(e.value)}
                      placeholder="Select Payment Mode"
                      className="w-full"
                    />
                  </div>
                </div>

                <div className="col-12">
                  <div className="field">
                    <label htmlFor="description">
                      <i className="pi pi-align-left mr-2"></i>
                      Description (Optional)
                    </label>
                    <InputTextarea
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      rows={4}
                      placeholder="Add any notes or details about this expense..."
                      className="w-full"
                    />
                  </div>
                </div>

                <div className="col-12 expense-action-row">
                  <div className="expense-action-group">
                    <Button 
                      type="submit" 
                      label={loading ? "Adding..." : "Add Expense"}
                      icon="pi pi-check"
                      className="expense-primary-btn"
                      disabled={loading}
                    />
                    <Button 
                      type="button"
                      label="Cancel"
                      icon="pi pi-times"
                      className="p-button-secondary expense-secondary-btn"
                      onClick={() => navigate("/")}
                      disabled={loading}
                    />
                  </div>
                </div>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AddExpense;
