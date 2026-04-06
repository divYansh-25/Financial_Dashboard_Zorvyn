import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./styles/global.css";

import Header from "./componenets/Header";
import Sidebar from "./componenets/Sidebar";
import Dashboard from "./componenets/Dashboard";
import Transaction from "./componenets/Transaction";
import Insights from "./componenets/Insights";
import Setting from "./componenets/Setting";

function App() {

  const [open, setOpen] = useState(false);     // mobile drawer
  const [collapsed, setCollapsed] = useState(false); // desktop collapse
  const [role, setRole] = useState("admin");

  return (
    <BrowserRouter>
      <div className="app">

        <Header toggleSidebar={() => setOpen(!open)} />

        <div className="layout">
          <Sidebar
            open={open}
            setOpen={setOpen}
            collapsed={collapsed}
            setCollapsed={setCollapsed}
            role={role}
          />

          <main className="content">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/transactions" element={<Transaction />} />
              <Route path="/insights" element={<Insights />} />
              <Route
                path="/settings"
                element={<Setting role={role} setRole={setRole} />}
              />
            </Routes>
          </main>

        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;