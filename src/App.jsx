import "bootstrap/dist/css/bootstrap.min.css";
import Main from "./pages/Main/index";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
function App() {
  const user = localStorage.getItem("token");
  return (
    <Router>
      <Routes>
        {user && <Route path="/" exact element={<Main />}></Route>}
        <Route path="/login" exact element={<Login />}></Route>
        <Route path="/" exact element={<Navigate replace to ="/login" />}></Route>
      </Routes>
    </Router>
  );
}
export default App;
