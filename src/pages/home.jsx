import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar";
import PatientList from "../components/PatientList";
import SqlQueryExecutor from "../components/sqlQueryExecutor";

function HomePage() {
  return (
    <div>
      <SqlQueryExecutor />,
      <PatientList />
    </div>
  );
}

export default HomePage;
