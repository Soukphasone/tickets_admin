import Sidebar from "../components/Sidebar/Sidebar";
import UserChart from "../components/UserChart";
import "../index.css";
import CarsChart from "../components/CarsChart";
import MoneyChart from "../components/MoneyChart";
import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import CardReport from "../components/CardReport";
// import CarsChartData from "../components/CarsChartData";
// import MoneyChart from "../components/MoneyChart";

const Home = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setShowSidebar(window.innerWidth > 768 ? false : true);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  // window.onbeforeunload = function () {
  //   localStorage.clear();
  // };

  return (
    <>
      <div className="p-2">
        <div className={showSidebar ? "d-none d-md-block" : "w-auto"}>
          <Sidebar />
        </div>
        <h1 className="text-center mt-4 mb-5">Dashboard</h1>
        <CardReport />
        <Row className="g-2 p-2">
          <Col>
            <UserChart />
          </Col>
          <Col>
            <CarsChart />
          </Col>
          <Col>
            <MoneyChart />
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Home;
