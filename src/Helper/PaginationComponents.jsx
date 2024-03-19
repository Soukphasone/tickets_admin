import PropTypes from "prop-types";
import { Pagination } from "react-bootstrap";

const PaginationComponent = ({ totalPages, currentPage, paginate }) => {
  return (
    <Pagination className="justify-content-center">
      <Pagination.First onClick={() => paginate(1)} />
      <Pagination.Prev
        onClick={() => paginate(currentPage - 1)}
        disabled={currentPage === 1}
      />
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <Pagination.Item
          key={page}
          active={page === currentPage}
          onClick={() => paginate(page)}
        >
          {page}
        </Pagination.Item>
      ))}
      <Pagination.Next
        onClick={() => paginate(currentPage + 1)}
        disabled={currentPage === totalPages}
      />
      <Pagination.Last onClick={() => paginate(totalPages)} />
    </Pagination>
  );
};

PaginationComponent.propTypes = {
  totalPages: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  paginate: PropTypes.func.isRequired,
};

export default PaginationComponent;
