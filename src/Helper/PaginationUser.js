
import PropTypes from "prop-types"; // Import PropTypes
import ReactPaginate from "react-paginate";

const Pagination = ({ pageCount, handlePageChange }) => {
    return (
        <div className={pageCount > 5 ? "w-auto" : "d-none"}>
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
    );
};

// Prop validation
Pagination.propTypes = {
    pageCount: PropTypes.number.isRequired,
    handlePageChange: PropTypes.func.isRequired,
};

export default Pagination;
