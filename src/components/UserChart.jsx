import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";

const UserChart = () => {
  // State to store user data
  const [userData, setUserData] = useState([]);
  console.log("userData", userData);

  // Effect to fetch user data from the REST API using Axios
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token1");
        const response = await axios.get(
          "https://soukphasone.onrender.com/users",
          {
            headers: {
              Authorization: `STORE ${token}`,
            },
          }
        );
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, [userData]); // Dependency added: Whenever userData changes, this effect will run

  // State to store counts by date
  const [countsByDate, setCountsByDate] = useState({});

  // Effect to calculate counts by date when user data changes
  useEffect(() => {
    const counts = {};
    userData.forEach((user) => {
      const createdAt = new Date(user.createdAt).toISOString().split("T")[0];
      counts[createdAt] = (counts[createdAt] || 0) + 1;
    });
    setCountsByDate(counts);
  }, [userData]);

  // Extract dates and counts from state
  const dates = Object.keys(countsByDate);
  const counts = Object.values(countsByDate);

  // Chart data for Line chart
  const chartData = {
    labels: dates,
    datasets: [
      {
        label: "User Creation Count",
        data: counts,
        fill: false,
        borderColor: "rgba(25,25,112)",
        borderWidth: 2,
        pointRadius: 2,
        pointBackgroundColor: "rgba(192,192,192)",
      },
    ],
  };

  // Chart options
  const chartOptions = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  return (
    <div
      style={{ backgroundColor: "whitesmoke", width: "400px", height: "450px" }}
    >
      <h4>User Creation Chart</h4>
      <Line
        data={chartData}
        options={chartOptions}
        width={400}
        height={400}
        title="User Creation Chart"
      />
    </div>
  );
};

export default UserChart;
