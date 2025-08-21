import React, { useState } from "react";
import "./App.css";  // <-- make sure this is imported

import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col, Card, Table, Button, Form } from "react-bootstrap";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

function App() {
  const [transactions, setTransactions] = useState([]);
  const [text, setText] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("Expense");

  // Add Transaction
  const addTransaction = (e) => {
    e.preventDefault();
    if (!text || !amount) return;

    setTransactions([
      ...transactions,
      { id: Date.now(), text, amount: parseFloat(amount), type }
    ]);

    setText("");
    setAmount("");
  };

  // Summary calculations
  const income = transactions
    .filter((t) => t.type === "Income")
    .reduce((acc, t) => acc + t.amount, 0);

  const expense = transactions
    .filter((t) => t.type === "Expense")
    .reduce((acc, t) => acc + t.amount, 0);

  const balance = income - expense;

  // Pie chart data
  const chartData = {
    labels: ["Income", "Expense"],
    datasets: [
      {
        data: [income, expense],
        backgroundColor: ["#198754", "#dc3545"]
      }
    ]
  };

  return (
    // FULL-PAGE CENTER WRAPPER (no Container)
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f8f9fa",
        display: "grid",
        placeItems: "center",
        padding: "16px"
      }}
    >
      {/* INNER CARD BOX (max width so it looks centered & neat) */}
      <div
        className="shadow rounded p-3 p-md-4 bg-white"
        style={{ width: "min(900px, 100%)" }}
      >
        {/* Header */}
        <h2 className="text-center mb-4">💰 Expense Tracker</h2>

        {/* Summary Cards */}
        <Row className="g-3 mb-4 text-center">
          <Col md={4} xs={12}>
            <Card className="shadow-sm">
              <Card.Body>
                <h5 className="text-success">Income</h5>
                <h3>₹{income}</h3>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} xs={12}>
            <Card className="shadow-sm">
              <Card.Body>
                <h5 className="text-danger">Expense</h5>
                <h3>₹{expense}</h3>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} xs={12}>
            <Card className="shadow-sm">
              <Card.Body>
                <h5 className="text-primary">Balance</h5>
                <h3>₹{balance}</h3>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Chart */}
        <Row className="mb-4">
          <Col xs={12} md={8} className="mx-auto">
            <Card className="shadow-sm">
              <Card.Body>
                <h5 className="text-center mb-3">Overview</h5>
                <div style={{ maxWidth: 500, margin: "0 auto" }}>
                  <Pie data={chartData} />
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Add Transaction Form */}
        <Row className="mb-4">
          <Col xs={12}>
            <Card className="shadow-sm">
              <Card.Body>
                <h5 className="mb-3">Add Transaction</h5>
                <Form onSubmit={addTransaction}>
                  <Row className="g-2">
                    <Col xs={12} md={4}>
                      <Form.Control
                        type="text"
                        placeholder="Enter text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                      />
                    </Col>
                    <Col xs={12} md={3}>
                      <Form.Control
                        type="number"
                        placeholder="Amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                      />
                    </Col>
                    <Col xs={12} md={3}>
                      <Form.Select
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                      >
                        <option value="Income">Income</option>
                        <option value="Expense">Expense</option>
                      </Form.Select>
                    </Col>
                    <Col xs={12} md={2}>
                      <Button type="submit" className="w-100">
                        Add
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Transactions Table */}
        <Row>
          <Col xs={12}>
            <Card className="shadow-sm">
              <Card.Body>
                <h5 className="mb-3">Transactions</h5>
                <div className="table-responsive">
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>Reason</th>
                        <th>Amount</th>
                        <th>Type</th>
                      </tr>
                    </thead>
                    <tbody>
                      {transactions.map((t) => (
                        <tr key={t.id}>
                          <td>{t.text}</td>
                          <td>₹{t.amount}</td>
                          <td className={t.type === "Income" ? "text-success" : "text-danger"}>
                            {t.type}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default App;
