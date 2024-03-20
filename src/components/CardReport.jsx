import { useState, useEffect } from "react";
import axios from "axios";
import { Card, Col, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCar,
  faMoneyBillAlt,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

export default function CardReport() {
  const [orders, setOrders] = useState([]);
  console.log("Orders", orders);
  const [users, setUsers] = useState([]);

  const token = localStorage.getItem("token1");

  axios.defaults.headers.common["Authorization"] = `STORE ${token}`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ordersResponse = await axios.get(
          "https://soukphasone.onrender.com/orders"
        );
        setOrders(ordersResponse.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchData();
  }, []); // Fetch data only once on component mount

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersResponse = await axios.get(
          "https://soukphasone.onrender.com/users"
        );
        setUsers(usersResponse.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchData();
  }, []); // Fetch data only once on component mount

  const countVehicle = (type) =>
    orders.filter((order) => order.carType === type).length;

  const totalCash = orders
    .filter((order) => order.money === "cash")
    .reduce((total, order) => total + order.amount, 0);
  const totalTransfer = orders
    .filter((order) => order.money === "transfer")
    .reduce((total, order) => total + order.amount, 0);

  const totalAdminCount = users.filter((user) => user.name === "Admin").length;
  const totalUserCount = users.filter((user) => user.name === "User").length;

  return (
    <div>
      <Row className="row-cols-1 row-cols-md-3 g-2 p-2">
        <Col>
          <Card className="bg-danger text-white h-100">
            <Card.Body>
              <Card.Title>
                <FontAwesomeIcon icon={faUser} className="me-2" />
                ພາບລວມສະມາຊິກ
              </Card.Title>
              <Card.Text className="fs-6">
                User: {totalUserCount} | Admin: {totalAdminCount} |
                <br />
                ລວມທັງໝົດ : {totalUserCount + totalAdminCount}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className="bg-primary text-white h-100">
            <Card.Body>
              <Card.Title>
                <FontAwesomeIcon icon={faCar} className="me-2" />
                ພາບລວມລົດທັງໝົດ
              </Card.Title>
              <Card.Text className="fs-6">
                ລົດໃຫຍ່: {countVehicle("ລົດໃຫຍ່")}ຄັນ | ລົດຈັກ:{" "}
                {countVehicle("ລົດຈັກ")} ຄັນ| ຈຳນວນລົດຖີບ:{" "}
                {countVehicle("ລົດຖີບ")}ຄັນ |
                <br /> ລວມທັງໝົດ:{" "}
                {countVehicle("ລົດໃຫຍ່") +
                  countVehicle("ລົດຈັກ") +
                  countVehicle("ລົດຖີບ")}
                ຄັນ
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className="bg-success text-white h-100">
            <Card.Body>
              <Card.Title>
                <FontAwesomeIcon icon={faMoneyBillAlt} className="me-2" />
                ລວມຍອດທັງໝົດ
              </Card.Title>
              <Card.Text className="fs-6">
                ເງິນສົດ: {totalCash} ກີບ | ເງິນໂອນ: {totalTransfer} ກີບ <br />
                ລວມທັງໝົດ: {totalCash + totalTransfer} ກີບ
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
