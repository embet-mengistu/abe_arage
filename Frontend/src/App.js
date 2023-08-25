import React from "react";
import { Routes, Route } from "react-router";

import Login from "./markup/pages/Login";
// our css//
import "./assets/styles/custom.css";
import "./assets/template_assets/css/bootstrap.css";
import "./assets/template_assets/css/style.css";
import "./assets/template_assets/css/responsive.css";
import "./assets/template_assets/css/color.css";
import Header from "./markup/Components/Header/Header";
import Footer from "./markup/Components/Footer/Footer";
import Home from "./markup/pages/HomePage/Home";
import AddEmployee from "./markup/pages/admin/AddEmployee";
import AddCustomer from "./markup/pages/admin/AddCustomer";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin/add-employee" element={<AddEmployee />} />
        <Route path="/admin/add-customer" element={<AddCustomer />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
