import React from "react";
import { Bar, Pie } from "react-chartjs-2";
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
  if (!transactions) {
    return <div>Loading...</div>; // Handle loading state if transactions are null/undefined
  }
  // Filter transactions based on type
  const incomeTransactions = transactions.filter((t) => t.type === "Income");
  const expenseTransactions = transactions.filter((t) => t.type === "Expense");

  // Calculate total and average amounts
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

  // Aggregate data by category for pie charts
  const categories = {
    Investment: { total: 0, count: 0 },
    Lifestyle: { total: 0, count: 0 },
    Savings: { total: 0, count: 0 },
    Miscellaneous: { total: 0, count: 0 },
    Gift: { total: 0, count: 0 },
  };

  transactions.forEach((transaction) => {
    if (categories.hasOwnProperty(transaction.category)) {
      categories[transaction.category].total += parseFloat(transaction.amount);
      categories[transaction.category].count += 1;
    }
  });

  // Data for the bar charts
  const averageData = {
    labels: ["Average"],
    datasets: [
      {
        label: "Average Income",
        data: [averageIncome],
        backgroundColor: "rgba(75, 192, 192 )",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
      {
        label: "Average Expense",
        data: [averageExpense],
        backgroundColor: "rgba(255, 99, 132 )",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
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
      },
      {
        label: "Total Expense",
        data: [totalExpense],
        backgroundColor: "rgba(255, 99, 132 )",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };

  const categoryData = {
    Investment: {
      average: categories.Investment.count
        ? categories.Investment.total / categories.Investment.count
        : 0,
      total: categories.Investment.total,
    },
    Lifestyle: {
      average: categories.Lifestyle.count
        ? categories.Lifestyle.total / categories.Lifestyle.count
        : 0,
      total: categories.Lifestyle.total,
    },
    Savings: {
      average: categories.Savings.count
        ? categories.Savings.total / categories.Savings.count
        : 0,
      total: categories.Savings.total,
    },
    Gift: {
      average: categories.Gift.count
        ? categories.Gift.total / categories.Gift.count
        : 0,
      total: categories.Gift.total,
    },
    Miscellaneous: {
      average: categories.Miscellaneous.count
        ? categories.Miscellaneous.total / categories.Miscellaneous.count
        : 0,
      total: categories.Miscellaneous.total,
    },
  };

  const pieData = {
    labels: ["Investment", "Lifestyle", "Savings", "Gift", "Miscellaneous"],
    datasets: [
      {
        label: "Total Amount Spent by Category",
        data: [
          categoryData.Investment.total,
          categoryData.Lifestyle.total,
          categoryData.Savings.total,
          categoryData.Gift.total,
          categoryData.Miscellaneous.total,
        ],
        backgroundColor: [
          "rgba(75, 192, 192)",
          "rgba(255, 99, 132)",
          "rgba(54, 162, 235)",
          "rgba(44, 122, 135)",
          "rgba(255, 205, 86)",
        ],
        borderColor: [
          "rgba(75, 192, 192, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 205, 86, 1)",
        ],
        borderWidth: 0,
        border: false,
      },
    ],
  };

  const pieOptions = {
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
          display: false,
        },
      },
      y: {
        ticks: {
          display: false,
        },
      },
    },
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

  return (
    <div className="flex items-center justify-start md:justify-between w-full gap-8">
      <div className="w-full flex items-center justify-center flex-col">
        <h2 className="text-center text-xl font-semibold">
          Average Money Spent and Received
        </h2>
        <div className="h-[200px] w-[400px]">
          <Bar data={averageData} options={options} />
        </div>
      </div>
      <div className="w-full flex items-center justify-center flex-col">
        <h2 className="text-center text-xl font-semibold">
          Total Money Spent and Received
        </h2>
        <div className="h-[200px] w-[400px]">
          <Bar data={totalData} options={options} className="h-full" />
        </div>
      </div>
      <div className="w-full flex items-center justify-center flex-col">
        <h2 className="text-center text-xl font-semibold">
          Total Money on each Category
        </h2>
        <div className="h-[300px] w-[300px]">
          <Pie data={pieData} options={pieOptions} />
        </div>
      </div>
    </div>
  );
};

export default Charts;
