import React from "react";
import "../index.css";
import Users from "./Users";
import { useState, useEffect } from "react";
import axios from "axios";
function Home() {
  const [data, setData] = useState([]);
  const [dataUsers, setDataUser] = useState([]);
  const token = localStorage.getItem("token");
  axios.defaults.headers.common['Authorization'] = `STORE ${token}`;
  const fetchData = () => {
    axios.get('https://soukphasone.onrender.com/orders')
      .then(response => {
        // Assuming the response data is an array
        setData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  useEffect(() => {
    fetchData(); 
    const intervalId = setInterval(fetchData, 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);
  //Totla cars
  const countCar = () => {
    return data.filter((item) => item.carType === "ລົດໃຫຍ່").length;
  };
  const countBike = () => {
    return data.filter((item) => item.carType === "ລົດຈັກ").length;
  };
  const countCycle = () => {
    return data.filter((item) => item.carType === "ລົດຖີບ").length;
  };
  //Total money
  const Cashtotal = () => {
    return data
      .filter((item) => item.money === "cash")
      .reduce((total, item) => (total += item.amount), 0);
  };
  const Tranfertotal = () => {
    return data
      .filter((item) => item.money === "transfer")
      .reduce((total, item) => (total += item.amount), 0);
  };

  const fetchDataUsers = () => {
    axios.get('https://soukphasone.onrender.com/users')
      .then(response => {
  
        setDataUser(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  useEffect(() => {
    fetchDataUsers(); 
    const intervalId = setInterval(fetchDataUsers, 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div>
      <div className="container-fluid">
        <div className="row px-2 py-2">
          <div className="col-sm py-2">
            <div
              className="d-flex justify-content-between py-4 px-2 align-items-center bg-danger border border-secondary shadow-sm text-white"
              style={{ height: 200 }}
            >
              <div>
                <h5>ຈຳນວນບັນຊີຜູ້ໃຊ້ທັງໝົດ: {dataUsers.length}</h5>
              </div>
              <i className="bi bi-people fs-1"> </i>
            </div>
          </div>
          <div className="col-sm py-2">
            <div
              className="d-flex justify-content-between py-4 px-2 align-items-center bg-primary border border-secondary shadow-sm text-white"
              style={{ height: 200 }}
            >
              <div>
                <h5>
                  ຈຳນວນລົດທັງໝົດ: {countCar() + countBike() + countCycle()} ຄັນ
                </h5>
                <br />
                <h5>ລົດໃຫຍ່: {countCar()} ຄັນ</h5>
                <h5>ລົດຈັກ: {countBike()} ຄັນ</h5>
                <h5>ລົດຖີບ: {countCycle()} ຄັນ</h5>
              </div>
              <i className="bi bi-truck fs-1"> </i>
            </div>
          </div>
          <div className="col-sm py-2">
            <div
              className="d-flex justify-content-between py-4 px-2 align-items-center bg-success border border-secondary shadow-sm text-white"
              style={{ height: 200 }}
            >
              <div>
                <h5>ຈຳນວນເງີນທັງໝົດ: {Cashtotal() + Tranfertotal()} ກີບ</h5>
                <br />
                <h5>ເງິນສົດ: {Cashtotal()} ກີບ</h5>
                <h5>ເງິນໂອນ: {Tranfertotal()} ກີບ</h5>
              </div>
              <i className="bi bi-currency-dollar fs-1"> </i>
            </div>
          </div>
        </div>
        <Users />
      </div>
    </div>
  );
}

export default Home;
