import { useState, useEffect } from "react";
import axios from "axios";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { Button, Modal, Form, Table, Spinner } from "react-bootstrap";
import UserCreate from "./UserCreate";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faEye,
  faEyeSlash,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

const Users = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [updatedName, setUpdatedName] = useState("");
  const [updatedUsername, setUpdatedUsername] = useState("");
  const [updatedPassword, setUpdatedPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
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
  console.log("paginatedData", paginatedData);

  const handleEdit = (user) => {
    setSelectedData(user);
    setUpdatedName(user.name);
    setUpdatedUsername(user.username);
    setUpdatedPassword(user.password);
    setShowModal(true);
  };
  const handleUpdate = async () => {
    try {
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
      setShowModal(false);

      // Show SweetAlert success message
      Swal.fire({
        icon: "success",
        title: "Update Successful",
        text: "Your data has been updated successfully!",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error("Error updating data:", error);
      // Optionally, you can show an error message using SweetAlert
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: "An error occurred while updating your data. Please try again later.",
      });
    }
  };

  const handleDelete = async (id) => {
    try {
      const result = window.confirm("Are you sure?");
      if (result) {
        const response = await axios.delete(
          `https://soukphasone.onrender.com/users/${id}`
        );
        console.log(response.data.message);
      } else {
        console.log("User canceled.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="mt-3 p-2 vh-100">
      <h1 className="d-flex justify-content-center align-items-center">
        Member
      </h1>
      <UserCreate />

      {loading ? (
        <div className="d-flex justify-content-center align-items-center vh-100">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <Table
          responsive
          striped
          bordered
          hover
          variant="dark"
          className="mt-3"
        >
          <thead>
            <tr>
              <th>ລ/ດ</th>

              <th>ຜູ້ໃຊ້</th>

              <th>ວັນທີສະໝັກ</th>
              <th>ສະຖານະ</th>
              <th style={{ justifyContent: "center", display: "flex" }}>
                ການກວດສອບ
              </th>
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
                      onClick={() => handleDelete(user._id)}
                      variant="danger"
                      className="me-2"
                    >
                      <FontAwesomeIcon icon={faTrash} className="me-1" />
                    </Button>
                    <Button
                      onClick={() => navigate(`/detail`, { state: user._id })}
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
      <div className={data.length > 5 ? "mt-3" : "d-none"}>
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
          >
            <option value="Admin">Admin</option>
            <option value="User">User</option>
          </Form.Control>
          <Form.Control
            className="mb-3"
            type="text"
            value={updatedUsername}
            onChange={(e) => setUpdatedUsername(e.target.value)}
          />
          <Form.Control
            className="mb-3"
            type={passwordVisible ? "text" : "password"}
            value={updatedPassword}
            onChange={(e) => setUpdatedPassword(e.target.value)}
            placeholder="Enter your password"
            style={{ paddingRight: "2.5rem" }} // Adjust the padding to accommodate the icon
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
