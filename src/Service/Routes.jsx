// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate,
// } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
// import Sidebar from "../components/Sidebar/Sidebar"; // Import your Sidebar component
// import Home from "../pages/Home";
// import Login from "../pages/Login";
// import Detail from "../pages/Detail";
// import Users from "../pages/Users";
// import UserChart from "../components/Sidebar/UserChart";
// // import Main from "../Layout";

// function AppRoutes() {
//   const user = localStorage.getItem("token");

//   return (
//     <Router>
//       {/* Conditional rendering of Sidebar */}
//       {user && <Sidebar />}

//       {/* Routes */}
//       <Routes>
//         {/* Conditional rendering of routes based on user authentication */}
//         {user ? (
//           <>
//             <Route path="/" element={<Home />} />
//             <Route path="/detail" element={<Detail />} />
//             <Route path="/users" element={<Users />} />
//             <Route path="/userchart" element={<UserChart />} />

//           </>
//         ) : (
//           <Route path="/login" element={<Login />} />
//         )}
//         {/* Redirect to login if user is not authenticated */}
//         <Route path="*" element={<Navigate to="/login" />} />
//       </Routes>
//     </Router>
//   );
// }

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from "../components/Sidebar/Sidebar"; // Import your Sidebar component
import Home from "../pages/Home";
import Login from "../pages/Login";
import Detail from "../pages/Detail";
import Users from "../components/Users";
import UserChart from "../components/UserChart";
import CarsChart from "../components/CarsChart";
import MoneyChart from "../components/MoneyChart";

function AppRoutes() {
  const user = localStorage.getItem("token");

  return (
    <Router>
      {/* Conditional rendering of Sidebar */}
      {user && <Sidebar />}

      {/* Routes */}
      <Routes>
        {/* Conditional rendering of routes based on user authentication */}
        {user ? (
          <>
            <Route
              path="/"
              element={user ? <Home /> : <Navigate to="/login" />}
            />
            <Route path="/detail" element={<Detail />} />
            <Route path="/users" element={<Users />} />
            <Route path="/userchart" element={<UserChart />} />
            <Route path="/carschart" element={<CarsChart />} />
            <Route path="/moneychart" element={<MoneyChart />} />
          </>
        ) : (
          <>
            {/* Redirect to login if user is not authenticated */}
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default AppRoutes;
