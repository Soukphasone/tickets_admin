import { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import axios from "axios";
function UserCreate() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // create
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://soukphasone.onrender.com/users", {
        name: name,
        username: username,
        password: password,
      });
      console.log("Success");
      // window.location.href = "/";
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };
  return (
    <>
      <Button variant="primary" onClick={handleShow} style={{ marginTop: 10 }}>
        ເພີ່ມຊື່ຜູ້ໃຊ້
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>ເພີ່ມລາຍຊື່ຜູ້ໃຊ້</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSave}>
            <Form.Group className="mb-3" controlId="name">
              <Form.Control
                type="text"
                placeholder="ຊື່"
                autoFocus
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="username">
              <Form.Control
                type="text"
                placeholder="ຜູ້ໃໍຊ້"
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
              <Form.Control
                type="text"
                placeholder="ລະຫັດ"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                ອອກ
              </Button>
              <Button type="submit" variant="primary" onClick={handleClose}>
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
