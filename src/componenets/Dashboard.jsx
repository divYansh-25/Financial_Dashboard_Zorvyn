import React, { useMemo } from "react";
import { transactions, categoryColors } from "../data/mockdata";

import {
  BarChart, Bar, LineChart, Line,
  XAxis, YAxis, Tooltip,
  ResponsiveContainer, PieChart,
  Pie, Cell, CartesianGrid
} from "recharts";

const fmt = n => "₹" + Number(n).toLocaleString("en-IN");

function Dashboard() {

  const stats = useMemo(() => {
    const income = transactions
      .filter(t => t.type === "income")
      .reduce((s, t) => s + t.amount, 0);

    const expense = transactions
      .filter(t => t.type === "expense")
      .reduce((s, t) => s + t.amount, 0);

    const balance = income - expense;

    const savings = income > 0
      ? Math.round((balance / income) * 100)
      : 0;

    return { income, expense, balance, savings };

  }, []);

  // monthly data
  const monthlyData = useMemo(() => {
    const map = {};

    transactions.forEach(t => {
      const key = t.date.slice(0, 7);

      if (!map[key])
        map[key] = { month: key, income: 0, expense: 0 };

      if (t.type === "income")
        map[key].income += t.amount;
      else
        map[key].expense += t.amount;
    });

    return Object.values(map)
      .slice(-6)
      .map(d => ({
        ...d,
        balance: d.income - d.expense
      }));

  }, []);

  // category chart
  const categoryData = useMemo(() => {
    const map = {};

    transactions
      .filter(t => t.type === "expense")
      .forEach(t => {
        map[t.category] =
          (map[t.category] || 0) + t.amount;
      });

    return Object.entries(map)
      .map(([name, value]) => ({ name, value }));

  }, []);

  const recent = transactions.slice(0, 5);

  return (
    <div className="dashboard">

      {/* header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Dashboard</h1>
          <p className="page-subtitle">
            Financial overview
          </p>
        </div>
      </div>

      {/* cards */}
      <div className="grid-4">
        <StatCard label="Balance" value={fmt(stats.balance)} />
        <StatCard label="Income" value={fmt(stats.income)} />
        <StatCard label="Expense" value={fmt(stats.expense)} />
        <StatCard label="Savings" value={`${stats.savings}%`} />
      </div>

      {/* charts */}
      <div className="grid-chart">

        {/* income expense */}
        <div className="chart-card">
          <h3>Income vs Expense</h3>

          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={monthlyData}>
              <CartesianGrid stroke="var(--border)" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="income" fill="#3db87a" />
              <Bar dataKey="expense" fill="#e05c5c" />
            </BarChart>
          </ResponsiveContainer>

        </div>

        {/* category */}
        <div className="chart-card">
          <h3>Category Spending</h3>

          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={categoryData}
                dataKey="value"
                outerRadius={80}
              >
                {categoryData.map((entry) => (
                  <Cell
                    key={entry.name}
                    fill={categoryColors[entry.name]}
                  />
                ))}
              </Pie>
              <Tooltip/>
            </PieChart>
          </ResponsiveContainer>

        </div>

      </div>

      {/* line chart */}
      <div className="chart-card">
        <h3>Balance Trend</h3>

        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={monthlyData}>
            <CartesianGrid stroke="var(--border)" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line
              dataKey="balance"
              stroke="var(--accent)"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* table */}
      <div className="card">
        <h3>Recent Transactions</h3>

        <table className="table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Category</th>
              <th>Amount</th>
            </tr>
          </thead>

          <tbody>
            {recent.map(t => (
              <tr key={t.id}>
                <td>{t.date}</td>
                <td>{t.description}</td>
                <td>{t.category}</td>
                <td>
                  {t.type === "income" ? "+" : "-"}
                  ₹{t.amount}
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>

    </div>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="stat-card">
      <div className="stat-label">{label}</div>
      <div className="stat-value">{value}</div>
    </div>
  );
}

export default Dashboard;