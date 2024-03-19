import { useEffect, useState } from "react";
import axios from "axios";
import { Card, Col, Row, Table, Spinner } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import moment from "moment";
import PaginationComponent from "../Helper/PaginationComponents";

const Detail = () => {
  const [data, setData] = useState([]); // State to store the fetched data
  const [currentPage, setCurrentPage] = useState(1); // State for current page number
  const [itemsPerPage] = useState(10); // State for items per page
  const location = useLocation(); // Get the location object from react-router
  const userId = location.state; // Extract the user ID from the location state
  const [loading, setLoading] = useState(false); // State to manage loading state
  const [error, setError] = useState(null); // State to manage error state
  // const [filteredData, setFilteredData] = useState([]); // State to store filtered data

  // Function to fetch data from the API
  const fetchData = () => {
    setLoading(true); // Set loading to true when fetching data
    axios
      .get(`https://soukphasone.onrender.com/orders?userId=${userId}`)
      .then((response) => {
        setData(response.data); // Set the fetched data to the state
        setLoading(false); // Set loading to false after fetching data
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError("Error fetching data. Please try again later.");
        setLoading(false); // Set loading to false if there's an error
      });
  };

  // useEffect hook to fetch data when the component mounts or userId changes
  useEffect(() => {
    fetchData();
  }, [userId]);

  // useEffect hook to update filteredData when data or userId changes
  // useEffect(() => {
  //   setFilteredData(data.filter((item) => item.userId === userId));
  // }, [data, userId]);

  // Calculate counts for each type of vehicle
  const countBicycle = data.filter((item) => item.carType === "ລົດຖີບ").length;
  const countMotocycle = data.filter(
    (item) => item.carType === "ລົດຈັກ"
  ).length;
  const countCar = data.filter((item) => item.carType === "ລົດໃຫຍ່").length;

  // Calculate total cash and transfer amounts
  const calculateCashTotal = () => {
    return data
      .filter((item) => item.money === "cash")
      .reduce((total, item) => (total += item.amount), 0);
  };

  const calculateTransferTotal = () => {
    return data
      .filter((item) => item.money === "transfer")
      .reduce((total, item) => (total += item.amount), 0);
  };

  const cashTotalValue = calculateCashTotal();
  const transferTotalValue = calculateTransferTotal();

  // Pagination logic
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  return (
    <>
      <section className="p-2 vh-100">
        <h2>Data for User ID: {userId}</h2>

        <Row xs={1} md={2} lg={4} className="mb-3">
          <Col>
            <Card className="h-100">
              <Card.Body className="text-center">
                <Card.Title>Car</Card.Title>
                <Card.Text>{countCar}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card className="h-100">
              <Card.Body className="text-center">
                <Card.Title>Bicycle</Card.Title>
                <Card.Text>{countBicycle}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card className="h-100">
              <Card.Body className="text-center">
                <Card.Title>Motocycle</Card.Title>
                <Card.Text>{countMotocycle}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card className="h-100">
              <Card.Body className="text-center">
                <Card.Title>Total</Card.Title>
                <Card.Text>
                  {countMotocycle + countBicycle + countCar}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        {/* Render total cash and transfer amounts */}
        <Row xs={1} md={2} lg={3} className="mb-3">
          <Col>
            <Card className="h-100">
              <Card.Body className="text-center">
                <Card.Title>Cash Total</Card.Title>
                <Card.Text>{cashTotalValue}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card className="h-100">
              <Card.Body className="text-center">
                <Card.Title>Transfer Total</Card.Title>
                <Card.Text>{transferTotalValue}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card className="h-100">
              <Card.Body className="text-center">
                <Card.Title>Total</Card.Title>
                <Card.Text>{cashTotalValue + transferTotalValue}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        {/* Render table with data */}
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Sign</th>
              <th>Car Type</th>
              <th>Money</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Created At</th>
              <th>Created Out</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan="8" className="text-center">
                  <Spinner animation="border" role="status" />
                </td>
              </tr>
            )}
            {error && (
              <tr>
                <td colSpan="8" className="text-center">
                  Error: {error}
                </td>
              </tr>
            )}
            {currentItems.length === 0 && !loading && (
              <tr>
                <td colSpan="8" className="text-center">
                  NO DATA
                </td>
              </tr>
            )}
            {currentItems.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>{item.sign}</td>
                <td>{item.carType}</td>
                <td>{item.money}</td>
                <td>{item.amount}</td>
                <td>{item.status}</td>
                <td>{moment(item?.createdAt).format("YY-MM-DD, h:mm:ss a")}</td>
                <td>
                  {moment(item?.createdOut).format("YY-MM-DD, h:mm:ss a")}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        {!loading && currentItems.length > 0 && (
          <PaginationComponent
            totalPages={totalPages}
            currentPage={currentPage}
            paginate={paginate}
          />
        )}
      </section>
    </>
  );
};

export default Detail;
