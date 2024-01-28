import React from "react";
import axios from "axios";
import { format } from "date-fns";
import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Modal, Form } from "react-bootstrap";
import UserCreate from "../components/UserCreate";
const Users = () => {
  //form updates
  const [showModal, setShowModal] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [updatedName, setUpdatedName] = useState("");
  const [updatedUsername, setUpdatedUsernam] = useState("");
  const [updatedPassword, setUpdatedPassword] = useState("");
  //get data
  const [data, setData] = useState([]);
  // set pages
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5; // Number of items per page
  const pageCount = Math.ceil(data.length / itemsPerPage);
// token 
const token = localStorage.getItem("token1");
  axios.defaults.headers.common['Authorization'] = `STORE ${token}`;
  // user delete
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
  // display user
  const fetchData = () => {
    axios.get('https://soukphasone.onrender.com/users')
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
  //set pages
  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };
  const offset = currentPage * itemsPerPage;
  const paginatedData = data.slice(offset, offset + itemsPerPage);
  // update
  const handleEdit = (user) => {
    setSelectedData(user);
    setUpdatedName(user.name);
    setUpdatedUsernam(user.username);
    setUpdatedPassword(user.password);
    setShowModal(true);
  };
  const handleModalSave = async () => {
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
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };
  return (
<div>
<div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div>
              <UserCreate />
            </div>
            <table
              className="table table-dark table-striped align-items-center justify-content-center"
              style={{ marginTop: 10 }}
            >
              <thead>
                <tr>
                  <th scope="col">ລ/ດ</th>
                  <th scope="col">ຊື່</th>
                  <th scope="col">ຜູ້ໃຊ້</th>
                  <th scope="col">ລະຫັດ</th>
                  <th scope="col">ວັນທີສະໝັກ</th>
                  <th scope="col">ສະຖານະ</th>
                  <th scope="col">ແກ້ໄຂ/ລົບ</th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.map((user, id) => (
                  <tr key={user._id}>
                    <th scope="row">{id + 1}</th>
                    <td>{user.name}</td>
                    <td>{user.username}</td>
                    <td>{user.password}</td>
                    <td>{format(new Date(user.createdAt), "dd/MM/yyyy")}</td>
                    <td>{user.status}</td>
                    <td>
                      <div
                        className="btn-group"
                        role="group"
                        aria-label="Basic mixed styles example"
                      >
                        <button
                          onClick={() => handleEdit(user)}
                          type="button"
                          className="btn btn-success"
                        >
                          ແກ້ໄຂ
                        </button>
                        <div style={{ width: 3 }}></div>
                        <button
                          onClick={() => handleDelete(user._id)}
                          type="button"
                          className="btn btn-danger"
                        >
                          ລົບ
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className={data.length > 5 ? "w-auto" : "d-none"}>
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
                  type="text"
                  value={updatedName}
                  onChange={(e) => setUpdatedName(e.target.value)}
                />
                <Form.Control
                  className="mb-3"
                  type="text"
                  value={updatedUsername}
                  onChange={(e) => setUpdatedUsernam(e.target.value)}
                />
                <Form.Control
                  className="mb-3"
                  type="text"
                  value={updatedPassword}
                  onChange={(e) => setUpdatedPassword(e.target.value)}
                />
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowModal(false)}>
                  ອອກ
                </Button>
                <Button variant="primary" onClick={handleModalSave}>
                  ບັນທຶກ
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </div>
      </div>
</div>
  );
};

export default Users;
