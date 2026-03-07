import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Menubar } from "primereact/menubar";
import { Button } from "primereact/button";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const items = [
    {
      label: "Dashboard",
      icon: "pi pi-home",
      command: () => navigate("/"),
      className: location.pathname === "/" ? "active-menu-item" : "",
    },
    {
      label: "Add Expense",
      icon: "pi pi-plus-circle",
      command: () => navigate("/add-expense"),
      className:
        location.pathname === "/add-expense"
          ? "active-menu-item"
          : "",
    },
    {
      label: "Expense List",
      icon: "pi pi-list",
      command: () => navigate("/expense-list"),
      className:
        location.pathname === "/expense-list"
          ? "active-menu-item"
          : "",
    },
    {
      label: "Reflection",
      icon: "pi pi-comments",
      command: () => navigate("/purchase-reflection"),
      className:
        location.pathname === "/purchase-reflection"
          ? "active-menu-item"
          : "",
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/login");
  };

  const start = (
    <div className="navbar-brand">
      <i className="pi pi-wallet navbar-brand-icon"></i>
      <span className="gradient-text navbar-brand-text">
        Expense Tracker
      </span>
    </div>
  );

  const end = (
    <Button
      label="Logout"
      icon="pi pi-sign-out"
      className="p-button-danger navbar-logout-btn"
      onClick={handleLogout}
    />
  );

  return (
    <div className="navbar-shell">
      <Menubar
        model={items}
        start={start}
        end={end}
        className="app-menubar"
      />
    </div>
  );

};

export default Navbar;
