import React from "react";
import Navbar from "../layout/Navbar";
import SummaryCards from "./SummaryCards";
import CategoryRegret from "./CategoryRegret";

const Dashboard = () => {
  return (
    <div className="page-shell dashboard-surface">
      <Navbar />
      <div className="page-content">
        <div className="page-header">
          <h1 className="gradient-text page-title">
            Dashboard
          </h1>

          <p className="page-subtitle">
            Track your expenses and manage your finances
          </p>
        </div>

        <SummaryCards />
        <CategoryRegret />
      </div>
    </div>
  );
};

export default Dashboard;
