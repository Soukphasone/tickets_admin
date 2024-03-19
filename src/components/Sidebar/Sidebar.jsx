import { useState } from "react";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap"; // Correct import for Button
import "./style.css";
import SidebarImage from "../../asset/menu.png"; // Import your image file here
import { Link, useNavigate } from "react-router-dom";
import { MdClose, MdDashboard, MdPerson } from "react-icons/md"; // Import Material icons

const SidebarToggle = ({ onClick }) => (
  <Button
    onClick={onClick}
    className="sidebar-toggle-btn"
    style={{ backgroundColor: "transparent", border: "none" }}
  >
    <img
      src={SidebarImage}
      alt="Sidebar Icon"
      style={{ width: "30px", marginLeft: "-0.5rem" }}
    />
  </Button>
);

SidebarToggle.propTypes = {
  onClick: PropTypes.func.isRequired, // Add prop validation for onClick
};

const SIDEBAR_CLASS = "sidebar-container";
const SHOW_CLASS = "show";

const Sidebar = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const navigate = useNavigate();
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const handleLogout = () => {
    // Perform any logout logic here
    // For example, clearing local storage, resetting state, etc.
    localStorage.clear(); // Clear local storage upon logout

    // Navigate to the login route
    navigate("/login");

    // Refresh the page
    window.location.reload();
  };

  const handleCloseSidebar = () => {
    setShowSidebar(false);
  };

  return (
    <>
      <div style={{ width: "100%", backgroundColor: "white" }}>
        <SidebarToggle onClick={toggleSidebar} />
      </div>
      <div className={`${SIDEBAR_CLASS} ${showSidebar ? SHOW_CLASS : ""}`}>
        <Button
          variant="link"
          className="close-sidebar-btn"
          onClick={handleCloseSidebar}
        >
          <MdClose className="close-icon" /> {/* Close icon */}
        </Button>
        <div className="sidebar-header">
          <h1 className="sidebar-title mt-2">ລະບົບຈັດການເກັບປີ້ລົດ</h1>
        </div>
        <ul className="sidebar-menu">
          <li>
            <Link to="/" className="sidebar-link" onClick={handleCloseSidebar}>
              <MdDashboard className="sidebar-icon" /> {/* Material Icon */}
              ໜ້າຫຼັກ
            </Link>
          </li>
          <li>
            <Link
              to="/users"
              className="sidebar-link"
              onClick={handleCloseSidebar}
            >
              <MdPerson className="sidebar-icon" /> {/* Material Icon */}
              ລາຍຜູ້ໃຊ້
            </Link>
          </li>
        </ul>
        <div className="sidebar-footer">
          <Button
            onClick={handleLogout}
            variant="danger"
            className="logout-button"
          >
            ອອກຈາກລະບົບ
          </Button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
