import React, { useMemo } from "react";
import { transactions, categoryColors } from "../data/mockdata";

import {
  BarChart, Bar, XAxis, YAxis,
  Tooltip, ResponsiveContainer,
  CartesianGrid
} from "recharts";

const fmt = n => "₹" + Number(n).toLocaleString("en-IN");

function Insights() {

  const monthly = useMemo(() => {
    const map = {};

    transactions.forEach(t => {
      const key = t.date.slice(0,7);

      if(!map[key])
        map[key] = { month:key, income:0, expense:0 };

      if(t.type==="income")
        map[key].income += t.amount;
      else
        map[key].expense += t.amount;
    });

    return Object.values(map).map(d=>({
      ...d,
      savings: d.income - d.expense
    }));

  },[]);

  const category = useMemo(()=>{

    const map={};

    transactions
      .filter(t=>t.type==="expense")
      .forEach(t=>{
        map[t.category] =
          (map[t.category]||0)+t.amount;
      });

    return Object.entries(map)
      .map(([name,value])=>({name,value}));

  },[]);

  const total = category.reduce((s,c)=>s+c.value,0);

  return (
    <div className="insights">

      <div className="page-header">
        <h1 className="page-title">Insights</h1>
        <p className="page-subtitle">
          Smart financial analysis
        </p>
      </div>

      {/* savings chart */}
      <div className="chart-card">
        <h3>Monthly Savings</h3>

        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={monthly}>
            <CartesianGrid stroke="var(--border)" />
            <XAxis dataKey="month"/>
            <YAxis/>
            <Tooltip/>
            <Bar dataKey="savings" fill="var(--accent)"/>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* category */}
      <div className="card">
        <h3>Category Spending</h3>

        <div className="cat-list">
          {category.map(c=>{
            const pct =
              Math.round((c.value/total)*100);

            return(
              <div key={c.name} className="cat-item">

                <div className="cat-row">
                  <div className="cat-left">
                    <div
                      className="cat-dot"
                      style={{
                        background:
                        categoryColors[c.name]
                      }}
                    />
                    {c.name}
                  </div>

                  <span>{pct}%</span>
                </div>

                <div className="progress">
                  <div
                    className="progress-fill"
                    style={{
                      width:`${pct}%`,
                      background:
                      categoryColors[c.name]
                    }}
                  />
                </div>

              </div>
            )
          })}
        </div>

      </div>

    </div>
  );
}

export default Insights;