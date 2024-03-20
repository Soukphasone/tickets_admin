import { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import axios from "axios";
import "sweetalert2/dist/sweetalert2.css";
import { showErrorAlert, showSuccessAlert } from "../Helper/SweetAlert";

function UserCreate() {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [nameError, setNameError] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleClose = () => {
    setShow(false);
    resetForm();
  };

  const handleShow = () => setShow(true);

  const resetForm = () => {
    setName("");
    setUsername("");
    setPassword("");
    setNameError(false);
    setUsernameError(false);
    setPasswordError(false);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setNameError(true);
      return;
    }
    if (!username.trim()) {
      setUsernameError(true);
      return;
    }
    if (!password.trim()) {
      setPasswordError(true);
      return;
    }
    try {
      await axios.post("https://soukphasone.onrender.com/users", {
        name: name,
        username: username,
        password: password,
      });
      showSuccessAlert("Form submitted successfully.");
      handleClose(); // Close modal after successful submission
    } catch (error) {
      showErrorAlert("An error occurred while submitting the form.");
    }
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow} style={{ marginTop: 10 }}>
        + ເພີ່ມຊື່ຜູ້ໃຊ້
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>ເພີ່ມລາຍຊື່ຜູ້ໃຊ້</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSave}>
            <Form.Group className="mb-3" controlId="name">
              <select
                className={`form-control ${nameError ? "is-invalid" : ""}`}
                onChange={(e) => {
                  setName(e.target.value);
                  setNameError(false);
                }}
              >
                <option value="">Select Role</option>
                <option value="Admin">admin</option>
                <option value="User">user</option>
              </select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="username">
              <Form.Control
                type="text"
                placeholder="ຊື່ຜູ້ໃຊ້"
                onChange={(e) => {
                  setUsername(e.target.value);
                  setUsernameError(false);
                }}
                style={usernameError ? { borderColor: "red" } : {}}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
              <Form.Control
                type="text"
                placeholder="ລະຫັດ"
                onChange={(e) => {
                  setPassword(e.target.value);
                  setPasswordError(false);
                }}
                style={passwordError ? { borderColor: "red" } : {}}
              />
            </Form.Group>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                ອອກ
              </Button>
              <Button type="submit" variant="primary">
                ບັນທຶກ
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default UserCreate;
