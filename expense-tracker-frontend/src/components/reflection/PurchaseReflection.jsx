import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "primereact/card";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Tag } from "primereact/tag";
import { Button } from "primereact/button";
import { Message } from "primereact/message";
import { Skeleton } from "primereact/skeleton";
import Navbar from "../layout/Navbar";
import { getExpenses, getReflectionsByUser, upsertReflection } from "../../services/api";

const PurchaseReflection = () => {
  const [expenses, setExpenses] = useState([]);
  const [reflectionMap, setReflectionMap] = useState({});
  const [summary, setSummary] = useState({
    total: 0,
    regret: 0,
    worth: 0,
    pending: 0,
  });
  const [loading, setLoading] = useState(true);
  const [savingKey, setSavingKey] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const calculateSummary = (expenseList, currentMap) => {
    let regret = 0;
    let worth = 0;

    for (let i = 0; i < expenseList.length; i += 1) {
      const expense = expenseList[i];
      const row = currentMap[expense.expenseId];
      if (row && row.rating === "REGRET") {
        regret += 1;
      } else if (row && row.rating === "WORTH") {
        worth += 1;
      }
    }

    const total = expenseList.length;
    const pending = total - regret - worth;

    setSummary({
      total,
      regret,
      worth,
      pending: pending < 0 ? 0 : pending,
    });
  };

  const loadData = async () => {
    if (!userId) {
      setError("Session expired. Please login again.");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError("");

    let expenseData = [];
    let reflectionData = [];

    try {
      const response = await getExpenses(userId);
      if (Array.isArray(response)) {
        expenseData = response;
      }
    } catch {
      expenseData = [];
    }

    try {
      const response = await getReflectionsByUser(userId);
      if (Array.isArray(response)) {
        reflectionData = response;
      }
    } catch {
      reflectionData = [];
    }

    const lookup = {};
    for (let i = 0; i < reflectionData.length; i += 1) {
      const item = reflectionData[i];
      if (item && item.expenseId) {
        lookup[item.expenseId] = item;
      }
    }

    setExpenses(expenseData);
    setReflectionMap(lookup);
    calculateSummary(expenseData, lookup);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  useEffect(() => {
    if (!success) return;
    const timer = setTimeout(() => {
      setSuccess("");
    }, 1800);
    return () => clearTimeout(timer);
  }, [success]);

  const formatCurrency = (value) => {
    const amount = value || 0;
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const setReflection = async (expenseId, rating) => {
    if (!expenseId) return;

    setError("");
    const actionKey = `${expenseId}:${rating}`;
    setSavingKey(actionKey);

    try {
      const saved = await upsertReflection({ expenseId, rating });
      const nextRating = saved && saved.rating ? saved.rating : rating;

      const current = reflectionMap[expenseId] || {};
      const nextMap = {
        ...reflectionMap,
        [expenseId]: {
          ...current,
          ...(saved || {}),
          expenseId,
          rating: nextRating,
        },
      };

      setReflectionMap(nextMap);
      calculateSummary(expenses, nextMap);

      if (nextRating === "REGRET") {
        setSuccess("Marked as Regret");
      } else {
        setSuccess("Marked as Worth It");
      }
    } catch (saveError) {
      console.error("Error saving reflection:", saveError);
      setError(saveError.message || "Failed to save reflection");
    } finally {
      setSavingKey("");
    }
  };

  const dateTemplate = (rowData) => {
    if (!rowData.expenseDate) return "-";
    const date = new Date(rowData.expenseDate);
    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const amountTemplate = (rowData) => {
    return (
      <span className="stat-value" style={{ fontSize: "1rem" }}>
        {formatCurrency(rowData.amount)}
      </span>
    );
  };

  const statusTemplate = (rowData) => {
    const row = reflectionMap[rowData.expenseId];
    const rating = row ? row.rating : null;

    if (rating === "REGRET") {
      return <Tag value="Regret" className="reflection-status-tag reflection-status-tag--regret" />;
    }
    if (rating === "WORTH") {
      return <Tag value="Worth It" className="reflection-status-tag reflection-status-tag--worth" />;
    }
    return <Tag value="Pending" className="reflection-status-tag reflection-status-tag--pending" />;
  };

  const actionTemplate = (rowData) => {
    const row = reflectionMap[rowData.expenseId];
    const rating = row ? row.rating : "";
    const isRegret = rating === "REGRET";
    const isWorth = rating === "WORTH";
    const regretSaving = savingKey === `${rowData.expenseId}:REGRET`;
    const worthSaving = savingKey === `${rowData.expenseId}:WORTH`;

    return (
      <div className="reflection-actions">
        <Button
          type="button"
          label="Regret"
          icon="pi pi-times"
          className={`p-button-sm reflection-action-btn ${isRegret ? "p-button-danger" : "p-button-outlined"}`}
          loading={regretSaving}
          disabled={worthSaving}
          onClick={() => setReflection(rowData.expenseId, "REGRET")}
        />
        <Button
          type="button"
          label="Worth It"
          icon="pi pi-check"
          className={`p-button-sm reflection-action-btn ${isWorth ? "p-button-success" : "p-button-outlined"}`}
          loading={worthSaving}
          disabled={regretSaving}
          onClick={() => setReflection(rowData.expenseId, "WORTH")}
        />
      </div>
    );
  };

  return (
    <div className="page-shell">
      <Navbar />
      <div className="page-content">
        <div className="page-header">
          <h1 className="gradient-text page-title">Purchase Reflection</h1>
          <p className="page-subtitle">Mark each purchase as regret or worth it to power your regret analytics.</p>
        </div>

        <div className="reflection-overview">
          <Card className="reflection-kpi">
            <div className="reflection-kpi-label">Total Purchases</div>
            <div className="reflection-kpi-value">{summary.total}</div>
          </Card>
          <Card className="reflection-kpi">
            <div className="reflection-kpi-label">Regret</div>
            <div className="reflection-kpi-value">{summary.regret}</div>
          </Card>
          <Card className="reflection-kpi">
            <div className="reflection-kpi-label">Worth It</div>
            <div className="reflection-kpi-value">{summary.worth}</div>
          </Card>
          <Card className="reflection-kpi">
            <div className="reflection-kpi-label">Pending</div>
            <div className="reflection-kpi-value">{summary.pending}</div>
          </Card>
        </div>

        {error ? <Message severity="error" text={error} className="mb-4 w-full" /> : null}
        {success ? <Message severity="success" text={success} className="mb-4 w-full" /> : null}

        <Card className="reflection-table-card">
          {loading ? (
            <div>
              <Skeleton className="mb-2" height="3rem" />
              <Skeleton className="mb-2" height="3rem" />
              <Skeleton className="mb-2" height="3rem" />
              <Skeleton className="mb-2" height="3rem" />
            </div>
          ) : expenses.length === 0 ? (
            <div className="text-center p-5" style={{ color: "#a0a0a0" }}>
              <i className="pi pi-inbox" style={{ fontSize: "3.25rem", marginBottom: "1rem", display: "block" }}></i>
              <h3 style={{ marginBottom: "0.5rem" }}>No purchases found</h3>
              <p style={{ marginBottom: "1rem" }}>Add an expense first, then classify it as regret or worth it.</p>
              <Button label="Add Expense" icon="pi pi-plus" onClick={() => navigate("/add-expense")} />
            </div>
          ) : (
            <DataTable
              value={expenses}
              stripedRows
              responsiveLayout="scroll"
              paginator={expenses.length > 8}
              rows={8}
              rowsPerPageOptions={[8, 16, 24]}
              sortField="expenseDate"
              sortOrder={-1}
              currentPageReportTemplate="Showing {first} to {last} of {totalRecords} purchases"
              paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            >
              <Column field="expenseDate" header="Date" body={dateTemplate} sortable style={{ minWidth: "120px" }} />
              <Column field="category" header="Category" sortable style={{ minWidth: "130px" }} />
              <Column field="amount" header="Amount" body={amountTemplate} sortable style={{ minWidth: "130px" }} />
              <Column field="description" header="Description" style={{ minWidth: "220px" }} />
              <Column header="Current" body={statusTemplate} style={{ minWidth: "120px" }} />
              <Column header="Mark As" body={actionTemplate} style={{ minWidth: "240px" }} />
            </DataTable>
          )}
        </Card>
      </div>
    </div>
  );
};

export default PurchaseReflection;
