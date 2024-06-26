import React from "react";
import { Bar, Pie } from "react-chartjs-2";
import "./Charts.scss";
import {
  Chart,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

Chart.register(
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

const Charts = ({ transactions }) => {
  if (!Array.isArray(transactions)) {
    transactions = [];
  }

  const incomeTransactions = transactions.filter((t) => t.type === "Income");
  const expenseTransactions = transactions.filter((t) => t.type === "Expense");

  const totalIncome = incomeTransactions.reduce(
    (sum, t) => sum + parseFloat(t.amount),
    0
  );
  const totalExpense = expenseTransactions.reduce(
    (sum, t) => sum + parseFloat(t.amount),
    0
  );
  const averageIncome = totalIncome / incomeTransactions.length || 0;
  const averageExpense = totalExpense / expenseTransactions.length || 0;

  const averageData = {
    labels: ["Average"],
    datasets: [
      {
        label: "Average Income",
        data: [averageIncome],
        backgroundColor: "rgba(75, 192, 192 )",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
        barThickness: 100,
      },
      {
        label: "Average Expense",
        data: [averageExpense],
        backgroundColor: "rgba(255, 99, 132 )",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
        barThickness: 100,
      },
    ],
  };

  const totalData = {
    labels: ["Total"],
    datasets: [
      {
        label: "Total Income",
        data: [totalIncome],
        backgroundColor: "rgba(75, 192, 192 )",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
        barThickness: 100,
      },
      {
        label: "Total Expense",
        data: [totalExpense],
        backgroundColor: "rgba(255, 99, 132 )",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
        barThickness: 100,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        labels: {
          color: "white",
        },
      },
      tooltip: {
        titleColor: "white",
        bodyColor: "white",
        backgroundColor: "rgba(0, 0, 0, 0.7)",
      },
    },
    scales: {
      x: {
        ticks: {
          color: "white",
        },
      },
      y: {
        ticks: {
          color: "white",
        },
      },
    },
  };

  const calculateTotalsAndAverages = (transactions, type) => {
    const grouped = transactions.reduce((acc, t) => {
      if (!acc[t.category]) {
        acc[t.category] = [];
      }
      acc[t.category].push(parseFloat(t.amount));
      return acc;
    }, {});

    const totalsAndAverages = Object.keys(grouped).map((category) => {
      const total = grouped[category].reduce((sum, amount) => sum + amount, 0);
      const average = total / grouped[category].length || 0;
      return {
        category,
        total,
        average,
        type,
      };
    });

    return totalsAndAverages;
  };

  // Calculate totals and averages for income and expense transactions
  const incomeData = calculateTotalsAndAverages(incomeTransactions, "Income");
  const expenseData = calculateTotalsAndAverages(
    expenseTransactions,
    "Expense"
  );

  // Merge income and expense data
  const categories = [
    ...new Set([
      ...incomeData.map((d) => d.category),
      ...expenseData.map((d) => d.category),
    ]),
  ];

  const chartData = {
    labels: categories,
    datasets: [
      {
        label: "Total Income",
        data: categories.map(
          (cat) => incomeData.find((d) => d.category === cat)?.total || 0
        ),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
        barThickness: 10,
      },
      {
        label: "Total Expense",
        data: categories.map(
          (cat) => expenseData.find((d) => d.category === cat)?.total || 0
        ),
        backgroundColor: "rgba(255, 99, 132, 0.6)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
        barThickness: 10,
      },
      {
        label: "Average Income",
        data: categories.map(
          (cat) => incomeData.find((d) => d.category === cat)?.average || 0
        ),
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
        barThickness: 10,
      },
      {
        label: "Average Expense",
        data: categories.map(
          (cat) => expenseData.find((d) => d.category === cat)?.average || 0
        ),
        backgroundColor: "rgba(255, 206, 86, 0.6)",
        borderColor: "rgba(255, 206, 86, 1)",
        borderWidth: 1,
        barThickness: 10,
      },
    ],
  };

  return (
    <div className="flex items-center  flex-col lg:flex-row justify-center lg:justify-between w-full gap-8 overflow-auto py-3 charts">
      <div className="w-full flex items-center justify-center flex-col">
        <h3 className="text-center font-semibold">
          Total Money Spent and Received
        </h3>
        <div className="h-[200px] w-[400px] chart">
          <Bar data={totalData} options={options} className="h-full" />
        </div>
      </div>
      <div className="w-full flex items-center justify-center flex-col">
        <h3 className="text-center font-semibold">
          Average Money Spent and Received
        </h3>
        <div className="h-[200px] w-[400px] chart">
          <Bar data={averageData} options={options} />
        </div>
      </div>
      <div className="w-full flex items-center justify-center flex-col chart">
        <h3 className="text-center font-semibold">
          Money Spent on each Category
        </h3>
        <div className="h-[200px] w-[400px] chart">
          <Bar data={chartData} options={options} />
        </div>
      </div>
    </div>
  );
};

export default Charts;
