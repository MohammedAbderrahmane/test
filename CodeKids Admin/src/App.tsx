import React, { useState, useEffect } from "react";
import AuthPage from "./AdminSide/AuthPage/AuthPage";
import AdminMainPage from "./AdminSide/AdminMainPage/adminMainPage";
import Admin from "./Backend/Admin.js";

export default function App() {
  const [currentPage, setCurrentPage] = useState(<AdminMainPage />);
  useEffect(() => {
    if (Admin.isAdminConnected()) {
      setCurrentPage(<AdminMainPage setCurrentPage={setCurrentPage} />);
    } else {
      setCurrentPage(<AuthPage setCurrentPage={setCurrentPage} />);
    }
    console.log(Admin.isAdminConnected());
  }, []);
  return <>{currentPage}</>;
}
