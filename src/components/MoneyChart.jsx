import { useEffect, useState, useRef } from "react";
import Chart from "chart.js/auto";

const MoneyChart = () => {
  const [chartData, setChartData] = useState(null);
  const token = localStorage.getItem("token1");
  const chartRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://soukphasone.onrender.com/orders",
          {
            headers: {
              Authorization: `STORE ${token}`,
            },
          }
        );
        const rawData = await response.json();

        const groupedData = rawData.reduce((acc, item) => {
          const month = new Date(item.createdAt).getMonth();
          const money = item.money;
          if (!acc[month]) {
            acc[month] = { cash: 0, transfer: 0 };
          }
          if (money === "cash") {
            acc[month].cash += item.amount;
          } else if (money === "transfer") {
            acc[month].transfer += item.amount;
          }
          return acc;
        }, {});

        const labels = Array.from({ length: 12 }, (_, i) =>
          new Date(0, i).toLocaleString("en", { month: "long" })
        );

        const cashData = Array.from(
          { length: 12 },
          (_, i) => groupedData[i]?.cash || 0
        );

        const transferData = Array.from(
          { length: 12 },
          (_, i) => groupedData[i]?.transfer || 0
        );

        const totalData = cashData.map(
          (cash, index) => cash + transferData[index]
        );

        setChartData({
          labels: labels,
          datasets: [
            {
              label: "Cash",
              backgroundColor: "rgba(255, 99, 132, 0.2)",
              borderColor: "rgba(255, 99, 132, 1)",
              borderWidth: 1,
              data: cashData,
            },
            {
              label: "Transfer",
              backgroundColor: "rgba(54, 162, 235, 0.2)",
              borderColor: "rgba(54, 162, 235, 1)",
              borderWidth: 1,
              data: transferData,
            },
            {
              label: "Total",
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
              data: totalData,
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (token) {
      fetchData();
    }
  }, [token]);

  useEffect(() => {
    if (chartData) {
      // Destroy previous chart instance if it exists
      if (chartRef.current) {
        chartRef.current.destroy();
      }

      const ctx = document.getElementById("money-chart");
      chartRef.current = new Chart(ctx, {
        type: "bar",
        data: chartData,
        options: {
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                stepSize: 1,
              },
            },
          },
        },
      });
    }
  }, [chartData]);

  return (
    <div
      style={{
        backgroundColor: "whitesmoke",
        width: "400px",
        height: "450px",
      }}
    >
      <h4 className="p-2">Chart ສະແດງພາບລວມຂອງຍອດເງິນ </h4>
      <canvas id="money-chart" width={400} height={400}></canvas>
    </div>
  );
};

export default MoneyChart;
// import React from "react";

// export default function MoneyChart() {
//   return <div>MoneyChart</div>;
// }
