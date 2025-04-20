import React from 'react';
import Sidebar from "../../components/sidebar/sidebar";
import NavbarDashboard from "../../components/navbar-dashboard/navbar";
import './dashboard.css'; // استدعاء ملف CSS

const Dashboard = () => {
  const role = localStorage.getItem('userRole');

  return (
    <div className="dashboard-container">
      <NavbarDashboard />
      <div className="dashboard-content">
        <Sidebar role={role} />
        <div className="dashboard-main">
          <h1 className="dashboard-title">مرحبا بك في لوحة التحكم</h1>
          <p>هذا هو المحتوى الرئيسي.</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;