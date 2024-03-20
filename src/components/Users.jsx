import { useState, useEffect } from "react";
import axios from "axios";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { Button, Modal, Form, Table, Spinner } from "react-bootstrap";
import UserCreate from "./UserCreate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faEdit,
  faEye,
  faEyeSlash,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

import BackButton from "./Backbutton";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { SearchIcon } from "lucide-react";
import {
  showConfirmationAlert,
  showErrorAlert,
  showSuccessAlert,
} from "../Helper/SweetAlert";

const Users = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [updatedName, setUpdatedName] = useState("");
  const [updatedUsername, setUpdatedUsername] = useState("");
  const [updatedPassword, setUpdatedPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [error, setError] = useState();
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;
  const pageCount = Math.ceil(data.length / itemsPerPage);
  const token = localStorage.getItem("token1");
  axios.defaults.headers.common["Authorization"] = `STORE ${token}`;
  const [passwordVisible, setPasswordVisible] = useState(false);

  const fetchData = () => {
    axios
      .get("https://soukphasone.onrender.com/users")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, [data]);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };
  const offset = currentPage * itemsPerPage;
  const paginatedData = data.slice(offset, offset + itemsPerPage);
  // console.log("paginatedData", paginatedData);

  const handleEdit = (user) => {
    setSelectedData(user);
    setUpdatedName(user.name);
    setUpdatedUsername(user.username);
    setUpdatedPassword(user.password);
    setShowModal(true);
  };
  const handleUpdate = async () => {
    // Validation to check if any field is empty
    if (!updatedName || !updatedUsername || !updatedPassword) {
      // If any field is empty, set error state and return
      setError("Please fill in all fields.");
      return;
    }

    try {
      // Clear error state if there were previous errors
      setError("");

      const response = await axios.put(
        `https://soukphasone.onrender.com/users/${selectedData._id}`,
        {
          name: updatedName,
          username: updatedUsername,
          password: updatedPassword,
        }
      );
      const updatedIndex = data.findIndex(
        (item) => item._id === selectedData._id
      );
      const updatedData = [...data];
      updatedData[updatedIndex] = response.data;
      setData(updatedData);
      showSuccessAlert("success"); // Show SweetAlert success message
      setShowModal(false);
    } catch (error) {
      console.error("Error updating data:", error);
      // Optionally, you can show an error message using SweetAlert
      showErrorAlert("failed");
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `https://soukphasone.onrender.com/users/${id}`
      );
      console.log(response.data.message);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const goBack = () => {
    navigate("/"); // Go back one step in the history stack
  };
  const countUser = data.length;

  return (
    <div className="mt-4 p-2 vh-100">
      <div style={{ display: "flex", alignItems: "center" }}>
        <div onClick={goBack} style={{ cursor: "pointer" }}>
          <BackButton goBack={goBack} />
        </div>
        <h2
          className="d-flex"
          style={{ marginLeft: "auto", marginRight: "auto" }}
        >
          ລາຍຊື່ສະມາຊິກ:
        </h2>
      </div>
      <hr />

      <br />
      <div>
        {" "}
        <UserCreate />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "2rem",
          }}
        >
          <p style={{ color: "white" }}> ຈຳນວນທັງໝົດ :({countUser})</p>
        </div>
        <div>
          <TextField
            style={{ borderRadius: "5px" }}
            className="bg-light mt-2"
            placeholder="Search..."
            size="small"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={""}>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </div>
      </div>
      {loading ? (
        <div className="d-flex justify-content-center align-items-center vh-100">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <Table responsive striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>ລ/ດ</th>
              <th>ຜູ້ໃຊ້</th>
              <th>ວັນທີສະໝັກ</th>
              <th>ສະຖານະ</th>
              <th>ການກວດສອບ</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((user, id) => (
              <tr key={user._id}>
                <td>{id + 1}</td>
                <td>{user.username}</td>
                <td>{format(new Date(user.createdAt), "dd/MM/yyyy")}</td>
                <td>{user.status}</td>
                <td>
                  <div className="d-flex" style={{ justifyContent: "center" }}>
                    <Button
                      onClick={() => handleEdit(user)}
                      variant="success"
                      className="me-2"
                    >
                      <FontAwesomeIcon icon={faEdit} className="me-1" />
                    </Button>
                    <Button
                      onClick={() =>
                        showConfirmationAlert(() => handleDelete(user._id))
                      }
                      variant="danger"
                      className="me-2"
                    >
                      <FontAwesomeIcon icon={faTrash} className="me-1" />
                    </Button>
                    <Button
                      onClick={() =>
                        navigate(`/detail`, {
                          state: { _id: user._id, username: user.username },
                        })
                      }
                      variant="primary"
                    >
                      <FontAwesomeIcon icon={faEye} className="me-1" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      <div
        className={data.length > 5 ? "" : "d-none"}
        style={{ display: "flex", justifyContent: "end" }}
      >
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          pageCount={pageCount}
          onPageChange={handlePageChange}
          containerClassName={"pagination justify-content-center"}
          pageClassName={"page-item"}
          pageLinkClassName={"page-link"}
          previousClassName={"page-item"}
          nextClassName={"page-item"}
          previousLinkClassName={"page-link"}
          nextLinkClassName={"page-link"}
          activeClassName={"active"}
        />
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>ແກ້ໄຂລາຍຊື່</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            className="mb-3"
            as="select"
            value={updatedName}
            onChange={(e) => setUpdatedName(e.target.value)}
            style={{
              border: updatedName ? "" : "1px solid red",
            }}
          >
            <option value="Admin">Admin</option>
            <option value="User">User</option>
          </Form.Control>
          <Form.Control
            className="mb-3"
            type="text"
            value={updatedUsername}
            onChange={(e) => setUpdatedUsername(e.target.value)}
            style={{
              border: updatedUsername ? "" : "1px solid red",
            }}
          />
          <Form.Control
            className="mb-3"
            type={passwordVisible ? "text" : "password"}
            value={updatedPassword}
            onChange={(e) => setUpdatedPassword(e.target.value)}
            placeholder="Enter your password"
            style={{
              paddingRight: "2.5rem",
              border: updatedPassword ? "" : "1px solid red",
            }} // Adjust the padding to accommodate the icon
          />

          <div
            className="input-group-append"
            style={{
              position: "absolute",
              right: "1rem",
              top: "73%",
              transform: "translateY(-50%)",
            }}
          >
            <span
              className="input-group-text"
              onClick={() => setPasswordVisible(!passwordVisible)}
              style={{
                cursor: "pointer",
                backgroundColor: "transparent",
                border: "none",
              }}
            >
              <FontAwesomeIcon icon={passwordVisible ? faEyeSlash : faEye} />
            </span>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            ອອກ
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            ບັນທຶກ
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Users;
