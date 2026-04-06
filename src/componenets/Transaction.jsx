import React, { useState, useMemo } from "react";
import { transactions } from "../data/mockdata";

function Transaction() {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return transactions.filter(t =>
      t.description.toLowerCase().includes(search.toLowerCase()) ||
      t.category.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  return (
    <div className="transactions">

      {/* header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Transactions</h1>
          <p className="page-subtitle">
            {filtered.length} transactions
          </p>
        </div>

        <input
          className="search"
          placeholder="Search..."
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
        />
      </div>

      {/* table */}
      <div className="card table-wrap">
        <table className="table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Category</th>
              <th>Type</th>
              <th>Amount</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map(t => (
              <tr key={t.id}>
                <td>{t.date}</td>
                <td>{t.description}</td>
                <td>{t.category}</td>

                <td>
                  <span className={`badge ${t.type}`}>
                    {t.type}
                  </span>
                </td>

                <td
                  className={
                    t.type === "income"
                      ? "amount income"
                      : "amount expense"
                  }
                >
                  {t.type === "income" ? "+" : "-"}₹{t.amount}
                </td>

              </tr>
            ))}
          </tbody>

        </table>
      </div>

    </div>
  );
}

export default Transaction;