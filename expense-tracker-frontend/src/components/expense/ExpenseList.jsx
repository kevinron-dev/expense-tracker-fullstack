import React, { useEffect, useState } from "react";
import { Card } from "primereact/card";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Tag } from "primereact/tag";
import { Skeleton } from "primereact/skeleton";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import Navbar from "../layout/Navbar";
import { getExpenses } from "../../services/api";

const ExpenseList = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const rowsPerPage = 10;
  const shouldPaginate = expenses.length > rowsPerPage;

  useEffect(() => {
    let isMounted = true;

    const fetchExpenses = async () => {
      if (!userId) {
        if (isMounted) {
          setExpenses([]);
          setLoading(false);
        }
        return;
      }

      try {
        const data = await getExpenses(userId);
        if (!isMounted) return;
        setExpenses(Array.isArray(data) ? data : []);
        setLoading(false);
      } catch (error) {
        if (isMounted) {
          console.error("Error fetching expenses:", error);
          setLoading(false);
        }
      }
    };

    fetchExpenses();
    return () => {
      isMounted = false;
    };
  }, [userId]);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(value);
  };

  const amountBodyTemplate = (rowData) => {
    return <span className="stat-value" style={{ fontSize: '1rem' }}>{formatCurrency(rowData.amount)}</span>;
  };

  const categoryBodyTemplate = (rowData) => {
    const categoryColors = {
      'Food': '#2196f3',
      'Transport': '#1976d2',
      'Shopping': '#9c27b0',
      'Entertainment': '#ff6f00',
      'Bills': '#ef5350',
      'Health': '#26c6da',
      'Education': '#42a5f5',
      'Other': '#6a6a8a'
    };
    
    return (
      <Tag 
        value={rowData.category} 
        style={{ 
          background: categoryColors[rowData.category] || '#6a6a8a',
          border: 'none',
          color: '#f5f8ff',
          fontWeight: 600,
          padding: '0.35rem 0.65rem'
        }}
      />
    );
  };

  const paymentModeBodyTemplate = (rowData) => {
    const icons = {
      'Cash': 'pi-money-bill',
      'Card': 'pi-credit-card',
      'UPI': 'pi-mobile',
      'Net Banking': 'pi-globe'
    };
    
    return (
      <span>
        <i className={`pi ${icons[rowData.paymentMode] || 'pi-wallet'} mr-2`}></i>
        {rowData.paymentMode}
      </span>
    );
  };

  const dateBodyTemplate = (rowData) => {
    if (!rowData.expenseDate) return '-';
    const date = new Date(rowData.expenseDate);
    return date.toLocaleDateString('en-IN', { 
      day: '2-digit', 
      month: 'short', 
      year: 'numeric' 
    });
  };

  const descriptionBodyTemplate = (rowData) => {
    return rowData.description || <span style={{ color: '#6a6a8a', fontStyle: 'italic' }}>No description</span>;
  };

  return (
    <div className="page-shell">
      <Navbar />
      <div className="page-content">
        <div className="flex justify-content-between align-items-center mb-4">
          <div>
            <h1 className="gradient-text page-title">
              Expense History
            </h1>
            <p className="page-subtitle">
              View and manage all your expenses
            </p>
          </div>
          <Button
            label="Add New"
            icon="pi pi-plus"
            className="p-button-success"
            onClick={() => navigate('/add-expense')}
          />
        </div>

        <Card>
          {loading ? (
            <div>
              <Skeleton className="mb-2" height="3rem" />
              <Skeleton className="mb-2" height="3rem" />
              <Skeleton className="mb-2" height="3rem" />
              <Skeleton className="mb-2" height="3rem" />
            </div>
          ) : expenses.length === 0 ? (
            <div className="text-center p-5" style={{ color: '#a0a0a0' }}>
              <i className="pi pi-inbox" style={{ fontSize: '4rem', marginBottom: '1rem', display: 'block' }}></i>
              <h3 style={{ marginBottom: '0.5rem' }}>No expenses yet</h3>
              <p>Start tracking your expenses by adding your first one!</p>
              <Button
                label="Add Your First Expense"
                icon="pi pi-plus"
                className="mt-3"
                onClick={() => navigate('/add-expense')}
              />
            </div>
          ) : (
            <DataTable
              value={expenses}
              stripedRows
              responsiveLayout="scroll"
              paginator={shouldPaginate}
              rows={rowsPerPage}
              rowsPerPageOptions={shouldPaginate ? [5, 10, 25, 50] : undefined}
              paginatorTemplate={shouldPaginate ? "FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" : undefined}
              currentPageReportTemplate="Showing {first} to {last} of {totalRecords} expenses"
              sortField="expenseDate"
              sortOrder={-1}
            >
              <Column 
                field="expenseDate" 
                header="Date" 
                body={dateBodyTemplate} 
                sortable 
                style={{ minWidth: '120px' }}
              />
              <Column 
                field="category" 
                header="Category" 
                body={categoryBodyTemplate} 
                sortable 
                style={{ minWidth: '120px' }}
              />
              <Column 
                field="amount" 
                header="Amount" 
                body={amountBodyTemplate} 
                sortable 
                style={{ minWidth: '120px' }}
              />
              <Column 
                field="paymentMode" 
                header="Payment Mode" 
                body={paymentModeBodyTemplate}
                style={{ minWidth: '150px' }}
              />
              <Column 
                field="description" 
                header="Description" 
                body={descriptionBodyTemplate}
                style={{ minWidth: '200px' }}
              />
            </DataTable>
          )}
        </Card>
      </div>
    </div>
  );
};

export default ExpenseList;
