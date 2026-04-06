import React, { useState } from "react";


function Setting({ role, setRole }) {

  const [dark, setDark] = useState(false);
//   const [role, setRole] = useState("admin");

  const toggleTheme = () => {
    setDark(!dark);
    document.body.classList.toggle("dark");
  };

  return (
    <div className="settings">

      <div className="page-header">
        <div>
          <h1 className="page-title">Settings</h1>
          <p className="page-subtitle">
            Manage preferences
          </p>
        </div>
      </div>

      {/* appearance */}
      <div className="card">
        <h3>Appearance</h3>

        <div className="setting-row">
          <div>
            <p>{dark ? "Dark Mode" : "Light Mode"}</p>
            <span className="text-muted">
              Toggle theme
            </span>
          </div>

          <div
            className={`toggle ${dark ? "on" : ""}`}
            onClick={toggleTheme}
          >
            <div className="toggle-knob"/>
          </div>

        </div>
      </div>

      {/* role */}
      <div className="card2">
        <h3>Role</h3>

        <div className="role-grid">

          <button
            className={`role-card ${role==="admin"?"active":""}`}
            onClick={()=>setRole("admin")}
          >
            Admin
          </button>

          <button
            className={`role-card ${role==="viewer"?"active":""}`}
            onClick={()=>setRole("viewer")}
          >
            Viewer
          </button>

        </div>

        <p className="text-muted">
          Current role: {role}
        </p>

      </div>

      {/* about */}
      <div className="card">
        <h3>About</h3>

        <p className="text-muted">
          FinTrack — Finance Dashboard
        </p>
        <hr />
        <p>Developer: Divyansh Yadav
        </p>
        <p>
            Tech Stack: React.js, Recharts, Material UI, CSS
        </p>
        <hr />
        <p>
            FinTrack is a modern finance dashboard for tracking income, expenses, and savings with interactive analytics.
        </p>

      </div>

    </div>
  );
}

export default Setting;