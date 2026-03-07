import React, { useEffect, useState } from "react";
import { Card } from "primereact/card";
import {
  getTotalSpentByUser,
  getTotalExpensesByUser,
  getTotalRegretByUser,
  getTotalWorthByUser,
  getMoneyWastedByUser,
  getRegretPercentageByUser,
} from "../../services/api";

const SummaryCards = () => {
  const [stats, setStats] = useState({
    totalSpent: 0,
    totalExpenses: 0,
    totalRegret: 0,
    totalWorth: 0,
    moneyWasted: 0,
    regretPercentage: 0,
  });

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchStats = async () => {
      if (!userId) return;

      try {
        let spent = 0;
        let expenses = 0;
        let regret = 0;
        let worth = 0;
        let wasted = 0;
        let percentage = 0;

        try {
          const value = await getTotalSpentByUser(userId);
          spent = value || 0;
        } catch {
          spent = 0;
        }

        try {
          const value = await getTotalExpensesByUser(userId);
          expenses = value || 0;
        } catch {
          expenses = 0;
        }

        try {
          const value = await getTotalRegretByUser(userId);
          regret = value || 0;
        } catch {
          regret = 0;
        }

        try {
          const value = await getTotalWorthByUser(userId);
          worth = value || 0;
        } catch {
          worth = 0;
        }

        try {
          const value = await getMoneyWastedByUser(userId);
          wasted = value || 0;
        } catch {
          wasted = 0;
        }

        try {
          const value = await getRegretPercentageByUser(userId);
          percentage = value || 0;
        } catch {
          percentage = 0;
        }

        setStats((prev) => ({
          ...prev,
          totalSpent: spent,
          totalExpenses: expenses,
          totalRegret: regret,
          totalWorth: worth,
          moneyWasted: wasted,
          regretPercentage: percentage,
        }));
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    fetchStats();
  }, [userId]);

  const cardStyle = {
    padding: "1.5rem",
  };

  const valueStyleCurrency = {
    fontSize: "2rem",
    fontWeight: "700",
    minWidth: "120px",
  };

  const valueStyleNumber = {
    fontSize: "2rem",
    fontWeight: "700",
    minWidth: "90px",
  };

  const valueStylePercentage = {
    fontSize: "2rem",
    fontWeight: "700",
    minWidth: "80px",
  };

  return (
    <div className="grid" style={{ marginBottom: "2rem" }}>
      <div className="col-12 md:col-6 lg:col-4">
        <Card className="stat-card" style={cardStyle}>
          <div className="stat-card-row">
            <div>
              <div style={{ color: "#a0a0a0", fontSize: "0.9rem", marginBottom: "0.5rem" }}>
                Total Spent
              </div>
              <div style={valueStyleCurrency}>
                {"\u20B9"}{stats.totalSpent?.toFixed(2)}
              </div>
            </div>
            <i className="pi pi-wallet" style={{ fontSize: "2.5rem", color: "#2196f3", opacity: 0.8 }}></i>
          </div>
        </Card>
      </div>

      <div className="col-12 md:col-6 lg:col-4">
        <Card className="stat-card" style={cardStyle}>
          <div className="stat-card-row">
            <div>
              <div style={{ color: "#a0a0a0", fontSize: "0.9rem", marginBottom: "0.5rem" }}>
                Total Expenses
              </div>
              <div
                style={{
                  fontSize: "2rem",
                  fontWeight: "700",
                  minHeight: "42px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {stats.totalExpenses}
              </div>
            </div>
            <i className="pi pi-shopping-cart" style={{ fontSize: "2.5rem", color: "#1976d2", opacity: 0.8 }}></i>
          </div>
        </Card>
      </div>

      <div className="col-12 md:col-6 lg:col-4">
        <Card className="stat-card" style={cardStyle}>
          <div className="stat-card-row">
            <div>
              <div style={{ color: "#a0a0a0", fontSize: "0.9rem", marginBottom: "0.5rem" }}>
                Regret Count
              </div>
              <div style={valueStyleNumber}>
                {stats.totalRegret}
              </div>
            </div>
            <i className="pi pi-times-circle" style={{ fontSize: "2.5rem", color: "#ef5350", opacity: 0.8 }}></i>
          </div>
        </Card>
      </div>

      <div className="col-12 md:col-6 lg:col-4">
        <Card className="stat-card" style={cardStyle}>
          <div className="stat-card-row">
            <div>
              <div style={{ color: "#a0a0a0", fontSize: "0.9rem", marginBottom: "0.5rem" }}>
                Worth It Count
              </div>
              <div style={valueStyleNumber}>
                {stats.totalWorth}
              </div>
            </div>
            <i className="pi pi-check-circle" style={{ fontSize: "2.5rem", color: "#26c6da", opacity: 0.8 }}></i>
          </div>
        </Card>
      </div>

      <div className="col-12 md:col-6 lg:col-4">
        <Card className="stat-card" style={cardStyle}>
          <div className="stat-card-row">
            <div>
              <div style={{ color: "#a0a0a0", fontSize: "0.9rem", marginBottom: "0.5rem" }}>
                Money Wasted
              </div>
              <div style={valueStyleCurrency}>
                {"\u20B9"}{stats.moneyWasted?.toFixed(2)}
              </div>
            </div>
            <i className="pi pi-exclamation-triangle" style={{ fontSize: "2.5rem", color: "#ff6f00", opacity: 0.8 }}></i>
          </div>
        </Card>
      </div>

      <div className="col-12 md:col-6 lg:col-4">
        <Card className="stat-card" style={cardStyle}>
          <div className="stat-card-row">
            <div>
              <div style={{ color: "#a0a0a0", fontSize: "0.9rem", marginBottom: "0.5rem" }}>
                Regret Percentage
              </div>
              <div style={valueStylePercentage}>
                {stats.regretPercentage?.toFixed(1)}%
              </div>
            </div>
            <i className="pi pi-chart-pie" style={{ fontSize: "2.5rem", color: "#42a5f5", opacity: 0.8 }}></i>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SummaryCards;
