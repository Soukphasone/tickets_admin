import React, { useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../Sidebar/style.css";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
const Sidebar = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };
  const [active, setActive] = useState(1);
  return (
    <div className=" sidebar d-flex justify-content-between flex-column bg-dark text-white py-3 pe-5 vh-100">
      <div>
        <a href="" className="p-3 text-decoration-none text-white">
          <i className="bi bi-truck fs-4 me-4"></i>
          <span className="fs-3">ລະບົບຈັດການເກັບປີ້ລົດ</span>
        </a>
        <hr className="text-white mt-2" />
        <ul className="nav nav-pills flex-column mt-3">
          <li
            className={active === 1 ? "active nav-item p-2" : "nav-item p-2"}
            onClick={(e) => setActive(1)}
          >
            <Link to="#" className="p-1 text-decoration-none text-white">
              <i className="bi bi-speedometer me-3 fs-4"></i>
              <span className="fs-4">ໜ້າຫຼັກ</span>
            </Link>
          </li>
          <li
            className={active === 2 ? "active nav-item p-2" : "nav-item p-2"}
            onClick={(e) => setActive(2)}
          >
            <Link to="#" className="p-1 text-decoration-none text-white">
              <i className="bi bi-people me-3 fs-4"></i>
              <span className="fs-4">ລາຍຜູ້ໃຊ້</span>
            </Link>
          </li>
        </ul>
      </div>
      <div>
        <hr className="text-secondary mt-2" />
        <div className="nav-item p-2">
          <i className="bi bi-power me-3 fs-4 text-danger"></i>
          <span className="fs-4">
            <Button onClick={handleLogout} variant="danger">
              ອອກຈາກລະບົບ
            </Button>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
