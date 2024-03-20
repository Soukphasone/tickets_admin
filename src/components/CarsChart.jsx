//--------------------------------------------------------------------------------------
import { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";

const CarsChart = () => {
  const [data, setData] = useState([]);
  const token = localStorage.getItem("token1");
  useEffect(() => {
    // Fetch data from the REST API endpoint
    fetch("https://soukphasone.onrender.com/orders", {
      headers: {
        Authorization: `STORE ${token}`,
      },
    })
      .then((response) => response.json())
      .then((rawData) => {
        // Process fetched data
        const groupedData = rawData.reduce((acc, item) => {
          const month = new Date(item.createdAt).getMonth() + 1; // Get month (1-12)
          const carType = item.carType;
          const key = `${month}_${carType}`;
          acc[key] = (acc[key] || 0) + 1;
          return acc;
        }, {});

        // Extract data for each car type
        const carType1Data = [];
        const carType2Data = [];
        const carType3Data = [];

        Object.entries(groupedData).forEach(([key, value]) => {
          const [month, carType] = key.split("_");
          if (carType === "ລົດຖີບ") {
            carType1Data[parseInt(month) - 1] = value;
          } else if (carType === "ລົດໃຫຍ່") {
            carType2Data[parseInt(month) - 1] = value;
          } else if (carType === "ລົດຈັກ") {
            carType3Data[parseInt(month) - 1] = value;
          }
        });

        // Calculate sum of all types
        const totalData = carType1Data.map((value, index) => {
          return value + carType2Data[index] + carType3Data[index];
        });

        // Set data for Chart.js
        setData({
          labels: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ],
          datasets: [
            {
              label: "ລົດຖີບ",
              backgroundColor: "rgba(255, 99, 132, 0.2)",
              borderColor: "rgba(255, 99, 132, 1)",
              borderWidth: 1,
              data: carType1Data,
            },
            {
              label: "ລົດໃຫຍ່",
              backgroundColor: "rgba(54, 162, 235, 0.2)",
              borderColor: "rgba(54, 162, 235, 1)",
              borderWidth: 1,
              data: carType2Data,
            },
            {
              label: "ລົດຈັກ",
              backgroundColor: "rgba(255, 206, 86, 0.2)",
              borderColor: "rgba(255, 206, 86, 1)",
              borderWidth: 1,
              data: carType3Data,
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
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [token]);

  const chartRef = useRef(null);

  useEffect(() => {
    if (data.labels && data.datasets) {
      const ctx = document.getElementById("chart-data");
      if (chartRef.current) {
        chartRef.current.destroy();
      }
      chartRef.current = new Chart(ctx, {
        type: "bar",
        data: data,
        options: {
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                },
              },
            ],
          },
        },
      });
    }
  }, [data]);
  return (
    <div
      style={{
        backgroundColor: "whitesmoke",
        width: "400px",
        height: "450px",
      }}
    >
      <h4 className="p-2">Chart ສະແດງພາບລວມຂອງລົດ</h4>
      <canvas id="chart-data" width={400} height={400}></canvas>
    </div>
  );
};

export default CarsChart;
