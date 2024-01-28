import React from "react";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar";
import Home from "../Home";
// import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
const Main = () => {
    const [toggle, setToggle] = useState(false);
    function Toggle() {
      setToggle(!toggle);
    }
    useEffect(() => {
      const handleSize = () => {
        if (window.innerWidth > 768) {
          setToggle(false);
        }
      };
      window.addEventListener("resize", handleSize);
      return () => {
        window.removeEventListener("resize", handleSize);
      };
    }, []);
  return (
     <div>
         <div className="d-flex">
        <div className={toggle ? "d-none" : "w-auto"}>
          <Sidebar Toggle={Toggle}/>
        </div>
        <div className="col overflow-auto">
          <Navbar Toggle={Toggle} />
          <Home />
        </div>
      </div>
    </div>
  );
};

export default Main;
